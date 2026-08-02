# ValidoHub VPS Hosting Notes

Last checked: 2026-08-02

This file records the current VPS access details, server baseline, and the current understanding of how ValidoHub builds and should be hosted. Do not put passwords, private keys, API tokens, or OVH secret links in this file.

## VPS Access

- Provider: OVH VPS
- VPS name: `vps-1751115a.vps.ovh.net`
- IPv4: `137.74.173.107`
- IPv6: `2001:41d0:305:2100::93cb`
- SSH user: `ubuntu`
- SSH command:

```bash
ssh ubuntu@137.74.173.107
```

SSH is configured for key-based login. Password SSH login is disabled, and root login is disabled.

Local key currently authorized on the VPS:

```text
/Users/maxtkachenko/.ssh/id_ed25519.pub
```

The original OVH password/secret link was only for first access. Treat it as compromised/obsolete and do not reuse it.

## Server Baseline

OS:

```text
Ubuntu 26.04 LTS
```

Current installed hosting/runtime packages:

- Caddy `2.6.2`
- Docker `29.1.3`
- Docker Compose `2.40.3`
- UFW firewall
- fail2ban
- git, curl, htop, unzip, ca-certificates
- unattended-upgrades

Firewall status:

- incoming default: deny
- outgoing default: allow
- allowed inbound ports:
  - `22/tcp` for SSH
  - `80/tcp` for HTTP
  - `443/tcp` for HTTPS

Security status:

- `PasswordAuthentication no`
- `PermitRootLogin no`
- `PubkeyAuthentication yes`
- fail2ban `sshd` jail enabled
- unattended security upgrades enabled

Hardware snapshot after setup:

- disk: about `96G` total, about `93G` free after baseline setup
- memory: about `11Gi` total
- swap: none

## Project Shape

ValidoHub is a static site product repository. It contains product content, browser assets, workbench framework, browser plugins, CSS/JS, UX docs, and YAML metadata. It is not a backend service repo.

Important source files:

- `site.yaml` defines the site config.
- `package.json` defines build and audit scripts.
- `assets/` contains source browser CSS/JS/images.
- `tools/` contains tool metadata.
- `countries/` contains country hub data.
- `content/` contains localized content blocks.
- `scripts/` contains the Node build/post-processing/audit scripts.
- `generated/validohub/` is the generated static output.

Current `site.yaml` output:

```yaml
output:
  directory: generated/validohub
```

The generated output contains static HTML, CSS, JS, assets, sitemaps, robots.txt, and search index files. There is no required Node/Java/Python server process for serving the generated site.

## Build Commands

The full build is a release gate and can be very expensive. Prefer scoped commands during active work.

Common commands:

```bash
npm run build:changed -- --dry-run --locales en
npm run build:changed -- --locales en
npm run build:portal
npm run build:country -- --country <slug> --locales en
npm run build:tools -- --slugs <slug-a>,<slug-b> --locales en
npm run build:release:node
npm run build:release
```

Relevant notes from the project docs:

- Serve and verify from `generated/validohub`, not from the repository root.
- `npm run build:release` is the full Java + Node publisher and site integrity gate.
- `npm run build:release:node` skips the Java publisher and reuses existing Java-owned generated routes.
- Do not run the full build for normal documentation-only work.
- Do not commit `generated/`.

## Current Generated Output Size

Current local generated output is static and now small enough for the current VPS after the 2026-08-01 build bloat fix and the 2026-08-02 country image optimization:

```text
generated/validohub: about 1.0G
generated/validohub/en: about 135M
generated/validohub/assets: about 67M
generated/validohub/assets/images/countries: about 40M
generated/validohub/assets/js: about 25M
generated/validohub/assets/css: about 1.8M
routes/pages: 86,632
```

Country outline/location source PNGs are retained in `assets/images/countries` as raw source assets, but generated releases use 720px JPEGs and prune duplicated generated PNG copies.

This matters for the VPS: the VPS has about `96G` total disk. A full direct deploy is now realistic, and archive-based deploys are much lighter, but keep release retention deliberate because each extracted release and each uploaded archive consumes disk.

Recommended packaging command after a clean full build:

```bash
npm run package:site
```

Default output:

```text
generated/releases/validohub-<release-id>.tar.gz
generated/releases/validohub-<release-id>.tar.gz.sha256
```

Latest local archive smoke:

```text
generated/releases/validohub-20260802-164620.tar.gz
size: 97,860,193 bytes
created in: 39s
sha256: 7fc3cc9883c064a52a6d34df8b0640ca6fbc1667aa21a22def8a294e5e126bd9
checksum verification: OK from generated/releases
```

