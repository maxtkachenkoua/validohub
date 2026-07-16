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
  next = localizeCountryNames(next, normalized);
  return restoreBlocks(next, blocks);
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
