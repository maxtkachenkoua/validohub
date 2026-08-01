# ValidoHub VPS Hosting Notes

Last checked: 2026-08-01

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

Current local generated output is static but very large:

```text
generated/validohub: about 89G
files: about 87,380
assets: about 896M
en: about 21G
de: about 25G
es: about 22G
fr: about 20G
pl/pt-BR/uk: about 168-173M each
```

This matters for the VPS: the VPS has about `96G` total disk. A full direct deploy of the current generated tree would nearly fill the disk and is not safe as a production deployment strategy.

Before deploying the full site, choose one of these:

1. Increase VPS disk size or use a larger server.
2. Reduce generated output size.
3. Deploy only a scoped preview/subset.
4. Use object storage/CDN/static hosting for the full generated artifact and keep the VPS only as a reverse proxy.

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

Recommended Caddyfile once a domain points to the VPS:

```caddyfile
validohub.com, www.validohub.com {
    root * /srv/validohub/current
    encode gzip
    file_server

    header {
        X-Content-Type-Options nosniff
        Referrer-Policy strict-origin-when-cross-origin
    }
}
```

Temporary IP-only Caddyfile for preview before DNS:

```caddyfile
:80 {
    root * /srv/validohub/current
    encode gzip
    file_server
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

Switch release:

```bash
ssh ubuntu@137.74.173.107 "ln -sfn /srv/validohub/releases/$RELEASE_ID /srv/validohub/current && sudo systemctl reload caddy"
```

Important: do not run this full rsync while `generated/validohub` is about `89G` unless the target disk/storage plan has been fixed.

## Practical Next Decision

The site is static, so the software decision is straightforward:

- Use Caddy as the web server.
- Keep Docker installed for future services, but do not wrap the static site in Docker unless there is a specific reason.
- Do not deploy the full current generated tree to this VPS until the artifact size/disk strategy is resolved.

For an early preview, deploy a small subset first, for example `assets/`, root metadata files, and one locale such as `en/` or a smaller localized set. For production, either reduce the generated size or move the full static artifact to larger storage/CDN.
