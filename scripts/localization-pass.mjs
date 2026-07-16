import { dirname, resolve } from 'node:path';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeLocale(localeCode) {
  const raw = String(localeCode || 'en').trim();
  if (!raw) return 'en';
  const lower = raw.toLowerCase();
  if (lower.startsWith('pt-')) return 'pt-BR';
  if (lower === 'pl') return 'pl';
  if (lower === 'de') return 'de';
  if (lower === 'es') return 'es';
  return 'en';
}

function splitRouteLocale(pathname) {
  const parts = String(pathname || '/').split('/').filter(Boolean);
  if (!parts.length) return { locale: 'en', suffix: '/' };
  const locale = parts[0];
  const suffixParts = parts.slice(1);
  return { locale, suffix: suffixParts.length ? `/${suffixParts.join('/')}/` : '/' };
}

function routeForLocale(localeCode, suffix) {
  return suffix === '/' ? `/${localeCode}/` : `/${localeCode}${suffix}`;
}

async function pathExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const COUNTRY_NAMES = {
  pl: { Poland: 'Polska', Brazil: 'Brazylia', Spain: 'Hiszpania', Germany: 'Niemcy', Europe: 'Europa', 'South America': 'Ameryka Południowa' },
  de: { Poland: 'Polen', Brazil: 'Brasilien', Spain: 'Spanien', Germany: 'Deutschland', Europe: 'Europa', 'South America': 'Südamerika' },
  es: { Poland: 'Polonia', Brazil: 'Brasil', Spain: 'España', Germany: 'Alemania', Europe: 'Europa', 'South America': 'Sudamérica' },
  'pt-BR': { Poland: 'Polônia', Brazil: 'Brasil', Spain: 'Espanha', Germany: 'Alemanha', Europe: 'Europa', 'South America': 'América do Sul' }
};

const UI = {
  pl: {
    language: 'Język', selectLanguage: 'Wybierz język', official: 'Urzędowy', home: 'Start', countries: 'Kraje', identifiers: 'Identyfikatory', developerTools: 'Narzędzia deweloperskie', encoding: 'Kodowanie', finance: 'Finanse', hash: 'Hash', text: 'Tekst', nationalIdentifiers: 'Identyfikatory krajowe', tool: 'Narzędzie', workbench: 'Workbench', countryHub: 'Centrum kraju', countryShape: 'Kształt kraju', location: 'Położenie', findCountryTool: 'Znajdź narzędzie kraju', clearCountryToolSearch: 'Wyczyść wyszukiwanie', searchCountryWorkbenches: 'Przeszukaj workbenche kraju', staticCompiled: 'Statycznie skompilowane V2', developerPortal: 'Portal deweloperski', developerIntelligence: 'Informacje dla deweloperów o lokalnych identyfikatorach, regionalnych protokołach płatności, danych routingu bankowego i konwencjach lokalnych.', officialAdministrativeOutline: 'Oficjalny zarys administracyjny', geographicPosition: 'Położenie geograficzne', inTheWorld: 'na świecie', shapeOutline: 'zarys kraju', mapHighlight: 'wyróżnienie na mapie', copy: 'Kopiuj', copied: 'Skopiowano', available: 'dostępne', ready: 'gotowe', planned: 'planowane', reference: 'referencja', runTool: 'Uruchom narzędzie', pasteInput: 'Wklej dane, wybierz akcję i skopiuj wynik bezpośrednio w przeglądarce.', relatedTools: 'Powiązane narzędzia', continueWithRelated: 'Kontynuuj z powiązanymi narzędziami', validate: 'Sprawdź', copyResult: 'Kopiuj wynik', downloadResult: 'Pobierz wynik', clear: 'Wyczyść', output: 'Wynik', waitingForInput: 'Oczekiwanie na dane', advancedAnalysis: 'Analiza zaawansowana', documentation: 'Dokumentacja', guide: 'Przewodnik', faq: 'FAQ', references: 'Źródła', examples: 'Przykłady', developerExamples: 'Przykłady dla deweloperów', explanation: 'Wyjaśnienie', practicalExamples: 'Praktyczne przykłady', questionsAndEdgeCases: 'pytania i przypadki brzegowe', referencesAndLimits: 'źródła i ograniczenia', expandAll: 'Rozwiń wszystko', collapseAll: 'Zwiń wszystko', mainNavigation: 'Główna nawigacja', breadcrumb: 'Ścieżka nawigacji'
  },
  de: {
    language: 'Sprache', selectLanguage: 'Sprache wählen', official: 'Amtlich', home: 'Startseite', countries: 'Länder', identifiers: 'Kennungen', developerTools: 'Entwicklertools', encoding: 'Kodierung', finance: 'Finanzen', hash: 'Hash', text: 'Text', nationalIdentifiers: 'Nationale Kennungen', tool: 'Werkzeug', workbench: 'Workbench', countryHub: 'Länder-Hub', countryShape: 'Länderumriss', location: 'Standort', findCountryTool: 'Länder-Tool finden', clearCountryToolSearch: 'Suche löschen', searchCountryWorkbenches: 'Länder-Workbenches durchsuchen', staticCompiled: 'Statisch V2 kompiliert', developerPortal: 'Entwicklerportal', developerIntelligence: 'Entwicklerinformationen für lokale Kennungen, regionale Zahlungsprotokolle, Bank-Routingdetails und Locale-Konventionen.', officialAdministrativeOutline: 'Offizieller Verwaltungsumriss', geographicPosition: 'Geografische Lage', inTheWorld: 'weltweit', shapeOutline: 'Länderumriss', mapHighlight: 'Kartenmarkierung', copy: 'Kopieren', copied: 'Kopiert', available: 'verfügbar', ready: 'bereit', planned: 'geplant', reference: 'Referenz', runTool: 'Tool ausführen', pasteInput: 'Eingabe einfügen, Aktion wählen und das Ergebnis direkt im Browser kopieren.', relatedTools: 'Ähnliche Tools', continueWithRelated: 'Mit ähnlichen Tools fortfahren', validate: 'Prüfen', copyResult: 'Ergebnis kopieren', downloadResult: 'Ergebnis herunterladen', clear: 'Leeren', output: 'Ausgabe', waitingForInput: 'Warte auf Eingabe', advancedAnalysis: 'Erweiterte Analyse', documentation: 'Dokumentation', guide: 'Leitfaden', faq: 'FAQ', references: 'Referenzen', examples: 'Beispiele', developerExamples: 'Entwicklerbeispiele', explanation: 'Erklärung', practicalExamples: 'Praxisbeispiele', questionsAndEdgeCases: 'Fragen und Randfälle', referencesAndLimits: 'Referenzen und Grenzen', expandAll: 'Alle ausklappen', collapseAll: 'Alle einklappen', mainNavigation: 'Hauptnavigation', breadcrumb: 'Breadcrumb'
  },
  es: {
    language: 'Idioma', selectLanguage: 'Seleccionar idioma', official: 'Oficial', home: 'Inicio', countries: 'Países', identifiers: 'Identificadores', developerTools: 'Herramientas para desarrolladores', encoding: 'Codificación', finance: 'Finanzas', hash: 'Hash', text: 'Texto', nationalIdentifiers: 'Identificadores nacionales', tool: 'Herramienta', workbench: 'Workbench', countryHub: 'Hub del país', countryShape: 'Forma del país', location: 'Ubicación', findCountryTool: 'Buscar herramienta del país', clearCountryToolSearch: 'Limpiar búsqueda', searchCountryWorkbenches: 'Buscar workbenches del país', staticCompiled: 'V2 estático compilado', developerPortal: 'Portal para desarrolladores', developerIntelligence: 'Inteligencia para desarrolladores sobre identificadores locales, protocolos regionales de pago, datos de enrutamiento bancario y convenciones locales.', officialAdministrativeOutline: 'Contorno administrativo oficial', geographicPosition: 'Posición geográfica', inTheWorld: 'en el mundo', shapeOutline: 'contorno del país', mapHighlight: 'resaltado en el mapa', copy: 'Copiar', copied: 'Copiado', available: 'disponible', ready: 'listo', planned: 'planificado', reference: 'referencia', runTool: 'Ejecutar herramienta', pasteInput: 'Pega datos, elige una acción y copia el resultado directamente en tu navegador.', relatedTools: 'Herramientas relacionadas', continueWithRelated: 'Continuar con herramientas relacionadas', validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Descargar resultado', clear: 'Limpiar', output: 'Salida', waitingForInput: 'Esperando entrada', advancedAnalysis: 'Análisis avanzado', documentation: 'Documentación', guide: 'Guía', faq: 'FAQ', references: 'Referencias', examples: 'Ejemplos', developerExamples: 'Ejemplos para desarrolladores', explanation: 'Explicación', practicalExamples: 'Ejemplos prácticos', questionsAndEdgeCases: 'preguntas y casos límite', referencesAndLimits: 'referencias y límites', expandAll: 'Expandir todo', collapseAll: 'Contraer todo', mainNavigation: 'Navegación principal', breadcrumb: 'Ruta de navegación'
  },
  'pt-BR': {
    language: 'Idioma', selectLanguage: 'Selecionar idioma', official: 'Oficial', home: 'Início', countries: 'Países', identifiers: 'Identificadores', developerTools: 'Ferramentas para desenvolvedores', encoding: 'Codificação', finance: 'Finanças', hash: 'Hash', text: 'Texto', nationalIdentifiers: 'Identificadores nacionais', tool: 'Ferramenta', workbench: 'Workbench', countryHub: 'Hub do país', countryShape: 'Formato do país', location: 'Localização', findCountryTool: 'Encontrar ferramenta do país', clearCountryToolSearch: 'Limpar busca', searchCountryWorkbenches: 'Buscar workbenches do país', staticCompiled: 'V2 estático compilado', developerPortal: 'Portal para desenvolvedores', developerIntelligence: 'Inteligência para desenvolvedores sobre identificadores locais, protocolos regionais de pagamento, detalhes de roteamento bancário e convenções locais.', officialAdministrativeOutline: 'Contorno administrativo oficial', geographicPosition: 'Posição geográfica', inTheWorld: 'no mundo', shapeOutline: 'contorno do país', mapHighlight: 'destaque no mapa', copy: 'Copiar', copied: 'Copiado', available: 'disponível', ready: 'pronto', planned: 'planejado', reference: 'referência', runTool: 'Executar ferramenta', pasteInput: 'Cole dados, escolha uma ação e copie o resultado diretamente no navegador.', relatedTools: 'Ferramentas relacionadas', continueWithRelated: 'Continuar com ferramentas relacionadas', validate: 'Validar', copyResult: 'Copiar resultado', downloadResult: 'Baixar resultado', clear: 'Limpar', output: 'Saída', waitingForInput: 'Aguardando entrada', advancedAnalysis: 'Análise avançada', documentation: 'Documentação', guide: 'Guia', faq: 'FAQ', references: 'Referências', examples: 'Exemplos', developerExamples: 'Exemplos para desenvolvedores', explanation: 'Explicação', practicalExamples: 'Exemplos práticos', questionsAndEdgeCases: 'perguntas e casos extremos', referencesAndLimits: 'referências e limites', expandAll: 'Expandir tudo', collapseAll: 'Recolher tudo', mainNavigation: 'Navegação principal', breadcrumb: 'Trilha de navegação'
  }
};

