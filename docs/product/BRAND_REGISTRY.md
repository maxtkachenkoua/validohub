# Brand Registry

This registry is the source of truth for visual identity decisions in ValidoHub.

AI assistants must check this file before choosing an icon or logo.

If a brand is missing, add a registry entry before using it visually.

## Entry Fields

Every brand defines:

- Brand Name.
- Category.
- Preferred rendering mode.
- Official asset availability.
- Monochrome asset.
- Glyph asset.
- Semantic fallback.
- Documentation source.
- Notes.

## Rendering Mode Legend

- `Official`: Use official logo/SVG when approved for bundling.
- `Monochrome`: Use a documentation-grade monochrome mark.
- `Glyph`: Use a project-owned glyph that does not imitate protected artwork.
- `Semantic`: Use a generic concept icon.

## Supported Brands

| Key | Brand Name | Category | Mode | Official Asset Availability | Monochrome Asset | Glyph Asset | Semantic Fallback | Documentation Source | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `pix` | PIX | Payment system | Glyph | Not bundled | Not configured | `payment-transfer` | Payment transfer glyph | Banco Central do Brasil PIX documentation | Use project-owned transfer glyph until official usage is approved. |
| `java` | Java | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Oracle Java brand resources | Do not bundle official marks until usage is approved. |
| `python` | Python | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Python Software Foundation trademark usage policy | Do not bundle official marks until usage is approved. |
| `go` | Go | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Go brand guidelines | Do not bundle official marks until usage is approved. |
| `kotlin` | Kotlin | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Kotlin brand assets | Do not bundle official marks until usage is approved. |
| `csharp` | C# | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Microsoft trademark guidelines | Use text-first monochrome treatment. |
| `dotnet` | .NET | Framework | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Microsoft trademark guidelines | Use text-first monochrome treatment. |
| `nodejs` | Node.js | Runtime | Monochrome | Not bundled | Registered monochrome text treatment | `runtime` | Runtime glyph | OpenJS Foundation trademark policy | Do not bundle official marks until usage is approved. |
| `react` | React | Framework | Monochrome | Not bundled | Registered monochrome text treatment | `framework` | Framework glyph | Meta open source brand guidance | Do not bundle official marks until usage is approved. |
| `nextjs` | Next.js | Framework | Monochrome | Not bundled | Registered monochrome text treatment | `framework` | Framework glyph | Vercel brand resources | Do not bundle official marks until usage is approved. |
| `typescript` | TypeScript | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Microsoft trademark guidelines | Use text-first monochrome treatment. |
| `javascript` | JavaScript | Programming language | Monochrome | Not bundled | Registered monochrome text treatment | `code` | Code glyph | Ecma International language references | Use text-first monochrome treatment. |
| `docker` | Docker | Platform | Monochrome | Not bundled | Registered monochrome text treatment | `container` | Container glyph | Docker brand guidelines | Do not bundle official marks until usage is approved. |
| `kubernetes` | Kubernetes | Platform | Monochrome | Not bundled | Registered monochrome text treatment | `orchestration` | Orchestration glyph | CNCF project artwork guidance | Do not bundle official marks until usage is approved. |
| `postgresql` | PostgreSQL | Database | Monochrome | Not bundled | Registered monochrome text treatment | `database` | Database glyph | PostgreSQL trademark policy | Do not bundle official marks until usage is approved. |
| `mysql` | MySQL | Database | Monochrome | Not bundled | Registered monochrome text treatment | `database` | Database glyph | Oracle trademark guidelines | Do not bundle official marks until usage is approved. |
| `mongodb` | MongoDB | Database | Monochrome | Not bundled | Registered monochrome text treatment | `database` | Database glyph | MongoDB brand resources | Do not bundle official marks until usage is approved. |
| `redis` | Redis | Database | Monochrome | Not bundled | Registered monochrome text treatment | `database` | Database glyph | Redis trademark policy | Do not bundle official marks until usage is approved. |
| `jwt` | JWT | Standard | Glyph | Not bundled | Not configured | `token` | Token glyph | JWT introduction and specification references | Use project-owned token glyph. |
| `stripe` | Stripe | Payment platform | Monochrome | Not bundled | Registered monochrome text treatment | `payment-card` | Payment card glyph | Stripe trademark and brand guidelines | Do not bundle official marks until usage is approved. |
| `visa` | Visa | Payment network | Glyph | Not bundled | Not configured | `payment-card` | Payment card glyph | Visa brand and trademark guidance | Use payment-card glyph unless official usage is approved. |
| `mastercard` | Mastercard | Payment network | Glyph | Not bundled | Not configured | `payment-card` | Payment card glyph | Mastercard brand center | Use payment-card glyph unless official usage is approved. |
| `amex` | American Express | Payment network | Glyph | Not bundled | Not configured | `payment-card` | Payment card glyph | American Express trademark guidance | Use payment-card glyph unless official usage is approved. |
| `swift` | SWIFT | Financial messaging standard | Glyph | Not bundled | Not configured | `international-transfer` | International transfer glyph | SWIFT trademark guidance | Use project-owned international transfer glyph. |
| `sepa` | SEPA | Payment area standard | Semantic | No single official product logo required | Not configured | `payment-area` | Payment area glyph | European Payments Council SEPA references | Use semantic payment-area glyph. |
| `iban` | IBAN | Banking standard | Semantic | No single official product logo required | Not configured | `bank-account` | Bank account glyph | ISO 13616 / SWIFT IBAN registry references | Use semantic bank-account glyph. |
| `github` | GitHub | Developer platform | Monochrome | Not bundled | Registered monochrome text treatment | `code-host` | Code host glyph | GitHub logos and usage guidelines | Do not bundle official marks until usage is approved. |
| `openapi` | OpenAPI | API specification | Monochrome | Not bundled | Registered monochrome text treatment | `api` | API glyph | OpenAPI Initiative references | Do not bundle official marks until usage is approved. |
| `graphql` | GraphQL | API query language | Monochrome | Not bundled | Registered monochrome text treatment | `api` | API glyph | GraphQL trademark guidance | Do not bundle official marks until usage is approved. |
| `govbr` | gov.br | Government portal | Glyph | Not bundled | Not configured | `government-portal` | Government portal glyph | gov.br brand and service references | Use project-owned government portal glyph until official usage is approved. |
| `bancoCentralBrasil` | Banco Central do Brasil | Central bank | Glyph | Not bundled | Not configured | `central-bank` | Central bank glyph | Banco Central do Brasil official site | Use project-owned central bank glyph until official usage is approved. |
| `receitaFederal` | Receita Federal | Tax authority | Glyph | Not bundled | Not configured | `tax-document` | Tax document glyph | Receita Federal official site | Use project-owned tax document glyph until official usage is approved. |
| `correios` | Correios | Postal authority | Glyph | Not bundled | Not configured | `postal` | Postal glyph | Correios official site | Use project-owned postal glyph until official usage is approved. |

## Semantic Concepts

These are not brand entries unless a future decision says otherwise:

- CPF.
- CNPJ.
- CEP.
- Regex.
- JSON.
- Base64.
- URL.
- Unicode.
- Locale.
- Calendar.
- ICU.

Use semantic icons for these concepts.

## Adding A Brand

Before using a new visual identity:

1. Add a row to this registry.
2. Add the corresponding entry to `assets/js/brand-assets.js`.
3. Choose one rendering mode.
4. Document asset availability and licensing notes.
5. Use `brandKey` in product data.
6. Do not create page-specific icon logic.
