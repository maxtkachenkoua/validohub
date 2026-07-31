import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { translateVisibleHtml } from './localization-pass.mjs';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const siteRoot = resolve(projectRoot, 'generated', 'validohub');
const DEFAULT_LOCALES = ['en', 'es', 'pt-BR', 'de', 'fr', 'pl', 'uk'];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const REPAIR_NEEDLES = [
  'Waiting for input',
  'Developer snapshot JSON',
  'Raw JSON output',
  'Primary local workbench',
  'Secondary local workflow',
  'Primary local atelier',
  'Secondary local atelier',
  'Search country workbenches',
  'Enter to jump',
  'Use current input',
  'Browser history',
  'Multi-row validator',
  'Run batch to compare pass/review states',
  'History, batch diagnostics',
  'History, batch checks',
  'Input is available locally.',
  'Currency / decimal browser-checkable evidence detected.',
  'Browser-local amount/currency display.',
  'Numeric amount extracted from the current input.',
  'Legal tender status, exchange rates',
  'Keep compact, display, masked',
  'Do not treat browser-local output',
  'Retain negative fixtures',
  'Open the universal workbenches',
  'the universal workbenches',
  'for payloads, encoding',
  'Identity, registry, tax, payment',
  'workbenches with local samples',
  'Use fresh browser-only values',
  'Generation belongs next to validation',
  'Named slices, local meaning',
  'Pass/review states must match',
  'When the domain supports generation',
  'Offline structure is not official registry status',
  'Format, inspect, and copy clean payloads',
  'Decode token headers and claims locally',
  'Encode browser-only test strings',
  'Encode query strings and route-safe values',
  'Test pattern behavior before shipping',
  'Generate copy-ready identifiers',
  'Create structural IBAN fixtures',
  'Generate IBAN check digits',
  'PESEL checksum, date',
  'PIX payload checks',
  'SIRET/SIREN/NIC evidence',
  'IdNr structure, control evidence',
  'German Tax ID / IdNr',
  'BSN 11-test replay',
  'Rodne cislo parser',
  'RNOKPP local structure',
  'Codice fiscale parser',
  'Czech Rodne cislo',
  'Ukrainian RNOKPP',
  'Italian Codice Fiscale',
  'IBAN generator for structural fixtures',
  'Generate Polish IBAN',
  'Generate French IBAN',
  'Generate German IBAN',
  'fixture payload',
  'Neutral world atlas',
  'Hover or focus the map',
  'Local identifiers and payment formats',
  'World map summary',
  'country hubs online',
  'identifier families indexed',
  'Each full-premium country',
  'Open all 194 country hubs',
  'Banking fixtures',
  'Privacy boundary',
  'Runs locally',
  'Completed locally',
  'Network calls',
  'Sample fixtures',
  'No upload, database, runtime API, or server-side execution.',
  'Advanced analysis',
  'Integration traps',
  'Official boundary',
  'Quality notes',
  'Field breakdown',
  'Validation pipeline',
  'Related tools',
  'Continue with related',
  'Search global tools',
  'Find the workbench',
  'Primary workbench',
  'Reference workflow',
  'Validate',
  'Generate',
  'Clear',
  'Copy result',
  'Download result',
  'ВаліднийoHub',
  'ВаліднийоHub',
  'Валіднийate',
  'Валіднийator',
  'Poprawnyate',
  'Poprawnyator',
  'INTELIGENCJA DEVELOPERSKA TYLKO W PRZEGLĄDARCE',
  'ІНТЕЛЕКТ ДЛЯ РОЗРОБНИКІВ ЛИШЕ В БРАУЗЕРІ',
  'Browser-only developer воркбенчі',
  'Waliduj, inspect',
  'Перевіряйте, inspect',
  'Waliduj dane płatnicze',
  'Перевіряти платіжні дані',
  'Generuj and inspect JSON fixtures',
  'Згенерувати and inspect JSON fixtures',
  'Generuj local accounting evidence checklist',
  'Згенерувати local accounting evidence checklist',
  'Banking and Waliduj dane płatnicze',
  'Банкінг and Перевіряти платіжні дані',
  'Developer intelligence for',
  'Developer Tools',
  'Developer Інструменти',
  'Narzędzia deweloperskie \\u0026 Identifiers',
  'Інструменти розробника \\u0026 Identifiers',
  'Practical ValidoHub guides for browser-only developer tools',
  'Browse ValidoHub global browser-only validators',
  'Generuj, validate, convert',
  'Згенерувати, validate, convert',
  'lokalizacja data',
  'локаль data',
  'developer fixtures in your browser'
];