const SECTION_LABELS = {
  pl: {
    'Copy common developer values': 'Kopiuj najczęstsze wartości deweloperskie', 'Fast one-click copy buttons for constants and configurations.': 'Szybkie przyciski kopiowania stałych i konfiguracji.', 'Available country workbenches': 'Dostępne workbenche kraju', 'Browse implemented browser-only tools grouped by developer intent.': 'Przeglądaj zaimplementowane narzędzia przeglądarkowe pogrupowane według intencji dewelopera.', 'Identity, registry & official numbers': 'Tożsamość, rejestry i numery urzędowe', 'Tax, invoices & business compliance': 'Podatki, faktury i zgodność biznesowa', 'Banking, payments & money movement': 'Bankowość, płatności i przepływ pieniędzy', 'Address, phone, logistics & local format': 'Adresy, telefony, logistyka i format lokalny', 'Developer data operations': 'Operacje danych dla deweloperów', 'National Identifiers Registry Specs': 'Specyfikacje krajowych identyfikatorów', 'Polish account, transfer & clearing standards': 'Polskie standardy kont, przelewów i rozliczeń', 'Polish payment rails & offline helpers': 'Polskie systemy płatności i pomocniki offline', 'National regulatory & reference portals': 'Krajowe portale regulacyjne i referencyjne', 'Developer intelligence for local identifiers, regional payment protocols, bank routing details, and locale conventions.': 'Informacje dla deweloperów o lokalnych identyfikatorach, regionalnych protokołach płatności, routingu bankowym i konwencjach lokalnych.'
  },
  de: {
    'Copy common developer values': 'Häufige Entwicklerwerte kopieren', 'Fast one-click copy buttons for constants and configurations.': 'Schnelle Ein-Klick-Kopien für Konstanten und Konfigurationen.', 'Available country workbenches': 'Verfügbare Länder-Workbenches', 'Browse implemented browser-only tools grouped by developer intent.': 'Implementierte browserbasierte Tools nach Entwicklerabsicht gruppiert durchsuchen.', 'Identity, registry & official numbers': 'Identität, Register und amtliche Nummern', 'Tax, invoices & business compliance': 'Steuern, Rechnungen und geschäftliche Compliance', 'Banking, payments & money movement': 'Banking, Zahlungen und Geldbewegungen', 'Address, phone, logistics & local format': 'Adresse, Telefon, Logistik und lokales Format', 'Developer data operations': 'Datenoperationen für Entwickler', 'National Identifiers Registry Specs': 'Spezifikationen nationaler Kennungen', 'Polish account, transfer & clearing standards': 'Polnische Konto-, Überweisungs- und Clearing-Standards', 'Polish payment rails & offline helpers': 'Polnische Zahlungswege und Offline-Helfer', 'National regulatory & reference portals': 'Nationale Regulierungs- und Referenzportale', 'Developer intelligence for local identifiers, regional payment protocols, bank routing details, and locale conventions.': 'Entwicklerinformationen zu lokalen Kennungen, regionalen Zahlungsprotokollen, Bank-Routingdetails und Locale-Konventionen.'
  },
  es: {
    'Copy common developer values': 'Copiar valores comunes para desarrolladores', 'Fast one-click copy buttons for constants and configurations.': 'Botones rápidos de copia para constantes y configuraciones.', 'Available country workbenches': 'Workbenches disponibles del país', 'Browse implemented browser-only tools grouped by developer intent.': 'Explora herramientas de navegador agrupadas por intención de desarrollo.', 'Identity, registry & official numbers': 'Identidad, registros y números oficiales', 'Tax, invoices & business compliance': 'Impuestos, facturas y cumplimiento empresarial', 'Banking, payments & money movement': 'Banca, pagos y movimiento de dinero', 'Address, phone, logistics & local format': 'Direcciones, teléfonos, logística y formato local', 'Developer data operations': 'Operaciones de datos para desarrolladores', 'National Identifiers Registry Specs': 'Especificaciones de identificadores nacionales', 'Polish account, transfer & clearing standards': 'Estándares polacos de cuentas, transferencias y compensación', 'Polish payment rails & offline helpers': 'Redes de pago polacas y ayudas offline', 'National regulatory & reference portals': 'Portales regulatorios y de referencia nacionales', 'Developer intelligence for local identifiers, regional payment protocols, bank routing details, and locale conventions.': 'Inteligencia para desarrolladores sobre identificadores locales, protocolos regionales de pago, detalles de enrutamiento bancario y convenciones locales.'
  },
  'pt-BR': {
    'Copy common developer values': 'Copiar valores comuns para desenvolvedores', 'Fast one-click copy buttons for constants and configurations.': 'Botões rápidos de cópia para constantes e configurações.', 'Available country workbenches': 'Workbenches disponíveis do país', 'Browse implemented browser-only tools grouped by developer intent.': 'Explore ferramentas de navegador agrupadas por intenção de desenvolvimento.', 'Identity, registry & official numbers': 'Identidade, registros e números oficiais', 'Tax, invoices & business compliance': 'Impostos, notas fiscais e conformidade empresarial', 'Banking, payments & money movement': 'Bancos, pagamentos e movimentação de dinheiro', 'Address, phone, logistics & local format': 'Endereços, telefones, logística e formato local', 'Developer data operations': 'Operações de dados para desenvolvedores', 'National Identifiers Registry Specs': 'Especificações de identificadores nacionais', 'Polish account, transfer & clearing standards': 'Padrões poloneses de contas, transferências e compensação', 'Polish payment rails & offline helpers': 'Trilhos de pagamento poloneses e auxiliares offline', 'National regulatory & reference portals': 'Portais nacionais regulatórios e de referência', 'Developer intelligence for local identifiers, regional payment protocols, bank routing details, and locale conventions.': 'Inteligência para desenvolvedores sobre identificadores locais, protocolos regionais de pagamento, detalhes de roteamento bancário e convenções locais.'
  }
};

const COMMON_LABELS = {
  pl: {
    'Developer Actions': 'Akcje deweloperskie',
    'Tool Catalog': 'Katalog narzędzi',
    'Location Map': 'Mapa położenia',
    'Web-optimized real-geography location map focused and highlighted.': 'Zoptymalizowana mapa geograficzna z wyróżnionym położeniem.',
    'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.': 'Wartości jednym kliknięciem do formularzy, payloadów, testów i formatowania lokalnego.',
    'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.': 'Narzędzia kraju pogrupowane według intencji, żeby szybko przeskanować cały baseline bez ściany kart.',
    'Validate personal identifiers': 'Sprawdzaj identyfikatory osobiste',
    'Personal IDs, documents, contact and address formats': 'Identyfikatory, dokumenty, formaty kontaktu i adresu',
    'Validate organization identifiers': 'Sprawdzaj identyfikatory organizacji',
    'Tax, registry, company and compliance references': 'Podatki, rejestry, firmy i zgodność',
    'Validate payment data': 'Sprawdzaj dane płatnicze',
    'Accounts, transfers, payment references and amount formats': 'Konta, przelewy, tytuły płatności i kwoty',
    'Trusted offline boundary': 'Zaufana granica offline',
    'Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.': 'Format, suma kontrolna, struktura i normalizacja działają lokalnie w przeglądarce. Status rejestru, własność konta, potwierdzenie urzędowe i weryfikacja tożsamości prawnej wymagają oficjalnych systemów zewnętrznych.',
    'All intents': 'Wszystkie intencje',
    'Other country developer workflows': 'Inne przepływy deweloperskie kraju',
    'Additional country-specific tools and inspectors.': 'Dodatkowe narzędzia i inspektory specyficzne dla kraju.',
    'No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.': 'Nie znaleziono pasujących workbenchy dla tego kraju. Spróbuj identyfikatorów, płatności, adresu, telefonu albo podatków.',
    'Open the production-grade browser workbench for this country data standard. Quality 40%: Validate · Docs.': 'Otwórz produkcyjny workbench przeglądarkowy dla tego standardu danych. Jakość 40%: walidacja · dokumentacja.',
    'Banking Standards': 'Standardy bankowe',
    'Payment Networks': 'Sieci płatnicze',
    'Official Sources': 'Źródła oficjalne',
    'Reference note, not a link': 'Notatka referencyjna, nie link',
    'available workbenches': 'dostępne workbenche',
    'organized domains': 'uporządkowane domeny',
    'server calls required': 'wymagane wywołania serwera'
  },
  de: {
    'Developer Actions': 'Entwickleraktionen',
    'Tool Catalog': 'Tool-Katalog',
    'Location Map': 'Lagekarte',
    'Web-optimized real-geography location map focused and highlighted.': 'Weboptimierte geografische Lagekarte mit hervorgehobener Position.',
    'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.': 'Ein-Klick-Werte für Formulare, Payloads, Tests und locale-bewusstes Formatieren.',
    'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.': 'Länderspezifische Tools nach Nutzerabsicht gruppiert, damit Entwickler die Baseline schnell erfassen.',
    'Validate personal identifiers': 'Personenkennungen prüfen',
    'Personal IDs, documents, contact and address formats': 'Personen-IDs, Dokumente, Kontakt- und Adressformate',
    'Validate organization identifiers': 'Organisationskennungen prüfen',
    'Tax, registry, company and compliance references': 'Steuer-, Register-, Unternehmens- und Compliance-Referenzen',
    'Validate payment data': 'Zahlungsdaten prüfen',
    'Accounts, transfers, payment references and amount formats': 'Konten, Überweisungen, Zahlungsreferenzen und Betragsformate',
    'Trusted offline boundary': 'Vertrauenswürdige Offline-Grenze',
    'Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.': 'Format, Prüfsumme, Struktur und Normalisierung laufen lokal im Browser. Registerstatus, Kontoinhaberschaft, behördliche Bestätigung und rechtliche Identitätsprüfung erfordern offizielle externe Systeme.',
    'All intents': 'Alle Absichten',
    'Other country developer workflows': 'Weitere Länder-Workflows für Entwickler',
    'Additional country-specific tools and inspectors.': 'Zusätzliche länderspezifische Tools und Inspektoren.',
    'No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.': 'Keine passenden Workbenches für dieses Land gefunden. Versuche Kennungen, Zahlungen, Adresse, Telefon oder Steuern.',
    'Open the production-grade browser workbench for this country data standard. Quality 40%: Validate · Docs.': 'Öffne die produktionsreife Browser-Workbench für diesen Datenstandard. Qualität 40%: Prüfen · Dokumentation.',
    'Banking Standards': 'Banking-Standards',
    'Payment Networks': 'Zahlungsnetzwerke',
    'Official Sources': 'Offizielle Quellen',
    'Reference note, not a link': 'Referenznotiz, kein Link',
    'available workbenches': 'verfügbare Workbenches',
    'organized domains': 'organisierte Domänen',
    'server calls required': 'Serveraufrufe erforderlich'
  },
  es: {
    'Developer Actions': 'Acciones para desarrolladores',
    'Tool Catalog': 'Catálogo de herramientas',
    'Location Map': 'Mapa de ubicación',
    'Web-optimized real-geography location map focused and highlighted.': 'Mapa geográfico optimizado para web con la ubicación resaltada.',
    'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.': 'Valores de un clic para formularios, payloads, pruebas y formatos locales.',
    'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.': 'Herramientas del país agrupadas por intención para revisar la base completa sin una pared de tarjetas.',
    'Validate personal identifiers': 'Validar identificadores personales',
    'Personal IDs, documents, contact and address formats': 'IDs personales, documentos, contacto y formatos de dirección',
    'Validate organization identifiers': 'Validar identificadores de organizaciones',
    'Tax, registry, company and compliance references': 'Referencias fiscales, registrales, empresariales y de cumplimiento',
    'Validate payment data': 'Validar datos de pago',
    'Accounts, transfers, payment references and amount formats': 'Cuentas, transferencias, referencias de pago y formatos de importe',
    'Trusted offline boundary': 'Límite offline confiable',
    'Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.': 'Formato, checksum, estructura y normalización se ejecutan localmente en el navegador. Estado registral, titularidad bancaria, confirmación oficial y verificación legal requieren sistemas externos oficiales.',
    'All intents': 'Todas las intenciones',
    'Other country developer workflows': 'Otros flujos de desarrollador del país',
    'Additional country-specific tools and inspectors.': 'Herramientas e inspectores adicionales específicos del país.',
    'No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.': 'No se encontraron workbenches para este país. Prueba identificadores, pagos, dirección, teléfono o impuestos.',
    'Open the production-grade browser workbench for this country data standard. Quality 40%: Validate · Docs.': 'Abre el workbench de navegador de nivel producción para este estándar. Calidad 40%: validar · documentación.',
    'Banking Standards': 'Estándares bancarios',
    'Payment Networks': 'Redes de pago',
    'Official Sources': 'Fuentes oficiales',
    'Reference note, not a link': 'Nota de referencia, no es un enlace',
    'available workbenches': 'workbenches disponibles',
    'organized domains': 'dominios organizados',
    'server calls required': 'llamadas al servidor requeridas'
  },
  'pt-BR': {
    'Developer Actions': 'Ações para desenvolvedores',
    'Tool Catalog': 'Catálogo de ferramentas',
    'Location Map': 'Mapa de localização',
    'Web-optimized real-geography location map focused and highlighted.': 'Mapa geográfico otimizado para web com localização destacada.',
    'One-click values developers repeatedly need for forms, payloads, tests, and locale-aware formatting.': 'Valores de um clique para formulários, payloads, testes e formatação local.',
    'All country-specific tools grouped by user intent so developers can scan the whole country baseline without a wall of cards.': 'Ferramentas do país agrupadas por intenção para revisar a base completa sem uma parede de cards.',
    'Validate personal identifiers': 'Validar identificadores pessoais',
    'Personal IDs, documents, contact and address formats': 'IDs pessoais, documentos, contato e formatos de endereço',
    'Validate organization identifiers': 'Validar identificadores de organizações',
    'Tax, registry, company and compliance references': 'Referências fiscais, cadastrais, empresariais e de conformidade',
    'Validate payment data': 'Validar dados de pagamento',
    'Accounts, transfers, payment references and amount formats': 'Contas, transferências, referências de pagamento e formatos de valor',
    'Trusted offline boundary': 'Limite offline confiável',
    'Format, checksum, structure, and normalization run locally in browser. Registry status, bank account ownership, government confirmation, and legal identity verification require official external systems.': 'Formato, checksum, estrutura e normalização rodam localmente no navegador. Status cadastral, titularidade bancária, confirmação oficial e verificação legal exigem sistemas externos oficiais.',
    'All intents': 'Todas as intenções',
    'Other country developer workflows': 'Outros fluxos de desenvolvedor do país',
    'Additional country-specific tools and inspectors.': 'Ferramentas e inspetores adicionais específicos do país.',
    'No matching workbenches found for this country. Try local identifiers, payments, address, phone, or tax terms.': 'Nenhum workbench encontrado para este país. Tente identificadores, pagamentos, endereço, telefone ou impostos.',
    'Open the production-grade browser workbench for this country data standard. Quality 40%: Validate · Docs.': 'Abra o workbench de navegador de nível produção para este padrão de dados. Qualidade 40%: validar · documentação.',
    'Banking Standards': 'Padrões bancários',
    'Payment Networks': 'Redes de pagamento',
    'Official Sources': 'Fontes oficiais',
    'Reference note, not a link': 'Nota de referência, não é link',
    'available workbenches': 'workbenches disponíveis',
    'organized domains': 'domínios organizados',
    'server calls required': 'chamadas de servidor necessárias'
  }
};

