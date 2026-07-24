# North America Premium Suite Spec

Generated premium browser-only country suites for sovereign North American countries:

- United States (US)
- Canada (CA)
- Mexico (MX)
- Belize (BZ)
- Guatemala (GT)
- El Salvador (SV)
- Honduras (HN)
- Nicaragua (NI)
- Costa Rica (CR)
- Panama (PA)
- Bahamas (BS)
- Cuba (CU)
- Jamaica (JM)
- Haiti (HT)
- Dominican Republic (DO)
- Antigua and Barbuda (AG)
- Dominica (DM)
- Saint Kitts and Nevis (KN)
- Saint Lucia (LC)
- Saint Vincent and the Grenadines (VC)
- Grenada (GD)
- Barbados (BB)
- Trinidad and Tobago (TT)

## Contract

- Use Country Suite Factory V1 for every North America runtime.
- Do not fake official status. Browser checks only inspect local structure, labels, formatting, masking, and integration payload readiness.
- Do not add IBAN unless the jurisdiction actually uses IBAN for the workflow. US/Canada/Mexico use local rails such as ABA/ACH, EFT/institution-transit-account, RFC/CURP/CLABE/SPEI.
- Small Caribbean and Central American jurisdictions may start with local helpers where public checksum algorithms are not confirmed; do not invent a checksum.
- Every tool must render Integration traps, field breakdown, quality notes, raw JSON, batch checks, local samples, and explicit official boundaries.
- Hero visuals must follow the raster country-map rule in DEVELOPMENT_RULES.md: generated once, no text inside PNGs, no split panels, no side gutters, no satellite/terrain style.
- North America premium suites must not ship as shallow 20-ish country sets. The current baseline is 61 browser-only workbenches per country, and USA/Canada/Mexico are the minimum quality bar, not special exceptions.
- Country civic snapshots must include 3-4 meaningful main cities/towns with approximate context before sign-off. A single capital-only fallback is a regression for these generated suites.
- After adding or regenerating North America country data, rebuild the English Countries portal in the dev loop so the North America continent group lists all 23 countries. Do not rely on country-page builds alone.
- Every country must carry a real IANA primaryTimeZone for the hero clock. Placeholder text such as Local time zone varies by territory/region breaks the runtime clock and is not allowed in generated country data.