const FAST_REPAIRS = {
  es: {
    'Waiting for input': 'Esperando entrada',
    'Developer snapshot JSON': 'Vista previa de API para desarrolladores',
    'Raw JSON output': 'Salida JSON sin procesar',
    'Primary local workbench': 'Workbench local principal',
    'Secondary local workflow': 'Flujo local secundario',
    'Primary local atelier': 'Taller local principal',
    'Secondary local atelier': 'Taller local secundario',
    'Search country workbenches': 'Buscar workbenches de país',
    'Enter to jump': 'Enter para abrir',
    'Use current input': 'Usar entrada actual',
    'Browser history': 'Historial del navegador',
    'Multi-row validator': 'Validador multifila',
    'Run batch to compare pass/review states': 'Ejecuta el lote para comparar estados de aprobado/revisión',
    'History, batch diagnostics': 'Historial, diagnósticos por lote',
    'History, batch checks': 'Historial, comprobaciones por lote',
    'Input is available locally.': 'La entrada está disponible localmente.',
    'Currency / decimal browser-checkable evidence detected.': 'Evidencia de moneda/decimal comprobable en el navegador detectada.',
    'Browser-local amount/currency display.': 'Vista local del navegador para importe/moneda.',
    'Numeric amount extracted from the current input.': 'Importe numérico extraído de la entrada actual.',
    'Legal tender status, exchange rates': 'El estado de curso legal y los tipos de cambio',
    'Keep compact, display, masked': 'Mantén formas compactas, visibles, enmascaradas',
    'Do not treat browser-local output': 'No trates la salida local del navegador',
    'Retain negative fixtures': 'Conserva fixtures negativos',
    'Completed locally': 'Completado localmente',
    'Network calls': 'Llamadas de red',
    'Sample fixtures': 'Fixtures de muestra',
    'fixture payload': 'datos de prueba',
    'No upload, database, runtime API, or server-side execution.': 'Sin subida, base de datos, API en runtime ni ejecución del servidor.',
    'Advanced analysis': 'Análisis avanzado',
    'Integration traps': 'Trampas de integración',
    'Official boundary': 'Límite oficial',
    'Quality notes': 'Notas de calidad',
    'Field breakdown': 'Desglose de campos',
    'Validation pipeline': 'Pipeline de validación',
    'Related tools': 'Herramientas relacionadas',
    'Continue with related': 'Continuar con relacionados',
    'Search global tools': 'Buscar herramientas globales',
    'Find the workbench': 'Encontrar el workbench',
    'Primary workbench': 'Workbench principal',
    'Reference workflow': 'Flujo de referencia',
    'Copy result': 'Copiar resultado',
    'Download result': 'Descargar resultado'
  },
  'pt-BR': {
    'Waiting for input': 'Aguardando entrada',
    'Developer snapshot JSON': 'Prévia da API para desenvolvedores',
    'Raw JSON output': 'Saída JSON bruta',
    'Primary local workbench': 'Workbench local principal',
    'Secondary local workflow': 'Fluxo local secundário',
    'Primary local atelier': 'Ateliê local principal',
    'Secondary local atelier': 'Ateliê local secundário',
    'Search country workbenches': 'Buscar workbenches de país',
    'Enter to jump': 'Enter para abrir',
    'Use current input': 'Usar entrada atual',
    'Browser history': 'Histórico do navegador',
    'Multi-row validator': 'Validador multilinha',
    'Run batch to compare pass/review states': 'Execute o lote para comparar estados de aprovado/revisão',
    'History, batch diagnostics': 'Histórico, diagnósticos em lote',
    'History, batch checks': 'Histórico, verificações em lote',
    'Input is available locally.': 'A entrada está disponível localmente.',
    'Currency / decimal browser-checkable evidence detected.': 'Evidência de moeda/decimal verificável no navegador detectada.',
    'Browser-local amount/currency display.': 'Exibição local do navegador para valor/moeda.',
    'Numeric amount extracted from the current input.': 'Valor numérico extraído da entrada atual.',
    'Legal tender status, exchange rates': 'Status de moeda legal e taxas de câmbio',
    'Keep compact, display, masked': 'Mantenha formas compactas, exibidas, mascaradas',
    'Do not treat browser-local output': 'Não trate a saída local do navegador',
    'Retain negative fixtures': 'Mantenha fixtures negativas',
    'Completed locally': 'Concluído localmente',
    'Network calls': 'Chamadas de rede',
    'Sample fixtures': 'Fixtures de exemplo',
    'fixture payload': 'dados de teste',
    'No upload, database, runtime API, or server-side execution.': 'Sem upload, banco de dados, API em runtime ou execução no servidor.',
    'Advanced analysis': 'Análise avançada',
    'Integration traps': 'Armadilhas de integração',
    'Official boundary': 'Limite oficial',
    'Quality notes': 'Notas de qualidade',
    'Field breakdown': 'Detalhamento de campos',
    'Validation pipeline': 'Pipeline de validação',
    'Related tools': 'Ferramentas relacionadas',
    'Continue with related': 'Continuar com relacionados',
    'Search global tools': 'Buscar ferramentas globais',
    'Find the workbench': 'Encontrar o workbench',
    'Primary workbench': 'Workbench principal',
    'Reference workflow': 'Fluxo de referência',
    'Copy result': 'Copiar resultado',
    'Download result': 'Baixar resultado'
  },
  de: {
    'Waiting for input': 'Warte auf Eingabe',
    'Developer snapshot JSON': 'API-Vorschau für Entwickler',
    'Raw JSON output': 'Rohes JSON-Ergebnis',
    'Primary local workbench': 'Primärer lokaler Workbench',
    'Secondary local workflow': 'Sekundärer lokaler Workflow',
    'Primary local atelier': 'Primärer lokaler Arbeitsbereich',
    'Secondary local atelier': 'Sekundärer lokaler Arbeitsbereich',
    'Search country workbenches': 'Länder-Workbenches suchen',
    'Enter to jump': 'Enter zum Öffnen',
    'Use current input': 'Aktuelle Eingabe verwenden',
    'Browser history': 'Browserverlauf',
    'Multi-row validator': 'Mehrzeilen-Validator',
    'Run batch to compare pass/review states': 'Batch ausführen, um Pass-/Review-Status zu vergleichen',
    'History, batch diagnostics': 'Verlauf, Batch-Diagnosen',
    'History, batch checks': 'Verlauf, Batch-Prüfungen',
    'Input is available locally.': 'Die Eingabe ist lokal verfügbar.',
    'Currency / decimal browser-checkable evidence detected.': 'Browserprüfbare Währungs-/Dezimal-Evidenz erkannt.',
    'Browser-local amount/currency display.': 'Browserlokale Anzeige für Betrag/Währung.',
    'Numeric amount extracted from the current input.': 'Numerischer Betrag aus der aktuellen Eingabe extrahiert.',
    'Legal tender status, exchange rates': 'Status als gesetzliches Zahlungsmittel und Wechselkurse',
    'Keep compact, display, masked': 'Kompakte, sichtbare und maskierte Formen getrennt halten',
    'Do not treat browser-local output': 'Browserlokale Ausgabe nicht als Beleg behandeln',
    'Retain negative fixtures': 'Negative Fixtures beibehalten',
    'Öffnen the universal workbenches for payloads, encoding, tokens, identifiers, regexes, and cross-country IBAN workflows.': 'Öffne universelle Workbenches für Payloads, Encoding, Tokens, Kennungen, Regex und länderübergreifende IBAN-Workflows.',
    'Open the universal workbenches for payloads, encoding, tokens, identifiers, regexes, and cross-country IBAN workflows.': 'Öffne universelle Workbenches für Payloads, Encoding, Tokens, Kennungen, Regex und länderübergreifende IBAN-Workflows.',
    'Completed locally': 'Lokal abgeschlossen',
    'Network calls': 'Netzwerkaufrufe',
    'Sample fixtures': 'Beispiel-Fixtures',
    'fixture payload': 'Testdaten',
    'No upload, database, runtime API, or server-side execution.': 'Kein Upload, keine Datenbank, keine Runtime-API und keine serverseitige Ausführung.',
    'Advanced analysis': 'Erweiterte Analyse',
    'Integration traps': 'Integrationsfallen',
    'Official boundary': 'Offizielle Grenze',
    'Quality notes': 'Qualitätshinweise',
    'Field breakdown': 'Feldaufschlüsselung',
    'Validation pipeline': 'Validierungspipeline',
    'Related tools': 'Ähnliche Tools',
    'Continue with related': 'Mit ähnlichen Tools fortfahren',
    'Search global tools': 'Globale Tools suchen',
    'Find the workbench': 'Workbench finden',
    'Primary workbench': 'Primärer Workbench',
    'Reference workflow': 'Referenz-Workflow',
    'Copy result': 'Ergebnis kopieren',
    'Download result': 'Ergebnis herunterladen'
  },
  fr: {
    'Waiting for input': 'En attente d’entrée',
    'Developer snapshot JSON': 'Aperçu API développeur',
    'Raw JSON output': 'Sortie JSON brute',
    'Primary local workbench': 'Workbench local principal',
    'Secondary local workflow': 'Workflow local secondaire',
    'Primary local atelier': 'Atelier local principal',
    'Secondary local atelier': 'Atelier local secondaire',
    'Search country workbenches': 'Rechercher des workbenches pays',
    'Enter to jump': 'Entrée pour ouvrir',
    'Use current input': 'Utiliser l’entrée actuelle',
    'Browser history': 'Historique du navigateur',
    'Multi-row validator': 'Validateur multiligne',
    'Run batch to compare pass/review states': 'Lancer le lot pour comparer les états réussite/révision',
    'History, batch diagnostics': 'Historique, diagnostics par lot',
    'History, batch checks': 'Historique, contrôles par lot',
    'Input is available locally.': 'L’entrée est disponible localement.',
    'Currency / decimal browser-checkable evidence detected.': 'Preuve monnaie/décimale vérifiable dans le navigateur détectée.',
    'Browser-local amount/currency display.': 'Affichage montant/devise local au navigateur.',
    'Numeric amount extracted from the current input.': 'Montant numérique extrait de l’entrée actuelle.',
    'Legal tender status, exchange rates': 'Le cours légal et les taux de change',
    'Keep compact, display, masked': 'Gardez les formes compactes, affichées et masquées',
    'Do not treat browser-local output': 'Ne traitez pas la sortie locale du navigateur',
    'Retain negative fixtures': 'Conservez les fixtures négatives',
    'Completed locally': 'Terminé localement',
    'Network calls': 'Appels réseau',
    'Sample fixtures': 'Fixtures d’exemple',
    'fixture payload': 'données de test',
    'No upload, database, runtime API, or server-side execution.': 'Aucun upload, base de données, API runtime ni exécution côté serveur.',
    'Advanced analysis': 'Analyse avancée',
    'Integration traps': 'Pièges d’intégration',
    'Official boundary': 'Limite officielle',
    'Quality notes': 'Notes qualité',
    'Field breakdown': 'Décomposition des champs',
    'Validation pipeline': 'Pipeline de validation',
    'Related tools': 'Outils liés',
    'Continue with related': 'Continuer avec les outils liés',
    'Search global tools': 'Rechercher des outils globaux',
    'Find the workbench': 'Trouver le workbench',
    'Primary workbench': 'Workbench principal',
    'Reference workflow': 'Workflow de référence',
    'Copy result': 'Copier le résultat',
    'Download result': 'Télécharger le résultat'
  },
  pl: {
    'Waiting for input': 'Oczekiwanie na dane',
    'Developer snapshot JSON': 'Podgląd API dla deweloperów',
    'Raw JSON output': 'Surowy wynik JSON',
    'Primary local workbench': 'Główny lokalny workbench',
    'Secondary local workflow': 'Dodatkowy lokalny workflow',
    'Primary local atelier': 'Główne lokalne atelier',
    'Secondary local atelier': 'Dodatkowe lokalne atelier',
    'Search country workbenches': 'Szukaj workbenchy krajowych',
    'Enter to jump': 'Enter, aby otworzyć',
    'Use current input': 'Użyj bieżącego wejścia',
    'Browser history': 'Historia przeglądarki',
    'Multi-row validator': 'Walidator wielowierszowy',
    'Run batch to compare pass/review states': 'Uruchom batch, aby porównać statusy sukcesu i przeglądu',
    'History, batch diagnostics': 'Historia, diagnostyka batch',
    'History, batch checks': 'Historia, kontrole batch',
    'Input is available locally.': 'Dane wejściowe są dostępne lokalnie.',
    'Currency / decimal browser-checkable evidence detected.': 'Wykryto dowód waluty/formatu dziesiętnego sprawdzalny w przeglądarce.',
    'Browser-local amount/currency display.': 'Lokalny w przeglądarce widok kwoty/waluty.',
    'Numeric amount extracted from the current input.': 'Kwota numeryczna wyodrębniona z bieżącego wejścia.',
    'Legal tender status, exchange rates': 'Status prawnego środka płatniczego i kursy walut',
    'Keep compact, display, masked': 'Trzymaj osobno formy kompaktowe, wyświetlane i maskowane',
    'Do not treat browser-local output': 'Nie traktuj wyjścia lokalnego w przeglądarce',
    'Retain negative fixtures': 'Zachowaj negatywne fixtures',
    'Completed locally': 'Ukończono lokalnie',
    'Network calls': 'Wywołania sieciowe',
    'Sample fixtures': 'Przykładowe fixtures',
    'fixture payload': 'dane testowe',
    'No upload, database, runtime API, or server-side execution.': 'Bez uploadu, bazy danych, API runtime ani wykonania po stronie serwera.',
    'Advanced analysis': 'Zaawansowana analiza',
    'Integration traps': 'Pułapki integracji',
    'Official boundary': 'Granica oficjalna',
    'Quality notes': 'Notatki jakości',
    'Field breakdown': 'Rozbicie pól',
    'Validation pipeline': 'Pipeline walidacji',
    'Related tools': 'Powiązane narzędzia',
    'Continue with related': 'Kontynuuj z powiązanymi',
    'Search global tools': 'Szukaj narzędzi globalnych',
    'Find the workbench': 'Znajdź workbench',
    'Primary workbench': 'Główny workbench',
    'Reference workflow': 'Workflow referencyjny',
    'Copy result': 'Skopiuj wynik',
    'Download result': 'Pobierz wynik'
  },
  uk: {
    'Waiting for input': 'Очікування введення',
    'Developer snapshot JSON': 'Попередній перегляд API для розробників',
    'Raw JSON output': 'Сирий JSON-вивід',
    'Primary local workbench': 'Основний локальний воркбенч',
    'Secondary local workflow': 'Додатковий локальний workflow',
    'Primary local atelier': 'Основна локальна майстерня',
    'Secondary local atelier': 'Додаткова локальна майстерня',
    'Search country workbenches': 'Пошук country-воркбенчів',
    'Enter to jump': 'Enter, щоб відкрити',
    'Use current input': 'Використати поточне введення',
    'Browser history': 'Історія браузера',
    'Multi-row validator': 'Багаторядковий валідатор',
    'Run batch to compare pass/review states': 'Запустіть пакет, щоб порівняти стани успіху/перевірки',
    'History, batch diagnostics': 'Історія, пакетна діагностика',
    'History, batch checks': 'Історія, пакетні перевірки',
    'Input is available locally.': 'Введення доступне локально.',
    'Currency / decimal browser-checkable evidence detected.': 'Виявлено browser-checkable доказ валюти/десяткового формату.',
    'Browser-local amount/currency display.': 'Локальне у браузері відображення суми/валюти.',
    'Numeric amount extracted from the current input.': 'Числову суму витягнуто з поточного введення.',
    'Legal tender status, exchange rates': 'Статус законного платіжного засобу та курси валют',
    'Keep compact, display, masked': 'Тримайте компактні, видимі й масковані форми',
    'Do not treat browser-local output': 'Не вважайте браузерний локальний вивід',
    'Retain negative fixtures': 'Зберігайте негативні fixtures',
    'Completed locally': 'Завершено локально',
    'Network calls': 'Мережеві виклики',
    'Sample fixtures': 'Тестові fixtures',
    'fixture payload': 'тестові дані',
    'No upload, database, runtime API, or server-side execution.': 'Без upload, бази даних, runtime API або серверного виконання.',
    'Advanced analysis': 'Розширений аналіз',
    'Integration traps': 'Інтеграційні пастки',
    'Official boundary': 'Офіційна межа',
    'Quality notes': 'Нотатки якості',
    'Field breakdown': 'Розбір полів',
    'Validation pipeline': 'Пайплайн валідації',
    'Related tools': 'Пов’язані інструменти',
    'Continue with related': 'Продовжити з пов’язаними',
    'Search global tools': 'Пошук глобальних інструментів',
    'Find the workbench': 'Знайти воркбенч',
    'Primary workbench': 'Основний воркбенч',
    'Reference workflow': 'Референсний workflow',
    'Copy result': 'Скопіювати результат',
    'Download result': 'Завантажити результат'
  }
};

