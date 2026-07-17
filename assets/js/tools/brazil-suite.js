(function(){
  'use strict';
  const ALGORITHM_ID='validohub.brazil-suite';
  const STORAGE_KEY='validohub.brazilSuite.history.v1';
  const TOOLS={
  "brazil-cpf-validator": {
    "title": "CPF Validator & Explainer",
    "code": "CPF",
    "group": "identity",
    "summary": "Validate CPF numbers, replay modulus-11 check digits, mask personal identifiers, and generate safe fictional fixtures locally.",
    "tags": [
      "identifier",
      "tax",
      "person"
    ]
  },
  "brazil-cnpj-validator": {
    "title": "CNPJ Validator & Explainer",
    "code": "CNPJ",
    "group": "identity",
    "summary": "Validate CNPJ company identifiers, inspect both check digits, normalize punctuation, and build safe business test cases.",
    "tags": [
      "identifier",
      "business",
      "tax"
    ]
  },
  "brazil-rg-inspector": {
    "title": "RG Number Inspector",
    "code": "RG",
    "group": "identity",
    "summary": "Inspect RG-shaped identity numbers, normalize issuer notation, mask document values, and document state-level offline limits.",
    "tags": [
      "identifier",
      "document"
    ]
  },
  "brazil-cnh-validator": {
    "title": "CNH Driver License Inspector",
    "code": "CNH",
    "group": "identity",
    "summary": "Inspect Brazilian CNH driver-license numbers, normalize eleven-digit records, and separate offline shape checks from official DETRAN status.",
    "tags": [
      "identifier",
      "vehicle"
    ]
  },
  "brazil-renach-inspector": {
    "title": "RENACH Number Inspector",
    "code": "RENACH",
    "group": "identity",
    "summary": "Normalize RENACH driver-record references, check common document shape, mask values, and prepare transport onboarding fixtures.",
    "tags": [
      "identifier",
      "vehicle"
    ]
  },
  "brazil-renavam-validator": {
    "title": "RENAVAM Vehicle Registry Validator",
    "code": "RENAVAM",
    "group": "identity",
    "summary": "Validate RENAVAM-shaped vehicle registry numbers, inspect length and check-digit behavior where possible, and create safe vehicle fixtures.",
    "tags": [
      "vehicle",
      "identifier"
    ]
  },
  "brazil-license-plate-validator": {
    "title": "Brazil License Plate Inspector",
    "code": "PLATE",
    "group": "identity",
    "summary": "Inspect Mercosul and legacy Brazilian license plate patterns, classify format family, and prepare fleet-safe masked examples.",
    "tags": [
      "vehicle",
      "identifier"
    ]
  },
  "brazil-titulo-eleitor-validator": {
    "title": "Título de Eleitor Validator",
    "code": "TSE",
    "group": "identity",
    "summary": "Check voter-title shaped numbers, normalize zones and sections, explain offline boundaries, and generate fictional electoral test values.",
    "tags": [
      "identifier",
      "government"
    ]
  },
  "brazil-nis-pis-pasep-validator": {
    "title": "NIS / PIS / PASEP Inspector",
    "code": "NIS",
    "group": "identity",
    "summary": "Inspect NIS, PIS, and PASEP eleven-digit identifiers, normalize punctuation, mask values, and prepare payroll-safe fixtures.",
    "tags": [
      "identifier",
      "payroll"
    ]
  },
  "brazil-sus-card-validator": {
    "title": "CNS / SUS Card Validator",
    "code": "SUS",
    "group": "identity",
    "summary": "Inspect Brazilian CNS/SUS card numbers, normalize fifteen-digit health identifiers, and separate offline shape checks from health-system status.",
    "tags": [
      "health",
      "identifier"
    ]
  },
  "brazil-passport-number-helper": {
    "title": "Brazil Passport Number Helper",
    "code": "PASS",
    "group": "identity",
    "summary": "Normalize Brazilian passport-like document input, mask travel references, and prepare fictional identity document fixtures.",
    "tags": [
      "document",
      "identity"
    ]
  },
  "brazil-state-registration-ie-validator": {
    "title": "Inscrição Estadual Helper",
    "code": "IE",
    "group": "identity",
    "summary": "Inspect state-registration IE values, normalize UF context, and document state-specific rules that require dedicated official validation.",
    "tags": [
      "tax",
      "state"
    ]
  },
  "brazil-municipal-registration-im-helper": {
    "title": "Inscrição Municipal Helper",
    "code": "IM",
    "group": "identity",
    "summary": "Normalize municipal-registration references, identify city context fields, and prepare invoice-safe examples without claiming city status lookup.",
    "tags": [
      "tax",
      "municipal"
    ]
  },
  "brazil-cnae-code-inspector": {
    "title": "CNAE Code Inspector",
    "code": "CNAE",
    "group": "identity",
    "summary": "Inspect CNAE activity codes, normalize class and subclass notation, and prepare company-classification data for onboarding flows.",
    "tags": [
      "business",
      "classification"
    ]
  },
  "brazil-natureza-juridica-code-inspector": {
    "title": "Natureza Jurídica Code Inspector",
    "code": "NJ",
    "group": "identity",
    "summary": "Inspect Brazilian legal-nature codes, normalize numeric notation, and prepare business-register payload hints for company workflows.",
    "tags": [
      "business",
      "classification"
    ]
  },
  "brazil-ibge-municipality-code-inspector": {
    "title": "IBGE Municipality Code Inspector",
    "code": "IBGE",
    "group": "identity",
    "summary": "Inspect seven-digit IBGE municipality codes, split UF and locality hints, and prepare geography keys for data imports.",
    "tags": [
      "government",
      "geo"
    ]
  },
  "brazil-nfe-access-key-validator": {
    "title": "NF-e Access Key Validator",
    "code": "NF-e",
    "group": "tax",
    "summary": "Validate 44-digit NF-e access keys, replay modulo-11 check digit math, split UF, date, CNPJ, model, series, and number fields.",
    "tags": [
      "invoice",
      "tax"
    ]
  },
  "brazil-nfce-access-key-validator": {
    "title": "NFC-e Access Key Validator",
    "code": "NFC-e",
    "group": "tax",
    "summary": "Validate NFC-e access keys, explain consumer invoice key segments, and prepare upload-safe test keys for retail flows.",
    "tags": [
      "invoice",
      "retail"
    ]
  },
  "brazil-cte-access-key-validator": {
    "title": "CT-e Access Key Validator",
    "code": "CT-e",
    "group": "tax",
    "summary": "Inspect CT-e transport document keys, split access-key segments, replay check digits, and prepare logistics invoice fixtures.",
    "tags": [
      "invoice",
      "logistics"
    ]
  },
  "brazil-mdfe-access-key-validator": {
    "title": "MDF-e Access Key Validator",
    "code": "MDF-e",
    "group": "tax",
    "summary": "Validate MDF-e manifest access keys, classify document model fields, and prepare cargo-document diagnostics offline.",
    "tags": [
      "invoice",
      "logistics"
    ]
  },
  "brazil-nfe-xml-readiness-checker": {
    "title": "NF-e XML Readiness Checker",
    "code": "XML",
    "group": "tax",
    "summary": "Check NF-e XML payload readiness, spot common issuer, recipient, amount, and access-key fields before fiscal upload.",
    "tags": [
      "invoice",
      "xml"
    ]
  },
  "brazil-nfse-number-helper": {
    "title": "NFS-e Number Helper",
    "code": "NFS-e",
    "group": "tax",
    "summary": "Normalize NFS-e service invoice references, identify municipal context, and document what city portals must verify externally.",
    "tags": [
      "invoice",
      "municipal"
    ]
  },
  "brazil-sped-efd-icms-ipi-checker": {
    "title": "SPED EFD ICMS/IPI Checker",
    "code": "SPED",
    "group": "tax",
    "summary": "Inspect SPED EFD ICMS/IPI file headers and record-shaped lines, flag common separators, dates, CNPJ values, and fiscal periods.",
    "tags": [
      "tax",
      "file"
    ]
  },
  "brazil-sped-efd-contribuicoes-checker": {
    "title": "SPED EFD Contribuições Checker",
    "code": "EFD",
    "group": "tax",
    "summary": "Check EFD Contribuições payload shape, normalize period and establishment fields, and prepare safer tax-file diagnostics.",
    "tags": [
      "tax",
      "file"
    ]
  },
  "brazil-esocial-event-id-inspector": {
    "title": "eSocial Event ID Inspector",
    "code": "eSocial",
    "group": "tax",
    "summary": "Inspect eSocial event identifiers, normalize employer references, and separate offline syntax checks from government receipt status.",
    "tags": [
      "payroll",
      "government"
    ]
  },
  "brazil-reinf-event-id-inspector": {
    "title": "EFD-Reinf Event ID Inspector",
    "code": "Reinf",
    "group": "tax",
    "summary": "Inspect EFD-Reinf event ID shape, normalize reporting-period hints, and document official submission boundaries.",
    "tags": [
      "tax",
      "government"
    ]
  },
  "brazil-simples-nacional-das-helper": {
    "title": "Simples Nacional DAS Helper",
    "code": "DAS",
    "group": "tax",
    "summary": "Prepare Simples Nacional DAS references, normalize period and CNPJ inputs, and explain what browser-only checks cannot confirm.",
    "tags": [
      "tax",
      "business"
    ]
  },
  "brazil-darf-code-helper": {
    "title": "DARF Code Helper",
    "code": "DARF",
    "group": "tax",
    "summary": "Inspect DARF revenue-code shaped inputs, normalize dates and amounts, and prepare tax-payment payload notes for developers.",
    "tags": [
      "tax",
      "payment"
    ]
  },
  "brazil-gnre-guide-helper": {
    "title": "GNRE Guide Helper",
    "code": "GNRE",
    "group": "tax",
    "summary": "Normalize GNRE guide fields, identify UF, amount, taxpayer, and reference data needed before external state portal submission.",
    "tags": [
      "tax",
      "state"
    ]
  },
  "brazil-sat-cfe-key-inspector": {
    "title": "SAT CF-e Key Inspector",
    "code": "CF-e",
    "group": "tax",
    "summary": "Inspect SAT CF-e coupon keys, split fiscal document segments, and prepare retail diagnostics without contacting tax services.",
    "tags": [
      "invoice",
      "retail"
    ]
  },
  "brazil-pix-copy-paste-decoder": {
    "title": "Pix Copy-and-Paste Decoder",
    "code": "PIX",
    "group": "banking",
    "summary": "Decode Pix copy-and-paste BR Code text, inspect EMV fields, merchant data, CRC, amount, city, and transaction references locally.",
    "tags": [
      "payments",
      "pix"
    ]
  },
  "brazil-pix-qr-payload-generator": {
    "title": "Pix QR Payload Generator",
    "code": "QR",
    "group": "banking",
    "summary": "Build Pix QR payload test strings from key, recipient, amount, city, and transaction ID fields while staying fully browser-only.",
    "tags": [
      "payments",
      "pix",
      "qr"
    ]
  },
  "brazil-boleto-barcode-validator": {
    "title": "Boleto Barcode Validator",
    "code": "BOLETO",
    "group": "banking",
    "summary": "Validate boleto barcode shape, inspect bank code, currency, due-date factor, amount fields, and check digit boundaries.",
    "tags": [
      "payments",
      "banking"
    ]
  },
  "brazil-linha-digitavel-validator": {
    "title": "Linha Digitável Validator",
    "code": "LD",
    "group": "banking",
    "summary": "Validate boleto linha digitável fields, normalize punctuation, replay field-level check digits, and mask payment references.",
    "tags": [
      "payments",
      "banking"
    ]
  },
  "brazil-boleto-due-date-factor": {
    "title": "Boleto Due-Date Factor Helper",
    "code": "DUE",
    "group": "banking",
    "summary": "Convert boleto due-date factors to dates, inspect rollover-era assumptions, and prepare payment schedule test cases.",
    "tags": [
      "payments",
      "date"
    ]
  },
  "brazil-compe-bank-code-inspector": {
    "title": "COMPE Bank Code Inspector",
    "code": "COMPE",
    "group": "banking",
    "summary": "Inspect three-digit COMPE bank codes, normalize routing references, and prepare Brazilian bank-selection payloads for forms.",
    "tags": [
      "banking",
      "routing"
    ]
  },
  "brazil-ispb-code-inspector": {
    "title": "ISPB Code Inspector",
    "code": "ISPB",
    "group": "banking",
    "summary": "Inspect eight-digit ISPB participant codes, normalize payment-network references, and separate syntax from official participant status.",
    "tags": [
      "banking",
      "routing"
    ]
  },
  "brazil-agencia-conta-masker": {
    "title": "Agência / Conta Masker",
    "code": "AG",
    "group": "banking",
    "summary": "Normalize and mask Brazilian agency and account fields, preserve check digits, and produce log-safe banking snippets.",
    "tags": [
      "banking",
      "privacy"
    ]
  },
  "brazil-brl-centavos-converter": {
    "title": "BRL Centavos Converter",
    "code": "BRL",
    "group": "banking",
    "summary": "Parse Brazilian real amounts, normalize comma decimals, convert to integer centavos, and generate storage-safe payment fields.",
    "tags": [
      "currency",
      "payments"
    ]
  },
  "brazil-ted-doc-transfer-helper": {
    "title": "TED / DOC Transfer Helper",
    "code": "TED",
    "group": "banking",
    "summary": "Check Brazilian transfer payload fields for bank code, agency, account, CPF/CNPJ, amount, and recipient consistency before handoff.",
    "tags": [
      "banking",
      "payments"
    ]
  },
  "brazil-cnab240-file-inspector": {
    "title": "CNAB 240 File Inspector",
    "code": "240",
    "group": "banking",
    "summary": "Inspect CNAB 240 fixed-width records, count segments, flag line-length issues, and prepare bank-file diagnostics offline.",
    "tags": [
      "banking",
      "file"
    ]
  },
  "brazil-cnab400-file-inspector": {
    "title": "CNAB 400 File Inspector",
    "code": "400",
    "group": "banking",
    "summary": "Inspect CNAB 400 fixed-width remittance or return files, validate row lengths, and summarize record-type distribution locally.",
    "tags": [
      "banking",
      "file"
    ]
  },
  "brazil-open-finance-consent-helper": {
    "title": "Open Finance Consent Helper",
    "code": "OF",
    "group": "banking",
    "summary": "Prepare Brazilian Open Finance consent payload notes, validate CPF/CNPJ party fields, and document browser-only privacy boundaries.",
    "tags": [
      "banking",
      "api"
    ]
  },
  "brazil-cep-validator": {
    "title": "CEP Postal Code Validator",
    "code": "CEP",
    "group": "address",
    "summary": "Normalize Brazilian CEP postal codes, validate NNNNN-NNN display, batch-check address lists, and prepare delivery-safe fixtures.",
    "tags": [
      "postal",
      "address"
    ]
  },
  "brazil-address-formatter": {
    "title": "Brazil Address Formatter",
    "code": "ADDR",
    "group": "address",
    "summary": "Format Brazilian address blocks with street, number, complement, bairro, city, UF, CEP, and country fields for forms and labels.",
    "tags": [
      "address",
      "locale"
    ]
  },
  "brazil-uf-state-code-inspector": {
    "title": "UF State Code Inspector",
    "code": "UF",
    "group": "address",
    "summary": "Inspect Brazilian UF codes, normalize state abbreviations, and prepare state-aware payloads for tax, address, and logistics forms.",
    "tags": [
      "geo",
      "address"
    ]
  },
  "brazil-ddd-phone-validator": {
    "title": "DDD Phone Validator",
    "code": "DDD",
    "group": "address",
    "summary": "Validate Brazilian DDD area-code patterns, classify mobile and landline shapes, and prepare contact-field diagnostics.",
    "tags": [
      "phone",
      "address"
    ]
  },
  "brazil-phone-e164-formatter": {
    "title": "Brazil Phone E.164 Formatter",
    "code": "+55",
    "group": "address",
    "summary": "Normalize Brazilian phone numbers to +55 E.164-style display, preserve DDD, mask contact data, and generate safe fixtures.",
    "tags": [
      "phone",
      "contact"
    ]
  },
  "brazil-date-locale-formatter": {
    "title": "Brazil Date / Locale Formatter",
    "code": "DATE",
    "group": "address",
    "summary": "Parse ISO and Brazilian DD/MM/YYYY dates, render pt-BR locale display, and expose date fields for localized interfaces.",
    "tags": [
      "locale",
      "date"
    ]
  },
  "brazil-address-transliteration-normalizer": {
    "title": "Brazil Address Transliteration Normalizer",
    "code": "ASCII",
    "group": "address",
    "summary": "Normalize Portuguese address text, preserve accents where needed, and prepare ASCII-safe variants for legacy systems.",
    "tags": [
      "address",
      "localization"
    ]
  },
  "brazil-pii-masker": {
    "title": "Brazil PII Masker",
    "code": "PII",
    "group": "developer",
    "summary": "Detect Brazilian CPF, CNPJ, CEP, phone, boleto, Pix-like, and email patterns in text and produce privacy-safe masked output.",
    "tags": [
      "privacy",
      "data-quality"
    ]
  },
  "brazil-test-data-generator": {
    "title": "Brazil Test Data Generator",
    "code": "TEST",
    "group": "developer",
    "summary": "Generate fictional Brazilian identity, company, address, phone, payment, and invoice fixtures for local development and QA.",
    "tags": [
      "fixtures",
      "developer"
    ]
  },
  "brazil-data-quality-workbench": {
    "title": "Brazil Data Quality Workbench",
    "code": "DQ",
    "group": "developer",
    "summary": "Audit Brazilian records across CPF, CNPJ, CEP, phone, Pix, boleto, tax, banking, and locale fields for completeness and safety.",
    "tags": [
      "data-quality",
      "developer"
    ]
  },
  "brazil-lgpd-redaction-helper": {
    "title": "LGPD Redaction Helper",
    "code": "LGPD",
    "group": "developer",
    "summary": "Redact Brazilian personal and financial data in logs, classify sensitive patterns, and document LGPD-safe debugging boundaries.",
    "tags": [
      "privacy",
      "lgpd"
    ]
  },
  "brazil-company-onboarding-auditor": {
    "title": "Brazil Company Onboarding Auditor",
    "code": "KYC",
    "group": "developer",
    "summary": "Audit onboarding fields for CNPJ, CNAE, IE, IM, address, fiscal document, banking, Pix, and contact readiness.",
    "tags": [
      "business",
      "onboarding"
    ]
  },
  "brazil-payment-reconciliation-helper": {
    "title": "Brazil Payment Reconciliation Helper",
    "code": "RECON",
    "group": "developer",
    "summary": "Compare amount, payer, recipient, Pix, boleto, bank-account, and invoice references to flag reconciliation mismatches locally.",
    "tags": [
      "payments",
      "reconciliation"
    ]
  },
  "brazil-bank-statement-parser": {
    "title": "Brazil Bank Statement Parser",
    "code": "STMT",
    "group": "developer",
    "summary": "Parse Brazilian bank-statement-like rows, normalize BRL amounts and dates, and prepare reconciliation-friendly transaction data.",
    "tags": [
      "banking",
      "data"
    ]
  },
  "brazil-ocr-postprocessing-fixer": {
    "title": "Brazil OCR Post-Processing Fixer",
    "code": "OCR",
    "group": "developer",
    "summary": "Clean OCR output from Brazilian documents, restore common separators, detect CPF/CNPJ/CEP candidates, and flag risky artifacts.",
    "tags": [
      "ocr",
      "developer"
    ]
  },
  "brazil-compliance-checklist-generator": {
    "title": "Brazil Compliance Checklist Generator",
    "code": "CHECK",
    "group": "developer",
    "summary": "Generate implementation checklists for Brazilian identifiers, fiscal documents, payments, privacy masking, and official lookup boundaries.",
    "tags": [
      "compliance",
      "developer"
    ]
  },
  "brazil-form-fixture-generator": {
    "title": "Brazil Form Fixture Generator",
    "code": "FORM",
    "group": "developer",
    "summary": "Generate fictional Brazilian form payloads for identity, company, address, payment, invoice, and locale UI testing.",
    "tags": [
      "fixtures",
      "forms"
    ]
  }
};
  const SAMPLE_VALUES={cpf:'52998224725',cnpj:'11222333000181',cep:'01310-100',phone:'+55 11 91234-5678',nfe:'35240111222333000181550010000000011000000010',boleto:'34191790010104351004791020150008291070026000',plate:'BRA2E19',money:'R$ 1.234,56',text:'CPF 529.982.247-25\nCNPJ 11.222.333/0001-81\nCEP 01310-100'};
  function slug(){return location.pathname.split('/').filter(Boolean).pop()||'';}
  function cfg(){return TOOLS[slug()]||{title:'Brazil Workbench',code:'BR',group:'developer',summary:'Browser-only Brazilian data workbench.',tags:[]};}
  function onlyDigits(v){return String(v||'').replace(/\D/g,'');}
  function mask(v){const s=String(v||''); if(s.length<5)return '***'; return s.slice(0,Math.min(3,s.length-2))+s.slice(3,-2).replace(/[A-Za-z0-9]/g,'*')+s.slice(-2);}
  function cpfCheck(d){if(!/^\d{11}$/.test(d)||/^(\d)\1+$/.test(d))return false; const calc=n=>{let sum=0;for(let i=0;i<n-1;i++)sum+=Number(d[i])*(n-i);let r=(sum*10)%11;return r===10?0:r};return calc(10)===Number(d[9])&&calc(11)===Number(d[10]);}
  function cnpjCheck(d){if(!/^\d{14}$/.test(d)||/^(\d)\1+$/.test(d))return false; const calc=w=>{let sum=0;for(let i=0;i<w.length;i++)sum+=Number(d[i])*w[i];let r=sum%11;return r<2?0:11-r};return calc([5,4,3,2,9,8,7,6,5,4,3,2])===Number(d[12])&&calc([6,5,4,3,2,9,8,7,6,5,4,3,2])===Number(d[13]);}
  function mod11AccessKey(d){if(!/^\d{44}$/.test(d))return false; const body=d.slice(0,43); let weight=2,sum=0; for(let i=body.length-1;i>=0;i--){sum+=Number(body[i])*weight; weight=weight===9?2:weight+1;} const r=sum%11; const dv=r===0||r===1?0:11-r; return dv===Number(d[43]);}
  function formatCpf(d){return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,'$1.$2.$3-$4');}
  function formatCnpj(d){return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,'$1.$2.$3/$4-$5');}
  function generateDigits(len){let out='';for(let i=0;i<len;i++)out+=Math.floor(Math.random()*10);return out;}
  function genCpf(){let base=generateDigits(9); for(let n of [10,11]){let s=0;for(let i=0;i<n-1;i++)s+=Number((base)[i])*(n-i);let r=(s*10)%11;base+=String(r===10?0:r);}return formatCpf(base);}
  function genCnpj(){let base='11222333'+String(Math.floor(1+Math.random()*8999)).padStart(4,'0'); const calc=(digits,w)=>{let s=0;for(let i=0;i<w.length;i++)s+=Number(digits[i])*w[i];let r=s%11;return r<2?0:11-r}; base+=calc(base,[5,4,3,2,9,8,7,6,5,4,3,2]); base+=calc(base,[6,5,4,3,2,9,8,7,6,5,4,3,2]); return formatCnpj(base);}
  function genCep(){return String(Math.floor(10000+Math.random()*89999))+'-'+String(Math.floor(100+Math.random()*899));}
  function groupMeta(tool){
    const c=TOOLS[tool]||cfg();
    const map={
      identity:{label:'Identity and registry',accent:'#7c3aed',icon:'ID',boundary:'Official person, company, vehicle, or registry existence requires the responsible Brazilian public system.'},
      tax:{label:'Tax and fiscal compliance',accent:'#dc2626',icon:'NF',boundary:'Fiscal authorization, taxpayer status, and document acceptance require Receita Federal, SEFAZ, municipal, or official fiscal services.'},
      banking:{label:'Banking and payments',accent:'#16a34a',icon:'R$',boundary:'Bank ownership, payment authorization, expiry, clearing, and settlement are not checked offline.'},
      address:{label:'Address and locale',accent:'#2563eb',icon:'BR',boundary:'Address deliverability, CEP existence, carrier routing, and phone ownership require official or telecom data sources.'},
      developer:{label:'Developer operations',accent:'#0891b2',icon:'DEV',boundary:'Browser-only diagnostics cannot confirm live production records, legal status, or third-party acceptance.'}
    };
    return map[c.group]||map.developer;
  }
  function chunkDigits(value,sizes,labels){
    const text=String(value||''); let index=0;
    return sizes.map((size,i)=>{const part=text.slice(index,index+size); const token={label:labels[i]||('Part '+(i+1)),value:part||'-',start:index+1,end:index+Math.max(part.length,1)}; index+=size; return token;}).filter(x=>x.value&&x.value!=='-');
  }
  function compactWords(text){return String(text||'').split(/\s+/).filter(Boolean).slice(0,8).map((w,i)=>({label:'Token '+(i+1),value:w,start:i+1,end:i+1}));}
  function buildBreakdown(tool, r, digits){
    const normalized=String(r.normalized||r.generated||r.raw||'');
    if(/cpf/.test(tool)||r.kind==='CPF') return {title:'CPF field breakdown',note:'CPF is split into three body blocks and two verifier digits. Browser checks cover shape and checksum math only.',tokens:chunkDigits(digits,[3,3,3,2],['Region block','Registry block','Sequence','Verifier digits'])};
    if(/cnpj/.test(tool)||r.kind==='CNPJ') return {title:'CNPJ field breakdown',note:'CNPJ is split into root, establishment order, branch sequence, and two verifier digits.',tokens:chunkDigits(digits,[2,3,3,4,2],['Root prefix','Company root','Root suffix','Branch order','Verifier digits'])};
    if(/nfe|nfce|cte|mdfe|sat|fiscal/.test(tool)||/access key/i.test(r.kind)) return {title:'Fiscal access-key breakdown',note:'Brazilian fiscal access keys encode UF, date, issuer CNPJ, document model, series, number, emission mode, numeric code, and verifier digit.',tokens:chunkDigits(digits,[2,4,14,2,3,9,1,8,1],['UF code','AAMM','Issuer CNPJ','Model','Series','Number','Emission','Numeric code','DV'])};
    if(/boleto|linha/.test(tool)||/boleto/i.test(r.kind)) return {title:'Boleto / linha digitavel breakdown',note:'Linha digitavel data is grouped for payment-bank routing and checksum review; bank acceptance still requires live systems.',tokens:chunkDigits(digits,[5,10,10,1,14],['Bank/currency','Field 1','Field 2','General DV','Due/amount field'])};
    if(/cep|postal/.test(tool)||r.kind==='CEP') return {title:'CEP breakdown',note:'CEP display uses five digits, a hyphen, and three final digits. Existence and address mapping require an external source.',tokens:chunkDigits(digits,[5,3],['Locality block','Delivery block'])};
    if(/phone|ddd|mobile/.test(tool)||/phone|DDD/i.test(r.kind)) return {title:'Phone and DDD breakdown',note:'Brazilian phone diagnostics separate country code, area code, subscriber number, and mobile-length expectations.',tokens:chunkDigits(digits,[2,2,5,4],['Country','DDD','Prefix','Line'])};
    if(/plate|renavam|vehicle/.test(tool)||/plate|vehicle/i.test(r.kind)) return {title:'Vehicle identifier breakdown',note:'Vehicle identifiers are normalized for display and fixture testing; DETRAN ownership and status are never checked locally.',tokens:compactWords(normalized.replace(/(.{1})/g,'$1 ').trim()).slice(0,8)};
    if(/brl|money|amount|currency|centavo|tax/.test(tool)||/BRL/i.test(r.kind)) return {title:'BRL amount breakdown',note:'Amounts are normalized for Brazilian money workflows, centavo payloads, and localized display checks.',tokens:[{label:'Raw amount',value:r.raw||'-',start:1,end:1},{label:'Normalized',value:r.normalized||'-',start:1,end:1},{label:'Currency',value:'BRL / R$',start:1,end:1}]};
    if(digits) return {title:'Identifier breakdown',note:'Position-by-position normalized value, with problem characters highlighted when a check fails.',tokens:String(digits).slice(0,32).split('').map((d,i)=>({label:'Position '+(i+1),value:d,start:i+1,end:i+1}))};
    return {title:'Payload breakdown',note:'The workbench normalizes the browser input and surfaces copied payload fragments for local review.',tokens:compactWords(normalized)};
  }
  function decorateResult(r, tool, digits){
    const c=TOOLS[tool]||cfg(); const meta=groupMeta(tool); const passed=r.checks.filter(x=>x[1]).length; const total=Math.max(r.checks.length,1);
    r.title=c.title; r.code=c.code; r.group=c.group; r.tags=c.tags||[]; r.meta=meta; r.progress=Math.round((passed/total)*100);
    r.pipeline=r.checks.map((x,i)=>({name:x[0],pass:!!x[1],detail:x[2]||(x[1]?'Local browser check passed.':'Needs correction or official-system confirmation.'),index:i+1}));
    r.breakdown=buildBreakdown(tool,r,digits);
    r.localCards=[['Tool',c.title],['Kind',r.kind],['Normalized',r.normalized||r.generated||'-'],['Masked',mask(r.normalized||r.generated||digits||r.raw||'')],['Offline scope',meta.label],['Boundary',meta.boundary]];
    r.qualityNotes=[
      ['Privacy boundary','Input is analyzed locally in this browser and is not uploaded by ValidoHub.'],
      ['Official lookup boundary',meta.boundary],
      ['Fixture safety',r.generated?'Generated values are fictional browser fixtures for tests and demos.':'Samples and normalized values are for testing; never treat them as proof of live status.'],
      ['Developer handling','Copy normalized values for forms, use masked values for logs, and keep raw personal or payment data out of telemetry.']
    ];
    r.integrationHints=[
      'Normalize punctuation and whitespace before validation.',
      'Store raw input only when your compliance policy explicitly allows it.',
      'Use masked values in screenshots, logs, bug reports, and analytics.',
      'Call official Brazilian systems only for live status, ownership, authorization, or legal existence.'
    ];
    r.json={kind:r.kind,tool:c.title,code:c.code,group:c.group,valid:r.valid,raw:r.raw,normalized:r.normalized,generated:r.generated,fields:r.fields,checks:r.checks.map(x=>({name:x[0],pass:!!x[1],detail:x[2]||''})),breakdown:r.breakdown,offlineOnly:true,boundary:meta.boundary};
    return r;
  }
  function analyze(value, tool){const raw=String(value||'').trim();const digits=onlyDigits(raw);const checks=[];const fields=[];let valid=false, normalized=raw, kind='Brazilian data', generated='';
    if(/cpf/.test(tool)||tool==='brazil-cpf-validator'){const n=digits||onlyDigits(genCpf()); normalized=formatCpf(n); generated=digits?'':normalized; kind='CPF'; checks.push(['Input present',!!n,'CPF must contain 11 digits.'],['11 digits',n.length===11,'CPF uses exactly eleven digits.'],['Checksum',n.length===11&&cpfCheck(n),'Two verifier digits are replayed locally.']); valid=n.length===11&&cpfCheck(n); fields.push(['CPF',normalized],['Masked',mask(n)],['Verifier digits',n.slice(-2)||'-'],['Boundary','Receita Federal status not checked.']);}
    else if(/cnpj/.test(tool)){const n=digits||onlyDigits(genCnpj()); normalized=formatCnpj(n); generated=digits?'':normalized; kind='CNPJ'; checks.push(['Input present',!!n,'CNPJ must contain 14 digits.'],['14 digits',n.length===14,'CNPJ uses exactly fourteen digits.'],['Checksum',n.length===14&&cnpjCheck(n),'Two verifier digits are replayed locally.']); valid=n.length===14&&cnpjCheck(n); fields.push(['CNPJ',normalized],['Masked',mask(n)],['Root',n.slice(0,8)||'-'],['Boundary','Company status not checked.']);}
    else if(/nfe|nfce|cte|mdfe|sat|fiscal/.test(tool)){const n=digits||SAMPLE_VALUES.nfe; normalized=n; kind='Fiscal access key'; checks.push(['44 digits',n.length===44,'Brazilian fiscal document access keys are 44 digits.'],['MOD-11 verifier',n.length===44&&mod11AccessKey(n),'Final digit is calculated with weighted MOD-11.']); valid=n.length===44&&mod11AccessKey(n); fields.push(['Access key',n],['UF code',n.slice(0,2)||'-'],['Issuer CNPJ',formatCnpj(n.slice(6,20))],['Boundary','Authorization not checked.']);}
    else if(/cep|postal/.test(tool)){const n=digits||onlyDigits(genCep()); normalized=n.length>=8?n.slice(0,5)+'-'+n.slice(5,8):n; generated=digits?'':normalized; kind='CEP'; checks.push(['8 digits',n.length===8,'CEP uses eight digits.'],['Postal mask',/^\d{5}-\d{3}$/.test(normalized),'Display mask is NNNNN-NNN.']); valid=n.length===8; fields.push(['CEP',normalized],['Masked',mask(n)],['UF lookup','Requires external source'],['Boundary','Address existence not checked.']);}
    else if(/phone|ddd|mobile/.test(tool)){const n=digits||onlyDigits(SAMPLE_VALUES.phone); normalized=n.replace(/^(55)?(\d{2})(\d{5})(\d{4})$/,'+$1 ($2) $3-$4').replace(/^\+ \(/,'+55 ('); generated=digits?'':SAMPLE_VALUES.phone; kind='Brazilian phone / DDD'; checks.push(['Digits',n.length>=10&&n.length<=13,'Brazilian phone numbers usually carry DDD plus subscriber digits.'],['DDD present',n.length>=10,'Area code is expected for national use.']); valid=n.length>=10&&n.length<=13; fields.push(['Phone',normalized],['DDD',n.slice(n.startsWith('55')?2:0,n.startsWith('55')?4:2)||'-'],['Masked',mask(n)],['Boundary','Line ownership not checked.']);}
    else if(/boleto|linha/.test(tool)){const n=digits||SAMPLE_VALUES.boleto; normalized=n; generated=digits?'':SAMPLE_VALUES.boleto; kind='Boleto / linha digitavel'; checks.push(['Numeric payload',/^\d+$/.test(n),'Linha digitavel should normalize to digits.'],['Length family',[44,47,48].includes(n.length),'Most boleto payloads are 44, 47, or 48 digits.']); valid=/^\d+$/.test(n)&&[44,47,48].includes(n.length); fields.push(['Digits',n.length],['Masked',mask(n)],['Type',n.length===44?'barcode':'linha digitavel'],['Boundary','Payment status not checked.']);}
    else if(/brl|money|amount|currency|centavo|tax/.test(tool)){const text=raw||SAMPLE_VALUES.money; const clean=text.replace(/[^0-9,.-]/g,'').replace(',','.'); const amount=Number(clean); normalized=Number.isFinite(amount)?amount.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}):text; generated=raw?'':SAMPLE_VALUES.money; kind='BRL amount'; checks.push(['Amount parsed',Number.isFinite(amount),'Accepts common Brazilian comma-decimal money input.'],['Localized display',/^R\$/.test(normalized),'Formats as Brazilian Real.']); valid=Number.isFinite(amount); fields.push(['Amount',normalized],['Centavos',Number.isFinite(amount)?Math.round(amount*100):'-'],['Locale','pt-BR'],['Boundary','No payment executed.']);}
    else if(/plate|renavam|vehicle/.test(tool)){const text=(raw||SAMPLE_VALUES.plate).toUpperCase().replace(/[^A-Z0-9]/g,''); normalized=text; generated=raw?'':SAMPLE_VALUES.plate; kind='Vehicle identifier'; checks.push(['Input present',!!text,'Vehicle identifiers require an input value.'],['Safe characters',/^[A-Z0-9]+$/.test(text),'Only letters and digits remain after normalization.']); valid=!!text&&/^[A-Z0-9]+$/.test(text); fields.push(['Normalized',text],['Masked',mask(text)],['Category','vehicle'],['Boundary','DETRAN status not checked.']);}
    else {const text=raw||sampleFor(tool); normalized=text; generated=raw?'':text; kind=(TOOLS[tool]||cfg()).title; checks.push(['Input present',!!text,'The browser received data for local analysis.'],['Browser normalization',true,'Whitespace and display punctuation can be normalized locally.']); valid=!!text; fields.push(['Tool',kind],['Kind',(TOOLS[tool]||cfg()).code],['Input chars',text.length],['Diagnostics',0]);}
    return decorateResult({tool,kind,valid,raw,normalized,generated,checks,fields,diagnostics:checks.filter(x=>!x[1]).map(x=>x[0]+' failed')},tool,digits);
  }
  function sampleFor(tool){if(/cpf/.test(tool))return SAMPLE_VALUES.cpf;if(/cnpj/.test(tool))return SAMPLE_VALUES.cnpj;if(/cep/.test(tool))return SAMPLE_VALUES.cep;if(/phone|ddd/.test(tool))return SAMPLE_VALUES.phone;if(/nfe|nfce|cte|mdfe/.test(tool))return SAMPLE_VALUES.nfe;if(/boleto|linha/.test(tool))return SAMPLE_VALUES.boleto;if(/plate|renavam/.test(tool))return SAMPLE_VALUES.plate;if(/money|brl|centavos/.test(tool))return SAMPLE_VALUES.money;return SAMPLE_VALUES.text;}
  function escape(v){return window.ValidoWorkbench.utilities.escapeHtml(String(v??''));}
  function panel(r){
    const meta=r.meta||groupMeta(r.tool); const pct=Math.max(8,Math.min(100,r.progress||0));
    const steps=(r.pipeline||[]).map(c=>'<article class="br-step '+(c.pass?'pass':'fail')+'"><div><strong>'+escape(c.name)+'</strong><span>'+(c.pass?'PASS':'CHECK')+'</span></div><p>'+escape(c.detail)+'</p></article>').join('');
    const fields=(r.localCards||r.fields||[]).map(f=>'<div><span>'+escape(f[0])+'</span><strong>'+escape(f[1])+'</strong></div>').join('');
    const tokens=((r.breakdown&&r.breakdown.tokens)||[]).map((t,i)=>'<span class="br-token" style="--i:'+i+'"><strong>'+escape(t.value)+'</strong><small>'+escape(t.label)+'</small></span>').join('');
    const breakdownCards=((r.breakdown&&r.breakdown.tokens)||[]).slice(0,8).map(t=>'<div><span>'+escape(t.label)+'</span><strong>'+escape(t.value)+'</strong><small>position '+escape(t.start)+'-'+escape(t.end)+'</small></div>').join('');
    const notes=(r.qualityNotes||[]).map(n=>'<article><strong>'+escape(n[0])+'</strong><p>'+escape(n[1])+'</p></article>').join('');
    const hints=(r.integrationHints||[]).map(h=>'<li>'+escape(h)+'</li>').join('');
    const trace=(r.pipeline||[]).map(c=>'<li><span class="'+(c.pass?'ok':'warn')+'">'+(c.pass?'✓':'!')+'</span><strong>'+escape(c.name)+'</strong><em>'+escape(c.detail)+'</em></li>').join('');
    return '<div class="br-panel" style="--br-accent:'+escape(meta.accent)+'">'
      +'<section class="br-pipeline"><div class="br-section-title"><span>'+escape(r.code||meta.icon)+'</span><div><h3>Validation pipeline</h3><p>'+escape(meta.label)+' checks completed in this browser.</p></div></div><div class="br-progress-track"><i style="width:'+pct+'%"></i></div><div class="br-pipeline-grid">'+steps+'</div></section>'
      +'<section class="br-result '+(r.valid?'ok':'warn')+'"><div class="br-result-head"><span>'+(r.valid?'✓':'!')+'</span><div><h3>'+(r.valid?escape(r.title)+' passed offline checks.':'Review browser-only diagnostics.')+'</h3><p>'+escape(meta.boundary)+'</p></div></div><div class="br-result-grid">'+fields+'</div></section>'
      +'<section class="br-breakdown"><div class="br-section-title"><span>▥</span><div><h3>'+escape(r.breakdown.title)+'</h3><p>'+escape(r.breakdown.note)+'</p></div></div><div class="br-token-strip">'+tokens+'</div><div class="br-breakdown-grid">'+breakdownCards+'</div></section>'
      +'<section class="br-quality"><div class="br-section-title"><span>◇</span><div><h3>Quality notes</h3><p>What this tool proves locally and what must stay outside the browser.</p></div></div><div class="br-quality-grid">'+notes+'</div></section>'
      +'<details class="br-advanced" open><summary>Advanced analysis</summary><div class="br-advanced-grid"><details class="br-subdetail" open><summary>Developer snapshot JSON</summary><pre>'+escape(JSON.stringify(r.json,null,2))+'</pre></details><details class="br-subdetail" open><summary>Validation trace</summary><ul class="br-trace">'+trace+'</ul></details><details class="br-subdetail"><summary>Integration hints</summary><ul class="br-hints">'+hints+'</ul></details></div></details>'
      +'</div>';
  }
  function onMount(w){injectStyles(); const c=cfg(); w.form.classList.add('brazil-suite-workbench'); const input=w.primaryInput(); if(input){input.placeholder='Paste '+c.title+' input, batch rows, or a Brazilian payload...';} const row=document.createElement('div'); row.className='br-tool-head'; row.innerHTML='<div class="br-tool-identity"><span>'+escape(c.code)+'</span><strong>'+escape(c.title)+'</strong><small>'+escape(c.summary)+'</small></div><div class="br-tool-actions"><select class="br-preset"><option value="">Samples and fixtures</option><option value="sample">Representative sample</option><option value="cpf">CPF</option><option value="cnpj">CNPJ</option><option value="cep">CEP</option><option value="boleto">Boleto</option><option value="nfe">NF-e key</option><option value="money">BRL amount</option></select><div class="br-sample-chips"><button type="button" data-br-sample="cpf">CPF</button><button type="button" data-br-sample="cnpj">CNPJ</button><button type="button" data-br-sample="cep">CEP</button><button type="button" data-br-sample="boleto">Boleto</button></div></div>'; w.form.insertBefore(row,w.form.firstChild); row.querySelector('select').addEventListener('change',e=>{if(e.target.value)applySample(w,e.target.value);}); row.addEventListener('click',e=>{const chip=e.target.closest('[data-br-sample]'); if(chip) applySample(w,chip.dataset.brSample);}); }
  function run(w,action){const tool=slug(); const input=w.primaryInput(); let value=input?input.value:''; if(action==='generate'){value=sampleFor(tool); if(input)input.value=value;} const r=analyze(value,tool); w.lastResult={filename:'brazil-suite-'+tool+'.json',mime:'application/json',content:JSON.stringify(r.json,null,2)}; w.setOutput(action==='explain'?JSON.stringify(r.json,null,2):(action==='generate'?r.generated:r.normalized)); w.setMessage(r.valid?'Browser-only checks passed.':'Review diagnostics and official lookup boundaries.',r.valid?'success':'error'); w.setStats([['Tool',cfg().title],['Kind',r.kind],['Input chars',String(r.raw.length)],['Diagnostics',String(r.diagnostics.length)]],r.diagnostics,r.valid?'success':'error'); w.setAdvanced(panel(r)); remember(value); }
  function applySample(w,name){const input=w.primaryInput(); if(!input)return; input.value=SAMPLE_VALUES[name]||sampleFor(slug()); w.markActiveAction(name==='sample'?'validate':'validate'); w.run('validate'); }
  function detectInputMode(v){const d=onlyDigits(v); if(!v)return{label:'Waiting for Brazilian data',state:''}; if(cpfCheck(d))return{label:'Looks like valid CPF',state:'valid'}; if(cnpjCheck(d))return{label:'Looks like valid CNPJ',state:'valid'}; if(/^\d{5}-?\d{3}$/.test(v))return{label:'Looks like CEP',state:'valid'}; if([44,47,48].includes(d.length))return{label:'Looks like fiscal/payment code',state:'base64'}; return{label:'Brazil data detected',state:'text'};}
  function remember(v){if(!v)return;try{const arr=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').filter(x=>x!==v);arr.unshift(v);localStorage.setItem(STORAGE_KEY,JSON.stringify(arr.slice(0,8)));}catch(e){}}
  function injectStyles(){if(document.getElementById('brazil-suite-styles'))return; const s=document.createElement('style'); s.id='brazil-suite-styles'; s.textContent='.brazil-suite-workbench{--br-green:#15803d;--br-blue:#1d4ed8;--br-gold:#ca8a04;--br-soft:#f0fdf4;--br-accent:#16a34a}.br-tool-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,390px);justify-content:space-between;gap:18px;align-items:stretch;border:1px solid rgba(21,128,61,.22);border-radius:16px;padding:18px;margin-bottom:20px;background:radial-gradient(circle at 88% 15%,rgba(250,204,21,.24),transparent 28%),linear-gradient(120deg,#ecfdf5 0%,#fff 46%,#eff6ff 72%,rgba(250,204,21,.12) 100%);box-shadow:0 18px 42px rgba(15,23,42,.06);position:relative;overflow:hidden}.br-tool-head:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#16a34a,#facc15,#2563eb)}.br-tool-identity,.br-tool-actions{position:relative;z-index:1}.br-tool-actions{display:grid;gap:10px;align-content:start}.br-tool-head span,.br-section-title>span{display:inline-grid;place-items:center;border:1px solid rgba(21,128,61,.22);border-radius:10px;background:#ecfdf5;color:#166534;font-weight:900;letter-spacing:.08em;padding:8px 10px}.br-tool-head strong{display:block;font-size:1.05rem}.br-tool-head small{display:block;color:var(--muted);max-width:760px;margin-top:4px}.br-preset{border:1px solid var(--line);border-radius:10px;padding:10px;background:#fff;color:var(--text);font-weight:800}.br-sample-chips{display:flex;flex-wrap:wrap;gap:8px}.br-sample-chips button{border:1px solid rgba(21,128,61,.24);border-radius:999px;background:#fff;color:#166534;font-weight:850;font-size:.74rem;padding:7px 10px;cursor:pointer}.br-sample-chips button:hover{background:#ecfdf5;transform:translateY(-1px)}.br-panel{display:flex;flex-direction:column;gap:18px;margin-top:18px}.br-pipeline,.br-result,.br-breakdown,.br-quality,.br-advanced{border:1px solid var(--line);border-radius:16px;background:#fff;padding:18px;box-shadow:0 14px 34px rgba(15,23,42,.04);overflow:hidden}.br-section-title,.br-result-head{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px}.br-section-title h3,.br-result h3{font-size:.9rem;text-transform:uppercase;letter-spacing:.07em;margin:0}.br-section-title p,.br-result-head p{margin:4px 0 0;color:var(--muted);font-size:.86rem;line-height:1.45}.br-progress-track{height:5px;border-radius:999px;background:#eef2f7;margin:12px 0 18px;overflow:hidden}.br-progress-track i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#dc2626,#facc15,#16a34a,#2563eb);box-shadow:0 0 18px rgba(22,163,74,.24)}.br-pipeline-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}.br-step{border:1px solid var(--line);border-radius:12px;padding:14px;background:var(--surface-soft);min-width:0}.br-step>div{display:flex;justify-content:space-between;gap:10px}.br-step strong,.br-result-grid strong,.br-breakdown-grid strong{overflow-wrap:anywhere;word-break:break-word}.br-result-grid strong,.br-breakdown-grid strong{font-size:.88rem;line-height:1.34;font-weight:850}.br-step span{font-size:.68rem;font-weight:900;border-radius:8px;padding:4px 8px}.br-step.pass{border-color:rgba(22,163,74,.24);background:linear-gradient(135deg,rgba(22,163,74,.07),#fff)}.br-step.pass span{color:var(--br-green);background:rgba(22,163,74,.1)}.br-step.fail{border-color:rgba(202,138,4,.28);background:linear-gradient(135deg,rgba(202,138,4,.07),#fff)}.br-step.fail span{color:#a16207;background:rgba(202,138,4,.1)}.br-step p{margin:10px 0 0;color:var(--muted);font-size:.84rem;line-height:1.45}.br-result{background:linear-gradient(135deg,rgba(22,163,74,.06),#fff);border-color:rgba(22,163,74,.25)}.br-result.warn{background:linear-gradient(135deg,rgba(202,138,4,.06),#fff);border-color:rgba(202,138,4,.3)}.br-result-head>span{display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:50%;background:rgba(22,163,74,.12);color:#16a34a;font-weight:950}.br-result.warn .br-result-head>span{background:rgba(202,138,4,.12);color:#a16207}.br-result-grid,.br-breakdown-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.br-result-grid>div,.br-breakdown-grid>div{border:1px solid var(--line);border-radius:12px;padding:12px 14px;background:#fff;min-width:0}.br-result-grid span,.br-breakdown-grid span{display:block;color:var(--muted);font-size:.62rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;margin-bottom:7px}.br-breakdown-grid small{display:block;margin-top:8px;color:var(--muted);font-size:.75rem}.br-breakdown{background:linear-gradient(135deg,#fff,rgba(37,99,235,.035))}.br-token-strip{display:flex;justify-content:center;align-items:stretch;gap:8px;flex-wrap:wrap;margin:18px 0}.br-token{display:grid;gap:4px;place-items:center;min-width:58px;max-width:180px;border:1px solid color-mix(in srgb,var(--br-accent) 28%,#dbe3ee);border-radius:12px;padding:10px 12px;background:linear-gradient(180deg,#fff,color-mix(in srgb,var(--br-accent) 6%,#fff));box-shadow:0 10px 26px rgba(15,23,42,.035)}.br-token strong{font-size:1.08rem;color:var(--br-accent);overflow-wrap:anywhere;text-align:center}.br-token small{font-size:.66rem;color:var(--muted);font-weight:800;text-transform:uppercase;letter-spacing:.04em;text-align:center}.br-quality{background:linear-gradient(135deg,#fff,rgba(250,204,21,.05))}.br-quality-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px}.br-quality article{border:1px solid var(--line);border-radius:12px;padding:14px;background:#fff}.br-quality article strong{display:block;margin-bottom:6px}.br-quality article p{margin:0;color:var(--muted);font-size:.86rem;line-height:1.5}.br-advanced summary{cursor:pointer;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.br-advanced-grid{display:grid;gap:12px;margin-top:14px}.br-subdetail{border:1px solid var(--line);border-radius:12px;background:#fff;overflow:hidden}.br-subdetail summary{padding:14px 16px;background:var(--surface-soft);font-size:.82rem}.br-subdetail pre{margin:0;overflow:auto;border-radius:0;background:#0f172a;color:#dbeafe;padding:14px;font-size:.78rem;max-height:420px}.br-trace,.br-hints{list-style:none;margin:0;padding:12px 16px;display:grid;gap:10px}.br-trace li{display:grid;grid-template-columns:auto minmax(140px,.35fr) 1fr;gap:10px;align-items:start}.br-trace span{font-weight:950}.br-trace span.ok{color:#16a34a}.br-trace span.warn{color:#a16207}.br-trace em,.br-hints li{color:var(--muted);font-style:normal;line-height:1.45}.br-hints li:before{content:"✓";color:#16a34a;font-weight:900;margin-right:8px}@media(max-width:800px){.br-tool-head{grid-template-columns:1fr}.br-result-grid,.br-breakdown-grid,.br-quality-grid{grid-template-columns:1fr}.br-preset{width:100%}.br-trace li{grid-template-columns:1fr}.br-token-strip{justify-content:flex-start}}'; document.head.appendChild(s);}

  const Plugin={filePrefix:'brazil-suite',onMount,run,applySample,detectInputMode};
  if(window.ValidoWorkbench)window.ValidoWorkbench.registerPlugin(ALGORITHM_ID,Plugin);
})();