const COUNTRY_PAGE_LABELS = {
  pl: {
    'Locale': 'Locale',
    'ISO-2': 'ISO-2',
    'ISO-3': 'ISO-3',
    'Calling code': 'Kod kierunkowy',
    'TLD': 'TLD',
    'Date format': 'Format daty',
    'Currency': 'Waluta',
    'Currency Name': 'Nazwa waluty',
    'Postal pattern': 'Format kodu pocztowego',
    'Decimal': 'Separator dziesiętny',
    'Thousands': 'Separator tysięcy',
    'country code': 'kod kraju',
    'alpha-3': 'alpha-3',
    'phone': 'telefon',
    'domain': 'domena',
    'display': 'wyświetlanie',
    'money': 'waluta',
    'address': 'adres',
    'numbers': 'liczby',
    'Polish złoty': 'polski złoty',
    'Date format is DD.MM.YYYY.': 'Format daty to DD.MM.YYYY.',
    'Copy Code': 'Kopiuj kod',
    'JavaScript Intl Currency': 'Waluta JavaScript Intl',
    'Browser-only local workbench': 'Lokalny workbench w przeglądarce',
    'Related browser-only workbench': 'Powiązany workbench przeglądarkowy',
    'Open the production-grade browser workbench for this country data standard.': 'Otwórz produkcyjny workbench przeglądarkowy dla tego standardu danych.',
    'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.': 'PESEL, NIP, REGON, KRS, dokumenty, identyfikatory pojazdów i dane zgodne z rejestrami urzędowymi.',
    'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.': 'VAT, KSeF, JPK, faktury, onboarding firm, klasyfikacje i pomocniki dokumentów fiskalnych.',
    'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.': 'IBAN, NRB, BIC, SEPA, BLIK, split payment, tytuły przelewów, kwoty i payloady QR płatności.',
    'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.': 'Kody pocztowe, adresy, telefony, numery paczek, formatowanie dat i locale oraz dane gotowe do dostawy.',
    'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.': 'Maskowanie, dane testowe, bezpieczne demo i audyty jakości polskich rekordów.',
    'Related banking workbenches': 'Powiązane workbenche bankowe',
    'Related payment workbenches': 'Powiązane workbenche płatności',
    'Identifier registry specs & workbenches': 'Specyfikacje rejestrów identyfikatorów i workbenche',
    'Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped Polish data.': 'Oficjalne specyfikacje identyfikatorów oraz narzędzia przeglądarkowe dla danych osobowych, biznesowych, pojazdów, adresów i rejestrów w Polsce.',
    'Interactive Validator Workbenches': 'Interaktywne workbenche walidatorów',
    'Pre-rendered interactive validator tools to test identifiers in a real browser.': 'Wstępnie wygenerowane interaktywne walidatory do testowania identyfikatorów w przeglądarce.',
    'Quality': 'Jakość'
  },
  de: {
    'Locale': 'Locale',
    'ISO-2': 'ISO-2',
    'ISO-3': 'ISO-3',
    'Calling code': 'Vorwahl',
    'TLD': 'TLD',
    'Date format': 'Datumsformat',
    'Currency': 'Währung',
    'Currency Name': 'Währungsname',
    'Postal pattern': 'Postleitzahlformat',
    'Decimal': 'Dezimalzeichen',
    'Thousands': 'Tausendertrennzeichen',
    'country code': 'Ländercode',
    'alpha-3': 'Alpha-3',
    'phone': 'Telefon',
    'domain': 'Domain',
    'display': 'Anzeige',
    'money': 'Währung',
    'address': 'Adresse',
    'numbers': 'Zahlen',
    'Polish złoty': 'Polnischer Złoty',
    'Date format is DD.MM.YYYY.': 'Das Datumsformat ist DD.MM.YYYY.',
    'Copy Code': 'Code kopieren',
    'JavaScript Intl Currency': 'JavaScript-Intl-Währung',
    'Browser-only local workbench': 'Lokale Browser-Workbench',
    'Related browser-only workbench': 'Ähnliche Browser-Workbench',
    'Open the production-grade browser workbench for this country data standard.': 'Öffne die produktionsreife Browser-Workbench für diesen Datenstandard.',
    'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.': 'PESEL, NIP, REGON, KRS, Dokumente, Fahrzeugkennungen und amtlich registerförmige Daten.',
    'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.': 'VAT, KSeF, JPK, Rechnungen, Unternehmens-Onboarding, Klassifikationen und Fiskaldaten-Helfer.',
    'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.': 'IBAN, NRB, BIC, SEPA, BLIK, Split Payment, Überweisungstitel, Beträge und Zahlungs-QR-Payloads.',
    'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.': 'Postleitzahlen, Adressen, Telefonnummern, Paketnummern, Datums-/Locale-Formatierung und lieferfertige Daten.',
    'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.': 'Maskierung, Testdaten, datenschutzfreundliche Demos und Qualitätsaudits polnischer Datensätze.',
    'Related banking workbenches': 'Ähnliche Banking-Workbenches',
    'Related payment workbenches': 'Ähnliche Zahlungs-Workbenches',
    'Identifier registry specs & workbenches': 'Register-Spezifikationen und Workbenches für Kennungen',
    'Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped Polish data.': 'Offizielle Kennungsspezifikationen plus Browser-Tools für Personen-, Unternehmens-, Fahrzeug-, Adress- und Registerdaten in Polen.',
    'Interactive Validator Workbenches': 'Interaktive Validator-Workbenches',
    'Pre-rendered interactive validator tools to test identifiers in a real browser.': 'Vorgenerierte interaktive Validatoren zum Testen von Kennungen im Browser.',
    'Quality': 'Qualität'
  },
  es: {
    'Locale': 'Configuración regional',
    'ISO-2': 'ISO-2',
    'ISO-3': 'ISO-3',
    'Calling code': 'Prefijo telefónico',
    'TLD': 'TLD',
    'Date format': 'Formato de fecha',
    'Currency': 'Moneda',
    'Currency Name': 'Nombre de la moneda',
    'Postal pattern': 'Formato postal',
    'Decimal': 'Separador decimal',
    'Thousands': 'Separador de miles',
    'country code': 'código de país',
    'alpha-3': 'alpha-3',
    'phone': 'teléfono',
    'domain': 'dominio',
    'display': 'visualización',
    'money': 'moneda',
    'address': 'dirección',
    'numbers': 'números',
    'Polish złoty': 'złoty polaco',
    'Date format is DD.MM.YYYY.': 'El formato de fecha es DD.MM.YYYY.',
    'Copy Code': 'Copiar código',
    'JavaScript Intl Currency': 'Moneda con JavaScript Intl',
    'Browser-only local workbench': 'Workbench local en el navegador',
    'Related browser-only workbench': 'Workbench relacionado en el navegador',
    'Open the production-grade browser workbench for this country data standard.': 'Abre el workbench de navegador de nivel producción para este estándar de datos.',
    'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.': 'PESEL, NIP, REGON, KRS, documentos, identificadores de vehículos y datos con forma de registro oficial.',
    'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.': 'IVA, KSeF, JPK, facturas, onboarding de empresas, clasificaciones y ayudas de registros fiscales.',
    'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.': 'IBAN, NRB, BIC, SEPA, BLIK, pago dividido, conceptos de transferencia, importes y payloads QR de pago.',
    'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.': 'Códigos postales, direcciones, teléfonos, paquetes, formato de fecha/configuración regional y datos listos para entrega.',
    'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.': 'Enmascaramiento, datos de prueba, demos privadas y auditorías de calidad de datos polacos.',
    'Related banking workbenches': 'Workbenches bancarios relacionados',
    'Related payment workbenches': 'Workbenches de pago relacionados',
    'Identifier registry specs & workbenches': 'Especificaciones de registros de identificadores y workbenches',
    'Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped Polish data.': 'Especificaciones oficiales y herramientas de navegador para datos personales, empresariales, vehiculares, de dirección y registros polacos.',
    'Interactive Validator Workbenches': 'Workbenches interactivos de validación',
    'Pre-rendered interactive validator tools to test identifiers in a real browser.': 'Validadores interactivos pregenerados para probar identificadores en el navegador.',
    'Quality': 'Calidad'
  },
  'pt-BR': {
    'Locale': 'Localidade',
    'ISO-2': 'ISO-2',
    'ISO-3': 'ISO-3',
    'Calling code': 'Código telefônico',
    'TLD': 'TLD',
    'Date format': 'Formato de data',
    'Currency': 'Moeda',
    'Currency Name': 'Nome da moeda',
    'Postal pattern': 'Formato postal',
    'Decimal': 'Separador decimal',
    'Thousands': 'Separador de milhares',
    'country code': 'código do país',
    'alpha-3': 'alpha-3',
    'phone': 'telefone',
    'domain': 'domínio',
    'display': 'exibição',
    'money': 'moeda',
    'address': 'endereço',
    'numbers': 'números',
    'Polish złoty': 'złoty polonês',
    'Date format is DD.MM.YYYY.': 'O formato de data é DD.MM.YYYY.',
    'Copy Code': 'Copiar código',
    'JavaScript Intl Currency': 'Moeda com JavaScript Intl',
    'Browser-only local workbench': 'Workbench local no navegador',
    'Related browser-only workbench': 'Workbench relacionado no navegador',
    'Open the production-grade browser workbench for this country data standard.': 'Abra o workbench de navegador de nível produção para este padrão de dados.',
    'PESEL, NIP, REGON, KRS, documents, vehicle identifiers, and official registry-shaped data.': 'PESEL, NIP, REGON, KRS, documentos, identificadores de veículos e dados em formato de registros oficiais.',
    'VAT, KSeF, JPK, invoices, company onboarding, classifications, and fiscal record helpers.': 'IVA, KSeF, JPK, notas fiscais, onboarding de empresas, classificações e auxiliares fiscais.',
    'IBAN, NRB, BIC, SEPA, BLIK, split payment, transfer titles, amounts, and payment QR payloads.': 'IBAN, NRB, BIC, SEPA, BLIK, pagamento dividido, títulos de transferência, valores e payloads QR de pagamento.',
    'Postal codes, addresses, phones, parcel numbers, date/locale formatting, and delivery-ready data.': 'Códigos postais, endereços, telefones, encomendas, formatação de data/localidade e dados prontos para entrega.',
    'Masking, test fixtures, privacy-safe demos, and whole-record Polish data-quality audits.': 'Mascaramento, dados de teste, demos privadas e auditorias de qualidade de dados poloneses.',
    'Related banking workbenches': 'Workbenches bancários relacionados',
    'Related payment workbenches': 'Workbenches de pagamento relacionados',
    'Identifier registry specs & workbenches': 'Especificações de registros de identificadores e workbenches',
    'Official identifier specs plus related browser tools for personal, business, vehicle, address, and registry-shaped Polish data.': 'Especificações oficiais e ferramentas de navegador para dados pessoais, comerciais, veiculares, de endereço e registros poloneses.',
    'Interactive Validator Workbenches': 'Workbenches interativos de validação',
    'Pre-rendered interactive validator tools to test identifiers in a real browser.': 'Validadores interativos pré-renderizados para testar identificadores no navegador.',
    'Quality': 'Qualidade'
  }
};