const SHARED_FAST_REPAIRS = {
  es: {
    'German Tax ID / IdNr Validator': 'Validador de ID fiscal alemán / IdNr',
    'German Tax ID / IdNr - validator': 'Validador de ID fiscal alemán / IdNr',
    'German Tax ID / IdNr - validador': 'Validador de ID fiscal alemán / IdNr',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Atlas mundial neutral. Pasa el cursor o enfoca un país para revelar una vista premium de la forma; haz clic para abrir el hub.',
    'Generar French IBAN fixture payloads.': 'Genera datos de prueba IBAN franceses.',
    'Generar German IBAN fixture payloads.': 'Genera datos de prueba IBAN alemanes.',
    'Generar Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Genera datos JSON neerlandeses con identificadores enmascarados, dirección local, teléfono, IBAN, VAT y campos regionales.',
    'Czech Rodne cislo - validador': 'Validador checo Rodne cislo',
    'Ukrainian RNOKPP - validador': 'Validador RNOKPP ucraniano',
    'Italian Codice Fiscale - validador': 'Validador italiano Codice Fiscale'
  },
  'pt-BR': {
    'German Tax ID / IdNr Validator': 'Validador de ID fiscal alemão / IdNr',
    'German Tax ID / IdNr - validator': 'Validador de ID fiscal alemão / IdNr',
    'German Tax ID / IdNr - validador': 'Validador de ID fiscal alemão / IdNr',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Atlas mundial neutro. Passe o cursor ou foque um país para revelar uma prévia premium do formato; clique para abrir o hub.',
    'Gerar French IBAN fixture payloads.': 'Gere dados de teste IBAN franceses.',
    'Gerar German IBAN fixture payloads.': 'Gere dados de teste IBAN alemães.',
    'Gerar Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Gere dados JSON neerlandeses com identificadores mascarados, endereço local, telefone, IBAN, VAT e campos regionais.',
    'Czech Rodne cislo - validador': 'Validador checo Rodne cislo',
    'Ukrainian RNOKPP - validador': 'Validador RNOKPP ucraniano',
    'Italian Codice Fiscale - validador': 'Validador italiano Codice Fiscale'
  },
  de: {
    'German Tax ID / IdNr Validator': 'Deutsche Steuer-ID / IdNr - Prüfer',
    'German Tax ID / IdNr - Validator': 'Deutsche Steuer-ID / IdNr - Prüfer',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Neutraler Weltatlas. Hover oder Fokus auf ein Land zeigt eine Premium-Formvorschau; Klick öffnet den Länderhub.',
    'Generieren local bank-account fixture payloads, split routing/account blocks, and prepare payment QA data.': 'Lokale Bankkonto-Testdaten generieren, Routing-/Kontoblöcke trennen und Zahlungs-QA-Daten vorbereiten.',
    'Generieren Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Niederländische JSON-Testdaten mit maskierten Kennungen, lokaler Adresse, Telefon, IBAN, VAT und Gebietsschema-Feldern generieren.',
    'Czech Rodne cislo Validator': 'Tschechischer Rodne-cislo-Prüfer',
    'Italian Codice Fiscale Validator': 'Italienischer Codice-fiscale-Prüfer',
    'Ukrainian RNOKPP Helper': 'Ukrainischer RNOKPP-Helfer',
    'Ukrainian RNOKPP Validator': 'Ukrainischer RNOKPP-Prüfer'
  },
  fr: {
    'German Tax ID / IdNr Validator': 'Validateur d’identifiant fiscal allemand / IdNr',
    'German Tax ID / IdNr - validateur': 'Validateur d’identifiant fiscal allemand / IdNr',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Atlas mondial neutre. Survolez ou focalisez un pays pour révéler une prévisualisation premium de sa forme ; cliquez pour ouvrir le hub.',
    'Générer French IBAN fixture payloads.': 'Générer des données de test IBAN françaises.',
    'Générer German IBAN fixture payloads.': 'Générer des données de test IBAN allemandes.',
    'Générer Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Générer des données JSON néerlandaises avec identifiants masqués, adresse locale, téléphone, IBAN, VAT et champs régionaux.',
    'Czech Rodne cislo - validateur': 'Validateur tchèque Rodne cislo',
    'Ukrainian RNOKPP - validateur': 'Validateur RNOKPP ukrainien',
    'Italian Codice Fiscale - validateur': 'Validateur italien Codice Fiscale'
  },
  pl: {
    'German Tax ID / IdNr Validator': 'Niemiecki identyfikator podatkowy / IdNr - walidator',
    'German Tax ID / IdNr - walidator': 'Niemiecki identyfikator podatkowy / IdNr - walidator',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Neutralny atlas świata. Najedź lub sfokusuj kraj, aby zobaczyć premium podgląd kształtu; kliknij, aby otworzyć hub.',
    'Generuj French IBAN fixture payloads.': 'Generuj francuskie dane testowe IBAN.',
    'Generuj German IBAN fixture payloads.': 'Generuj niemieckie dane testowe IBAN.',
    'Generuj Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Generuj niderlandzkie dane testowe JSON z maskowanymi identyfikatorami, lokalnym adresem, telefonem, IBAN, VAT i polami regionalnymi.',
    'Czech Rodne cislo - walidator': 'Czeski Rodne cislo - walidator',
    'Ukrainian RNOKPP - walidator': 'Ukraiński RNOKPP - walidator',
    'Italian Codice Fiscale - walidator': 'Włoski Codice Fiscale - walidator'
  },
  uk: {
    'German Tax ID / IdNr Validator': 'Німецький податковий ID / IdNr - валідатор',
    'German Tax ID / IdNr - валідатор': 'Німецький податковий ID / IdNr - валідатор',
    'Neutral world atlas. Hover or focus a country to reveal a premium country-shape preview; click to open the country hub.': 'Нейтральний атлас світу. Наведіть або сфокусуйте країну, щоб побачити преміум-прев’ю форми; натисніть, щоб відкрити хаб.',
    'Згенерувати French IBAN fixture payloads.': 'Генеруйте французькі тестові IBAN-дані.',
    'Згенерувати German IBAN fixture payloads.': 'Генеруйте німецькі тестові IBAN-дані.',
    'Згенерувати Dutch JSON fixture payloads with masked identifiers, local address, phone, IBAN, VAT, and locale fields.': 'Генеруйте нідерландські тестові JSON-дані з маскованими ідентифікаторами, локальною адресою, телефоном, IBAN, VAT і регіональними полями.'
  }
};