Use `tar.gz` by default because it works on Ubuntu without extra packages. If the VPS has `zstd` installed and upload/build time matters, use:

```bash
npm run package:site -- --format tar.zst
```

## Recommended Hosting Software

Use Caddy for the current site.

Reason:

- ValidoHub output is static HTML/CSS/JS.
- Caddy is already installed and running.
- Caddy serves static files directly and can manage HTTPS automatically once DNS points to the VPS.
- Docker is useful for future apps/services, but it is not required just to serve the generated static site.

Recommended on-server layout:

```text
/srv/validohub/releases/<release-id>/
/srv/validohub/current -> /srv/validohub/releases/<release-id>
```

Current domain Caddyfile once DNS points to the VPS:

```caddyfile
(validohub_headers) {
    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }
}

(validohub_static) {
    root * /srv/validohub/current
    encode gzip
    redir / /en/ 302
    file_server
    import validohub_headers
}

validohub.com {
    import validohub_static
}

www.validohub.com {
    redir https://validohub.com{uri} permanent
}

http://137.74.173.107 {
    import validohub_static
}
```

Temporary IP-only Caddyfile for preview before DNS:

```caddyfile
:80 {
    root * /srv/validohub/current
    encode gzip
    redir / /en/ 302
    file_server

    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }
}
```

Reload Caddy after editing:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

## Deployment Sketch

Build locally, deploy static output to the VPS, then atomically switch the `current` symlink.

Example release id:

```bash
RELEASE_ID=$(date +%Y%m%d-%H%M%S)
```

Create target directories:

```bash
ssh ubuntu@137.74.173.107 "sudo mkdir -p /srv/validohub/releases && sudo chown -R ubuntu:ubuntu /srv/validohub"
```

Deploy a generated artifact:

```bash
rsync -az --delete generated/validohub/ ubuntu@137.74.173.107:/srv/validohub/releases/$RELEASE_ID/
```

Archive-based deploy:

```bash
npm run package:site -- --release-id $RELEASE_ID
scp generated/releases/validohub-$RELEASE_ID.tar.gz* ubuntu@137.74.173.107:/srv/validohub/releases/
ssh ubuntu@137.74.173.107 "cd /srv/validohub/releases && shasum -a 256 -c validohub-$RELEASE_ID.tar.gz.sha256"
ssh ubuntu@137.74.173.107 "mkdir -p /srv/validohub/releases/$RELEASE_ID && tar -xzf /srv/validohub/releases/validohub-$RELEASE_ID.tar.gz -C /srv/validohub/releases/$RELEASE_ID"
```

Switch release:

```bash
ssh ubuntu@137.74.173.107 "ln -sfn /srv/validohub/releases/$RELEASE_ID /srv/validohub/current && sudo systemctl reload caddy"
```

Important: keep only a small number of old releases on this VPS unless disk size is increased.

## Safe Deploy And Rollback Commands

Use the project deploy script instead of hand-running SSH commands for normal releases. It keeps releases immutable and switches only the `current` symlink after checks pass.

Current helper commands:

```bash
npm run deploy:vps -- --release-id <release-id>
npm run rollback:vps -- --release-id <release-id>
npm run status:vps
npm run list:vps-releases
npm run loadtest:vps -- --duration-seconds 60 --rate 100
```

Verified on 2026-08-02:

```text
npm run status:vps: passed
npm run list:vps-releases: passed
npm run rollback:vps -- --release-id 20260802-011524: passed
npm run loadtest:vps -- --duration-seconds 60 --rate 100 --max-inflight 1000 --timeout-ms 10000: passed after deploying 20260802-021127
```

Default target:

```text
ssh target: ubuntu@137.74.173.107
remote root: /srv/validohub
public smoke URL: http://137.74.173.107
```

Safe deploy flow:

1. Verify the local archive and `.sha256`.
2. Upload both files into `/srv/validohub/releases/`.
3. Verify checksum on the VPS.
4. Extract into a new immutable directory `/srv/validohub/releases/<release-id>`.
5. Verify release smoke files before switch:
   - `/en/index.html`
   - `/sitemap.xml`
   - `assets/css/bundle.*.css`
   - `assets/js/bundle.*.js`
6. Save the previous symlink target in `/srv/validohub/previous-release`.
7. Atomically switch `/srv/validohub/current`.
8. Reload Caddy.
9. Public-smoke the site:
   - `/`
   - `/en/`
   - `/en/tools/`
10. If public smoke fails, automatically switch back to the previous symlink target and reload Caddy.