const COUNTRY_PAGE_RICH_LABELS = {
  pl: {
    'Geography &amp; Standards': 'Geografia i standardy',
    'Identity &amp; Standards Profile': 'Profil tożsamości i standardów',
    'Core country registry details and national system standards.': 'Kluczowe dane rejestrowe kraju oraz krajowe standardy systemowe.',
    'Capital City': 'Stolica',
    'Native Name': 'Nazwa lokalna',
    'ISO Alpha-2': 'ISO alpha-2',
    'ISO Alpha-3': 'ISO alpha-3',
    'Calling Prefix': 'Prefiks telefoniczny',
    'Internet TLD': 'Domena internetowa',
    'Driving Side': 'Ruch drogowy',
    'Time Zones': 'Strefy czasowe',
    'Warsaw': 'Warszawa',
    'Right': 'Prawostronny',
    'Locale Conventions': 'Konwencje lokalne',
    'Local Formats &amp; Layouts': 'Lokalne formaty i układy',
    'Locale preferences, separator characters, and display configurations.': 'Preferencje locale, znaki separatorów i konfiguracje wyświetlania.',
    'Active Locale': 'Aktywne locale',
    'Date Format': 'Format daty',
    'Decimal Separator': 'Separator dziesiętny',
    'Thousands Separator': 'Separator tysięcy',
    'Postal Pattern': 'Wzorzec kodu pocztowego',
    'Comma (,)': 'Przecinek (,)',
    'Space ( ) or Dot (.)': 'Spacja ( ) lub kropka (.)',
    'Technical Standards': 'Standardy techniczne',
    'Utility &amp; Electrical Profile': 'Profil infrastruktury i elektryczności',
    'Utility metrics, emergency networks, and infrastructure constants.': 'Parametry infrastruktury, sieci alarmowe i stałe techniczne.',
    'Plug Types': 'Typy wtyczek',
    'Electrical Voltage': 'Napięcie elektryczne',
    'Grid Frequency': 'Częstotliwość sieci',
    'Emergency Number': 'Numer alarmowy',
    'Address Standards': 'Standardy adresowe',
    'Structured address formatting': 'Strukturalne formatowanie adresu',
    'Display order, postal mask, street notation, and delivery-ready field sequence.': 'Kolejność wyświetlania, maska pocztowa, zapis ulicy i sekwencja pól gotowa do doręczenia.',
    'Address Example': 'Przykład adresu',
    'Copy Address': 'Kopiuj adres',
    'Recipient': 'Odbiorca',
    'Street type and name': 'Typ i nazwa ulicy',
    'Building and flat number': 'Numer budynku i lokalu',
    'Postal code': 'Kod pocztowy',
    'City': 'Miasto',
    'Country': 'Kraj',
    'Fictional person or organization receiving mail.': 'Fikcyjna osoba lub organizacja odbierająca korespondencję.',
    'Polish addresses usually include the street type and name.': 'Polskie adresy zwykle zawierają typ oraz nazwę ulicy.',
    'Building number and apartment unit details.': 'Numer budynku oraz szczegóły lokalu.',
    'Five-digit postal code with hyphen (NN-NNN).': 'Pięciocyfrowy kod pocztowy z myślnikiem (NN-NNN).',
    'City or municipality for display and delivery.': 'Miasto albo gmina używana do wyświetlania i doręczeń.',
    'Country label for international mail and cross-border records.': 'Etykieta kraju dla korespondencji międzynarodowej i rekordów transgranicznych.',
    'Official Sources': 'Źródła oficjalne',
    'National regulatory &amp; reference portals': 'Krajowe portale regulacyjne i referencyjne',
    'Verified legislative resources to validate compliance formats.': 'Zweryfikowane zasoby prawne i referencyjne do sprawdzania formatów zgodności.',
    'Central Statistical Office for official database, classification, and statistical context.': 'Główny Urząd Statystyczny: oficjalne bazy, klasyfikacje i kontekst statystyczny.',
    'Official tax administration portal for NIP, VAT, and business status references.': 'Oficjalny portal administracji podatkowej dla NIP, VAT i statusu działalności.',
    'Social Insurance Institution reference portal for social security context.': 'Portal ZUS jako kontekst ubezpieczeń społecznych i identyfikatorów.',
    'Central bank of Poland providing monetary policy and banking institution indexes.': 'Narodowy Bank Polski: polityka pieniężna, dane bankowe i indeksy instytucji finansowych.',
    'Postal authority and official postcode database lookup.': 'Poczta Polska: kontekst adresowy oraz oficjalna baza kodów pocztowych.',
    'National Court Register context for KRS-shaped business identifiers and company records.': 'Krajowy Rejestr Sądowy: kontekst identyfikatorów KRS i rekordów spółek.',
    'Central register context for sole-proprietor onboarding and business-data readiness checks.': 'CEIDG: kontekst jednoosobowych działalności i gotowości danych firmowych.',
    'National e-invoicing context for KSeF XML payloads, invoice identifiers, and offline readiness.': 'KSeF: kontekst e-faktur, payloadów XML, identyfikatorów faktur i gotowości offline.',
    'Reference context for Polish tax control files, VAT reporting data, and XML submission readiness.': 'JPK: kontekst plików kontrolnych, danych VAT i gotowości wysyłki XML.',
    'Territorial and locality classification context for voivodeships, counties, municipalities, towns, and streets.': 'TERYT/SIMC/ULIC: klasyfikacja województw, powiatów, gmin, miejscowości i ulic.',
    'Waste database and product-packaging register context for BDO-shaped business identifiers.': 'BDO: rejestr odpadów i opakowań dla identyfikatorów biznesowych w kształcie BDO.',
    'Vehicle and driver registry context for plates, VIN workflows, registration certificates, and licence data.': 'CEPiK: kontekst pojazdów, tablic, VIN, dowodów rejestracyjnych i praw jazdy.',
    'Insurance guarantee fund context for vehicle insurance and policy-number workflows.': 'UFG: kontekst ubezpieczeń pojazdów i numerów polis.',
    'Customs and tax administration context for EORI, VAT, tax microaccounts, and compliance identifiers.': 'KAS: kontekst ceł, EORI, VAT, mikrorachunków podatkowych i identyfikatorów zgodności.',
    'Central-bank context for PLN, bank metadata, exchange-rate references, and financial institution naming.': 'NBP: kontekst PLN, metadanych banków, kursów walut i nazewnictwa instytucji finansowych.',
    'government': 'administracja',
    'tax': 'podatki',
    'identifiers': 'identyfikatory',
    'postal': 'poczta',
    'addresses': 'adresy',
    'banking': 'bankowość',
    'business': 'biznes',
    'invoices': 'faktury',
    'xml': 'XML',
    'environment': 'środowisko',
    'vehicles': 'pojazdy',
    'insurance': 'ubezpieczenia',
    'customs': 'cło',
    'currency': 'waluta'
  },
  de: {
    'Geography &amp; Standards': 'Geografie und Standards',
    'Identity &amp; Standards Profile': 'Profil für Identität und Standards',
    'Core country registry details and national system standards.': 'Zentrale Registerdaten des Landes und nationale Systemstandards.',
    'Capital City': 'Hauptstadt',
    'Native Name': 'Lokaler Name',
    'ISO Alpha-2': 'ISO Alpha-2',
    'ISO Alpha-3': 'ISO Alpha-3',
    'Calling Prefix': 'Telefonvorwahl',
    'Internet TLD': 'Internet-TLD',
    'Driving Side': 'Verkehrsseite',
    'Time Zones': 'Zeitzonen',
    'Warsaw': 'Warschau',
    'Right': 'Rechtsverkehr',
    'Locale Conventions': 'Locale-Konventionen',
    'Local Formats &amp; Layouts': 'Lokale Formate und Layouts',
    'Locale preferences, separator characters, and display configurations.': 'Locale-Präferenzen, Trennzeichen und Anzeigeeinstellungen.',
    'Active Locale': 'Aktive Locale',
    'Date Format': 'Datumsformat',
    'Decimal Separator': 'Dezimaltrennzeichen',
    'Thousands Separator': 'Tausendertrennzeichen',
    'Postal Pattern': 'Postleitzahlmuster',
    'Comma (,)': 'Komma (,)',
    'Space ( ) or Dot (.)': 'Leerzeichen ( ) oder Punkt (.)',
    'Technical Standards': 'Technische Standards',
    'Utility &amp; Electrical Profile': 'Versorgungs- und Stromprofil',
    'Utility metrics, emergency networks, and infrastructure constants.': 'Versorgungswerte, Notrufnetze und Infrastrukturkonstanten.',
    'Plug Types': 'Steckertypen',
    'Electrical Voltage': 'Netzspannung',
    'Grid Frequency': 'Netzfrequenz',
    'Emergency Number': 'Notrufnummer',
    'Address Standards': 'Adressstandards',
    'Structured address formatting': 'Strukturierte Adressformatierung',
    'Display order, postal mask, street notation, and delivery-ready field sequence.': 'Anzeigereihenfolge, Postmaske, Straßenschreibweise und zustellbereite Feldfolge.',
    'Address Example': 'Adressbeispiel',
    'Copy Address': 'Adresse kopieren',
    'Recipient': 'Empfänger',
    'Street type and name': 'Straßentyp und Name',
    'Building and flat number': 'Haus- und Wohnungsnummer',
    'Postal code': 'Postleitzahl',
    'City': 'Stadt',
    'Country': 'Land',
    'Fictional person or organization receiving mail.': 'Fiktive Person oder Organisation, die Post erhält.',
    'Polish addresses usually include the street type and name.': 'Polnische Adressen enthalten in der Regel Straßentyp und Straßenname.',
    'Building number and apartment unit details.': 'Hausnummer und Angaben zur Wohnungseinheit.',
    'Five-digit postal code with hyphen (NN-NNN).': 'Fünfstellige Postleitzahl mit Bindestrich (NN-NNN).',
    'City or municipality for display and delivery.': 'Stadt oder Gemeinde für Anzeige und Zustellung.',
    'Country label for international mail and cross-border records.': 'Länderbezeichnung für internationale Post und grenzüberschreitende Datensätze.',
    'Official Sources': 'Offizielle Quellen',
    'National regulatory &amp; reference portals': 'Nationale Regulierungs- und Referenzportale',
    'Verified legislative resources to validate compliance formats.': 'Verifizierte Rechts- und Referenzressourcen zur Prüfung von Compliance-Formaten.',
    'Central Statistical Office for official database, classification, and statistical context.': 'Zentrales Statistikamt für amtliche Datenbanken, Klassifikationen und statistischen Kontext.',
    'Official tax administration portal for NIP, VAT, and business status references.': 'Offizielles Steuerverwaltungsportal für NIP, MwSt. und Unternehmensstatus.',
    'Social Insurance Institution reference portal for social security context.': 'Referenzportal der Sozialversicherungsanstalt für Sozialversicherungskontext.',
    'Central bank of Poland providing monetary policy and banking institution indexes.': 'Polnische Zentralbank mit Kontext zu Geldpolitik, Bankdaten und Finanzinstituten.',
    'Postal authority and official postcode database lookup.': 'Postbehörde und offizieller Kontext für Postleitzahl-Datenbanken.',
    'National Court Register context for KRS-shaped business identifiers and company records.': 'Nationales Gerichtsregister für KRS-förmige Unternehmenskennungen und Firmendatensätze.',
    'Central register context for sole-proprietor onboarding and business-data readiness checks.': 'Zentralregister-Kontext für Einzelunternehmer-Onboarding und Business-Datenprüfung.',
    'National e-invoicing context for KSeF XML payloads, invoice identifiers, and offline readiness.': 'Nationaler E-Rechnungskontext für KSeF-XML, Rechnungskennungen und Offline-Bereitschaft.',
    'Reference context for Polish tax control files, VAT reporting data, and XML submission readiness.': 'Referenzkontext für polnische Steuerkontrolldateien, MwSt.-Meldedaten und XML-Einreichung.',
    'Territorial and locality classification context for voivodeships, counties, municipalities, towns, and streets.': 'Territoriale Klassifikation für Woiwodschaften, Kreise, Gemeinden, Orte und Straßen.',
    'Waste database and product-packaging register context for BDO-shaped business identifiers.': 'Abfall- und Verpackungsregisterkontext für BDO-förmige Unternehmenskennungen.',
    'Vehicle and driver registry context for plates, VIN workflows, registration certificates, and licence data.': 'Fahrzeug- und Fahrerregisterkontext für Kennzeichen, VIN, Zulassungsbescheinigungen und Führerscheindaten.',
    'Insurance guarantee fund context for vehicle insurance and policy-number workflows.': 'Kontext des Versicherungs-Garantiefonds für Kfz-Versicherung und Policennummern.',
    'Customs and tax administration context for EORI, VAT, tax microaccounts, and compliance identifiers.': 'Zoll- und Steuerverwaltungskontext für EORI, MwSt., Steuer-Mikrokonten und Compliance-Kennungen.',
    'Central-bank context for PLN, bank metadata, exchange-rate references, and financial institution naming.': 'Zentralbankkontext für PLN, Bankmetadaten, Wechselkurse und Namen von Finanzinstituten.',
    'government': 'Behörden',
    'tax': 'Steuern',
    'identifiers': 'Kennungen',
    'postal': 'Post',
    'addresses': 'Adressen',
    'banking': 'Banking',
    'business': 'Unternehmen',
    'invoices': 'Rechnungen',
    'xml': 'XML',
    'environment': 'Umwelt',
    'vehicles': 'Fahrzeuge',
    'insurance': 'Versicherung',
    'customs': 'Zoll',
    'currency': 'Währung'
  },
  es: {
    'Geography &amp; Standards': 'Geografía y estándares',
    'Identity &amp; Standards Profile': 'Perfil de identidad y estándares',
    'Core country registry details and national system standards.': 'Datos registrales clave del país y estándares nacionales del sistema.',
    'Capital City': 'Capital',
    'Native Name': 'Nombre local',
    'ISO Alpha-2': 'ISO alfa-2',
    'ISO Alpha-3': 'ISO alfa-3',
    'Calling Prefix': 'Prefijo telefónico',
    'Internet TLD': 'TLD de internet',
    'Driving Side': 'Lado de conducción',
    'Time Zones': 'Zonas horarias',
    'Warsaw': 'Varsovia',
    'Right': 'Derecha',
    'Locale Conventions': 'Convenciones locales',
    'Local Formats &amp; Layouts': 'Formatos y layouts locales',
    'Locale preferences, separator characters, and display configurations.': 'Preferencias regionales, separadores y configuraciones de visualización.',
    'Active Locale': 'Locale activa',
    'Date Format': 'Formato de fecha',
    'Decimal Separator': 'Separador decimal',
    'Thousands Separator': 'Separador de miles',
    'Postal Pattern': 'Patrón postal',
    'Comma (,)': 'Coma (,)',
    'Space ( ) or Dot (.)': 'Espacio ( ) o punto (.)',
    'Technical Standards': 'Estándares técnicos',
    'Utility &amp; Electrical Profile': 'Perfil de servicios y electricidad',
    'Utility metrics, emergency networks, and infrastructure constants.': 'Métricas de servicios, redes de emergencia y constantes de infraestructura.',
    'Plug Types': 'Tipos de enchufe',
    'Electrical Voltage': 'Voltaje eléctrico',
    'Grid Frequency': 'Frecuencia de red',
    'Emergency Number': 'Número de emergencia',
    'Address Standards': 'Estándares de dirección',
    'Structured address formatting': 'Formato estructurado de dirección',
    'Display order, postal mask, street notation, and delivery-ready field sequence.': 'Orden de visualización, máscara postal, notación de calle y secuencia lista para entrega.',
    'Address Example': 'Ejemplo de dirección',
    'Copy Address': 'Copiar dirección',
    'Recipient': 'Destinatario',
    'Street type and name': 'Tipo y nombre de calle',
    'Building and flat number': 'Número de edificio y piso',
    'Postal code': 'Código postal',
    'City': 'Ciudad',
    'Country': 'País',
    'Fictional person or organization receiving mail.': 'Persona u organización ficticia que recibe correo.',
    'Polish addresses usually include the street type and name.': 'Las direcciones polacas suelen incluir el tipo y nombre de calle.',
    'Building number and apartment unit details.': 'Número de edificio y detalles de la unidad.',
    'Five-digit postal code with hyphen (NN-NNN).': 'Código postal de cinco dígitos con guion (NN-NNN).',
    'City or municipality for display and delivery.': 'Ciudad o municipio para visualización y entrega.',
    'Country label for international mail and cross-border records.': 'Etiqueta de país para correo internacional y registros transfronterizos.',
    'Official Sources': 'Fuentes oficiales',
    'National regulatory &amp; reference portals': 'Portales nacionales regulatorios y de referencia',
    'Verified legislative resources to validate compliance formats.': 'Recursos legales y de referencia verificados para validar formatos de cumplimiento.',
    'Central Statistical Office for official database, classification, and statistical context.': 'Oficina Central de Estadística para bases oficiales, clasificaciones y contexto estadístico.',
    'Official tax administration portal for NIP, VAT, and business status references.': 'Portal oficial de administración tributaria para NIP, IVA y estado empresarial.',
    'Social Insurance Institution reference portal for social security context.': 'Portal de referencia del seguro social para contexto de seguridad social.',
    'Central bank of Poland providing monetary policy and banking institution indexes.': 'Banco central de Polonia con contexto de política monetaria, bancos e instituciones financieras.',
    'Postal authority and official postcode database lookup.': 'Autoridad postal y contexto de la base oficial de códigos postales.',
    'National Court Register context for KRS-shaped business identifiers and company records.': 'Registro judicial nacional para identificadores KRS y registros empresariales.',
    'Central register context for sole-proprietor onboarding and business-data readiness checks.': 'Registro central para onboarding de autónomos y preparación de datos empresariales.',
    'National e-invoicing context for KSeF XML payloads, invoice identifiers, and offline readiness.': 'Contexto nacional de e-factura para XML KSeF, identificadores de factura y preparación offline.',
    'Reference context for Polish tax control files, VAT reporting data, and XML submission readiness.': 'Contexto de referencia para archivos fiscales polacos, datos de IVA y preparación XML.',
    'Territorial and locality classification context for voivodeships, counties, municipalities, towns, and streets.': 'Clasificación territorial de voivodatos, condados, municipios, localidades y calles.',
    'Waste database and product-packaging register context for BDO-shaped business identifiers.': 'Base de residuos y registro de envases para identificadores empresariales BDO.',
    'Vehicle and driver registry context for plates, VIN workflows, registration certificates, and licence data.': 'Registro de vehículos y conductores para matrículas, VIN, certificados y licencias.',
    'Insurance guarantee fund context for vehicle insurance and policy-number workflows.': 'Fondo de garantía de seguros para seguros de vehículo y números de póliza.',
    'Customs and tax administration context for EORI, VAT, tax microaccounts, and compliance identifiers.': 'Administración aduanera y tributaria para EORI, IVA, microcuentas fiscales e identificadores de cumplimiento.',
    'Central-bank context for PLN, bank metadata, exchange-rate references, and financial institution naming.': 'Contexto del banco central para PLN, metadatos bancarios, tipos de cambio y nombres de instituciones financieras.',
    'government': 'gobierno',
    'tax': 'impuestos',
    'identifiers': 'identificadores',
    'postal': 'postal',
    'addresses': 'direcciones',
    'banking': 'banca',
    'business': 'empresas',
    'invoices': 'facturas',
    'xml': 'XML',
    'environment': 'medio ambiente',
    'vehicles': 'vehículos',
    'insurance': 'seguros',
    'customs': 'aduanas',
    'currency': 'moneda'
  },
  'pt-BR': {
    'Geography &amp; Standards': 'Geografia e padrões',
    'Identity &amp; Standards Profile': 'Perfil de identidade e padrões',
    'Core country registry details and national system standards.': 'Dados cadastrais centrais do país e padrões nacionais do sistema.',
    'Capital City': 'Capital',
    'Native Name': 'Nome local',
    'ISO Alpha-2': 'ISO alfa-2',
    'ISO Alpha-3': 'ISO alfa-3',
    'Calling Prefix': 'Prefixo telefônico',
    'Internet TLD': 'TLD da internet',
    'Driving Side': 'Lado de condução',
    'Time Zones': 'Fusos horários',
    'Warsaw': 'Varsóvia',
    'Right': 'Direita',
    'Locale Conventions': 'Convenções locais',
    'Local Formats &amp; Layouts': 'Formatos e layouts locais',
    'Locale preferences, separator characters, and display configurations.': 'Preferências de localidade, separadores e configurações de exibição.',
    'Active Locale': 'Localidade ativa',
    'Date Format': 'Formato de data',
    'Decimal Separator': 'Separador decimal',
    'Thousands Separator': 'Separador de milhares',
    'Postal Pattern': 'Padrão postal',
    'Comma (,)': 'Vírgula (,)',
    'Space ( ) or Dot (.)': 'Espaço ( ) ou ponto (.)',
    'Technical Standards': 'Padrões técnicos',
    'Utility &amp; Electrical Profile': 'Perfil de serviços e eletricidade',
    'Utility metrics, emergency networks, and infrastructure constants.': 'Métricas de serviços, redes de emergência e constantes de infraestrutura.',
    'Plug Types': 'Tipos de tomada',
    'Electrical Voltage': 'Tensão elétrica',
    'Grid Frequency': 'Frequência da rede',
    'Emergency Number': 'Número de emergência',
    'Address Standards': 'Padrões de endereço',
    'Structured address formatting': 'Formatação estruturada de endereço',
    'Display order, postal mask, street notation, and delivery-ready field sequence.': 'Ordem de exibição, máscara postal, notação de rua e sequência pronta para entrega.',
    'Address Example': 'Exemplo de endereço',
    'Copy Address': 'Copiar endereço',
    'Recipient': 'Destinatário',
    'Street type and name': 'Tipo e nome da rua',
    'Building and flat number': 'Número do prédio e apartamento',
    'Postal code': 'Código postal',
    'City': 'Cidade',
    'Country': 'País',
    'Fictional person or organization receiving mail.': 'Pessoa ou organização fictícia que recebe correspondência.',
    'Polish addresses usually include the street type and name.': 'Endereços poloneses geralmente incluem o tipo e o nome da rua.',
    'Building number and apartment unit details.': 'Número do prédio e detalhes da unidade.',
    'Five-digit postal code with hyphen (NN-NNN).': 'Código postal de cinco dígitos com hífen (NN-NNN).',
    'City or municipality for display and delivery.': 'Cidade ou município para exibição e entrega.',
    'Country label for international mail and cross-border records.': 'Rótulo do país para correspondência internacional e registros transfronteiriços.',
    'Official Sources': 'Fontes oficiais',
    'National regulatory &amp; reference portals': 'Portais nacionais regulatórios e de referência',
    'Verified legislative resources to validate compliance formats.': 'Recursos legais e de referência verificados para validar formatos de conformidade.',
    'Central Statistical Office for official database, classification, and statistical context.': 'Escritório Central de Estatística para bases oficiais, classificações e contexto estatístico.',
    'Official tax administration portal for NIP, VAT, and business status references.': 'Portal oficial da administração tributária para NIP, IVA e status empresarial.',
    'Social Insurance Institution reference portal for social security context.': 'Portal de referência da previdência social para contexto de seguridade social.',
    'Central bank of Poland providing monetary policy and banking institution indexes.': 'Banco central da Polônia com contexto de política monetária, bancos e instituições financeiras.',
    'Postal authority and official postcode database lookup.': 'Autoridade postal e contexto da base oficial de códigos postais.',
    'National Court Register context for KRS-shaped business identifiers and company records.': 'Registro judicial nacional para identificadores KRS e registros empresariais.',
    'Central register context for sole-proprietor onboarding and business-data readiness checks.': 'Registro central para onboarding de empresários individuais e prontidão de dados comerciais.',
    'National e-invoicing context for KSeF XML payloads, invoice identifiers, and offline readiness.': 'Contexto nacional de e-notas para XML KSeF, identificadores de fatura e prontidão offline.',
    'Reference context for Polish tax control files, VAT reporting data, and XML submission readiness.': 'Contexto de referência para arquivos fiscais poloneses, dados de IVA e prontidão XML.',
    'Territorial and locality classification context for voivodeships, counties, municipalities, towns, and streets.': 'Classificação territorial para voivodias, condados, municípios, cidades e ruas.',
    'Waste database and product-packaging register context for BDO-shaped business identifiers.': 'Base de resíduos e registro de embalagens para identificadores empresariais BDO.',
    'Vehicle and driver registry context for plates, VIN workflows, registration certificates, and licence data.': 'Registro de veículos e condutores para placas, VIN, certificados e habilitações.',
    'Insurance guarantee fund context for vehicle insurance and policy-number workflows.': 'Fundo garantidor de seguros para seguro veicular e números de apólice.',
    'Customs and tax administration context for EORI, VAT, tax microaccounts, and compliance identifiers.': 'Administração aduaneira e tributária para EORI, IVA, microcontas fiscais e identificadores de conformidade.',
    'Central-bank context for PLN, bank metadata, exchange-rate references, and financial institution naming.': 'Contexto do banco central para PLN, metadados bancários, câmbio e nomes de instituições financeiras.',
    'government': 'governo',
    'tax': 'impostos',
    'identifiers': 'identificadores',
    'postal': 'postal',
    'addresses': 'endereços',
    'banking': 'bancos',
    'business': 'empresas',
    'invoices': 'notas fiscais',
    'xml': 'XML',
    'environment': 'meio ambiente',
    'vehicles': 'veículos',
    'insurance': 'seguros',
    'customs': 'aduana',
    'currency': 'moeda'
  }
};