const FULL_TRANSLATE_NEEDLES = [
  'Open the universal workbenches',
  'the universal workbenches',
  'for payloads, encoding',
  'Identity, registry, tax, payment',
  'workbenches with local samples',
  'Use fresh browser-only values',
  'Generation belongs next to validation',
  'Named slices, local meaning',
  'Pass/review states must match',
  'When the domain supports generation',
  'Offline structure is not official registry status',
  'Format, inspect, and copy clean payloads',
  'Decode token headers and claims locally',
  'Encode browser-only test strings',
  'Encode query strings and route-safe values',
  'Test pattern behavior before shipping',
  'Generate copy-ready identifiers',
  'Create structural IBAN fixtures',
  'PESEL checksum, date',
  'PIX payload checks',
  'SIRET/SIREN/NIC evidence',
  'IdNr structure, control evidence',
  'BSN 11-test replay',
  'Rodne cislo parser',
  'RNOKPP local structure',
  'Codice fiscale parser',
  'IBAN generator for structural fixtures',
  'Generate Polish IBAN',
  'Generate French IBAN',
  'Generate German IBAN',
  'Neutral world atlas',
  'Hover or focus the map',
  'Local identifiers and payment formats',
  'World map summary',
  'country hubs online',
  'identifier families indexed',
  'Each full-premium country',
  'Open all 194 country hubs'
];

