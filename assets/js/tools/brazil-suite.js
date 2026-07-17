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
  function analyze(value, tool){const raw=String(value||'').trim();const digits=onlyDigits(raw);const checks=[];const fields=[];let valid=false, normalized=raw, kind='Brazilian data', generated='';
    if(/cpf/.test(tool)||tool==='brazil-cpf-validator'){kind='CPF';valid=cpfCheck(digits);normalized=digits.length===11?formatCpf(digits):digits;generated=genCpf();checks.push(['Input present',!!raw],['11 digits',digits.length===11],['Not repeated digits',!/^(\d)\1+$/.test(digits)],['CPF checksum',valid]);fields.push(['Normalized CPF',normalized],['Masked',mask(normalized)],['Digits',String(digits.length)],['Offline scope','Format + checksum']);}
    else if(/cnpj/.test(tool)){kind='CNPJ';valid=cnpjCheck(digits);normalized=digits.length===14?formatCnpj(digits):digits;generated=genCnpj();checks.push(['Input present',!!raw],['14 digits',digits.length===14],['Not repeated digits',!/^(\d)\1+$/.test(digits)],['CNPJ checksum',valid]);fields.push(['Normalized CNPJ',normalized],['Masked',mask(normalized)],['Branch',digits.slice(8,12)||'—'],['Offline scope','Format + checksum']);}
    else if(/nfe|nfce|cte|mdfe|sat-cfe/.test(tool)){kind='Fiscal access key';valid=mod11AccessKey(digits);normalized=digits;generated=SAMPLE_VALUES.nfe;checks.push(['44 digits',digits.length===44],['Mod-11 check digit',valid],['Numeric only',/^\d+$/.test(digits)]);fields.push(['UF code',digits.slice(0,2)||'—'],['Year/month',digits.slice(2,6)||'—'],['Issuer CNPJ',digits.slice(6,20)||'—'],['Model',digits.slice(20,22)||'—']);}
    else if(/cep/.test(tool)){kind='CEP';valid=/^\d{8}$/.test(digits);normalized=digits.length===8?digits.slice(0,5)+'-'+digits.slice(5):digits;generated=genCep();checks.push(['8 digits',digits.length===8],['Postal mask',/^\d{5}-?\d{3}$/.test(raw)]);fields.push(['Normalized CEP',normalized],['UF lookup','Requires external source'],['Offline scope','Format only'],['Masked',mask(normalized)]);}
    else if(/phone|ddd/.test(tool)){kind='Phone';valid=/^(55)?[1-9]{2}9?\d{8}$/.test(digits);normalized=digits.startsWith('55')?('+'+digits):('+55 '+digits);generated='+55 11 91234-5678';checks.push(['DDD present',digits.replace(/^55/,'').length>=10],['Mobile/landline shape',valid]);fields.push(['Normalized',normalized],['DDD',digits.replace(/^55/,'').slice(0,2)||'—'],['Masked',mask(normalized)],['Offline scope','Shape only']);}
    else if(/boleto|linha-digitavel/.test(tool)){kind='Boleto';valid=digits.length===44||digits.length===47||digits.length===48;normalized=digits;generated=SAMPLE_VALUES.boleto;checks.push(['Barcode or linha length',[44,47,48].includes(digits.length)],['Numeric only',/^\d+$/.test(digits)],['Bank code present',digits.length>=3]);fields.push(['Bank code',digits.slice(0,3)||'—'],['Currency digit',digits[3]||'—'],['Due factor',digits.slice(5,9)||'—'],['Amount field',digits.slice(9,19)||'—']);}
    else if(/brl|centavos|amount|money/.test(tool)){kind='BRL amount';const cleaned=raw.replace(/[^0-9,.-]/g,'').replace(/\./g,'').replace(',','.');const num=Number(cleaned);valid=Number.isFinite(num);const cents=valid?Math.round(num*100):0;normalized=valid?new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(num):raw;generated='R$ 1.234,56';checks.push(['Amount parsed',valid],['Centavos integer',valid]);fields.push(['BRL display',normalized],['Centavos',String(cents)],['Decimal separator','Comma'],['Storage','Integer cents']);}
    else if(/license-plate|plate/.test(tool)){kind='Vehicle plate';valid=/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/.test(raw.toUpperCase().replace(/[^A-Z0-9]/g,''));normalized=raw.toUpperCase().replace(/[^A-Z0-9]/g,'');generated='BRA2E19';checks.push(['Mercosul/legacy shape',valid],['7 characters',normalized.length===7]);fields.push(['Plate',normalized],['Family',/[A-Z]{3}[0-9][A-Z][0-9]{2}/.test(normalized)?'Mercosul':'Legacy/unknown'],['Masked',mask(normalized)],['Official status','Requires DETRAN']);}
    else {kind=cfg().code||'Brazil data';valid=!!raw;normalized=raw||'No input';generated=sampleFor(tool);checks.push(['Input present',!!raw],['Browser-only normalization',!!raw],['Official lookup required','Not performed']);fields.push(['Normalized',normalized],['Masked',mask(normalized)],['Characters',String(raw.length)],['Offline scope','Format, masking, fixtures']);}
    return {tool,kind,valid,raw,normalized,generated,checks,fields,diagnostics:checks.filter(x=>!x[1]).map(x=>x[0]+' failed'), json:{kind,valid,normalized,offlineOnly:true,tool}};}
  function sampleFor(tool){if(/cpf/.test(tool))return SAMPLE_VALUES.cpf;if(/cnpj/.test(tool))return SAMPLE_VALUES.cnpj;if(/cep/.test(tool))return SAMPLE_VALUES.cep;if(/phone|ddd/.test(tool))return SAMPLE_VALUES.phone;if(/nfe|nfce|cte|mdfe/.test(tool))return SAMPLE_VALUES.nfe;if(/boleto|linha/.test(tool))return SAMPLE_VALUES.boleto;if(/plate|renavam/.test(tool))return SAMPLE_VALUES.plate;if(/money|brl|centavos/.test(tool))return SAMPLE_VALUES.money;return SAMPLE_VALUES.text;}
  function escape(v){return window.ValidoWorkbench.utilities.escapeHtml(String(v??''));}
  function panel(r){const steps=r.checks.map(c=>'<article class="br-step '+(c[1]?'pass':'fail')+'"><div><strong>'+escape(c[0])+'</strong><span>'+(c[1]?'PASS':'CHECK')+'</span></div><p>'+(c[1]?'Validation check passed.':'Needs attention or official system confirmation.')+'</p></article>').join(''); const fields=r.fields.map(f=>'<div><span>'+escape(f[0])+'</span><strong>'+escape(f[1])+'</strong></div>').join(''); return '<div class="br-panel"><section class="br-pipeline"><h3>Validation pipeline</h3><div class="br-pipeline-grid">'+steps+'</div></section><section class="br-result '+(r.valid?'ok':'warn')+'"><h3>'+(r.valid?'Brazil workbench checks passed.':'Review browser-only diagnostics.')+'</h3><div class="br-result-grid">'+fields+'</div></section><details class="br-advanced" open><summary>Advanced analysis</summary><pre>'+escape(JSON.stringify(r.json,null,2))+'</pre></details></div>'; }
  function onMount(w){injectStyles(); const c=cfg(); w.form.classList.add('brazil-suite-workbench'); const input=w.primaryInput(); if(input){input.placeholder='Paste '+c.title+' input, batch rows, or a Brazilian payload...';} const row=document.createElement('div'); row.className='br-tool-head'; row.innerHTML='<div class="br-tool-identity"><span>'+escape(c.code)+'</span><strong>'+escape(c.title)+'</strong><small>'+escape(c.summary)+'</small></div><div class="br-tool-actions"><select class="br-preset"><option value="">Samples and fixtures</option><option value="sample">Representative sample</option><option value="cpf">CPF</option><option value="cnpj">CNPJ</option><option value="cep">CEP</option><option value="boleto">Boleto</option><option value="nfe">NF-e key</option><option value="money">BRL amount</option></select><div class="br-sample-chips"><button type="button" data-br-sample="cpf">CPF</button><button type="button" data-br-sample="cnpj">CNPJ</button><button type="button" data-br-sample="cep">CEP</button><button type="button" data-br-sample="boleto">Boleto</button></div></div>'; w.form.insertBefore(row,w.form.firstChild); row.querySelector('select').addEventListener('change',e=>{if(e.target.value)applySample(w,e.target.value);}); row.addEventListener('click',e=>{const chip=e.target.closest('[data-br-sample]'); if(chip) applySample(w,chip.dataset.brSample);}); }
  function run(w,action){const tool=slug(); const input=w.primaryInput(); let value=input?input.value:''; if(action==='generate'){value=sampleFor(tool); if(input)input.value=value;} const r=analyze(value,tool); w.lastResult={filename:'brazil-suite-'+tool+'.json',mime:'application/json',content:JSON.stringify(r.json,null,2)}; w.setOutput(action==='explain'?JSON.stringify(r.json,null,2):(action==='generate'?r.generated:r.normalized)); w.setMessage(r.valid?'Browser-only checks passed.':'Review diagnostics and official lookup boundaries.',r.valid?'success':'error'); w.setStats([['Tool',cfg().title],['Kind',r.kind],['Input chars',String(r.raw.length)],['Diagnostics',String(r.diagnostics.length)]],r.diagnostics,r.valid?'success':'error'); w.setAdvanced(panel(r)); remember(value); }
  function applySample(w,name){const input=w.primaryInput(); if(!input)return; input.value=SAMPLE_VALUES[name]||sampleFor(slug()); w.markActiveAction(name==='sample'?'validate':'validate'); w.run('validate'); }
  function detectInputMode(v){const d=onlyDigits(v); if(!v)return{label:'Waiting for Brazilian data',state:''}; if(cpfCheck(d))return{label:'Looks like valid CPF',state:'valid'}; if(cnpjCheck(d))return{label:'Looks like valid CNPJ',state:'valid'}; if(/^\d{5}-?\d{3}$/.test(v))return{label:'Looks like CEP',state:'valid'}; if([44,47,48].includes(d.length))return{label:'Looks like fiscal/payment code',state:'base64'}; return{label:'Brazil data detected',state:'text'};}
  function remember(v){if(!v)return;try{const arr=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').filter(x=>x!==v);arr.unshift(v);localStorage.setItem(STORAGE_KEY,JSON.stringify(arr.slice(0,8)));}catch(e){}}
  function injectStyles(){if(document.getElementById('brazil-suite-styles'))return; const s=document.createElement('style'); s.id='brazil-suite-styles'; s.textContent='.brazil-suite-workbench{--br-green:#15803d;--br-blue:#1d4ed8;--br-gold:#ca8a04;--br-soft:#f0fdf4}.br-tool-head{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,390px);justify-content:space-between;gap:18px;align-items:stretch;border:1px solid rgba(21,128,61,.22);border-radius:16px;padding:18px;margin-bottom:20px;background:radial-gradient(circle at 88% 15%,rgba(250,204,21,.24),transparent 28%),linear-gradient(120deg,#ecfdf5 0%,#fff 46%,#eff6ff 72%,rgba(250,204,21,.12) 100%);box-shadow:0 18px 42px rgba(15,23,42,.06);position:relative;overflow:hidden}.br-tool-head:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#16a34a,#facc15,#2563eb)}.br-tool-identity,.br-tool-actions{position:relative;z-index:1}.br-tool-actions{display:grid;gap:10px;align-content:start}.br-tool-head span{display:inline-grid;place-items:center;border:1px solid rgba(21,128,61,.22);border-radius:10px;background:#ecfdf5;color:#166534;font-weight:900;letter-spacing:.08em;padding:8px 10px;margin-bottom:8px}.br-tool-head strong{display:block;font-size:1.05rem}.br-tool-head small{display:block;color:var(--muted);max-width:760px;margin-top:4px}.br-preset{border:1px solid var(--line);border-radius:10px;padding:10px;background:#fff;color:var(--text);font-weight:800}.br-sample-chips{display:flex;flex-wrap:wrap;gap:8px}.br-sample-chips button{border:1px solid rgba(21,128,61,.24);border-radius:999px;background:#fff;color:#166534;font-weight:850;font-size:.74rem;padding:7px 10px;cursor:pointer}.br-sample-chips button:hover{background:#ecfdf5;transform:translateY(-1px)}.br-panel{display:flex;flex-direction:column;gap:18px;margin-top:18px}.br-pipeline,.br-result,.br-advanced{border:1px solid var(--line);border-radius:12px;background:#fff;padding:18px;box-shadow:0 10px 28px rgba(15,23,42,.035)}.br-pipeline h3,.br-result h3{font-size:.9rem;text-transform:uppercase;letter-spacing:.07em;margin:0 0 14px}.br-pipeline-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}.br-step{border:1px solid var(--line);border-radius:10px;padding:14px;background:var(--surface-soft)}.br-step>div{display:flex;justify-content:space-between;gap:10px}.br-step span{font-size:.68rem;font-weight:900;border-radius:8px;padding:4px 8px}.br-step.pass{border-color:rgba(22,163,74,.24);background:rgba(22,163,74,.055)}.br-step.pass span{color:var(--br-green);background:rgba(22,163,74,.1)}.br-step.fail{border-color:rgba(202,138,4,.28);background:rgba(202,138,4,.055)}.br-step.fail span{color:#a16207;background:rgba(202,138,4,.1)}.br-step p{margin:10px 0 0;color:var(--muted);font-size:.86rem}.br-result{background:linear-gradient(135deg,rgba(22,163,74,.055),#fff);border-color:rgba(22,163,74,.24)}.br-result.warn{background:linear-gradient(135deg,rgba(202,138,4,.055),#fff);border-color:rgba(202,138,4,.28)}.br-result-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.br-result-grid>div{border:1px solid var(--line);border-radius:10px;padding:14px;background:#fff;min-width:0}.br-result-grid span{display:block;color:var(--muted);font-size:.68rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px}.br-result-grid strong{display:block;overflow-wrap:anywhere;word-break:break-word}.br-advanced summary{cursor:pointer;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.br-advanced pre{margin:14px 0 0;overflow:auto;border-radius:10px;background:#0f172a;color:#dbeafe;padding:14px;font-size:.78rem}@media(max-width:800px){.br-tool-head{grid-template-columns:1fr}.br-result-grid{grid-template-columns:1fr}.br-preset{width:100%}}'; document.head.appendChild(s);}
  const Plugin={filePrefix:'brazil-suite',onMount,run,applySample,detectInputMode};
  if(window.ValidoWorkbench)window.ValidoWorkbench.registerPlugin(ALGORITHM_ID,Plugin);
})();