Example deploy from an existing archive:

```bash
npm run deploy:vps -- --release-id 20260802-021127
```

Example rollback:

```bash
npm run rollback:vps -- --release-id 20260802-011524
```

Example deploy after packaging a fresh release:

```bash
npm run package:site -- --release-id 20260802-020000
npm run deploy:vps -- --release-id 20260802-020000
```

For the domain, keep the same release layout. Caddy serves `/srv/validohub/current`; domain launch only changes the site labels and redirects, not the deploy artifact layout. The rollback command remains the same because Caddy still serves `/srv/validohub/current`.

Rules:

- Never deploy by writing directly into `/srv/validohub/current`.
- Never use `rsync --delete` against `/srv/validohub/current`.
- Never extract an archive over an existing release directory.
- Keep at least the last known-good release plus the current release.
- Keep 3-5 releases while disk allows it; prune old releases only as a separate deliberate maintenance step, not during deploy.
- Keep uploaded archives only while useful for audit/redeploy. Each extracted release plus archive currently costs roughly `3.8G` on this VPS.

## Current Domain/IP Deployment

The current deployment is live at:

```text
https://validohub.com/
https://validohub.com/en/
https://www.validohub.com/en/ -> https://validohub.com/en/
http://137.74.173.107/
http://137.74.173.107/en/
```

Current release:

```text
release id: 20260802-173659
archive: /srv/validohub/releases/validohub-20260802-173659.tar.gz
extracted release: /srv/validohub/releases/20260802-173659
current symlink: /srv/validohub/current -> /srv/validohub/releases/20260802-173659
previous release: /srv/validohub/releases/20260802-171627
archive bytes: 98,419,432
archive sha256: 94e7b628ce3c670cba0969a06a52043644d098378f5ef150f29fc86bbbc52cc9
```

Deployment checks passed:

```text
sha256sum -c validohub-20260802-173659.tar.gz.sha256: OK
release ready: /srv/validohub/releases/20260802-173659
current -> /srv/validohub/releases/20260802-173659
curl -I -L https://validohub.com/: 200 OK
curl -I -L https://validohub.com/en/: 200 OK
curl -I -L https://validohub.com/en/tools/: 200 OK
```

SEO launch-mode checks passed for the current release:

```text
https://validohub.com/sitemap.xml: references only https://validohub.com/sitemap-en.xml
https://validohub.com/robots.txt: Sitemap: https://validohub.com/sitemap.xml
https://validohub.com/en/: no robots noindex meta
https://validohub.com/de/: <meta name="robots" content="noindex, follow">
```

IndexNow checks passed for the current release:

```text
key file: https://validohub.com/67952aa5-e375-4253-9942-7d7ae0c560f2.txt
commands: npm run indexnow:prepare, npm run indexnow:dry-run, npm run indexnow:submit
submitted: 12,376 English indexable URLs
result: 2/2 IndexNow batches returned HTTP 200
```

Analytics checks passed for the current release:

```text
GA4 Measurement ID: G-QH4SZME9KW
config file: config/google-analytics-measurement-id.txt
commands: npm run analytics:dry-run, npm run analytics:apply
live https://validohub.com/en/: contains googletagmanager.com/gtag/js?id=G-QH4SZME9KW
```

Server snapshot after deploy:

```text
/dev/sda1: 96G total, 34G used, 63G available
release dirs: 12
uploaded archives: 24
Caddy: active
```

Load test after deploy:

```text
command: npm run loadtest:vps -- --duration-seconds 60 --rate 100 --max-inflight 1000 --timeout-ms 10000
attempted/completed: 6000/6000
status: 6000 HTTP 200
failures/errors: 0
observed throughput: 99.9 req/s
latency: p50 78.3ms, p95 207.6ms, p99 238.5ms, max 330.3ms
```

Note: the first archive extracted successfully but produced many harmless GNU tar warnings about macOS `LIBARCHIVE.xattr.com.apple.provenance` extended attributes. `scripts/package-generated-site.mjs` now sets `COPYFILE_DISABLE=1` for tar/zip subprocesses so future archives should extract quietly on Ubuntu.

## Practical Next Decision

The site is static, so the software decision is straightforward:

- Use Caddy as the web server.
- Keep Docker installed for future services, but do not wrap the static site in Docker unless there is a specific reason.
- Deploy the full generated tree only after `npm run build:release` and the deployment audits pass.
- Prefer archive-based deploys when you want a repeatable artifact and checksum.
- Use direct `rsync --delete` when you want the fastest incremental upload and are comfortable deploying from the local generated tree.