function applyCountryProtectedValueTranslations(content, locale) {
  const map = COUNTRY_PAGE_RICH_LABELS[locale] || {};
  const values = ['Comma (,)', 'Space ( ) or Dot (.)'];
  let next = content;
  for (const value of values) {
    if (!map[value]) continue;
    next = replaceAllLiteral(next, '<code>' + value + '</code>', '<code>' + map[value] + '</code>');
    next = replaceAllLiteral(next, 'data-copy-value="' + value + '"', 'data-copy-value="' + map[value] + '"');
  }
  const countryName = COUNTRY_NAMES[locale]?.Poland;
  if (countryName) {
    next = replaceAllLiteral(next, '00-001 Warszawa\nPoland</code></pre>', '00-001 Warszawa\n' + countryName + '</code></pre>');
  }
  return next;
}
const TITLE_PHRASES = {
  pl: [
    [' Validator &amp; Explainer', ' - walidator i objaśnienie'], [' Number Inspector', ' - inspektor numeru'], [' Validator', ' - walidator'], [' Inspector', ' - inspektor'], [' Workbench', ' - workbench'], [' Helper', ' - pomocnik'], [' Formatter', ' - formatter'], [' Converter', ' - konwerter'], [' Generator', ' - generator'], [' Builder', ' - builder'], [' Parser', ' - parser'], [' Auditor', ' - audytor'], [' Assistant', ' - asystent'], [' Calculator', ' - kalkulator'], [' Checker', ' - checker'], [' Detector', ' - detektor'], [' Normalizer', ' - normalizator']
  ],
  de: [
    [' Validator &amp; Explainer', ' Validator und Erklärung'], [' Number Inspector', ' Nummerninspektor'], [' Validator', ' Validator'], [' Inspector', ' Inspektor'], [' Workbench', ' Workbench'], [' Helper', ' Helfer'], [' Formatter', ' Formatter'], [' Converter', ' Konverter'], [' Generator', ' Generator'], [' Builder', ' Builder'], [' Parser', ' Parser'], [' Auditor', ' Auditor'], [' Assistant', ' Assistent'], [' Calculator', ' Rechner'], [' Checker', ' Checker'], [' Detector', ' Detektor'], [' Normalizer', ' Normalisierer']
  ],
  es: [
    [' Validator &amp; Explainer', ' - validador y explicación'], [' Number Inspector', ' - inspector de número'], [' Validator', ' - validador'], [' Inspector', ' - inspector'], [' Workbench', ' - workbench'], [' Helper', ' - asistente'], [' Formatter', ' - formateador'], [' Converter', ' - conversor'], [' Generator', ' - generador'], [' Builder', ' - constructor'], [' Parser', ' - parser'], [' Auditor', ' - auditor'], [' Assistant', ' - asistente'], [' Calculator', ' - calculadora'], [' Checker', ' - verificador'], [' Detector', ' - detector'], [' Normalizer', ' - normalizador']
  ],
  'pt-BR': [
    [' Validator &amp; Explainer', ' - validador e explicação'], [' Number Inspector', ' - inspetor de número'], [' Validator', ' - validador'], [' Inspector', ' - inspetor'], [' Workbench', ' - workbench'], [' Helper', ' - auxiliar'], [' Formatter', ' - formatador'], [' Converter', ' - conversor'], [' Generator', ' - gerador'], [' Builder', ' - construtor'], [' Parser', ' - parser'], [' Auditor', ' - auditor'], [' Assistant', ' - assistente'], [' Calculator', ' - calculadora'], [' Checker', ' - verificador'], [' Detector', ' - detector'], [' Normalizer', ' - normalizador']
  ]
};