const WORD_REPAIRS = {
  es: { Validate: 'Validar', Generate: 'Generar', Clear: 'Limpiar' },
  'pt-BR': { Validate: 'Validar', Generate: 'Gerar', Clear: 'Limpar' },
  de: { Validate: 'Validieren', Generate: 'Generieren', Clear: 'Leeren' },
  fr: { Validate: 'Valider', Generate: 'Générer', Clear: 'Effacer' },
  pl: { Validate: 'Waliduj', Generate: 'Generuj', Clear: 'Wyczyść' },
  uk: { Validate: 'Перевірити', Generate: 'Згенерувати', Clear: 'Очистити' }
};

const GLOBAL_TOOL_SUMMARY_REPAIRS = {
  es: {
    'No global tools match this search.': 'Ninguna herramienta global coincide con esta busqueda.',
    'global tools': 'herramientas globales',
    'families': 'familias',
    'uploads required': 'subidas requeridas',
    'Security &amp; Trust': 'Seguridad y confianza',
    'Regulated Formatos': 'Formatos regulados',
    'Abrir a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Abrir un workbench local en el navegador con evidencia de depuracion premium y salida lista para copiar.',
    'Normalize configuración regional-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Normaliza CSV sensibles a la configuracion regional y muestra evidencia de filas, delimitadores y decimales.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Formatea, repara, inspecciona pistas de esquema, aplana rutas y detecta claves sensibles.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Prueba regex, grupos nombrados, vistas de reemplazo y diagnosticos de coincidencias.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Decodifica JWT localmente, inspecciona claims registrados y marca limites de seguridad.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Detecta y redacta secretos, emails, IBAN y fragmentos sensibles de logs.',
    'Generar or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Genera o verifica firmas webhook y compara evidencia de payload, secreto y cabeceras.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Comprueba prefijo IVA UE y sintaxis local separando VIES de la evidencia offline.',
    'Generar structural IBAN fixtures with Dígitos MOD-97 and copy-ready grouping.': 'Genera IBAN estructurales con digitos MOD-97 y agrupacion lista para copiar.',
    'Validar IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Valida estructura IBAN, pais, longitud y evidencia MOD-97 en el navegador.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Inspecciona XML ISO 20022 / SEPA antes del envio bancario o QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Parsea lineas MRZ, reproduce controles estructurales y genera fixtures seguros.',
    'Normalize, generate, and inspect E.164 teléfono fixtures with country-prefix evidence.': 'Normaliza, genera e inspecciona telefonos E.164 con evidencia de prefijo pais.',
    'Validar or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Valida o genera codigos postales dejando claro el limite de entregabilidad.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Inspecciona SWIFT/BIC, pais, sucursal y limite de directorio.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Codifica o decodifica Base64, detecta data URIs, firmas de bytes y variantes URL-safe.',
    'Generar localized JSON or CSV fixtures for country-aware QA and form testing.': 'Genera fixtures JSON o CSV localizados para QA y formularios por pais.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Codifica, decodifica, parsea parametros y revisa riesgos de redireccion o credenciales.',
    'Generar and validate UUID fixtures with version, variant, and batch support.': 'Genera y valida UUID con version, variante y soporte por lote.'
  },
  'pt-BR': {
    'No global tools match this search.': 'Nenhuma ferramenta global corresponde a esta busca.',
    'global tools': 'ferramentas globais',
    'families': 'famílias',
    'uploads required': 'uploads necessários',
    'Security &amp; Trust': 'Segurança e confiança',
    'Regulated Formatos': 'Formatos regulados',
    'Abrir a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Abrir um workbench local no navegador com evidencia premium de depuracao e saida pronta para copiar.',
    'Normalize configuração regional-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Normaliza CSV sensiveis a localidade e expõe evidencia de linhas, delimitadores e decimais.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Formata, repara, inspeciona pistas de schema, achata caminhos e detecta chaves sensiveis.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Testa regex, grupos nomeados, previews de substituicao e diagnosticos.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Decodifica JWT localmente, inspeciona claims registrados e destaca limites de seguranca.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Detecta e redige segredos, emails, IBANs e fragmentos sensiveis de logs.',
    'Gerar or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Gera ou verifica assinaturas webhook e compara evidencia de payload, segredo e cabecalho.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Verifica prefixo VAT UE e sintaxe local separando VIES de evidencia offline.',
    'Gerar structural IBAN fixtures with Dígitos MOD-97 and copy-ready grouping.': 'Gera IBANs estruturais com digitos MOD-97 e agrupamento pronto para copiar.',
    'Validar IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Valida estrutura IBAN, pais, tamanho e evidencia MOD-97 no navegador.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Inspeciona XML ISO 20022 / SEPA antes do envio bancario ou QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Parseia linhas MRZ, reproduz controles estruturais e gera fixtures seguros.',
    'Normalize, generate, and inspect E.164 telefone fixtures with country-prefix evidence.': 'Normaliza, gera e inspeciona telefones E.164 com evidencia de prefixo do pais.',
    'Validar or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Valida ou gera codigos postais mantendo claro o limite de entregabilidade.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Inspeciona SWIFT/BIC, pais, agencia e limite de diretorio.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Codifica ou decodifica Base64, detecta data URIs, assinaturas de bytes e variantes URL-safe.',
    'Gerar localized JSON or CSV fixtures for country-aware QA and form testing.': 'Gera fixtures JSON ou CSV localizados para QA e formularios por pais.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Codifica, decodifica, parseia parametros e revisa riscos de redirecionamento ou credenciais.',
    'Gerar and validate UUID fixtures with version, variant, and batch support.': 'Gera e valida UUIDs com versao, variante e suporte em lote.'
  },
  de: {
    'No global tools match this search.': 'Keine globalen Tools passen zu dieser Suche.',
    'global tools': 'globale Tools',
    'families': 'Familien',
    'uploads required': 'Uploads erforderlich',
    'Security &amp; Trust': 'Sicherheit und Vertrauen',
    'Regulated Formate': 'Regulierte Formate',
    'Öffnen a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Öffne einen lokalen Browser-Workbench mit Premium-Debug-Evidenz und kopierfertiger Ausgabe.',
    'Normalize Gebietsschema-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Normalisiere locale-sensitive CSV-Payloads und zeige Zeilen-, Trennzeichen- und Dezimal-Evidenz.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Formatiere, repariere, prüfe Schema-Hinweise, flache Pfade ab und scanne sensible Payload-Schlüssel.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Teste Regex-Muster, benannte Gruppen, Ersetzungs-Vorschauen und Match-Diagnosen.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Dekodiere JWT-Header und Claims lokal, prüfe registrierte Claims und markiere Sicherheitsgrenzen.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Erkenne und maskiere Secrets, E-Mails, IBANs und log-sensible Payload-Fragmente.',
    'Generieren or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Generiere oder prüfe Webhook-Signaturen und vergleiche Payload-, Secret- und Header-Evidenz.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Prüfe EU-USt-Prefix und lokale Syntax, getrennt von VIES-Status.',
    'Generieren structural IBAN fixtures with MOD-97-Prüfziffern and copy-ready grouping.': 'Generiere strukturelle IBAN-Fixtures mit MOD-97-Prüfziffern und kopierfertiger Gruppierung.',
    'Validieren IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Validiere IBAN-Struktur, Länderprofil, Länge und MOD-97-Evidenz im Browser.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Prüfe ISO-20022-/SEPA-XML vor Bankübergabe oder QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Parse MRZ-Zeilen, spiele Strukturprüfungen nach und generiere sichere Reisedokument-Fixtures.',
    'Normalize, generate, and inspect E.164 Telefon fixtures with country-prefix evidence.': 'Normalisiere, generiere und prüfe E.164-Telefone mit Länderprefix-Evidenz.',
    'Validieren or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Validiere oder generiere Postleitzahlen und halte Zustellbarkeitsgrenzen klar.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Prüfe SWIFT/BIC-Struktur, Länder-Evidenz, Filialform und Verzeichnisgrenzen.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Kodiere oder dekodiere Base64, erkenne Data-URIs, Byte-Signaturen und URL-safe Varianten.',
    'Generieren localized JSON or CSV fixtures for country-aware QA and form testing.': 'Generiere lokalisierte JSON- oder CSV-Fixtures für ländersensible QA und Formulartests.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Kodiere, dekodiere, parse Query-Parameter und prüfe Redirect- oder Credential-Risiken.',
    'Generieren and validate UUID fixtures with version, variant, and batch support.': 'Generiere und validiere UUID-Fixtures mit Version, Variante und Batch-Support.'
  },
  fr: {
    'No global tools match this search.': 'Aucun outil global ne correspond a cette recherche.',
    'global tools': 'outils globaux',
    'families': 'familles',
    'uploads required': 'uploads requis',
    'Security &amp; Trust': 'Sécurité et confiance',
    'Regulated Formats': 'Formats réglementés',
    'Ouvrir a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Ouvrir un workbench local dans le navigateur avec preuves de debug premium et sortie prête à copier.',
    'Normalize paramètres régionaux-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Normaliser les CSV sensibles à la locale et afficher les preuves de lignes, séparateurs et décimales.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Formater, réparer, inspecter les indices de schéma, aplatir les chemins et détecter les clés sensibles.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Tester regex, groupes nommés, aperçus de remplacement et diagnostics.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Décoder localement les JWT, inspecter les claims et marquer les limites de sécurité.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Détecter et masquer secrets, emails, IBAN et fragments sensibles de logs.',
    'Générer or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Générer ou vérifier les signatures webhook et comparer payload, secret et en-têtes.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Vérifier le préfixe TVA UE et la syntaxe locale en séparant VIES de la preuve hors ligne.',
    'Générer structural IBAN fixtures with Chiffres MOD-97 and copy-ready grouping.': 'Générer des IBAN structurels avec chiffres MOD-97 et groupement prêt à copier.',
    'Valider IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Valider structure IBAN, pays, longueur et preuve MOD-97 dans le navigateur.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Inspecter XML ISO 20022 / SEPA avant remise bancaire ou QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Parser les lignes MRZ, rejouer les contrôles et générer des fixtures sûres.',
    'Normalize, generate, and inspect E.164 télétélétélétélétélétéléphone fixtures with country-prefix evidence.': 'Normaliser, générer et inspecter des téléphones E.164 avec preuve de préfixe pays.',
    'Valider or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Valider ou générer des codes postaux avec limite de délivrabilité explicite.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Inspecter SWIFT/BIC, pays, agence et limites de répertoire.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Encoder ou décoder Base64, détecter data URIs, signatures d’octets et variantes URL-safe.',
    'Générer localized JSON or CSV fixtures for country-aware QA and form testing.': 'Générer des fixtures JSON ou CSV localisées pour QA et formulaires par pays.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Encoder, décoder, parser les paramètres et vérifier les risques de redirection ou d’identifiants.',
    'Générer and validate UUID fixtures with version, variant, and batch support.': 'Générer et valider des UUID avec version, variante et support par lot.'
  },
  pl: {
    'No global tools match this search.': 'Brak globalnych narzędzi pasujących do wyszukiwania.',
    'global tools': 'narzędzi globalnych',
    'families': 'rodzin',
    'uploads required': 'uploadów wymaganych',
    'Security &amp; Trust': 'Bezpieczeństwo i zaufanie',
    'Regulated Formats': 'Formaty regulowane',
    'Open a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Otwórz lokalny workbench w przeglądarce z premium debug evidence i wynikiem gotowym do kopiowania.',
    'Normalize lokalizacja-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Normalizuj CSV zależne od lokalizacji i pokaż dowody wierszy, separatorów i liczb dziesiętnych.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Formatuj, naprawiaj, sprawdzaj podpowiedzi schematu, spłaszczaj ścieżki i wykrywaj wrażliwe klucze.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Testuj regex, grupy nazwane, podgląd zamian i diagnostykę dopasowań.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Dekoduj JWT lokalnie, sprawdzaj claims i pokazuj granice bezpieczeństwa.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Wykrywaj i maskuj sekrety, emaile, IBAN-y i fragmenty wrażliwe w logach.',
    'Generuj or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Generuj lub weryfikuj podpisy webhook i porównuj payload, sekret oraz nagłówki.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Sprawdzaj prefiks VAT UE i składnię lokalną, oddzielając status VIES od dowodu offline.',
    'Generuj structural IBAN fixtures with Cyfry kontrolne MOD-97 and copy-ready grouping.': 'Generuj strukturalne IBAN-y z cyframi MOD-97 i grupowaniem gotowym do kopiowania.',
    'Waliduj IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Waliduj strukturę IBAN, kraj, długość i dowód MOD-97 w przeglądarce.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Sprawdzaj XML ISO 20022 / SEPA przed wysyłką do banku lub QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Parsuj linie MRZ, odtwarzaj kontrole struktury i generuj bezpieczne dane testowe.',
    'Normalize, generate, and inspect E.164 telefon fixtures with country-prefix evidence.': 'Normalizuj, generuj i sprawdzaj telefony E.164 z dowodem prefiksu kraju.',
    'Waliduj or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Waliduj lub generuj kody pocztowe z jasną granicą sprawdzania doręczalności.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Sprawdzaj SWIFT/BIC, kraj, oddział i granice katalogu.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Koduj lub dekoduj Base64, wykrywaj data URI, sygnatury bajtów i warianty URL-safe.',
    'Generuj localized JSON or CSV fixtures for country-aware QA and form testing.': 'Generuj lokalizowane JSON lub CSV dla QA i testów formularzy zależnych od kraju.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Koduj, dekoduj, parsuj parametry i sprawdzaj ryzyka przekierowań lub credentiali.',
    'Generuj and validate UUID fixtures with version, variant, and batch support.': 'Generuj i waliduj UUID z wersją, wariantem i obsługą batch.'
  },
  uk: {
    'No global tools match this search.': 'Немає глобальних інструментів для цього пошуку.',
    'global tools': 'глобальних інструментів',
    'families': 'родин',
    'uploads required': 'завантажень потрібно',
    'Безпека &amp; Trust': 'Безпека та довіра',
    'Regulated Формати': 'Регульовані формати',
    'Відкрити a browser-only developer workbench with premium debug evidence and copy-ready output.': 'Відкрити локальний воркбенч у браузері з premium debug evidence і результатом для копіювання.',
    'Normalize локаль-sensitive CSV payloads and expose row, delimiter, and decimal evidence.': 'Нормалізувати CSV з урахуванням локалі та показати докази рядків, роздільників і десяткових форматів.',
    'Format, repair, inspect schema hints, flatten paths, and scan sensitive payload keys.': 'Форматувати, ремонтувати, перевіряти підказки схеми, згортати шляхи й шукати чутливі ключі.',
    'Test regex patterns, named groups, replacement previews, and match diagnostics.': 'Тестувати regex, іменовані групи, preview замін і діагностику збігів.',
    'Decode JWT headers and claims locally, inspect registered claims, and highlight security boundaries.': 'Локально декодувати JWT, перевіряти claims і показувати межі безпеки.',
    'Detect and redact common secrets, emails, IBANs, and log-sensitive payload fragments.': 'Виявляти й маскувати secrets, emails, IBAN та чутливі фрагменти логів.',
    'Згенерувати or verify webhook signature fixtures and compare payload, secret, and header evidence.': 'Генерувати або перевіряти webhook signatures і порівнювати payload, secret та headers.',
    'Check EU VAT prefix and local syntax while clearly separating VIES status from offline evidence.': 'Перевіряти EU VAT prefix і локальний синтаксис, відділяючи VIES від offline evidence.',
    'Згенерувати structural IBAN fixtures with Контрольні цифри MOD-97 and copy-ready grouping.': 'Генерувати структурні IBAN з контрольними цифрами MOD-97 і групуванням для копіювання.',
    'Перевірити IBAN structure, country profile, length, and MOD-97 evidence in the browser.': 'Перевіряти структуру IBAN, країну, довжину й MOD-97 evidence у браузері.',
    'Inspect ISO 20022 / SEPA XML structure before bank handoff or QA review.': 'Перевіряти XML ISO 20022 / SEPA перед передачею в банк або QA.',
    'Parse passport MRZ lines, replay structural checks, and generate safe travel-document fixtures.': 'Парсити MRZ, відтворювати структурні перевірки й генерувати безпечні fixture-документи.',
    'Normalize, generate, and inspect E.164 телефон fixtures with country-prefix evidence.': 'Нормалізувати, генерувати й перевіряти телефони E.164 з доказом префікса країни.',
    'Перевірити or generate postal-code samples while keeping deliverability lookup boundaries explicit.': 'Перевіряти або генерувати поштові коди з явною межею deliverability lookup.',
    'Inspect SWIFT/BIC structure, country evidence, branch shape, and directory lookup boundaries.': 'Перевіряти SWIFT/BIC, країну, branch shape і межі directory lookup.',
    'Encode or decode Base64, detect data URIs, byte signatures, and URL-safe variants.': 'Кодувати або декодувати Base64, знаходити data URI, byte signatures і URL-safe варіанти.',
    'Згенерувати localized JSON or CSV fixtures for country-aware QA and form testing.': 'Генерувати локалізовані JSON або CSV для country-aware QA і тестування форм.',
    'Encode, decode, parse query parameters, and inspect redirect or credential risk hints.': 'Кодувати, декодувати, парсити query parameters і перевіряти redirect/credential ризики.',
    'Згенерувати and validate UUID fixtures with version, variant, and batch support.': 'Генерувати й перевіряти UUID з версією, варіантом і batch support.'
  }
};