const COUNTRY_PAGE_TEXT_ONLY_LABELS = new Set([
  'Locale', 'ISO-2', 'ISO-3', 'Calling code', 'TLD', 'Date format', 'Currency', 'Currency Name',
  'Postal pattern', 'Decimal', 'Thousands', 'country code', 'alpha-3', 'phone',
  'domain', 'display', 'money', 'address', 'numbers', 'Quality',
  'Capital City', 'Native Name', 'ISO Alpha-2', 'ISO Alpha-3', 'Calling Prefix', 'Internet TLD', 'Driving Side', 'Time Zones',
  'Active Locale', 'Date Format', 'Decimal Separator', 'Thousands Separator', 'Postal Pattern',
  'Plug Types', 'Electrical Voltage', 'Grid Frequency', 'Emergency Number', 'Address Example',
  'Recipient', 'Street type and name', 'Building and flat number', 'Postal code', 'City', 'Country', 'Right', 'Warsaw',
  'government', 'tax', 'identifiers', 'postal', 'addresses', 'banking', 'business', 'invoices', 'xml', 'environment', 'vehicles', 'insurance', 'customs', 'currency'
]);

function applyCountryPageTranslations(content, locale) {
  let next = content;
  for (const [from, to] of Object.entries({ ...(COUNTRY_PAGE_LABELS[locale] || {}), ...(COUNTRY_PAGE_RICH_LABELS[locale] || {}) })) {
    if (COUNTRY_PAGE_TEXT_ONLY_LABELS.has(from)) {
      next = replaceAllLiteral(next, '>' + from + '<', '>' + to + '<');
      next = replaceAllLiteral(next, 'data-copy-label="' + from + '"', 'data-copy-label="' + to + '"');
    } else {
      next = replaceAllLiteral(next, from, to);
    }
  }
  for (const [from, to] of TITLE_PHRASES[locale] || []) {
    next = replaceAllLiteral(next, from, to);
  }
  next = next.replace(/(\d+) related identifier workbenches/g, (_, count) => {
    if (locale === 'pl') return count + ' powiązanych workbenchy identyfikatorów';
    if (locale === 'de') return count + ' ähnliche Kennungs-Workbenches';
    if (locale === 'es') return count + ' workbenches de identificadores relacionados';
    return count + ' workbenches de identificadores relacionados';
  });
  return next;
}