function repairGlobalToolSummaries(content, locale) {
  let next = content;
  const map = GLOBAL_TOOL_SUMMARY_REPAIRS[locale] || {};
  for (const [source, target] of Object.entries(map)) {
    next = next.replaceAll(source, target);
  }
  return next;
}

function parseArgs(argv) {
  const args = {
    locales: DEFAULT_LOCALES,
    paths: [],
    seoOnly: false,
    footerOnly: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--locales') {
      args.locales = String(argv[i + 1] || '').split(',').map(item => item.trim()).filter(Boolean);
      i += 1;
    } else if (arg.startsWith('--locales=')) {
      args.locales = arg.slice('--locales='.length).split(',').map(item => item.trim()).filter(Boolean);
    } else if (arg === '--paths') {
      args.paths = String(argv[i + 1] || '').split(',').map(item => item.trim()).filter(Boolean);
      i += 1;
    } else if (arg.startsWith('--paths=')) {
      args.paths = arg.slice('--paths='.length).split(',').map(item => item.trim()).filter(Boolean);
    } else if (arg === '--seo-only') {
      args.seoOnly = true;
    } else if (arg === '--footer-only') {
      args.footerOnly = true;
    }
  }
  return args;
}

async function listHtmlFiles(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'assets') continue;
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) await listHtmlFiles(path, out);
    else if (entry.isFile() && entry.name === 'index.html') out.push(path);
  }
  return out;
}

async function targetFiles(args) {
  if (args.paths.length) {
    const files = args.paths.map(input => {
      const clean = input.replace(/^\/+/, '');
      return resolve(siteRoot, clean.endsWith('.html') ? clean : `${clean.replace(/\/?$/, '/')}index.html`);
    });
    for (const file of files) {
      const info = await stat(file).catch(() => null);
      if (!info?.isFile()) throw new Error(`Missing localization repair target: ${file}`);
    }
    return files;
  }

  const files = [];
  for (const locale of args.locales) {
    const localeRoot = resolve(siteRoot, locale);
    const info = await stat(localeRoot).catch(() => null);
    if (info?.isDirectory()) await listHtmlFiles(localeRoot, files);
  }
  return files;
}

function routeForFile(file) {
  return `/${relative(siteRoot, file).replace(/\\/g, '/').replace(/\/index\.html$/, '/')}`;
}

function localeForRoute(route) {
  return route.split('/').filter(Boolean)[0] || 'en';
}

function stripTags(value) {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function routeFallbackTitle(route) {
  const parts = route.split('/').filter(Boolean);
  const slug = parts[parts.length - 1] || 'ValidoHub';
  return slug
    .split('-')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function repairThinTitle(content, route) {
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = stripTags(titleMatch?.[1] || '');
  if (title.length >= 12) return content;
  const h1 = stripTags(content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  const base = h1.length >= 4 ? h1 : routeFallbackTitle(route);
  const nextTitle = `${base} | ValidoHub`;
  if (titleMatch) return content.replace(/<title>[\s\S]*?<\/title>/i, `<title>${nextTitle}</title>`);
  return content.replace(/<head\b[^>]*>/i, match => `${match}\n  <title>${nextTitle}</title>`);
}

function repairCurrentHreflang(content, locale, route) {
  if (!/<link\s+rel="alternate"\s+hreflang=/i.test(content)) return content;
  if (new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${locale}"`, 'i').test(content)) return content;
  const href = `https://validohub.com${route}`;
  const alternate = `<link rel="alternate" hreflang="${locale}" href="${href}">`;
  return content.replace(/<link\s+rel="alternate"\s+hreflang=/i, `${alternate}\n  <link rel="alternate" hreflang=`);
}

function escapeAttribute(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeJsonForHtml(value) {
  return JSON.stringify(value)
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e');
}

function englishRouteFor(route) {
  const parts = route.split('/').filter(Boolean);
  const locale = parts[0] || 'en';
  if (locale === 'en') return route;
  return `/${['en', ...parts.slice(1)].join('/')}/`;
}

function canonicalUrlFor(content, route) {
  const canonical = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
  return canonical || `https://validohub.com${route}`;
}

function titleFor(content, route) {
  const title = stripTags(content.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '');
  if (title) return title;
  const h1 = stripTags(content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
  return h1 || routeFallbackTitle(route);
}

function descriptionFor(content, title) {
  const description = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  return stripTags(description || `Browser-only ValidoHub workbench for ${title}.`);
}

function ensureXDefaultHreflang(content, route) {
  if (!/<link\s+rel="alternate"\s+hreflang=/i.test(content)) return content;
  if (/<link\s+rel="alternate"\s+hreflang="x-default"/i.test(content)) return content;
  const href = `https://validohub.com${englishRouteFor(route)}`;
  const tag = `<link rel="alternate" hreflang="x-default" href="${href}">`;
  return content.replace(/(<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+">\s*)+/i, match => `${match}  ${tag}\n`);
}

function ensureSocialMeta(content, route) {
  const title = titleFor(content, route);
  const description = descriptionFor(content, title);
  const url = canonicalUrlFor(content, route);
  const additions = [];
  if (!/<meta\s+property="og:title"\s+content=/i.test(content)) {
    additions.push(`<meta property="og:title" content="${escapeAttribute(title)}">`);
  }
  if (!/<meta\s+property="og:description"\s+content=/i.test(content)) {
    additions.push(`<meta property="og:description" content="${escapeAttribute(description)}">`);
  }
  if (!/<meta\s+property="og:url"\s+content=/i.test(content)) {
    additions.push(`<meta property="og:url" content="${escapeAttribute(url)}">`);
  }
  if (!/<meta\s+property="og:type"\s+content=/i.test(content)) {
    additions.push('<meta property="og:type" content="website">');
  }
  if (!/<meta\s+name="twitter:card"\s+content=/i.test(content)) {
    additions.push('<meta name="twitter:card" content="summary">');
  }
  if (!/<meta\s+name="twitter:title"\s+content=/i.test(content)) {
    additions.push(`<meta name="twitter:title" content="${escapeAttribute(title)}">`);
  }
  if (!/<meta\s+name="twitter:description"\s+content=/i.test(content)) {
    additions.push(`<meta name="twitter:description" content="${escapeAttribute(description)}">`);
  }
  if (!additions.length) return content;
  return content.replace(/<\/head>/i, `${additions.map(line => `  ${line}`).join('\n')}\n</head>`);
}

function ensureJsonLd(content, locale, route) {
  if (/<script\s+type="application\/ld\+json"/i.test(content)) return content;
  const title = titleFor(content, route);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': route.includes('/tools/') || route.split('/').filter(Boolean).length >= 3 ? 'SoftwareApplication' : 'WebPage',
    name: title,
    description: descriptionFor(content, title),
    url: canonicalUrlFor(content, route),
    inLanguage: locale
  };
  if (jsonLd['@type'] === 'SoftwareApplication') {
    jsonLd.applicationCategory = 'DeveloperApplication';
    jsonLd.operatingSystem = 'All';
  }
  const script = `<script type="application/ld+json">${escapeJsonForHtml(jsonLd)}</script>`;
  return content.replace(/<\/head>/i, `  ${script}\n</head>`);
}

function repairSeoShell(content, locale, route) {
  const localizedUrl = `https://validohub.com${route}`;
  let next = content
    .replace(/<html\b([^>]*)\blang="[^"]*"/i, `<html$1lang="${locale}"`)
    .replace(/<html(?![^>]*\blang=)/i, `<html lang="${locale}"`);
  if (locale !== 'en') {
    next = next
      .replace(/<link rel="canonical" href="https:\/\/validohub\.com\/en\/[^"]*">/i, `<link rel="canonical" href="${localizedUrl}">`)
      .replace(/"url":\s*"https:\/\/validohub\.com\/en\/[^"]*"/g, `"url":"${localizedUrl}"`);
  }
  next = repairCurrentHreflang(next, locale, route);
  next = repairThinTitle(next, route);
  next = ensureXDefaultHreflang(next, route);
  next = ensureSocialMeta(next, route);
  next = ensureJsonLd(next, locale, route);
  return next;
}

function repairFooterLinks(content, locale) {
  if (/<nav class="footer-links"/i.test(content)) return content;
  const labels = {
    en: ['Tools', 'Countries', 'Identifiers', 'Sitemap'],
    es: ['Herramientas', 'Países', 'Identificadores', 'Sitemap'],
    'pt-BR': ['Ferramentas', 'Países', 'Identificadores', 'Sitemap'],
    de: ['Tools', 'Länder', 'Kennungen', 'Sitemap'],
    fr: ['Outils', 'Pays', 'Identifiants', 'Sitemap'],
    pl: ['Narzędzia', 'Kraje', 'Identyfikatory', 'Sitemap'],
    uk: ['Інструменти', 'Країни', 'Ідентифікатори', 'Sitemap']
  };
  const [tools, countries, identifiers, sitemap] = labels[locale] || labels.en;
  const prefix = locale === 'en' ? '/en' : `/${locale}`;
  const nav = `<nav class="footer-links" aria-label="Footer navigation"><a href="${prefix}/tools/">${tools}</a><a href="${prefix}/countries/">${countries}</a><a href="${prefix}/categories/national-identifiers/">${identifiers}</a><a href="/sitemap.xml">${sitemap}</a></nav>`;
  const engineFooterText = [
    'Static tools generated by Valido Engine.',
    'Statyczne narzędzia wygenerowane przez Valido Engine.',
    'Statische Tools, generiert von Valido Engine.',
    'Herramientas estáticas generadas por Valido Engine.',
    'Ferramentas estáticas geradas pelo Valido Engine.',
    'Статичні інструменти, згенеровані Valido Engine.'
  ];
  let next = content;
  for (const text of engineFooterText) {
    next = next.replace(new RegExp(`<p>\\s*${escapeRegExp(text)}\\s*<\\/p>`, 'g'), nav);
  }
  return next;
}

function applyFastRepairs(content, locale) {
  let next = content;
  const phraseMap = { ...(FAST_REPAIRS[locale] || {}), ...(SHARED_FAST_REPAIRS[locale] || {}) };
  for (const [source, target] of Object.entries(phraseMap)) {
    next = next.replaceAll(source, target);
  }
  const wordMap = WORD_REPAIRS[locale] || {};
  for (const [source, target] of Object.entries(wordMap)) {
    next = next.replace(new RegExp(`(?<![A-Za-z])${source}(?![A-Za-z])`, 'g'), target);
  }
  return repairGlobalToolSummaries(next, locale);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = await targetFiles(args);
  let changed = 0;
  let checked = 0;

  for (const file of files) {
    const route = routeForFile(file);
    const locale = localeForRoute(route);
    if (!args.locales.includes(locale)) continue;
    checked += 1;
    const before = await readFile(file, 'utf8');
    let after = args.footerOnly
      ? repairFooterLinks(before, locale)
      : repairFooterLinks(repairSeoShell(before, locale, route), locale);
    if (!args.seoOnly) {
      if (args.footerOnly) {
        if (after !== before) {
          await writeFile(file, after, 'utf8');
          changed += 1;
        }
        if (checked % 500 === 0) {
          console.log(`...checked ${checked}, updated ${changed}`);
        }
        continue;
      }
      const hasRepairNeedle = REPAIR_NEEDLES.some(needle => after.includes(needle));
      const hasFullTranslateNeedle = FULL_TRANSLATE_NEEDLES.some(needle => after.includes(needle));
      if (hasRepairNeedle) {
        after = applyFastRepairs(after, locale);
      }
      if (hasRepairNeedle || hasFullTranslateNeedle) {
        after = translateVisibleHtml(after, locale);
      }
      after = repairGlobalToolSummaries(after, locale);
    }
    if (after !== before) {
      await writeFile(file, after, 'utf8');
      changed += 1;
    }
    if (checked % 500 === 0) {
      console.log(`...checked ${checked}, updated ${changed}`);
    }
  }

  console.log(`✓ Localization in-place repair checked ${checked} page(s), updated ${changed}.`);
}

main().catch(error => {
  console.error(error.message || error);
  process.exit(1);
});