function protectBlocks(content) {
  const blocks = [];
  const protectedHtml = content.replace(/<(script|style|pre|code|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi, match => {
    const token = `<!--__VH_PROTECTED_${blocks.length}__-->`;
    blocks.push(match);
    return token;
  });
  return { protectedHtml, blocks };
}

function restoreBlocks(content, blocks) {
  return content.replace(/<!--__VH_PROTECTED_(\d+)__-->/g, (_, index) => blocks[Number(index)] || '');
}

function replaceAllLiteral(content, from, to) {
  return content.split(from).join(to);
}

function applyLiteralMap(content, map) {
  let next = content;
  for (const [from, to] of Object.entries(map || {})) {
    next = replaceAllLiteral(next, from, to);
  }
  return next;
}

function localizeCountryNames(content, locale) {
  const names = COUNTRY_NAMES[locale] || {};
  let next = content;
  for (const [from, to] of Object.entries(names)) {
    const pattern = from === 'Europe' ? /\bEurope\b(?!\/)/g : new RegExp(`\\b${escapeRegExp(from)}\\b`, 'g');
    next = next.replace(pattern, to);
  }
  return next;
}

function applyCommonUiTranslations(content, locale) {
  const t = UI[locale];
  if (!t) return content;
  let next = content;
  const exact = {
    '>Home<': `>${t.home}<`,
    '>Countries<': `>${t.countries}<`,
    '>Identifiers<': `>${t.identifiers}<`,
    '>Developer Tools<': `>${t.developerTools}<`,
    '>Encoding<': `>${t.encoding}<`,
    '>Finance<': `>${t.finance}<`,
    '>Hash<': `>${t.hash}<`,
    '>Text<': `>${t.text}<`,
    '>National Identifiers<': `>${t.nationalIdentifiers}<`,
    '>Tool<': `>${t.tool}<`,
    '>Workbench<': `>${t.workbench}<`,
    '>Country Hub<': `>${t.countryHub}<`,
    '>Country Shape<': `>${t.countryShape}<`,
    '>Location<': `>${t.location}<`,
    '>Find a country tool<': `>${t.findCountryTool}<`,
    '>Clear country tool search<': `>${t.clearCountryToolSearch}<`,
    '>Static V2 Compiled<': `>${t.staticCompiled}<`,
    '>Official administrative outline<': `>${t.officialAdministrativeOutline}<`,
    '>Geographic position in Europe<': `>${t.geographicPosition} ${COUNTRY_NAMES[locale]?.Europe || 'Europe'}<`,
    '>Copy<': `>${t.copy}<`,
    '>Run the tool<': `>${t.runTool}<`,
    '>Paste input, choose an action, and copy the result directly in your browser.<': `>${t.pasteInput}<`,
    '>Related tools<': `>${t.relatedTools}<`,
    '>Continue with related tools<': `>${t.continueWithRelated}<`,
    '>Validate<': `>${t.validate}<`,
    '>Copy result<': `>${t.copyResult}<`,
    '>Download result<': `>${t.downloadResult}<`,
    '>Clear<': `>${t.clear}<`,
    '>Output<': `>${t.output}<`,
    '>Waiting for input<': `>${t.waitingForInput}<`,
    '>Advanced analysis<': `>${t.advancedAnalysis}<`,
    '>Documentation<': `>${t.documentation}<`,
    '>Reference notes<': `>${t.references}<`,
    '>FAQ<': `>${t.faq}<`,
    '>References<': `>${t.references}<`,
    '>Examples<': `>${t.examples}<`,
    '>Explanation<': `>${t.explanation}<`,
    '>Expand All<': `>${t.expandAll}<`,
    '>Collapse All<': `>${t.collapseAll}<`,
    'aria-label="Main navigation"': `aria-label="${t.mainNavigation}"`,
    'aria-label="Breadcrumb"': `aria-label="${t.breadcrumb}"`,
    'aria-label="Select language"': `aria-label="${t.selectLanguage}"`,
    'Search across available workbenches on this page.': t.searchCountryWorkbenches
  };
  next = applyLiteralMap(next, exact);
  next = next.replace(/>(available|Available)</g, `>${t.available}<`);
  next = next.replace(/>(ready|Ready)</g, `>${t.ready}<`);
  next = next.replace(/>(planned|Planned)</g, `>${t.planned}<`);
  return next;
}

function applyCountryTitleTranslations(content, locale) {
  const names = COUNTRY_NAMES[locale] || {};
  const t = UI[locale];
  if (!t) return content;
  let next = content;
  for (const [englishName, localizedName] of Object.entries(names)) {
    if (englishName === 'Europe' || englishName === 'South America') continue;
    next = next.replace(new RegExp(`${escapeRegExp(englishName)} Developer Portal`, 'g'), locale === 'de'
      ? `${localizedName} ${t.developerPortal}`
      : locale === 'pl'
        ? `${t.developerPortal}: ${localizedName}`
        : `${t.developerPortal} ${localizedName}`);
    next = next.replace(new RegExp(`${escapeRegExp(englishName)} Developer Tools & Identifiers`, 'g'), locale === 'de'
      ? `${localizedName}: Entwicklertools und Kennungen`
      : locale === 'pl'
        ? `${localizedName}: narzędzia deweloperskie i identyfikatory`
        : locale === 'es'
          ? `${localizedName}: herramientas para desarrolladores e identificadores`
          : `${localizedName}: ferramentas para desenvolvedores e identificadores`);
    next = next.replace(new RegExp(`${escapeRegExp(englishName)} Shape Outline`, 'g'), `${localizedName} - ${t.shapeOutline}`);
    next = next.replace(new RegExp(`${escapeRegExp(englishName)} Map Highlight`, 'g'), `${localizedName} - ${t.mapHighlight}`);
    next = next.replace(new RegExp(`${escapeRegExp(englishName)} in the world`, 'g'), `${localizedName} ${t.inTheWorld}`);
  }
  return next;
}

function applyDocumentationSummaryTranslations(content, locale) {
  const t = UI[locale];
  if (!t) return content;
  return content
    .replace(/<summary>([^<]+) developer examples<\/summary>/g, `<summary>$1 ${t.developerExamples.toLowerCase()}</summary>`)
    .replace(/<summary>([^<]+) practical examples<\/summary>/g, `<summary>$1 ${t.practicalExamples.toLowerCase()}</summary>`)
    .replace(/<summary>How ([^<]+) works<\/summary>/g, `<summary>$1 - ${t.explanation.toLowerCase()}</summary>`)
    .replace(/<summary>([^<]+) questions and edge cases<\/summary>/g, `<summary>$1 - ${t.questionsAndEdgeCases}</summary>`)
    .replace(/<summary>([^<]+) references and limits<\/summary>/g, `<summary>$1 - ${t.referencesAndLimits}</summary>`);
}


function localizedCountryName(englishName, locale) {
  return (COUNTRY_NAMES[locale] && COUNTRY_NAMES[locale][englishName]) || englishName;
}

function applyParameterizedCountryTranslations(content, locale) {
  const t = UI[locale];
  if (!t) return content;
  const common = COMMON_LABELS[locale] || {};
  const countryPattern = '(Poland|Brazil|Spain|Germany)';
  let next = content;
  next = next.replace(new RegExp('Search across available ' + countryPattern + ' workbenches on this page\\.', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Przeszukaj dostępne workbenche kraju: ' + name + '.';
    if (locale === 'de') return 'Durchsuche verfügbare Workbenches für ' + name + '.';
    if (locale === 'es') return 'Busca workbenches disponibles de ' + name + '.';
    return 'Busque workbenches disponíveis de ' + name + '.';
  });
  next = next.replace(new RegExp('Copy ' + countryPattern + ' constants instantly', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Kopiuj stałe kraju ' + name + ' jednym kliknięciem';
    if (locale === 'de') return 'Konstanten für ' + name + ' sofort kopieren';
    if (locale === 'es') return 'Copiar constantes de ' + name + ' al instante';
    return 'Copiar constantes do ' + name + ' instantaneamente';
  });
  next = next.replace(new RegExp(countryPattern + ' workbench suite', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Pakiet workbenchy: ' + name;
    if (locale === 'de') return 'Workbench-Suite für ' + name;
    if (locale === 'es') return 'Suite de workbenches de ' + name;
    return 'Suite de workbenches do ' + name;
  });
  next = next.replace(new RegExp(countryPattern + ' country outline centered on canvas, derived from Natural Earth public-domain admin-0 geometry\\.', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Zarys kraju ' + name + ' wyśrodkowany na obszarze SVG, na podstawie publicznych danych Natural Earth admin-0.';
    if (locale === 'de') return 'Länderumriss von ' + name + ' auf der SVG-Fläche zentriert, basierend auf Public-Domain-Admin-0-Daten von Natural Earth.';
    if (locale === 'es') return 'Contorno de ' + name + ' centrado en el lienzo SVG, derivado de geometría admin-0 de dominio público de Natural Earth.';
    return 'Contorno do ' + name + ' centralizado no canvas SVG, derivado da geometria admin-0 de domínio público da Natural Earth.';
  });
  next = next.replace(new RegExp(countryPattern + ' country outline', 'g'), (_, country) => localizedCountryName(country, locale) + ' - ' + t.shapeOutline);
  next = next.replace(/Polish account, transfer (&amp;|&) clearing standards/g, () => {
    if (locale === 'pl') return 'Polskie standardy kont, przelewów i rozliczeń';
    if (locale === 'de') return 'Polnische Konto-, Überweisungs- und Clearing-Standards';
    if (locale === 'es') return 'Estándares polacos de cuentas, transferencias y compensación';
    return 'Padrões poloneses de contas, transferências e compensação';
  });
  next = next.replace(/Polish payment rails (&amp;|&) offline helpers/g, () => {
    if (locale === 'pl') return 'Polskie systemy płatności i pomocniki offline';
    if (locale === 'de') return 'Polnische Zahlungswege und Offline-Helfer';
    if (locale === 'es') return 'Redes de pago polacas y ayudas offline';
    return 'Trilhos de pagamento poloneses e auxiliares offline';
  });
  next = next.replace(new RegExp(countryPattern + ' account, transfer (&amp;|&) banking standards', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Standardy kont, przelewów i bankowości: ' + name;
    if (locale === 'de') return 'Konto-, Überweisungs- und Banking-Standards für ' + name;
    if (locale === 'es') return 'Estándares de cuentas, transferencias y banca de ' + name;
    return 'Padrões de contas, transferências e bancos do ' + name;
  });
  next = next.replace(new RegExp(countryPattern + ' payment rails (&amp;|&) offline helpers', 'g'), (_, country) => {
    const name = localizedCountryName(country, locale);
    if (locale === 'pl') return 'Systemy płatności i pomocniki offline: ' + name;
    if (locale === 'de') return 'Zahlungswege und Offline-Helfer für ' + name;
    if (locale === 'es') return 'Redes de pago y ayudas offline de ' + name;
    return 'Trilhos de pagamento e auxiliares offline do ' + name;
  });
  next = next.replace(/IBAN, domestic account context, BIC\/SWIFT, SEPA or local clearing notes, and payment-ready developer workflows\./g, () => {
    if (locale === 'pl') return 'IBAN, kontekst kont krajowych, BIC/SWIFT, SEPA lub lokalne rozliczenia oraz przepływy gotowe dla deweloperów.';
    if (locale === 'de') return 'IBAN, Kontext inländischer Konten, BIC/SWIFT, SEPA oder lokale Clearing-Hinweise und entwicklerbereite Zahlungsabläufe.';
    if (locale === 'es') return 'IBAN, contexto de cuentas nacionales, BIC/SWIFT, SEPA o notas de compensación local y flujos listos para desarrolladores.';
    return 'IBAN, contexto de contas domésticas, BIC/SWIFT, SEPA ou notas de compensação local e fluxos prontos para desenvolvedores.';
  });
  next = next.replace(/Local payment systems, card context, bank transfer references, currency formatting, and browser-only payment data helpers\./g, () => {
    if (locale === 'pl') return 'Lokalne systemy płatności, kontekst kart, referencje przelewów, formatowanie walut i przeglądarkowe pomocniki danych płatniczych.';
    if (locale === 'de') return 'Lokale Zahlungssysteme, Kartenkontext, Überweisungsreferenzen, Währungsformatierung und browserbasierte Zahlungsdaten-Helfer.';
    if (locale === 'es') return 'Sistemas de pago locales, contexto de tarjetas, referencias bancarias, formato de moneda y ayudas de datos de pago en navegador.';
    return 'Sistemas de pagamento locais, contexto de cartões, referências bancárias, formatação de moeda e auxiliares de dados de pagamento no navegador.';
  });
  next = applyLiteralMap(next, common);
  return next;
}

function localizeSeoAndStructuredData(content, locale, routePath) {
  let next = content;
  next = next.replace(/<html\s+lang="[^"]+">/i, `<html lang="${locale}">`);
  next = next.replace(/<link rel="canonical" href="https:\/\/validohub\.com\/en\//g, `<link rel="canonical" href="https://validohub.com/${locale}/`);
  next = next.replace(/("url"\s*:\s*")https:\/\/validohub\.com\/en\//g, `$1https://validohub.com/${locale}/`);
  next = next.replace(/("url"\s*:\s*")https:\\\/\\\/validohub\.com\\\/en\\\//g, `$1https:\/\/validohub.com\/${locale}\/`);
  next = next.replace(/"inLanguage"\s*:\s*"en"/g, `"inLanguage":"${locale}"`);
  next = next.replace(/content="\/en\//g, `content="/${locale}/`);
  if (routePath) {
    next = next.replace(/"url":"https:\/\/validohub\.com[^"]+"/g, `"url":"https://validohub.com${routePath}"`);
  }
  return next;
}

function rewriteHrefLocale(content, locale, routeRegistry) {
  return content.replace(/href="\/en\/([^"]*)"/g, (match, target) => {
    const normalizedTarget = String(target || '').replace(/^\/+/, '');
    const localizedCandidate = `/${locale}/${normalizedTarget}`;
    const normalizedLocalized = localizedCandidate.endsWith('/') ? localizedCandidate : `${localizedCandidate}/`;
    if (!routeRegistry.has(normalizedLocalized)) return match;
    return `href="${localizedCandidate}"`;
  });
}

function injectAlternateLinks(content, currentPath, routeRegistry, locales) {
  const { suffix } = splitRouteLocale(currentPath);
  const alternateTags = [];
  for (const localeCode of locales) {
    const candidatePath = routeForLocale(localeCode, suffix);
    if (routeRegistry.has(candidatePath)) {
      alternateTags.push(`<link rel="alternate" hreflang="${localeCode}" href="https://validohub.com${candidatePath}">`);
    }
  }
  const englishPath = routeForLocale('en', suffix);
  if (routeRegistry.has(englishPath)) {
    alternateTags.push(`<link rel="alternate" hreflang="x-default" href="https://validohub.com${englishPath}">`);
  }

  let next = content.replace(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">\s*/gi, '');
  if (alternateTags.length) {
    next = next.replace('</head>', `  ${alternateTags.join('\n  ')}\n</head>`);
  }
  return next;
}

function translateVisibleHtml(content, locale) {
  const normalized = normalizeLocale(locale);
  if (normalized === 'en') return content;
  const { protectedHtml, blocks } = protectBlocks(content);
  let next = protectedHtml;
  next = applyCommonUiTranslations(next, normalized);
  next = applyLiteralMap(next, SECTION_LABELS[normalized]);
  next = applyParameterizedCountryTranslations(next, normalized);
  next = applyCountryTitleTranslations(next, normalized);
  next = applyDocumentationSummaryTranslations(next, normalized);
  next = applyCountryPageTranslations(next, normalized);
  next = localizeCountryNames(next, normalized);
  const restored = restoreBlocks(next, blocks);
  return applyCountryProtectedValueTranslations(restored, normalized);
}

export async function applyFinalLocalizationPass(routeRegistry, siteRoot, locales) {
  const configuredLocales = locales && locales.length ? locales : ['en'];
  const englishRoutes = routeRegistry.getAll().filter(route => route.path.startsWith('/en/'));

  for (const locale of configuredLocales) {
    if (locale === 'en') continue;
    for (const englishRoute of englishRoutes) {
      const { suffix } = splitRouteLocale(englishRoute.path);
      const localizedPath = routeForLocale(locale, suffix);
      if (!routeRegistry.has(localizedPath)) {
        routeRegistry.register(localizedPath, {
          type: englishRoute.type,
          title: englishRoute.title,
          sourceOwner: 'node',
          outputPath: resolve(siteRoot, localizedPath.replace(/^\//, ''), 'index.html'),
          metadata: { fallback: true, locale, sourcePath: englishRoute.path }
        });
      }
    }
  }

  for (const route of routeRegistry.getAll()) {
    const { locale, suffix } = splitRouteLocale(route.path);
    if (locale === 'en') continue;

    const englishPath = routeForLocale('en', suffix);
    const englishRoute = routeRegistry.get(englishPath);
    if (!englishRoute || !(await pathExists(englishRoute.outputPath))) continue;

    const shouldRefreshFromNodeSource = englishRoute.sourceOwner === 'node' || ['country', 'countries'].includes(englishRoute.type);
    if ((await pathExists(route.outputPath)) && !shouldRefreshFromNodeSource) continue;

    let content = await readFile(englishRoute.outputPath, 'utf8');
    content = rewriteHrefLocale(content, locale, routeRegistry);
    content = localizeSeoAndStructuredData(content, locale, route.path);
    content = translateVisibleHtml(content, locale);
    await mkdir(dirname(route.outputPath), { recursive: true });
    await writeFile(route.outputPath, content, 'utf8');
    console.log(`✓ Generated localized route: ${route.path}`);
  }

  for (const route of routeRegistry.getAll()) {
    if (!(await pathExists(route.outputPath))) continue;
    const { locale } = splitRouteLocale(route.path);
    let content = await readFile(route.outputPath, 'utf8');
    if (locale !== 'en') {
      content = rewriteHrefLocale(content, locale, routeRegistry);
      content = localizeSeoAndStructuredData(content, locale, route.path);
      content = translateVisibleHtml(content, locale);
    }
    content = injectAlternateLinks(content, route.path, routeRegistry, configuredLocales);
    await writeFile(route.outputPath, content, 'utf8');
  }
}

export function localizedRuntimeLabels(localeCode) {
  return UI[normalizeLocale(localeCode)] || {};
}
