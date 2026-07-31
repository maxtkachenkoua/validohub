(function (root) {
  'use strict';

  const VERSION = '1.0.0';
  const STYLE_ID = 'country-suite-factory-styles-v1';

  function text(value) {
    return String(value == null ? '' : value);
  }

  function esc(value) {
    return text(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function currentLocale() {
    if (typeof location === 'undefined') return 'en';
    const first = location.pathname.split('/').filter(Boolean)[0] || 'en';
    return first;
  }

  const DEFAULT_LABELS = {
    workbench: '{country} workbench',
    browserOnly: 'Browser-only',
    offlineChecks: 'Offline checks',
    countrySpecific: '{country}-specific',
    fieldBreakdown: 'Field breakdown',
    qualityNotes: 'Quality notes',
    samplesAndRelated: 'Examples',
    relatedTools: 'Related tools',
    validate: 'Validate',
    generate: 'Generate',
    waiting: 'Waiting for local data',
    offlinePassed: 'Offline checks passed',
    reviewNeeded: 'Review needed',
    copyResult: 'Copy result',
    downloadResult: 'Download result',
    copyDeveloperJson: 'Copy developer JSON',
    clear: 'Clear',
    copyNormalized: 'Copy normalized',
    validationPipeline: 'Validation pipeline',
    localChecksCompleted: 'Local checks completed in this browser.',
    pass: 'PASS',
    review: 'REVIEW',
    privacyBoundary: 'Privacy boundary',
    officialLookupBoundary: 'Official boundary',
    fixtureSafety: 'Fixture safety',
    developerHandling: 'Developer handling',
    qualityNote: 'Quality note',
    qualityNotesSummary: 'What this tool proves locally and what must stay outside the browser.',
    integrationTraps: 'Integration traps',
    integrationTrapsSummary: 'Time-saving checks that prevent common implementation bugs.',
    advancedAnalysis: 'Advanced analysis',
    localStructuralSlices: 'Local structural slices.',
    presets: 'Examples',
    validSample: 'Valid sample',
    groupedValidSample: 'Grouped valid sample',
    invalidSample: 'Invalid sample',
    shortSample: 'Short sample',
    badCountrySample: 'Bad country prefix',
    recentValidations: 'Recent validations',
    noHistory: 'No recent validations yet',
    batchValidation: 'Batch validation',
    batchSummary: 'Run up to 100 local checks, one value per line.',
    runBatch: 'Run batch',
    copyBatchJson: 'Copy batch JSON',
    clearBatch: 'Clear batch',
    identifierBreakdown: 'Identifier breakdown',
    hoverBreakdown: 'Inspect each detected field group and its local meaning.',
    calculationDebugger: 'Calculation debugger',
    replayCalculation: 'Replay calculation',
    repairSuggestions: 'Repair suggestions',
    rawJsonOutput: 'Raw JSON output',
    validationLog: 'Validation pipeline logs',
    regexDetails: 'Regex & structure details',
    browserBoundary: 'Browser-only boundary',
    premiumDebugLayer: 'Premium debug layer',
    toolIntelligence: '{country} tool intelligence',
    toolIntelligenceSummary: 'History, batch checks, local JSON, raw output, and related workflows stay available without taking over the main workflow.',
    localBadge: '{code} local',
    browserHistory: 'Browser history',
    multiRowValidator: 'Multi-row validator',
    useCurrentInput: 'Use current input',
    batchResult: 'Batch result',
    rawJson: 'Raw JSON',
    relatedLocalTools: 'Related local tools',
    batchEmpty: 'Run batch to compare pass/review states without leaving this page.',
    pasteOnePerLine: 'Paste one value per line first.',
    relatedLocalFallback: 'Country-local related tools appear here after build pruning.',
    advancedTools: 'Advanced tools',
    advancedToolsSummary: 'History, batch diagnostics, local JSON, raw output, and related links.',
    ibanGenerator: 'IBAN generator',
    ibanGeneratorSummary: 'Generate a structurally valid IBAN from a country code and BBAN/account body.',
    generatedIban: 'Generated IBAN',
    bbanBody: 'BBAN body',
    mod97CheckDigits: 'MOD-97 check digits',
    copied: 'Copied',
    toolContextTitle: 'What this tool is for',
    usedFor: 'Used for',
    checksLocally: 'Checks locally',
    officialBoundaryShort: 'Boundary'
  };

  const DEFAULT_LOCALE_LABELS = {
    de: {
      validate: 'Pruefen',
      generate: 'Generieren',
      waiting: 'Warte auf lokale Daten',
      offlinePassed: 'Offline-Checks bestanden',
      reviewNeeded: 'Pruefung erforderlich',
      copyResult: 'Ergebnis kopieren',
      downloadResult: 'Ergebnis herunterladen',
      copyDeveloperJson: 'Entwickler-JSON kopieren',
      clear: 'Leeren',
      copyNormalized: 'Normalisierte Ausgabe kopieren',
      fieldBreakdown: 'Feldaufschluesselung',
      qualityNotes: 'Qualitaetsnotizen',
      samplesAndRelated: 'Beispiele',
      relatedTools: 'Aehnliche Tools',
      validationPipeline: 'Validierungspipeline',
      localChecksCompleted: 'Lokale Checks wurden in diesem Browser abgeschlossen.',
      pass: 'BESTANDEN',
      review: 'PRUEFEN',
      privacyBoundary: 'Datenschutzgrenze',
      officialLookupBoundary: 'Offizielle Grenze',
      fixtureSafety: 'Fixture-Sicherheit',
      developerHandling: 'Entwickler-Handoff',
      qualityNote: 'Qualitaetsnotiz',
      qualityNotesSummary: 'Was dieses Tool lokal beweist und was ausserhalb des Browsers bleiben muss.',
      integrationTraps: 'Integrationsfallen',
      integrationTrapsSummary: 'Checks, die haeufige Implementierungsfehler frueh abfangen.',
      advancedAnalysis: 'Erweiterte Analyse',
      presets: 'Beispiele',
      validSample: 'Gueltiges Beispiel',
      groupedValidSample: 'Gruppiertes gueltiges Beispiel',
      invalidSample: 'Ungueltiges Beispiel',
      shortSample: 'Kurzes Beispiel',
      badCountrySample: 'Falsches Laenderpraefix',
      recentValidations: 'Letzte Validierungen',
      noHistory: 'Noch keine Validierungen',
      batchValidation: 'Batch-Validierung',
      batchSummary: 'Bis zu 100 lokale Checks, ein Wert pro Zeile.',
      runBatch: 'Batch ausfuehren',
      copyBatchJson: 'Batch-JSON kopieren',
      clearBatch: 'Batch leeren',
      identifierBreakdown: 'Kennungsaufschluesselung',
      browserBoundary: 'Browser-only-Grenze',
      premiumDebugLayer: 'Premium-Debug-Layer',
      rawJsonOutput: 'Rohe JSON-Ausgabe',
      advancedTools: 'Erweiterte Tools',
      advancedToolsSummary: 'Verlauf, Batch-Diagnostik, API-Vorschau, Roh-JSON und lokale Links.',
      toolIntelligenceSummary: 'Verlauf, Batch-Checks, API-Handoff, Roh-JSON und lokale Workflows bleiben verfügbar, ohne den Hauptablauf zu überladen.',
      relatedLocalTools: 'Aehnliche lokale Tools',
      browserHistory: 'Browserverlauf',
      multiRowValidator: 'Mehrzeilen-Validator',
      useCurrentInput: 'Aktuelle Eingabe nutzen',
      batchResult: 'Batch-Ergebnis',
      rawJson: 'Roh-JSON',
      batchEmpty: 'Batch ausfuehren, um Pass-/Pruefstatus auf dieser Seite zu vergleichen.',
      relatedLocalFallback: 'Lokale verwandte Tools erscheinen hier nach dem Build-Pruning.',
      usedFor: 'Einsatz',
      checksLocally: 'Lokale Checks',
      officialBoundaryShort: 'Grenze'
    },
    es: {
      validate: 'Validar',
      generate: 'Generar',
      waiting: 'Esperando datos locales',
      offlinePassed: 'Comprobaciones offline superadas',
      reviewNeeded: 'Revisión necesaria',
      copyResult: 'Copiar resultado',
      downloadResult: 'Descargar resultado',
      copyDeveloperJson: 'Copiar JSON para desarrolladores',
      clear: 'Limpiar',
      copyNormalized: 'Copiar normalizado',
      fieldBreakdown: 'Desglose de campos',
      qualityNotes: 'Notas de calidad',
      samplesAndRelated: 'Ejemplos',
      relatedTools: 'Herramientas relacionadas',
      validationPipeline: 'Pipeline de validación',
      localChecksCompleted: 'Las comprobaciones locales se completaron en este navegador.',
      pass: 'APROBADO',
      review: 'REVISAR',
      privacyBoundary: 'Límite de privacidad',
      officialLookupBoundary: 'Límite oficial',
      fixtureSafety: 'Seguridad de fixtures',
      developerHandling: 'Handoff para desarrolladores',
      qualityNote: 'Nota de calidad',
      qualityNotesSummary: 'Qué prueba esta herramienta localmente y qué debe quedar fuera del navegador.',
      integrationTraps: 'Trampas de integración',
      integrationTrapsSummary: 'Checks que evitan errores comunes de implementación.',
      advancedAnalysis: 'Análisis avanzado',
      presets: 'Ejemplos',
      validSample: 'Muestra válida',
      groupedValidSample: 'Muestra válida agrupada',
      invalidSample: 'Muestra inválida',
      shortSample: 'Muestra corta',
      badCountrySample: 'Prefijo de país incorrecto',
      recentValidations: 'Validaciones recientes',
      noHistory: 'Aún no hay validaciones recientes',
      batchValidation: 'Validación por lote',
      batchSummary: 'Ejecuta hasta 100 comprobaciones locales, un valor por línea.',
      runBatch: 'Ejecutar lote',
      copyBatchJson: 'Copiar JSON del lote',
      clearBatch: 'Limpiar lote',
      identifierBreakdown: 'Desglose del identificador',
      browserBoundary: 'Límite solo navegador',
      premiumDebugLayer: 'Capa premium de depuración',
      rawJsonOutput: 'Salida JSON bruta',
      advancedTools: 'Herramientas avanzadas',
      advancedToolsSummary: 'Historial, diagnósticos por lote, vista API, JSON bruto y enlaces locales.',
      toolIntelligenceSummary: 'Historial, checks por lote, handoff API, JSON bruto y workflows locales siguen disponibles sin ocupar el flujo principal.',
      relatedLocalTools: 'Herramientas locales relacionadas',
      browserHistory: 'Historial del navegador',
      multiRowValidator: 'Validador multi-fila',
      useCurrentInput: 'Usar entrada actual',
      batchResult: 'Resultado del lote',
      rawJson: 'JSON bruto',
      batchEmpty: 'Ejecuta el lote para comparar estados aprobado/revisar sin salir de la página.',
      relatedLocalFallback: 'Las herramientas locales relacionadas aparecen aquí después del pruning del build.',
      toolContextTitle: 'Para que sirve',
      usedFor: 'Uso',
      checksLocally: 'Comprueba localmente',
      officialBoundaryShort: 'Limite'
    },
    fr: {
      validate: 'Valider',
      generate: 'Générer',
      waiting: 'En attente de données locales',
      offlinePassed: 'Contrôles hors ligne réussis',
      reviewNeeded: 'Vérification requise',
      copyResult: 'Copier le résultat',
      downloadResult: 'Télécharger le résultat',
      copyDeveloperJson: 'Copier le JSON développeur',
      clear: 'Effacer',
      copyNormalized: 'Copier la valeur normalisée',
      fieldBreakdown: 'Détail des champs',
      qualityNotes: 'Notes de qualité',
      samplesAndRelated: 'Exemples',
      relatedTools: 'Outils liés',
      calculationDebugger: 'Débogueur de calcul',
      replayCalculation: 'Rejouer le calcul',
      validationLog: 'Logs du pipeline de validation',
      validationPipeline: 'Pipeline de validation',
      localChecksCompleted: 'Les contrôles locaux ont été effectués dans ce navigateur.',
      pass: 'RÉUSSI',
      review: 'À VÉRIFIER',
      privacyBoundary: 'Limite de confidentialité',
      officialLookupBoundary: 'Limite officielle',
      fixtureSafety: 'Sécurité des fixtures',
      developerHandling: 'Handoff développeur',
      qualityNote: 'Note de qualité',
      qualityNotesSummary: 'Ce que cet outil prouve localement et ce qui doit rester hors du navigateur.',
      integrationTraps: 'Pièges d’intégration',
      integrationTrapsSummary: 'Contrôles qui évitent les erreurs d’implémentation fréquentes.',
      advancedAnalysis: 'Analyse avancée',
      presets: 'Exemples',
      validSample: 'Exemple valide',
      groupedValidSample: 'Exemple valide groupé',
      invalidSample: 'Exemple invalide',
      shortSample: 'Exemple court',
      badCountrySample: 'Préfixe pays incorrect',
      recentValidations: 'Validations récentes',
      noHistory: 'Aucune validation récente',
      batchValidation: 'Validation par lot',
      batchSummary: 'Lancez jusqu’à 100 contrôles locaux, une valeur par ligne.',
      runBatch: 'Lancer le lot',
      copyBatchJson: 'Copier le JSON du lot',
      clearBatch: 'Effacer le lot',
      identifierBreakdown: 'Détail de l’identifiant',
      browserBoundary: 'Limite navigateur uniquement',
      premiumDebugLayer: 'Couche de débogage premium',
      rawJsonOutput: 'Sortie JSON brute',
      advancedTools: 'Outils avancés',
      advancedToolsSummary: 'Historique, diagnostics par lot, aperçu API, JSON brut et liens locaux.',
      toolIntelligenceSummary: 'Historique, contrôles par lot, handoff API, JSON brut et workflows locaux restent disponibles sans prendre le contrôle du flux principal.',
      relatedLocalTools: 'Outils locaux liés',
      browserHistory: 'Historique navigateur',
      multiRowValidator: 'Validateur multi-lignes',
      useCurrentInput: 'Utiliser l’entrée actuelle',
      batchResult: 'Résultat du lot',
      rawJson: 'JSON brut',
      batchEmpty: 'Lancez le lot pour comparer les états réussi/à vérifier sans quitter cette page.',
      relatedLocalFallback: 'Les outils locaux liés apparaissent ici après le pruning du build.',
      toolContextTitle: 'A quoi sert cet outil',
      usedFor: 'Utilisation',
      checksLocally: 'Verifie localement',
      officialBoundaryShort: 'Limite'
    },
    pl: {
      validate: 'Sprawdź',
      generate: 'Generuj',
      waiting: 'Oczekiwanie na lokalne dane',
      offlinePassed: 'Kontrole offline zakończone powodzeniem',
      reviewNeeded: 'Wymaga sprawdzenia',
      copyResult: 'Kopiuj wynik',
      downloadResult: 'Pobierz wynik',
      copyDeveloperJson: 'Kopiuj JSON deweloperski',
      clear: 'Wyczyść',
      copyNormalized: 'Kopiuj znormalizowane',
      fieldBreakdown: 'Podział pól',
      qualityNotes: 'Notatki jakości',
      samplesAndRelated: 'Przykłady',
      relatedTools: 'Powiązane narzędzia',
      validationPipeline: 'Pipeline walidacji',
      localChecksCompleted: 'Lokalne kontrole zakończone w tej przeglądarce.',
      pass: 'ZALICZONE',
      review: 'SPRAWDŹ',
      privacyBoundary: 'Granica prywatności',
      officialLookupBoundary: 'Granica oficjalna',
      fixtureSafety: 'Bezpieczeństwo fixture’ów',
      developerHandling: 'Handoff deweloperski',
      qualityNote: 'Notatka jakości',
      qualityNotesSummary: 'Co narzędzie potwierdza lokalnie i co musi pozostać poza przeglądarką.',
      integrationTraps: 'Pułapki integracyjne',
      integrationTrapsSummary: 'Kontrole, które wyłapują częste błędy implementacyjne.',
      advancedAnalysis: 'Analiza zaawansowana',
      presets: 'Przykłady',
      validSample: 'Poprawna próbka',
      groupedValidSample: 'Poprawna próbka grupowana',
      invalidSample: 'Niepoprawna próbka',
      shortSample: 'Krótka próbka',
      badCountrySample: 'Błędny prefiks kraju',
      recentValidations: 'Ostatnie walidacje',
      noHistory: 'Brak ostatnich walidacji',
      batchValidation: 'Walidacja batch',
      batchSummary: 'Uruchom do 100 lokalnych kontroli, jedna wartość na linię.',
      runBatch: 'Uruchom batch',
      copyBatchJson: 'Kopiuj JSON batcha',
      clearBatch: 'Wyczyść batch',
      identifierBreakdown: 'Podział identyfikatora',
      browserBoundary: 'Granica przeglądarkowa',
      premiumDebugLayer: 'Premium warstwa debugowania',
      rawJsonOutput: 'Surowe wyjście JSON',
      advancedTools: 'Narzędzia zaawansowane',
      advancedToolsSummary: 'Historia, diagnostyka batch, podgląd API, surowy JSON i lokalne linki.',
      toolIntelligenceSummary: 'Historia, kontrole batch, handoff API, surowy JSON i lokalne workflow pozostają dostępne bez przejmowania głównego przepływu.',
      relatedLocalTools: 'Powiązane narzędzia lokalne',
      browserHistory: 'Historia przeglądarki',
      multiRowValidator: 'Walidator wielowierszowy',
      useCurrentInput: 'Użyj bieżących danych',
      batchResult: 'Wynik batcha',
      rawJson: 'Surowy JSON',
      batchEmpty: 'Uruchom batch, aby porównać stany zaliczone/sprawdź bez opuszczania strony.',
      relatedLocalFallback: 'Powiązane narzędzia lokalne pojawią się tutaj po przycięciu builda.',
      toolContextTitle: 'Do czego sluzy to narzedzie',
      usedFor: 'Uzycie',
      checksLocally: 'Sprawdza lokalnie',
      officialBoundaryShort: 'Granica'
    },
    'pt-BR': {
      validate: 'Validar',
      generate: 'Gerar',
      waiting: 'Aguardando dados locais',
      offlinePassed: 'Verificações offline aprovadas',
      reviewNeeded: 'Revisão necessária',
      copyResult: 'Copiar resultado',
      downloadResult: 'Baixar resultado',
      copyDeveloperJson: 'Copiar JSON para desenvolvedores',
      clear: 'Limpar',
      copyNormalized: 'Copiar normalizado',
      fieldBreakdown: 'Detalhamento de campos',
      qualityNotes: 'Notas de qualidade',
      samplesAndRelated: 'Exemplos',
      relatedTools: 'Ferramentas relacionadas',
      validationPipeline: 'Pipeline de validação',
      localChecksCompleted: 'As verificações locais foram concluídas neste navegador.',
      pass: 'APROVADO',
      review: 'REVISAR',
      privacyBoundary: 'Limite de privacidade',
      officialLookupBoundary: 'Limite oficial',
      fixtureSafety: 'Segurança dos fixtures',
      developerHandling: 'Handoff para desenvolvedores',
      qualityNote: 'Nota de qualidade',
      qualityNotesSummary: 'O que esta ferramenta prova localmente e o que deve ficar fora do navegador.',
      integrationTraps: 'Armadilhas de integração',
      integrationTrapsSummary: 'Verificações que evitam erros comuns de implementação.',
      advancedAnalysis: 'Análise avançada',
      presets: 'Exemplos',
      validSample: 'Exemplo válido',
      groupedValidSample: 'Exemplo válido agrupado',
      invalidSample: 'Exemplo inválido',
      shortSample: 'Exemplo curto',
      badCountrySample: 'Prefixo de país incorreto',
      recentValidations: 'Validações recentes',
      noHistory: 'Ainda não há validações recentes',
      batchValidation: 'Validação em lote',
      batchSummary: 'Execute até 100 verificações locais, um valor por linha.',
      runBatch: 'Executar lote',
      copyBatchJson: 'Copiar JSON do lote',
      clearBatch: 'Limpar lote',
      identifierBreakdown: 'Detalhamento do identificador',
      browserBoundary: 'Limite só no navegador',
      premiumDebugLayer: 'Camada premium de depuração',
      rawJsonOutput: 'Saída JSON bruta',
      advancedTools: 'Ferramentas avançadas',
      advancedToolsSummary: 'Histórico, diagnósticos em lote, prévia da API, JSON bruto e links locais.',
      toolIntelligenceSummary: 'Histórico, verificações em lote, handoff de API, JSON bruto e fluxos locais ficam disponíveis sem tomar conta do fluxo principal.',
      relatedLocalTools: 'Ferramentas locais relacionadas',
      browserHistory: 'Histórico do navegador',
      multiRowValidator: 'Validador multi-linha',
      useCurrentInput: 'Usar entrada atual',
      batchResult: 'Resultado do lote',
      rawJson: 'JSON bruto',
      batchEmpty: 'Execute o lote para comparar estados aprovado/revisar sem sair desta página.',
      relatedLocalFallback: 'Ferramentas locais relacionadas aparecem aqui depois do pruning do build.',
      toolContextTitle: 'Para que serve',
      usedFor: 'Uso',
      checksLocally: 'Verifica localmente',
      officialBoundaryShort: 'Limite'
    },
    uk: {
      validate: 'Перевірити',
      generate: 'Згенерувати',
      waiting: 'Очікування локальних даних',
      offlinePassed: 'Офлайн-перевірки пройдено',
      reviewNeeded: 'Потрібна перевірка',
      copyResult: 'Скопіювати результат',
      downloadResult: 'Завантажити результат',
      copyDeveloperJson: 'Скопіювати JSON для розробника',
      clear: 'Очистити',
      copyNormalized: 'Скопіювати нормалізоване',
      fieldBreakdown: 'Розбір полів',
      qualityNotes: 'Нотатки якості',
      samplesAndRelated: 'Приклади',
      relatedTools: 'Пов’язані інструменти',
      validationPipeline: 'Пайплайн перевірки',
      localChecksCompleted: 'Локальні перевірки виконано в цьому браузері.',
      pass: 'ПРОЙДЕНО',
      review: 'ПЕРЕВІРИТИ',
      privacyBoundary: 'Межа приватності',
      officialLookupBoundary: 'Офіційна межа',
      fixtureSafety: 'Безпека фікстур',
      developerHandling: 'Передача розробнику',
      qualityNote: 'Нотатка якості',
      qualityNotesSummary: 'Що інструмент доводить локально і що має лишатися поза браузером.',
      integrationTraps: 'Інтеграційні пастки',
      integrationTrapsSummary: 'Перевірки, що ловлять типові помилки імплементації.',
      advancedAnalysis: 'Розширений аналіз',
      presets: 'Приклади',
      validSample: 'Валідний приклад',
      groupedValidSample: 'Згрупований валідний приклад',
      invalidSample: 'Невалідний приклад',
      shortSample: 'Короткий приклад',
      badCountrySample: 'Неправильний префікс країни',
      recentValidations: 'Останні перевірки',
      noHistory: 'Останніх перевірок ще немає',
      batchValidation: 'Пакетна перевірка',
      batchSummary: 'До 100 локальних перевірок, одне значення на рядок.',
      runBatch: 'Запустити пакет',
      copyBatchJson: 'Скопіювати JSON пакета',
      clearBatch: 'Очистити пакет',
      identifierBreakdown: 'Розбір ідентифікатора',
      browserBoundary: 'Межа лише браузера',
      premiumDebugLayer: 'Преміум шар дебагу',
      rawJsonOutput: 'Сирий JSON-вивід',
      advancedTools: 'Розширені інструменти',
      advancedToolsSummary: 'Історія, пакетна діагностика, API-превʼю, сирий JSON і локальні посилання.',
      toolIntelligenceSummary: 'Історія, пакетні перевірки, API-handoff, сирий JSON і локальні сценарії доступні, але не забирають основний workflow.',
      relatedLocalTools: 'Пов’язані локальні інструменти',
      browserHistory: 'Історія браузера',
      multiRowValidator: 'Багаторядковий валідатор',
      useCurrentInput: 'Використати поточне введення',
      batchResult: 'Результат пакета',
      rawJson: 'Сирий JSON',
      batchEmpty: 'Запустіть пакет, щоб порівняти стани пройдено/перевірити без переходу зі сторінки.',
      relatedLocalFallback: 'Пов’язані локальні інструменти з’являться тут після pruning build.',
      toolContextTitle: 'Для чого цей інструмент',
      usedFor: 'Використання',
      checksLocally: 'Локальні перевірки',
      officialBoundaryShort: 'Межа'
    }
  };

  function formatLabel(template, suite) {
    return text(template).replace(/\{country\}/g, localizedCountryDisplayName(suite, currentLocale()));
  }

  function labelsFor(suite) {
    const locale = currentLocale();
    return Object.assign({}, DEFAULT_LABELS, (suite.i18n && (suite.i18n[locale] || suite.i18n.en)) || {}, DEFAULT_LOCALE_LABELS[locale] || {});
  }

  function localizedActionLabel(value, labels) {
    const normalized = text(value).trim().toLowerCase();
    if (normalized === 'generate') return labels.generate || value;
    if (normalized === 'validate') return labels.validate || value;
    return value || labels.validate;
  }

  const RUNTIME_TITLE_PHRASES = {
    fr: {
      'COP Decimal Currency Formatter': 'Formateur de montants COP',
      'Cedula de ciudadania Validator': 'Validateur de cédula de ciudadanía',
      'NIT Validator': 'Validateur NIT',
      'IVA / NIT Tax ID Validator': 'Validateur d’identifiant fiscal IVA / NIT',
      'Customs / Tax Identifier Helper': 'Assistant identifiant douane / fiscal',
      'Cedula Helper': 'Assistant cédula',
      'Company Onboarding Auditor': 'Auditeur d’onboarding entreprise',
      'RUES / Camara de Comercio Readiness Helper': 'Assistant de préparation RUES / Cámara de Comercio',
      'ID Card Format Helper': 'Assistant format carte d’identité',
      'Passport Number Helper': 'Assistant numéro de passeport',
      'MRZ / Passport Parser': 'Parseur MRZ / passeport',
      'Domestic Bank Account Validator': 'Validateur de compte bancaire local',
      'Domestic Account Fixture Generator': 'Générateur de fixtures de compte local',
      'Locale Number Parser': 'Parseur de nombres locaux',
      'Postal Tracking Helper': 'Assistant de suivi postal',
      'Domestic Transfer Helper': 'Assistant de virement local',
      'Region / Province Code Mapper': 'Mappeur de codes région / province',
      'Company Suffix Normalizer': 'Normalisateur de suffixes d’entreprise',
      'Date Locale Formatter': 'Formateur de dates locales',
      'Form Field Auditor': 'Auditeur de champs de formulaire',
      'Masked Bank Account Formatter': 'Formateur de compte bancaire masqué',
      'Phone Number Validator': 'Validateur de numéro de téléphone',
      'Address Normalizer': 'Normalisateur d’adresse',
      'VIN Validator': 'Validateur VIN'
    }
  };

  const RUNTIME_SUMMARY_PATTERNS = {
    fr: [
      [/Normalize ([A-Z]{3}) amount strings, decimal separators, grouping, and API-safe numeric previews\./g, 'Normalise les montants $1, séparateurs décimaux, groupements et aperçus numériques sûrs pour API.'],
      [/Validate ([^<.]+?) shape, split ([^<.]+?) evidence, and prepare privacy-safe debugging output\./g, 'Valide la forme $1, sépare l’évidence $2 et prépare une sortie de debug respectueuse de la confidentialité.'],
      [/Inspect ([^<.]+?) structure, registry-style prefixes, control digits, and official lookup boundaries\./g, 'Inspecte la structure $1, les préfixes de type registre, les chiffres de contrôle et les limites des consultations officielles.'],
      [/Normalize ([^<.]+?) identifiers, inspect local tax body evidence, and prepare tax-authority handoff diagnostics\./g, 'Normalise les identifiants $1, inspecte l’évidence fiscale locale et prépare les diagnostics pour l’autorité fiscale.'],
      [/Validate domestic bank account shape, bank\/account slices, payment-rail evidence, and official bank ownership boundaries\./g, 'Valide la forme de compte bancaire local, les segments banque/compte, l’évidence de rail de paiement et les limites de propriété officielle.'],
      [/Generate fixture-safe domestic account references, split bank\/account evidence, and prepare payment test payloads\./g, 'Génère des références de compte local sûres pour fixtures, sépare l’évidence banque/compte et prépare des payloads de test de paiement.'],
      [/Parse passport MRZ snippets, split document, nationality, dates, and checksum evidence without identity proof\./g, 'Parse les fragments MRZ de passeport et sépare document, nationalité, dates et checksum sans preuve d’identité.'],
      [/Normalize local dates, ISO previews, fiscal-period hints, and locale parsing diagnostics\./g, 'Normalise les dates locales, aperçus ISO, indices de période fiscale et diagnostics de parsing locale.'],
      [/Validate local phone shape, country prefix, national number blocks, and contact-form safety notes\./g, 'Valide la forme du téléphone local, le préfixe pays, les blocs nationaux et les notes de sécurité des formulaires de contact.'],
      [/Normalize street, postal code, locality, region, and country lines for local address forms\./g, 'Normalise rue, code postal, localité, région et pays pour les formulaires d’adresse locaux.'],
      [/Validate VIN shape, split WMI\/VDS\/VIS evidence, and prepare vehicle-intake diagnostics\./g, 'Valide la forme VIN, sépare l’évidence WMI/VDS/VIS et prépare les diagnostics d’entrée véhicule.']
    ]
  };

  const RUNTIME_EXACT_PHRASES = {
    fr: {
      'Valid sample': 'Exemple valide',
      'Invalid sample': 'Exemple invalide',
      'Short sample': 'Exemple court',
      'Wrong prefix sample': 'Exemple avec mauvais préfixe',
      'Edge sample': 'Cas limite',
      'Official boundary': 'Limite officielle',
      'Fixture safety': 'Sécurité des fixtures',
      'Developer handling': 'Manipulation développeur',
      'No official lookup is made.': 'Aucune consultation officielle n’est effectuée.',
      'Official Colombia identity, registry, tax, banking, vehicle, postal, filing, carrier, and legal status require the responsible local authority or provider.': 'L’identité, le registre, la fiscalité, la banque, les véhicules, le postal, les dépôts, le transport et le statut juridique en Colombie exigent l’autorité ou le fournisseur local responsable.',
      'Offline Colombian parser evidence does not prove registry, tax, banking, filing, vehicle, or legal status.': 'L’évidence de parsing colombienne hors ligne ne prouve pas le statut registre, fiscal, bancaire, déclaratif, véhicule ou juridique.',
      'Valid and invalid CUR examples are safe structural fixtures for tests and demos.': 'Les exemples CUR valides et invalides sont des fixtures structurelles sûres pour tests et démos.',
      'Use normalized CUR values for forms, masked previews for logs, and field slices for parser/debug handoff.': 'Utilisez les valeurs CUR normalisées pour les formulaires, les aperçus masqués pour les logs et les segments de champs pour le handoff parser/debug.',
      'locale-format normalization evidence': 'évidence de normalisation de formats locaux',
      'CSV imports, exports, data cleanup': 'imports CSV, exports et nettoyage de données',
      'dates, decimals, separators, local display': 'dates, décimales, séparateurs et affichage local',
      'business meaning of the source data': 'sens métier des données source',
      'Keep raw input, normalized value, display value, and masked preview as separate fields in forms, exports, and logs.': 'Gardez l’entrée brute, la valeur normalisée, l’affichage et l’aperçu masqué dans des champs séparés pour formulaires, exports et logs.',
      'Do not treat local browser analysis as live official status, ownership, eligibility, or legal acceptance.': 'Ne traitez pas l’analyse locale du navigateur comme un statut officiel, une propriété, une éligibilité ou une acceptation juridique en direct.',
      'Exercise valid, invalid, short, wrong-context, pasted, and generated samples before wiring the workflow into production forms.': 'Testez les exemples valides, invalides, courts, mauvais contexte, collés et générés avant de connecter le workflow à des formulaires de production.',
      'Record country, locale, currency, and data-source assumptions with every exported payload.': 'Enregistrez les hypothèses de pays, locale, devise et source de données avec chaque payload exporté.',
      'Mask personal or commercially sensitive values before sharing debugger output outside the local browser.': 'Masquez les valeurs personnelles ou commercialement sensibles avant de partager une sortie de debug hors du navigateur.'
    }
  };

  const RUNTIME_EXACT_SHARED_PHRASES = {
    fr: {
      'Family': 'Famille',
      'Route country': 'Pays de la route',
      'Expected length': 'Longueur attendue',
      'IBAN characters': 'Caractères IBAN',
      'Generate mode': 'Mode de génération',
      'Fresh fixture': 'Fixture fraîche',
      'New local value every click': 'Nouvelle valeur locale à chaque clic',
      'Route prefix': 'Préfixe de route',
      'Local label': 'Libellé local',
      'Replay': 'Rejeu',
      'Shape + checksum': 'Forme + checksum',
      'When local parser exists': 'Quand le parseur local existe',
      'Boundary': 'Limite',
      'No registry status claim': 'Aucune affirmation de statut registre',
      'Calling code': 'Indicatif',
      'Postal shape': 'Forme postale',
      'Address sample': 'Exemple d’adresse',
      'Local sample': 'Exemple local',
      'Shape source': 'Source de forme',
      'Format + mask': 'Format + masque',
      'Browser-local only': 'Local au navigateur uniquement',
      'No live proof': 'Aucune preuve en direct',
      'Carrier/postal/geocode external': 'Transporteur/postal/géocodage externe',
      'Route shape': 'Forme de route',
      'Token + anatomy': 'Jeton + anatomie',
      'VIN/MRZ when available': 'VIN/MRZ si disponible',
      'Registry/carrier/authority external': 'Registre/transporteur/autorité externe',
      'Routing + account': 'Routage + compte',
      'BIC/ABA when visible': 'BIC/ABA si visible',
      'Ownership/settlement external': 'Propriété/règlement externe',
      'Date + number': 'Date + nombre',
      'Week/decimal when visible': 'Semaine/décimale si visible',
      'No live source': 'Aucune source en direct',
      'Rates/holidays/DST external': 'Taux/fériés/DST externes',
      'Fixture fields': 'Champs de fixture',
      'Keys + payload': 'Clés + payload',
      'JSON/CSV when visible': 'JSON/CSV si visible',
      'No source truth': 'Aucune vérité source',
      'Privacy/compliance external': 'Confidentialité/conformité externe',
      'Reference + amount': 'Référence + montant',
      'Payload anatomy when available': 'Anatomie payload si disponible',
      'Settlement/fiscal/award external': 'Règlement/fiscal/attribution externe',
      'Currency / decimal': 'Devise / décimales',
      'local currency': 'devise locale',
      'local decimal': 'décimale locale',
      'local grouping': 'groupement local',
      'not detected': 'non détecté',
      'masqué preview': 'aperçu masqué',
      'finance': 'finance',
      'Input present': 'Entrée présente',
      'Input is available locally.': 'L’entrée est disponible localement.',
      'Currency / decimal evidence': 'Évidence devise / décimales',
      'Currency / decimal browser-checkable evidence detected.': 'Évidence devise / décimales vérifiable dans le navigateur détectée.',
      'Placeholder guard': 'Garde placeholder',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Anatomie locale devise / décimales et détail des évidences',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for uniquement navigateur debugging.': 'Anatomie par segment, évidence du parseur local et notes de limite officielle pour le débogage navigateur.',
      'amount text': 'texte du montant',
      'currency': 'devise',
      'decimal convention': 'convention décimale',
      'grouping convention': 'convention de groupement',
      'amount token': 'jeton montant',
      'currency marker': 'marqueur devise',
      'decimal separator': 'séparateur décimal',
      'canonical number': 'nombre canonique',
      'route sample shape': 'forme de l’exemple route',
      'locale vocabulary': 'vocabulaire locale',
      'masked preview': 'aperçu masqué',
      'Browser-local amount/currency display.': 'Affichage montant/devise local au navigateur.',
      'Route currency context.': 'Contexte devise de la route.',
      'Locale decimal separator expectation.': 'Séparateur décimal attendu pour la locale.',
      'Locale thousands/grouping separator expectation.': 'Séparateur de milliers/groupement attendu pour la locale.',
      'Numeric amount extracted from the current input.': 'Montant numérique extrait de l’entrée actuelle.',
      'Local date, calendar, number, currency, or timezone vocabulary.': 'Vocabulaire local de date, calendrier, nombre, devise ou fuseau horaire.',
      'Log-safe locale payload preview.': 'Aperçu payload locale sûr pour logs.',
      'Legal tender status, exchange rates, holidays, DST policy, and business opening state require current source/provider data.': 'Cours légal, taux de change, jours fériés, règles DST et état d’ouverture exigent une source ou un fournisseur à jour.',
      'Calculation debugger': 'Débogueur de calcul',
      'Replay calculation': 'Rejouer le calcul',
      'Validation pipeline logs': 'Logs du pipeline de validation',
      'Step': 'Étape',
      'Evidence': 'Évidence',
      'Detail': 'Détail'
    }
  };

  Object.assign(RUNTIME_EXACT_SHARED_PHRASES, {
    de: {
      'Family': 'Familie',
      'Route shape': 'Routenform',
      'Replay': 'Prueflauf',
      'Boundary': 'Grenze',
      'No live source': 'Keine Echtzeitquelle',
      'Rates/holidays/DST external': 'Kurse/Feiertage/DST extern',
      'Date + number': 'Datum + Zahl',
      'Week/decimal when visible': 'Woche/Dezimal wenn sichtbar',
      'Input present': 'Eingabe vorhanden',
      'Input is available locally.': 'Eingabe ist lokal verfügbar.',
      'Currency / decimal': 'Währung / Dezimal',
      'Currency / decimal evidence': 'Währungs-/Dezimal-Evidenz',
      'Currency / decimal browser-checkable evidence detected.': 'Browser-prüfbare Währungs-/Dezimal-Evidenz erkannt.',
      'Placeholder guard': 'Placeholder-Schutz',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Locale-Anatomie für Währung/Dezimal und Evidenzaufschlüsselung',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.': 'Segment-Anatomie, lokale Parser-Evidenz und offizielle Grenzen für Browser-Debugging.',
      'amount text': 'Betragstext',
      'currency': 'Währung',
      'decimal convention': 'Dezimalkonvention',
      'grouping convention': 'Gruppierungskonvention',
      'amount token': 'Betrags-Token',
      'currency marker': 'Währungsmarker',
      'decimal separator': 'Dezimaltrenner',
      'canonical number': 'kanonische Zahl',
      'route sample shape': 'Routen-Beispielform',
      'locale vocabulary': 'Locale-Vokabular',
      'masked preview': 'maskierte Vorschau',
      'local currency': 'lokale Währung',
      'local decimal': 'lokales Dezimalformat',
      'local grouping': 'lokale Gruppierung',
      'not detected': 'nicht erkannt',
      'Offline only': 'Nur offline',
      'Browser-local amount/currency display.': 'Browser-lokale Betrags-/Währungsanzeige.',
      'Route currency context.': 'Währungskontext der Route.',
      'Locale decimal separator expectation.': 'Erwarteter Dezimaltrenner der Locale.',
      'Locale thousands/grouping separator expectation.': 'Erwarteter Tausender-/Gruppierungstrenner der Locale.',
      'Numeric amount extracted from the current input.': 'Numerischer Betrag aus der aktuellen Eingabe.',
      'Log-safe locale payload preview.': 'Log-sichere Locale-Payload-Vorschau.',
      'Calculation debugger': 'Berechnungsdebugger',
      'Replay calculation': 'Berechnung wiederholen',
      'Validation pipeline logs': 'Logs der Validierungspipeline',
      'Step': 'Schritt',
      'Evidence': 'Evidenz',
      'Detail': 'Detail',
      'Pass': 'Bestanden',
      'Review': 'Prüfen'
    },
    es: {
      'Family': 'Familia',
      'Route shape': 'Forma de ruta',
      'Replay': 'Reproducción',
      'Boundary': 'Límite',
      'No live source': 'Sin fuente en vivo',
      'Rates/holidays/DST external': 'Tasas/feriados/DST externos',
      'Date + number': 'Fecha + número',
      'Week/decimal when visible': 'Semana/decimal si visible',
      'Input present': 'Entrada presente',
      'Input is available locally.': 'La entrada está disponible localmente.',
      'Currency / decimal': 'Moneda / decimal',
      'Currency / decimal evidence': 'Evidencia de moneda / decimal',
      'Currency / decimal browser-checkable evidence detected.': 'Evidencia de moneda / decimal comprobable en navegador detectada.',
      'Placeholder guard': 'Protección contra placeholder',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Anatomía local de moneda / decimal y desglose de evidencias',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.': 'Anatomía por segmento, evidencia del parser local y límites oficiales para depuración en navegador.',
      'amount text': 'texto del importe',
      'currency': 'moneda',
      'decimal convention': 'convención decimal',
      'grouping convention': 'convención de agrupación',
      'amount token': 'token de importe',
      'currency marker': 'marcador de moneda',
      'decimal separator': 'separador decimal',
      'canonical number': 'número canónico',
      'route sample shape': 'forma del ejemplo de ruta',
      'locale vocabulary': 'vocabulario local',
      'masked preview': 'vista previa enmascarada',
      'local currency': 'moneda local',
      'local decimal': 'decimal local',
      'local grouping': 'agrupación local',
      'not detected': 'no detectado',
      'Offline only': 'Solo offline',
      'Browser-local amount/currency display.': 'Visualización de importe/moneda local al navegador.',
      'Route currency context.': 'Contexto de moneda de la ruta.',
      'Locale decimal separator expectation.': 'Separador decimal esperado para la locale.',
      'Locale thousands/grouping separator expectation.': 'Separador de miles/agrupación esperado para la locale.',
      'Numeric amount extracted from the current input.': 'Importe numérico extraído de la entrada actual.',
      'Log-safe locale payload preview.': 'Vista previa del payload local segura para logs.',
      'Calculation debugger': 'Depurador de cálculo',
      'Replay calculation': 'Reproducir cálculo',
      'Validation pipeline logs': 'Logs del pipeline de validación',
      'Step': 'Paso',
      'Evidence': 'Evidencia',
      'Detail': 'Detalle',
      'Pass': 'Aprobado',
      'Review': 'Revisar'
    },
    pl: {
      'Family': 'Rodzina',
      'Route shape': 'Format trasy',
      'Replay': 'Odtworzenie',
      'Boundary': 'Granica',
      'No live source': 'Brak źródła na żywo',
      'Rates/holidays/DST external': 'Kursy/święta/DST zewnętrzne',
      'Date + number': 'Data + liczba',
      'Week/decimal when visible': 'Tydzień/dziesiętne gdy widoczne',
      'Input present': 'Dane wejściowe obecne',
      'Input is available locally.': 'Dane wejściowe są dostępne lokalnie.',
      'Currency / decimal': 'Waluta / dziesiętne',
      'Currency / decimal evidence': 'Ewidencja waluty / dziesiętna',
      'Currency / decimal browser-checkable evidence detected.': 'Wykryto możliwą do sprawdzenia w przeglądarce ewidencję waluty / dziesiętną.',
      'Placeholder guard': 'Ochrona placeholdera',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Lokalna anatomia waluty / dziesiętna i podział ewidencji',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.': 'Anatomia segmentów, lokalna ewidencja parsera i granice oficjalne dla debugowania w przeglądarce.',
      'amount text': 'tekst kwoty',
      'currency': 'waluta',
      'decimal convention': 'konwencja dziesiętna',
      'grouping convention': 'konwencja grupowania',
      'amount token': 'token kwoty',
      'currency marker': 'marker waluty',
      'decimal separator': 'separator dziesiętny',
      'canonical number': 'liczba kanoniczna',
      'route sample shape': 'format przykładu trasy',
      'locale vocabulary': 'słownictwo locale',
      'masked preview': 'zamaskowany podgląd',
      'local currency': 'lokalna waluta',
      'local decimal': 'lokalny separator dziesiętny',
      'local grouping': 'lokalne grupowanie',
      'not detected': 'nie wykryto',
      'Offline only': 'Tylko offline',
      'Browser-local amount/currency display.': 'Lokalny w przeglądarce widok kwoty/waluty.',
      'Route currency context.': 'Kontekst waluty trasy.',
      'Locale decimal separator expectation.': 'Oczekiwany separator dziesiętny locale.',
      'Locale thousands/grouping separator expectation.': 'Oczekiwany separator tysięcy/grupowania locale.',
      'Numeric amount extracted from the current input.': 'Kwota numeryczna wyodrębniona z bieżących danych wejściowych.',
      'Log-safe locale payload preview.': 'Bezpieczny dla logów podgląd payloadu locale.',
      'Calculation debugger': 'Debugger obliczeń',
      'Replay calculation': 'Odtwórz obliczenie',
      'Validation pipeline logs': 'Logi pipeline walidacji',
      'Step': 'Krok',
      'Evidence': 'Ewidencja',
      'Detail': 'Szczegół',
      'Pass': 'Zaliczone',
      'Review': 'Sprawdź'
    },
    'pt-BR': {
      'Family': 'Família',
      'Route shape': 'Formato da rota',
      'Replay': 'Reexecução',
      'Boundary': 'Limite',
      'No live source': 'Sem fonte em tempo real',
      'Rates/holidays/DST external': 'Taxas/feriados/DST externos',
      'Date + number': 'Data + número',
      'Week/decimal when visible': 'Semana/decimal quando visível',
      'Input present': 'Entrada presente',
      'Input is available locally.': 'A entrada está disponível localmente.',
      'Currency / decimal': 'Moeda / decimal',
      'Currency / decimal evidence': 'Evidência de moeda / decimal',
      'Currency / decimal browser-checkable evidence detected.': 'Evidência de moeda / decimal verificável no navegador detectada.',
      'Placeholder guard': 'Proteção contra placeholder',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Anatomia local de moeda / decimal e detalhamento de evidências',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.': 'Anatomia por segmento, evidência do parser local e limites oficiais para depuração no navegador.',
      'amount text': 'texto do valor',
      'currency': 'moeda',
      'decimal convention': 'convenção decimal',
      'grouping convention': 'convenção de agrupamento',
      'amount token': 'token do valor',
      'currency marker': 'marcador de moeda',
      'decimal separator': 'separador decimal',
      'canonical number': 'número canônico',
      'route sample shape': 'formato do exemplo da rota',
      'locale vocabulary': 'vocabulário local',
      'masked preview': 'prévia mascarada',
      'local currency': 'moeda local',
      'local decimal': 'decimal local',
      'local grouping': 'agrupamento local',
      'not detected': 'não detectado',
      'Offline only': 'Somente offline',
      'Browser-local amount/currency display.': 'Exibição de valor/moeda local no navegador.',
      'Route currency context.': 'Contexto de moeda da rota.',
      'Locale decimal separator expectation.': 'Separador decimal esperado da locale.',
      'Locale thousands/grouping separator expectation.': 'Separador de milhares/agrupamento esperado da locale.',
      'Numeric amount extracted from the current input.': 'Valor numérico extraído da entrada atual.',
      'Log-safe locale payload preview.': 'Prévia de payload locale segura para logs.',
      'Calculation debugger': 'Depurador de cálculo',
      'Replay calculation': 'Reexecutar cálculo',
      'Validation pipeline logs': 'Logs do pipeline de validação',
      'Step': 'Etapa',
      'Evidence': 'Evidência',
      'Detail': 'Detalhe',
      'Pass': 'Aprovado',
      'Review': 'Revisar'
    },
    uk: {
      'Family': 'Сімейство',
      'Route shape': 'Форма маршруту',
      'Replay': 'Повтор',
      'Boundary': 'Межа',
      'No live source': 'Без джерела в реальному часі',
      'Rates/holidays/DST external': 'Курси/свята/DST зовнішні',
      'Date + number': 'Дата + число',
      'Week/decimal when visible': 'Тиждень/десяткові якщо видно',
      'Input present': 'Вхідні дані є',
      'Input is available locally.': 'Вхідні дані доступні локально.',
      'Currency / decimal': 'Валюта / десяткові',
      'Currency / decimal evidence': 'Доказ валюти / десяткових',
      'Currency / decimal browser-checkable evidence detected.': 'Виявлено доказ валюти / десяткових, що перевіряється в браузері.',
      'Placeholder guard': 'Захист від placeholder',
      'Currency / decimal locale anatomy & anatomy & evidence breakdown': 'Локальна анатомія валюти / десяткових і розбір доказів',
      'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.': 'Сегментна анатомія, докази локального парсера і офіційні межі для браузерного дебагу.',
      'amount text': 'текст суми',
      'currency': 'валюта',
      'decimal convention': 'десяткова конвенція',
      'grouping convention': 'конвенція групування',
      'amount token': 'токен суми',
      'currency marker': 'маркер валюти',
      'decimal separator': 'десятковий розділювач',
      'canonical number': 'канонічне число',
      'route sample shape': 'форма прикладу маршруту',
      'locale vocabulary': 'словник locale',
      'masked preview': 'маскований перегляд',
      'local currency': 'локальна валюта',
      'local decimal': 'локальний десятковий формат',
      'local grouping': 'локальне групування',
      'not detected': 'не виявлено',
      'Offline only': 'Лише офлайн',
      'Browser-local amount/currency display.': 'Локальне в браузері відображення суми/валюти.',
      'Route currency context.': 'Контекст валюти маршруту.',
      'Locale decimal separator expectation.': 'Очікуваний десятковий розділювач locale.',
      'Locale thousands/grouping separator expectation.': 'Очікуваний розділювач тисяч/групування locale.',
      'Numeric amount extracted from the current input.': 'Числова сума, витягнута з поточного вводу.',
      'Log-safe locale payload preview.': 'Безпечний для логів перегляд locale payload.',
      'Calculation debugger': 'Дебагер обчислень',
      'Replay calculation': 'Повторити обчислення',
      'Validation pipeline logs': 'Логи пайплайна перевірки',
      'Step': 'Крок',
      'Evidence': 'Доказ',
      'Detail': 'Деталь',
      'Pass': 'Пройдено',
      'Review': 'Перевірити'
    }
  });

  const COMMON_TRAP_TRANSLATIONS = {
    es: {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Mantén formas compactas, visibles, enmascaradas, generadas y parseadas como campos separados; los viajes solo por puntuación esconden bugs del parser.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Un aprobado local solo prueba sintaxis, checksum o forma; cuentas, operador, postal, identidad, VIES o directorios requieren el sistema propietario.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Mantén fixtures de prefijo incorrecto, checksum malo, cortas y agrupadas en CI para que producción no acepte el mercado equivocado.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'No trates la salida local del navegador como prueba de aceptación por una API, cuenta, dominio, certificado o servicio externo.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Conserva fixtures negativas: malformadas, riesgosas, cortas, expiradas, débiles y fuera de contexto detectan regresiones más rápido.'
    },
    'pt-BR': {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Mantenha formas compactas, exibidas, mascaradas, geradas e parseadas em campos separados; idas e voltas só de pontuação escondem bugs do parser.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Um aprovado local prova apenas sintaxe, checksum ou formato; conta, operadora, postal, identidade, VIES ou diretório exigem o sistema responsável.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Mantenha fixtures de prefixo errado, checksum ruim, curtas e agrupadas na CI para produção não aceitar o mercado errado.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'Não trate saída local do navegador como prova de que API, conta, domínio, certificado ou serviço externo aceita o valor.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Guarde fixtures negativas: malformadas, arriscadas, curtas, expiradas, fracas e fora de contexto pegam regressões mais rápido.'
    },
    de: {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Halte kompakte, sichtbare, maskierte, generierte und geparste Formen getrennt; reine Interpunktions-Roundtrips verstecken Parserfehler.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Ein lokales OK beweist nur Syntax, Prüfsumme oder Form; Konto-, Carrier-, Postal-, Identitäts-, VIES- oder Verzeichnisstatus braucht das zuständige System.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Halte Wrong-Prefix-, Bad-Checksum-, kurze und gruppierte Fixtures in CI, damit Produktionsadapter nicht still den falschen Markt akzeptieren.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'Behandle browserlokale Ausgabe nicht als Beweis, dass Produktions-API, Konto, Domain, Zertifikat oder externer Dienst den Wert akzeptiert.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Behalte negative Fixtures: fehlerhafte, riskante, kurze, abgelaufene, schwache und falsche Kontextbeispiele finden Regressionen schneller.'
    },
    fr: {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Gardez les formes compactes, affichées, masquées, générées et parsées dans des champs séparés ; les allers-retours de ponctuation masquent les bugs de parser.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Un succès local prouve seulement la syntaxe, le checksum ou la forme ; compte, opérateur, postal, identité, VIES ou annuaire exigent le système responsable.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Gardez des fixtures mauvais préfixe, mauvais checksum, courtes et groupées dans la CI pour éviter qu’un adaptateur accepte le mauvais marché.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'Ne traitez pas la sortie locale du navigateur comme preuve qu’une API, un compte, un domaine, un certificat ou un service externe accepte la valeur.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Conservez les fixtures négatives : malformées, risquées, courtes, expirées, faibles ou hors contexte capturent les régressions plus vite.'
    },
    pl: {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Trzymaj formy kompaktowe, wyświetlane, maskowane, generowane i parsowane w osobnych polach; same znaki interpunkcyjne ukrywają błędy parsera.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Lokalny sukces dowodzi tylko składni, sumy kontrolnej lub formy; status konta, operatora, poczty, tożsamości, VIES lub katalogu wymaga systemu źródłowego.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Trzymaj fixture’y ze złym prefiksem, złą sumą, krótkie i grupowane w CI, aby adaptery nie przyjęły cicho złego rynku.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'Nie traktuj wyniku lokalnego jako dowodu, że produkcyjne API, konto, domena, certyfikat lub usługa zewnętrzna akceptuje wartość.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Zachowuj fixture’y negatywne: błędne, ryzykowne, krótkie, wygasłe, słabe i z błędnego kontekstu szybciej łapią regresje.'
    },
    uk: {
      'Keep compact, display, masked, generated, and parsed forms as separate fields; punctuation-only round trips hide parser bugs.': 'Тримайте компактну, відображувану, масковану, згенеровану й розпарсену форми в окремих полях; кругові перетворення лише пунктуації ховають помилки парсера.',
      'A local pass proves syntax, checksum, or shape only; live account, carrier, postal, identity, VIES, or directory status needs the owning system.': 'Локальний успіх доводить лише синтаксис, checksum або форму; статус рахунку, оператора, пошти, особи, VIES чи каталогу потребує системи-власника.',
      'Keep wrong-prefix, bad-checksum, short, and grouped fixtures in CI so production adapters do not silently accept the wrong market.': 'Тримайте фікстури з неправильним префіксом, поганим checksum, короткі й згруповані в CI, щоб продакшн-адаптери не приймали хибний ринок мовчки.',
      'Do not treat browser-local output as proof that a production API, account, domain, certificate, or external service accepts the value.': 'Не сприймайте браузерний локальний результат як доказ, що продакшн API, рахунок, домен, сертифікат або зовнішній сервіс приймає значення.',
      'Retain negative fixtures: malformed, risky, short, expired, weak, and wrong-context samples catch regressions faster than happy paths.': 'Зберігайте негативні фікстури: malformed, risky, short, expired, weak і wrong-context приклади ловлять регресії швидше за happy path.'
    }
  };

  Object.entries(COMMON_TRAP_TRANSLATIONS).forEach(([locale, entries]) => {
    RUNTIME_EXACT_SHARED_PHRASES[locale] = Object.assign(RUNTIME_EXACT_SHARED_PHRASES[locale] || {}, entries);
  });

  const RUNTIME_COUNTRY_NAME_OVERRIDES = {
    fr: {
      colombia: 'Colombie'
    }
  };

  function localizedCountryDisplayName(suite, locale) {
    if (locale === 'en') return suite.country.name;
    const slug = text(suite.country && suite.country.slug).toLowerCase();
    const override = RUNTIME_COUNTRY_NAME_OVERRIDES[locale] && RUNTIME_COUNTRY_NAME_OVERRIDES[locale][slug];
    if (override) return override;
    try {
      const iso = text(suite.country && (suite.country.iso2 || suite.country.iso || suite.country.countryCode)).toUpperCase();
      const display = iso ? new Intl.DisplayNames([locale], { type: 'region' }).of(iso) : '';
      if (display && display !== iso) return display;
    } catch (error) {
      // Keep the configured English name as a safe fallback.
    }
    return suite.country.name;
  }

  function stripCountryAdjective(value, suite) {
    let next = text(value).trim();
    const countryName = text(suite.country && suite.country.name).trim();
    if (countryName && next.toLowerCase().startsWith(countryName.toLowerCase() + ' ')) {
      return next.slice(countryName.length).trim();
    }
    const words = next.split(/\s+/);
    if (words.length > 1 && /(?:ian|ish|ese|ic|ch|ss)$/i.test(words[0])) {
      next = words.slice(1).join(' ');
    }
    return next;
  }

  function localizeRuntimePhrase(value, locale) {
    let next = text(value);
    const exact = Object.assign({}, RUNTIME_EXACT_SHARED_PHRASES[locale] || {}, RUNTIME_EXACT_PHRASES[locale] || {});
    if (exact[next]) return exact[next];
    for (const [pattern, replacement] of RUNTIME_SUMMARY_PATTERNS[locale] || []) {
      next = next.replace(pattern, replacement);
    }
    if (locale === 'fr') {
      next = next
        .replace(/\bColombia\b/g, 'Colombie')
        .replace(/\bColombian\b/g, 'colombien')
        .replace(/\bbrowser-only\b/gi, 'uniquement navigateur')
        .replace(/\boffline only\b/gi, 'hors ligne uniquement')
        .replace(/\boffline\b/gi, 'hors ligne')
        .replace(/\blocal evidence\b/gi, 'évidence locale')
        .replace(/\blocal structure\b/gi, 'structure locale')
        .replace(/\bstructure in this browser\b/gi, 'structure dans ce navigateur')
        .replace(/\braw input local\b/gi, 'entrée brute locale')
        .replace(/\bOfficial boundary\b/g, 'Limite officielle')
        .replace(/\bBrowser-only replay\b/g, 'Replay uniquement navigateur')
        .replace(/\bFixture safety\b/g, 'Sécurité des fixtures')
        .replace(/\bDeveloper handling\b/g, 'Manipulation développeur')
        .replace(/\bLocale anatomy\b/g, 'Anatomie locale')
        .replace(/\bnormalized\b/gi, 'normalisé')
        .replace(/\bmasked\b/gi, 'masqué')
        .replace(/\bmachine number\b/gi, 'nombre machine')
        .replace(/\bISO DATE\/WEEK\b/g, 'DATE/SEMAINE ISO')
        .replace(/\bofficial boundary\b/gi, 'limite officielle')
        .replace(/\bPass\b/g, 'Réussi')
        .replace(/\bReview\b/g, 'À vérifier')
        .replace(/\bStep\b/g, 'Étape')
        .replace(/\bEvidence\b/g, 'Évidence')
        .replace(/\bDetail\b/g, 'Détail');
    }
    next = next.replace(/^Colombian COP Decimal Currency Formatter$/g, 'Colombie: Formateur de montants COP');
    next = next.replace(/^colombien COP Decimal Currency Formatter$/g, 'Colombie: Formateur de montants COP');
    next = next.replace(/^([A-Z]{2,5}): Currency \/ decimal évidence locale verified$/g, '$1 : évidence locale de devise/décimales vérifiée');
    next = next.replace(/^Colombie currency \/ decimal evidence was parsed locally with separator\/date anatomy, machine-safe exports, ambiguity hints, and official-boundary output\.$/g, 'L’évidence devise/décimales de Colombie a été analysée localement avec anatomie des séparateurs et dates, exports sûrs pour machine, indices d’ambiguïté et limite officielle.');
    next = next.replace(/^Colombie currency \/ decimal evidence was parsed locally with separator\/date anatomy, machine-safe exports, ambiguity hints, and limite officielle output\.$/g, 'L’évidence devise/décimales de Colombie a été analysée localement avec anatomie des séparateurs et dates, exports sûrs pour machine, indices d’ambiguïté et limite officielle.');
    next = next.replace(/^Parser-normalisé locale value for forms, imports, and fixtures\.$/g, 'Valeur locale normalisée par le parseur pour formulaires, imports et fixtures.');
    next = next.replace(/^Canonical number when the input exposes one\.$/g, 'Nombre canonique lorsque l’entrée en expose un.');
    next = next.replace(/^Machine-safe date\/week hint when visible\.$/g, 'Indice date/semaine sûr pour machine lorsqu’il est visible.');
    next = next.replace(/^ISO currency code or visible currency symbol\.$/g, 'Code devise ISO ou symbole de devise visible.');
    next = next.replace(/^Detected decimal separator for parser\/export fixtures\.$/g, 'Séparateur décimal détecté pour fixtures de parsing/export.');
    next = next.replace(/^Machine-safe decimal form using dot as decimal separator\.$/g, 'Forme décimale sûre pour machine avec point comme séparateur décimal.');
    next = next.replace(/^Letter\/digit\/separator shape inferred from the route success sample\.$/g, 'Forme lettres/chiffres/séparateurs déduite de l’exemple de réussite de la route.');
    next = next.replace(/^Local decimal\/grouping evidence from the route country profile\.$/g, 'Évidence décimale/groupement issue du profil pays de la route.');
    next = next.replace(/^No exchange-rate, holiday, legal-tender, DST-policy, or opening-hours lookup is made\.$/g, 'Aucune consultation de taux de change, jours fériés, cours légal, règles DST ou horaires d’ouverture n’est effectuée.');
    next = next.replace(/^Repeated-placeholder numeric value rejected\.$/g, 'Valeur numérique répétée de placeholder rejetée.');
    next = next.replace(/^Exchange rates, legal tender status, holidays, DST policy, and opening state require current source\/provider data\.$/g, 'Taux de change, cours légal, jours fériés, règles DST et état d’ouverture exigent une source ou un fournisseur à jour.');
    next = next.replace(/^log-safe preview$/g, 'aperçu sûr pour logs');
    next = next.replace(/^not available$/g, 'non disponible');
    next = next.replace(/Colombian ([A-Z]{3}) Decimal Currency Formatter analyzes Colombia-specific finance evidence locally in this browser\./g, 'Le formateur de montants $1 analyse localement dans ce navigateur l’évidence financière propre à la Colombie.');
    next = next.replace(/colombien ([A-Z]{3}) Decimal Currency Formatter analyzes Colombie-specific structure in this browser and keeps raw input local\./g, 'Le formateur de montants $1 analyse localement la structure propre à la Colombie et garde l’entrée brute dans le navigateur.');
    next = next.replace(/Colombian ([A-Z]{3}) Decimal Currency Formatter analyzes Colombia-specific structure in this browser and keeps raw input local\./g, 'Le formateur de montants $1 analyse localement la structure propre à la Colombie et garde l’entrée brute dans le navigateur.');
    next = next.replace(/colombien ([A-Z]{3}) Decimal Currency Formatter analyzes Colombie-specific structure dans ce navigateur and keeps entrée brute locale\./g, 'Le formateur de montants $1 analyse localement la structure propre à la Colombie et garde l’entrée brute dans le navigateur.');
    next = next.replace(/^Colombie registry, tax, identity, banking, vehicle, postal, or filing status still requires the responsible official system\.$/g, 'Le statut registre, fiscal, identité, banque, véhicule, postal ou déclaratif de Colombie exige toujours le système officiel responsable.');
    next = next.replace(/^Use valid and invalid examples as structural test fixtures; a passing hors ligne result is not a live-state proof\.$/g, 'Utilisez les exemples valides et invalides comme fixtures de test structurelles ; un résultat hors ligne réussi ne prouve pas un état live.');
    next = next.replace(/^Copy normalisé CUR values for forms, masqué previews for logs, and field slices for parser tests\.$/g, 'Copiez les valeurs CUR normalisées pour les formulaires, les aperçus masqués pour les logs et les segments de champs pour les tests de parseur.');
    return exact[next] || next;
  }

  function localizeResult(suite, result) {
    const locale = currentLocale();
    if (locale === 'en' || !result) return result;
    const localize = (value) => localizeRuntimePhrase(value, locale);
    const localizeItem = (item) => item && typeof item === 'object'
      ? Object.assign({}, item, {
          label: localize(item.label),
          value: localize(item.value),
          note: localize(item.note),
          text: localize(item.text),
          detail: localize(item.detail),
          message: localize(item.message)
        })
      : item;
    return Object.assign({}, result, {
      headline: localize(result.headline),
      detail: localize(result.detail),
      breakdownTitle: localize(result.breakdownTitle),
      breakdownSummary: localize(result.breakdownSummary),
      fields: asArray(result.fields).map(localizeItem),
      breakdown: asArray(result.breakdown).map(localizeItem),
      checks: asArray(result.checks).map(localizeItem),
      qualityNotes: asArray(result.qualityNotes).map((note) => note && typeof note === 'object'
        ? Object.assign({}, note, { title: localize(note.title), text: localize(note.text) })
        : localize(note)),
      suggestions: asArray(result.suggestions).map((item) => item && typeof item === 'object'
        ? Object.assign({}, item, { label: localize(item.label), detail: localize(item.detail), action: item.action })
        : localize(item)),
      developerJson: localizeDeveloperJsonValues(result.developerJson, locale)
    });
  }

  function localizeDeveloperJsonValues(value, locale) {
    if (locale === 'en' || value == null) return value;
    if (typeof value === 'string') return localizeRuntimePhrase(value, locale);
    if (Array.isArray(value)) return value.map((item) => localizeDeveloperJsonValues(item, locale));
    if (typeof value === 'object') {
      const next = {};
      for (const [key, item] of Object.entries(value)) {
        next[key] = localizeDeveloperJsonValues(item, locale);
      }
      return next;
    }
    return value;
  }

  function localizeRuntimeToolName(value, suite, locale) {
    if (locale === 'en') return value;
    const countryName = localizedCountryDisplayName(suite, locale);
    const body = stripCountryAdjective(value, suite);
    const translated = (RUNTIME_TITLE_PHRASES[locale] && RUNTIME_TITLE_PHRASES[locale][body]) || body;
    return `${countryName}: ${translated}`;
  }

  function localizeTool(suite, tool) {
    const locale = currentLocale();
    const suiteToolStrings = suite.i18n && suite.i18n[locale] && suite.i18n[locale].tools
      ? suite.i18n[locale].tools[tool.id]
      : null;
    const toolStrings = (tool.i18n && (tool.i18n[locale] || tool.i18n.en)) || suiteToolStrings || {};
    const translatedSamples = Array.isArray(toolStrings.samples)
      ? tool.samples.map((sample, index) => Object.assign({}, sample, { label: toolStrings.samples[index] || sample.label }))
      : tool.samples;
    let localized = Object.assign({}, tool, toolStrings, { samples: translatedSamples });
    if (locale !== 'en') {
      localized = Object.assign({}, localized, {
        name: localizeRuntimeToolName(localized.name, suite, locale),
        summary: localizeRuntimePhrase(localized.summary, locale),
        chips: asArray(localized.chips).map((chip) => localizeRuntimePhrase(chip, locale)),
        boundaries: asArray(localized.boundaries).map((item) => localizeRuntimePhrase(item, locale)),
        integrationTraps: asArray(localized.integrationTraps).map((item) => localizeRuntimePhrase(item, locale)),
        qualityNotes: asArray(localized.qualityNotes).map((note) => Object.assign({}, note, {
          title: localizeRuntimePhrase(note && note.title, locale),
          text: localizeRuntimePhrase(note && note.text, locale)
        })),
        samples: translatedSamples.map((sample) => Object.assign({}, sample, {
          label: localizeRuntimePhrase(sample.label, locale)
        }))
      });
    }
    return Object.assign({}, localized, { samples: normalizeSamples(suite, localized) });
  }

  function storageKey(suite, tool) {
    return `validohub.countrySuite.${suite.suiteId}.${tool.id}.history.v1`;
  }

  function readHistory(suite, tool) {
    if (typeof localStorage === 'undefined') return [];
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey(suite, tool)) || '[]');
      return Array.isArray(parsed) ? parsed.slice(0, 10).filter(Boolean) : [];
    } catch (error) {
      return [];
    }
  }

  function writeHistory(suite, tool, value) {
    if (typeof localStorage === 'undefined') return;
    const nextValue = text(value).trim();
    if (!nextValue) return;
    const next = [nextValue, ...readHistory(suite, tool).filter((item) => item !== nextValue)].slice(0, 10);
    localStorage.setItem(storageKey(suite, tool), JSON.stringify(next));
  }

  function shortValue(value, limit) {
    const raw = text(value).replace(/\s+/g, ' ').trim();
    if (raw.length <= limit) return raw;
    return `${raw.slice(0, Math.max(0, limit - 1))}…`;
  }

  function incrementLastDigit(value) {
    const raw = text(value);
    const chars = raw.split('');
    for (let index = chars.length - 1; index >= 0; index -= 1) {
      if (/\d/.test(chars[index])) {
        chars[index] = String((Number(chars[index]) + 1) % 10);
        return chars.join('');
      }
    }
    return raw ? `${raw}0` : '0';
  }

  function makeShortSample(value) {
    const raw = text(value).trim();
    if (!raw) return '123';
    return raw.slice(0, Math.max(3, Math.ceil(raw.length * 0.55)));
  }

  function makeBadCountrySample(suite, value) {
    const raw = text(value).trim();
    const iso = text(suite.country && suite.country.iso2 || suite.country && suite.country.slug || '').slice(0, 2).toUpperCase();
    if (iso && raw.toUpperCase().startsWith(iso)) return `ZZ${raw.slice(2)}`;
    return incrementLastDigit(raw);
  }

  function isIbanGeneratorTool(tool) {
    return text(tool && tool.kind).toLowerCase() === 'ibangenerator' || /iban-generator/i.test(`${tool && tool.id || ''} ${tool && tool.name || ''}`);
  }

  function isIbanLikeTool(tool) {
    return /iban/i.test(`${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.kind || ''}`);
  }

  function isReviewSampleLabel(label) {
    return /review|invalid|bad|missing|short|wrong|checksum|edge/i.test(text(label));
  }

  function isValidSampleLabel(label) {
    const raw = text(label);
    return /\bvalid\b/i.test(raw) && !/\binvalid\b/i.test(raw);
  }

  function intentionalReviewFixture(value) {
    return /^(invalid|short|wrong|bad|review)\b/i.test(text(value).trim()) || /\b(BAD|INVALID|WRONG)[-_ ]?(CHECKSUM|PREFIX|COUNTRY|SAMPLE)\b/i.test(text(value));
  }

  function sampleIntent(sample) {
    const joined = `${sample && sample.label || ''} ${sample && sample.value || ''} ${sample && sample.intent || ''} ${sample && sample.tone || ''}`;
    if (sample && sample.intent) return sample.intent === 'success' ? 'valid' : sample.intent;
    if (isReviewSampleLabel(joined) || intentionalReviewFixture(sample && sample.value)) return 'review';
    return 'valid';
  }

  function makeWrongPrefixSample(suite, value) {
    const raw = text(value).trim();
    const iso = text(suite.country && (suite.country.iso2 || suite.country.slug)).slice(0, 2).toUpperCase();
    if (/^[A-Z]{2}/.test(raw) && iso) return `ZZ${raw.slice(2)}`;
    if (/^\d/.test(raw)) return `${iso || 'ZZ'}-${raw}`;
    return `Wrong prefix ${iso || 'XX'} ${raw || 'sample'}`.trim();
  }

  function makeInvalidFixture(suite, tool, value, label) {
    const raw = text(value).trim();
    if (/checksum|control|check/i.test(`${tool && tool.name || ''} ${tool && tool.kind || ''}`) && raw) {
      return `Invalid ${incrementLastDigit(raw)}`;
    }
    if (/prefix|country|iban|vat|eori/i.test(`${label || ''} ${tool && tool.name || ''} ${tool && tool.kind || ''}`)) {
      return makeWrongPrefixSample(suite, raw);
    }
    return raw ? `Invalid ${raw}` : `Invalid ${text(suite.country && suite.country.iso2 || 'XX').toUpperCase()} sample`;
  }

  function labelLooksRaw(label, value) {
    const rawLabel = text(label).trim();
    const rawValue = text(value).trim();
    return !rawLabel || rawLabel === rawValue || rawLabel.length > 34 || /[\n{}[\];=]/.test(rawLabel);
  }

  function normalizeSamples(suite, tool) {
    const labels = labelsFor(suite);
    const source = asArray(tool.samples).filter((sample) => text(sample && sample.value).trim());
    const firstValue = text(source[0] && source[0].value).trim();
    const firstCompact = alnumOnly(firstValue);
    const normalized = source.map((sample, index) => {
      const placeholderReview = /^review\s+/i.test(text(sample.label)) || /^review\s+/i.test(text(sample.value));
      const originalLabel = text(sample.label);
      const reviewIntent = placeholderReview || isReviewSampleLabel(originalLabel) || intentionalReviewFixture(sample.value);
      let value = placeholderReview ? makeInvalidFixture(suite, tool, firstValue || sample.value, originalLabel) : sample.value;
      let label = sample.label;
      if (/grouped/i.test(label)) label = labels.groupedValidSample;
      else if (index === 0) label = labels.validSample;
      else if (isValidSampleLabel(label)) label = text(label).trim() || labels.validSample;
      if (reviewIntent) label = /short/i.test(originalLabel) ? labels.shortSample : labels.invalidSample;
      if (labelLooksRaw(label, value)) label = index === 0 && !reviewIntent ? labels.validSample : labels.invalidSample;
      if (reviewIntent && !intentionalReviewFixture(value)) {
        value = makeInvalidFixture(suite, tool, firstValue || value, originalLabel || label);
      }
      const intent = index === 0 && !reviewIntent ? 'valid' : 'review';
      return Object.assign({}, sample, { label, value, tone: intent === 'valid' ? 'success' : 'review', intent });
    });
    if (firstCompact && isIbanLikeTool(tool)) {
      normalized.push({ label: labels.groupedValidSample, value: firstCompact.replace(/(.{4})/g, '$1 ').trim(), tone: 'success', intent: 'valid' });
    }
    if (firstValue) {
      normalized.push({ label: labels.invalidSample, value: makeInvalidFixture(suite, tool, firstValue, labels.invalidSample), tone: 'review', intent: 'review' });
      normalized.push({ label: labels.shortSample, value: `Short ${makeShortSample(firstValue)}`, tone: 'review', intent: 'review' });
    }
    if (firstValue && isIbanLikeTool(tool)) {
      normalized.push({ label: labels.badCountrySample, value: `Wrong prefix ${makeBadCountrySample(suite, firstValue)}`, tone: 'review', intent: 'review' });
    } else if (firstValue) {
      normalized.push({ label: labels.badCountrySample || 'Wrong prefix', value: makeWrongPrefixSample(suite, firstValue), tone: 'review', intent: 'review' });
    }
    const seen = new Set();
    return normalized.filter((sample) => {
      const key = `${sample.label}::${sample.value}::${sample.intent || ''}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 6);
  }

  function firstNonEmpty(values, fallback) {
    for (const value of values) {
      if (value != null && text(value).trim()) return value;
    }
    return fallback;
  }

  function validateSuiteConfig(config) {
    const errors = [];
    if (!config || typeof config !== 'object') {
      return ['config must be an object'];
    }
    if (!config.suiteId) errors.push('suiteId is required');
    if (!config.country || !config.country.slug || !config.country.name) {
      errors.push('country.slug and country.name are required');
    }
    if (!config.theme || !config.theme.accent || !config.theme.accent2) {
      errors.push('theme.accent and theme.accent2 are required');
    }
    if (!Array.isArray(config.tools) || config.tools.length === 0) {
      errors.push('tools must contain at least one tool');
    }

    const ids = new Set();
    for (const tool of asArray(config.tools)) {
      if (!tool.id) errors.push('each tool requires id');
      if (tool.id && ids.has(tool.id)) errors.push(`duplicate tool id: ${tool.id}`);
      if (tool.id) ids.add(tool.id);
      if (!tool.name) errors.push(`${tool.id || 'tool'} requires name`);
      if (!tool.code) errors.push(`${tool.id || 'tool'} requires code`);
      if (!tool.summary) errors.push(`${tool.id || 'tool'} requires summary`);
      if (!Array.isArray(tool.samples) || tool.samples.length === 0) errors.push(`${tool.id || 'tool'} requires short-label samples`);
      if (!Array.isArray(tool.qualityNotes) || tool.qualityNotes.length < 4) errors.push(`${tool.id || 'tool'} requires at least four quality notes`);
      if (!Array.isArray(tool.boundaries) || tool.boundaries.length === 0) errors.push(`${tool.id || 'tool'} requires explicit official-lookup boundaries`);
      for (const sample of asArray(tool.samples)) {
        if (!sample.label || !sample.value) errors.push(`${tool.id || 'tool'} sample requires label and value`);
        if (sample.label && text(sample.label).length > 48) errors.push(`${tool.id || 'tool'} sample label is too long: ${sample.label}`);
        if (sample.label && /[\r\n\t{}[\],;]/.test(sample.label)) errors.push(`${tool.id || 'tool'} sample label looks like raw payload: ${sample.label}`);
      }
    }
    return errors;
  }

  function defaultAnalyze(tool, input) {
    const normalized = text(input).trim();
    const present = normalized.length > 0;
    return {
      status: present ? 'success' : 'review',
      headline: present ? `${tool.name} completed local checks.` : `${tool.name} needs input.`,
      detail: present ? 'Browser-only structural analysis completed.' : 'Paste a value or choose a sample fixture.',
      primary: normalized || 'No input',
      normalized,
      checks: [
        { label: 'Input present', pass: present, text: present ? 'Input is available for local inspection.' : 'Provide input before validation.' },
        { label: 'Browser scope', pass: true, text: 'No upload, database, or live registry call is made.' },
        { label: 'Official boundary', pass: true, text: asArray(tool.boundaries)[0] || 'Official existence remains outside the browser.' }
      ],
      fields: [
        { label: 'Tool', value: tool.name },
        { label: 'Kind', value: tool.code },
        { label: 'Input chars', value: String(normalized.length) },
        { label: 'Offline scope', value: tool.scope || 'Local format evidence' }
      ],
      breakdownTitle: `${tool.code} field breakdown`,
      breakdownSummary: 'Future suite tools should replace this fallback with domain-specific structure slices.',
      breakdown: [
        { label: 'Raw input', value: normalized || 'empty', note: 'Original browser value.', tone: 'green' },
        { label: 'Normalized', value: normalized || 'empty', note: 'Trimmed local value.', tone: 'blue' },
        { label: 'Boundary', value: 'offline', note: asArray(tool.boundaries)[0] || 'No official lookup.', tone: 'red' }
      ],
      qualityNotes: tool.qualityNotes,
      suggestions: present ? ['Copy the normalized value into test fixtures.'] : ['Load a sample fixture or paste local data.'],
      developerJson: {
        suite: tool.suiteId,
        tool: tool.id,
        status: present ? 'success' : 'review',
        normalized
      }
    };
  }

  function digitsOnly(value) {
    return text(value).replace(/\D/g, '');
  }

  function alnumOnly(value) {
    return text(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
  }

  function isValidDateParts(year, month, day) {
    if (!year || !month || !day) return false;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function inferYear(twoDigitYear) {
    const yy = Number(twoDigitYear);
    return yy >= 40 ? 1900 + yy : 2000 + yy;
  }

  function luhnCheckDigit(body) {
    const digits = digitsOnly(body).split('').map(Number);
    const sum = digits.reduce((total, digit, index) => {
      let value = digit;
      if (index % 2 === 0) value *= 2;
      return total + Math.floor(value / 10) + (value % 10);
    }, 0);
    return (10 - (sum % 10)) % 10;
  }

  function weightedMod11Check(body, weights) {
    const ds = digitsOnly(body).split('').map(Number);
    const sum = weights.reduce((total, weight, index) => total + (ds[index] || 0) * weight, 0);
    const value = 11 - (sum % 11);
    return value === 11 ? 0 : value;
  }

  function weightedMod10Check(body, weights) {
    const ds = digitsOnly(body).split('').map(Number);
    const sum = weights.reduce((total, weight, index) => total + (ds[index] || 0) * weight, 0);
    return (11 - (sum % 11)) % 10;
  }

  function ibanToNumeric(value) {
    return alnumOnly(value).split('').map((char) => /[A-Z]/.test(char) ? String(char.charCodeAt(0) - 55) : char).join('');
  }

  function mod97NumberString(value) {
    let remainder = 0;
    for (const digit of text(value)) {
      if (!/\d/.test(digit)) continue;
      remainder = (remainder * 10 + Number(digit)) % 97;
    }
    return remainder;
  }

  function ibanRemainder(iban) {
    const normalized = alnumOnly(iban);
    return mod97NumberString(ibanToNumeric(normalized.slice(4) + normalized.slice(0, 4)));
  }

  function generateIban(countryCode, bbanBody) {
    const country = alnumOnly(countryCode).slice(0, 2);
    const bban = alnumOnly(bbanBody);
    const probe = `${bban}${country}00`;
    const checkDigits = String(98 - mod97NumberString(ibanToNumeric(probe))).padStart(2, '0');
    const iban = `${country}${checkDigits}${bban}`;
    return { country, bban, checkDigits, iban, remainder: ibanRemainder(iban) };
  }

  function groupIban(value) {
    return alnumOnly(value).replace(/(.{4})/g, '$1 ').trim();
  }

  function maskIban(value) {
    const compact = alnumOnly(value);
    return compact.length > 8
      ? `${compact.slice(0, 4)} ${'•••• '.repeat(Math.max(1, Math.ceil((compact.length - 8) / 4))).trim()} ${compact.slice(-4)}`
      : compact;
  }

  function maskCompact(value) {
    const compact = alnumOnly(value) || text(value).replace(/\s+/g, '');
    if (compact.length <= 6) return compact ? `${compact.slice(0, 1)}...` : '';
    return `${compact.slice(0, 3)}...${compact.slice(-3)}`;
  }

  function randomDigit() {
    if (root.crypto && root.crypto.getRandomValues) {
      const bytes = new Uint8Array(1);
      root.crypto.getRandomValues(bytes);
      return String(bytes[0] % 10);
    }
    return String(Math.floor(Math.random() * 10));
  }

  function freshBbanBody(seed, targetLength) {
    const raw = alnumOnly(seed);
    const requestedLength = Number(targetLength) > 0 ? Number(targetLength) : raw.length;
    const source = (raw.length >= 4 ? raw : '00000000000000000000')
      .padEnd(requestedLength || 20, '0')
      .slice(0, requestedLength || undefined);
    return source.split('').map((char, index) => {
      if (!/[0-9]/.test(char)) return char;
      if (index < 2) return char;
      return randomDigit();
    }).join('');
  }

  function freshIbanGeneratorInput(suite, tool, current) {
    const compact = alnumOnly(current || (tool.samples && tool.samples[0] && tool.samples[0].value) || '');
    const country = countryCodeForSuite(suite, tool, compact);
    let body = compact;
    if (country && body.startsWith(country)) {
      body = /^\d{2}/.test(body.slice(2, 4)) ? body.slice(4) : body.slice(2);
    }
    const profile = ibanProfileForSuite(suite);
    const targetBbanLength = profile ? Math.max(4, profile.length - 4) : body.length;
    return freshBbanBody(body, targetBbanLength);
  }

  function generateIbanBatchRows(suite, tool, current, count) {
    const compact = alnumOnly(current || (tool.samples && tool.samples[0] && tool.samples[0].value) || '');
    const profile = ibanProfileForSuite(suite);
    const country = countryCodeForSuite(suite, tool, compact);
    let body = compact;
    if (country && body.startsWith(country)) {
      body = /^\d{2}/.test(body.slice(2, 4)) ? body.slice(4) : body.slice(2);
    }
    const targetBbanLength = profile ? Math.max(4, profile.length - 4) : Math.max(4, body.length);
    const rows = [];
    for (let index = 0; index < Math.max(1, Math.min(100, Number(count) || 10)); index += 1) {
      const bban = freshBbanBody(body, targetBbanLength);
      const generated = generateIban(country, bban);
      rows.push({
        bban,
        iban: generated.iban,
        grouped: groupIban(generated.iban),
        checkDigits: generated.checkDigits,
        remainder: generated.remainder
      });
    }
    return rows;
  }

  const FACTORY_IBAN_PROFILES = {
    albania: { code: 'AL', length: 28, slices: [['bank code', 4, 7, '3 digits'], ['branch/control area', 7, 12, 'local routing block'], ['account number', 12, 28, '16 characters']] },
    andorra: { code: 'AD', length: 24, slices: [['bank code', 4, 8, '4 digits'], ['branch code', 8, 12, '4 digits'], ['account number', 12, 24, '12 characters']] },
    austria: { code: 'AT', length: 20, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 20, '11 digits']] },
    belgium: { code: 'BE', length: 16, slices: [['bank/account body', 4, 14, '10 digits'], ['national check', 14, 16, '2 digits']] },
    'bosnia-and-herzegovina': { code: 'BA', length: 20, slices: [['bank code', 4, 7, '3 digits'], ['branch code', 7, 10, '3 digits'], ['account number', 10, 18, '8 digits'], ['control digits', 18, 20, '2 digits']] },
    bulgaria: { code: 'BG', length: 22, slices: [['bank identifier', 4, 8, '4 letters'], ['branch code', 8, 12, '4 digits'], ['account type', 12, 14, '2 digits'], ['account number', 14, 22, '8 digits']] },
    croatia: { code: 'HR', length: 21, slices: [['bank code', 4, 11, '7 digits'], ['account number', 11, 21, '10 digits']] },
    cyprus: { code: 'CY', length: 28, slices: [['bank code', 4, 7, '3 digits'], ['branch code', 7, 12, '5 digits'], ['account number', 12, 28, '16 characters']] },
    czechia: { code: 'CZ', length: 24, slices: [['bank code', 4, 8, '4 digits'], ['account prefix', 8, 14, '6 digits'], ['account number', 14, 24, '10 digits']] },
    denmark: { code: 'DK', length: 18, slices: [['registration number', 4, 8, '4 digits'], ['account number', 8, 18, '10 digits']] },
    estonia: { code: 'EE', length: 20, slices: [['bank/branch code', 4, 6, '2 digits'], ['account number', 6, 19, '13 digits'], ['national check', 19, 20, '1 digit']] },
    finland: { code: 'FI', length: 18, slices: [['bank/account body', 4, 18, '14 digits']] },
    france: { code: 'FR', length: 27, slices: [['bank code', 4, 9, '5 characters'], ['branch code', 9, 14, '5 characters'], ['account number', 14, 25, '11 characters'], ['RIB key', 25, 27, '2 digits']] },
    germany: { code: 'DE', length: 22, slices: [['BLZ bank code', 4, 12, '8 digits'], ['account number', 12, 22, '10 digits']] },
    greece: { code: 'GR', length: 27, slices: [['bank code', 4, 7, '3 digits'], ['branch code', 7, 11, '4 digits'], ['account number', 11, 27, '16 digits']] },
    hungary: { code: 'HU', length: 28, slices: [['bank/branch code', 4, 12, '8 digits'], ['account number', 12, 28, '16 digits']] },
    iceland: { code: 'IS', length: 26, slices: [['bank code', 4, 8, '4 digits'], ['account type', 8, 10, '2 digits'], ['account number', 10, 16, '6 digits'], ['identity/control body', 16, 26, '10 digits']] },
    ireland: { code: 'IE', length: 22, slices: [['bank identifier', 4, 8, '4 letters'], ['sort code', 8, 14, '6 digits'], ['account number', 14, 22, '8 digits']] },
    italy: { code: 'IT', length: 27, slices: [['CIN', 4, 5, '1 character'], ['ABI bank code', 5, 10, '5 digits'], ['CAB branch code', 10, 15, '5 digits'], ['account number', 15, 27, '12 characters']] },
    latvia: { code: 'LV', length: 21, slices: [['bank identifier', 4, 8, '4 letters'], ['account number', 8, 21, '13 characters']] },
    liechtenstein: { code: 'LI', length: 21, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 21, '12 characters']] },
    lithuania: { code: 'LT', length: 20, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 20, '11 digits']] },
    luxembourg: { code: 'LU', length: 20, slices: [['bank code', 4, 7, '3 digits'], ['account number', 7, 20, '13 characters']] },
    malta: { code: 'MT', length: 31, slices: [['bank identifier', 4, 8, '4 letters'], ['branch code', 8, 13, '5 digits'], ['account number', 13, 31, '18 characters']] },
    moldova: { code: 'MD', length: 24, slices: [['bank/account body', 4, 24, '20 characters']] },
    monaco: { code: 'MC', length: 27, slices: [['bank code', 4, 9, '5 digits'], ['branch code', 9, 14, '5 digits'], ['account number', 14, 25, '11 characters'], ['RIB key', 25, 27, '2 digits']] },
    montenegro: { code: 'ME', length: 22, slices: [['bank code', 4, 7, '3 digits'], ['account number', 7, 20, '13 digits'], ['control digits', 20, 22, '2 digits']] },
    netherlands: { code: 'NL', length: 18, slices: [['bank identifier', 4, 8, '4 letters'], ['account number', 8, 18, '10 digits']] },
    'north-macedonia': { code: 'MK', length: 19, slices: [['bank code', 4, 7, '3 digits'], ['account number', 7, 17, '10 characters'], ['control digits', 17, 19, '2 digits']] },
    norway: { code: 'NO', length: 15, slices: [['bank/account body', 4, 15, '11 digits']] },
    poland: { code: 'PL', length: 28, slices: [['bank + branch code', 4, 12, '8 digits'], ['account number', 12, 28, '16 digits']] },
    portugal: { code: 'PT', length: 25, slices: [['bank code', 4, 8, '4 digits'], ['branch code', 8, 12, '4 digits'], ['account number', 12, 23, '11 digits'], ['control digits', 23, 25, '2 digits']] },
    romania: { code: 'RO', length: 24, slices: [['bank identifier', 4, 8, '4 letters'], ['account body', 8, 24, '16 characters']] },
    'san-marino': { code: 'SM', length: 27, slices: [['CIN', 4, 5, '1 character'], ['bank code', 5, 10, '5 digits'], ['branch code', 10, 15, '5 digits'], ['account number', 15, 27, '12 characters']] },
    serbia: { code: 'RS', length: 22, slices: [['bank code', 4, 7, '3 digits'], ['account number', 7, 20, '13 digits'], ['control digits', 20, 22, '2 digits']] },
    slovakia: { code: 'SK', length: 24, slices: [['bank code', 4, 8, '4 digits'], ['account prefix', 8, 14, '6 digits'], ['account number', 14, 24, '10 digits']] },
    slovenia: { code: 'SI', length: 19, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 17, '8 digits'], ['control digits', 17, 19, '2 digits']] },
    spain: { code: 'ES', length: 24, slices: [['bank code', 4, 8, '4 digits'], ['branch office', 8, 12, '4 digits'], ['CCC check digits', 12, 14, '2 digits'], ['account number', 14, 24, '10 digits']] },
    sweden: { code: 'SE', length: 24, slices: [['clearing/account body', 4, 24, '20 digits']] },
    switzerland: { code: 'CH', length: 21, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 21, '12 characters']] },
    ukraine: { code: 'UA', length: 29, slices: [['MFO bank code', 4, 10, '6 digits'], ['account body', 10, 29, '19 digits']] },
    'united-kingdom': { code: 'GB', length: 22, slices: [['bank identifier', 4, 8, '4 letters'], ['sort code', 8, 14, '6 digits'], ['account number', 14, 22, '8 digits']] },
    'vatican-city': { code: 'VA', length: 22, slices: [['bank code', 4, 9, '5 digits'], ['account number', 9, 22, '13 characters']] }
  };

  const FACTORY_IBAN_COUNTRIES = Object.fromEntries(Object.entries(FACTORY_IBAN_PROFILES).map(([slug, profile]) => [slug, profile.code]));

  function ibanProfileForSuite(suite) {
    return FACTORY_IBAN_PROFILES[suite.country.slug] || null;
  }

  function ibanProfileSlices(iban, profile) {
    const compact = alnumOnly(iban);
    return asArray(profile && profile.slices).map((slice) => fieldSlice(slice[0], compact.slice(slice[1], slice[2]) || 'not detected', slice[3]));
  }

  function routeIso2(suite) {
    return text(suite && suite.country && suite.country.iso2).slice(0, 2).toUpperCase();
  }

  function sampleCountryPrefix(tool) {
    const sample = asArray(tool && tool.samples).find((item) => sampleIntent(item) !== 'review') || asArray(tool && tool.samples)[0];
    const compact = alnumOnly(sample && sample.value);
    const match = compact.match(/^[A-Z]{2}/);
    return match ? match[0] : '';
  }

  function countryCodeForSuite(suite, tool, input) {
    const explicit = alnumOnly(tool.countryCode || '');
    if (explicit.length === 2) return explicit;
    const profile = ibanProfileForSuite(suite);
    if (profile && profile.code) return profile.code;
    const fromInput = alnumOnly(input).match(/^[A-Z]{2}/);
    if (fromInput) return fromInput[0];
    return FACTORY_IBAN_COUNTRIES[suite.country.slug] || alnumOnly(suite.country.name).slice(0, 2);
  }

  function spanishIdLetter(number) {
    return 'TRWAGMYFPDXBNJZSQVHLCKE'[Number(number) % 23] || '';
  }

  function germanIso7064Mod11_10(body) {
    let product = 10;
    for (const digit of digitsOnly(body).slice(0, 10)) {
      let sum = (Number(digit) + product) % 10;
      if (sum === 0) sum = 10;
      product = (sum * 2) % 11;
    }
    return (11 - product) % 10;
  }

  function italianVatCheck(body) {
    const ds = digitsOnly(body);
    let sum = 0;
    for (let index = 0; index < 10; index += 1) {
      let value = Number(ds[index] || 0);
      if (index % 2 === 1) {
        value *= 2;
        value = Math.floor(value / 10) + (value % 10);
      }
      sum += value;
    }
    return (10 - (sum % 10)) % 10;
  }

  function italianCodiceFiscaleCheck(value) {
    const normalized = alnumOnly(value);
    const odd = {
      0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21,
      A: 1, B: 0, C: 5, D: 7, E: 9, F: 13, G: 15, H: 17, I: 19, J: 21,
      K: 2, L: 4, M: 18, N: 20, O: 11, P: 3, Q: 6, R: 8, S: 12, T: 14,
      U: 16, V: 10, W: 22, X: 25, Y: 24, Z: 23
    };
    const even = {
      0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
      A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
      K: 10, L: 11, M: 12, N: 13, O: 14, P: 15, Q: 16, R: 17, S: 18, T: 19,
      U: 20, V: 21, W: 22, X: 23, Y: 24, Z: 25
    };
    const sum = normalized.slice(0, 15).split('').reduce((total, char, index) => {
      return total + (index % 2 === 0 ? odd[char] : even[char]);
    }, 0);
    return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[sum % 26] || '';
  }

  function ean13CheckDigit(body) {
    const ds = digitsOnly(body).slice(0, 12);
    const sum = ds.split('').reduce((total, digit, index) => total + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
    return (10 - (sum % 10)) % 10;
  }

  function fieldSlice(label, value, note, tone) {
    const detail = note || '';
    return { label, value: value == null || value === '' ? 'not detected' : String(value), note: detail, detail, tone: tone || 'blue' };
  }

  function statusCheck(label, ok, passText, reviewText) {
    return { label, pass: !!ok, text: ok ? passText : reviewText };
  }

  function digitBlocks(value, sizes, labels, notes) {
    const ds = digitsOnly(value);
    const parts = [];
    let offset = 0;
    sizes.forEach((size, index) => {
      const slice = ds.slice(offset, offset + size);
      offset += size;
      if (!slice && index < sizes.length - 1) return;
      parts.push(fieldSlice(labels[index], slice || 'not detected', notes[index] || 'Local number segment.'));
    });
    return parts;
  }

  function hasMeaningfulAnatomy(result) {
    const labels = asArray(result && result.breakdown).map((part) => text(part && part.label).toLowerCase());
    const joined = labels.join(' ');
    const hits = ['country prefix', 'check digit', 'check digits', 'control digit', 'verifier', 'bank code', 'account number', 'body digits', 'identifier body', 'registry key', 'numeric area', 'letter pair', 'subscriber'].filter((needle) => joined.includes(needle));
    return hits.length >= 2;
  }

  function anatomyFallbackChunks(value, labelPrefix) {
    const ds = digitsOnly(value);
    if (ds.length >= 8) {
      const body = ds.slice(0, -1);
      return [
        fieldSlice(labelPrefix + ' body', body, 'Main local identifier digits before the final control/check position.'),
        fieldSlice('control/check digit', ds.slice(-1), 'Trailing digit commonly used as a checksum, control, or registry handoff digit.'),
        fieldSlice('display grouping', text(value).replace(/[A-Z0-9]/gi, '').trim() || 'none', 'Punctuation is display-only unless the official format says otherwise.'),
        fieldSlice('official boundary', 'offline only', 'Live ownership, existence, status, and assignment are not proven in the browser.', 'red')
      ];
    }
    return [
      fieldSlice('source payload', shortValue(value, 120), 'Browser-local source value.'),
      fieldSlice('visible characters', String(text(value).length), 'Input length after local normalization.'),
      fieldSlice('official boundary', 'offline only', 'Live status remains outside this browser workbench.', 'red')
    ];
  }

  function buildAnatomySlices(suite, tool, result) {
    if (hasMeaningfulAnatomy(result)) return [];
    const value = text(result && (result.normalized || result.primary)).trim();
    if (!value) return [];
    const id = text(tool.id).toLowerCase();
    const kind = text(tool.kind).toLowerCase();
    const topic = [id, kind, tool.code, tool.name, tool.category].map((item) => text(item).toLowerCase()).join(' ');
    const ds = digitsOnly(value);
    const compact = alnumOnly(value);
    const countryCode = text((suite.country && suite.country.iso2) || countryCodeForSuite(suite, tool, compact)).slice(0, 2).toUpperCase();

    if (/iban/.test(topic) && compact.length >= 8) {
      return [
        fieldSlice('country prefix', compact.slice(0, 2), 'IBAN ISO country code; expected ' + (countryCode || 'route country') + '.'),
        fieldSlice('check digits', compact.slice(2, 4), 'ISO 13616 MOD-97 check digits.'),
        fieldSlice('BBAN/account body', compact.slice(4), 'Country-local bank/account body carried after the prefix and check digits.'),
        fieldSlice('MOD-97 remainder', String(ibanRemainder(compact)), 'Valid IBANs verify to remainder 1.', ibanRemainder(compact) === 1 ? 'green' : 'red')
      ];
    }

    if (/bic|swift/.test(topic) && compact.length >= 8) {
      return [
        fieldSlice('institution code', compact.slice(0, 4), 'Four-letter bank or institution identifier.'),
        fieldSlice('country code', compact.slice(4, 6), 'Two-letter routing country segment.'),
        fieldSlice('location code', compact.slice(6, 8), 'Location/routing evidence.'),
        fieldSlice('branch code', compact.slice(8) || 'primary office', 'Optional three-character branch segment.')
      ];
    }

    if (/phone|e164/.test(topic) && ds.length >= 7) {
      const routeCode = text(suite.country && suite.country.phone || '').replace(/\D/g, '');
      const hasCountry = routeCode && ds.startsWith(routeCode);
      const national = hasCountry ? ds.slice(routeCode.length) : ds;
      return [
        fieldSlice('calling code', hasCountry ? '+' + routeCode : 'not detected', 'Expected route calling prefix when present.'),
        fieldSlice('national number', national, 'Subscriber/area evidence after country prefix.'),
        fieldSlice('area or mobile hint', national.slice(0, Math.min(3, national.length)), 'Leading national digits used only as an offline routing hint.'),
        fieldSlice('official boundary', 'offline only', 'Line activity, portability, and ownership require carrier/provider lookup.', 'red')
      ];
    }

    if (/postal|postcode|zip/.test(topic) && ds.length >= 4) {
      return [
        fieldSlice('postal area', ds.slice(0, Math.min(3, ds.length - 2)), 'Leading postal routing or area evidence.'),
        fieldSlice('delivery/local block', ds.slice(Math.min(3, ds.length - 2)), 'Remaining postal digits for local delivery/display shape.'),
        fieldSlice('display punctuation', text(value).replace(/[A-Z0-9]/gi, '').trim() || 'none', 'Separators are display hints, not live address proof.'),
        fieldSlice('official boundary', 'offline only', 'Address existence and delivery status require postal/geocoding systems.', 'red')
      ];
    }

    if (/plate|vehicle|vin/.test(topic)) {
      const vin = compact.match(/[A-HJ-NPR-Z0-9]{17}/) ? compact : '';
      if (vin) {
        return [
          fieldSlice('WMI', vin.slice(0, 3), 'World manufacturer identifier.'),
          fieldSlice('VDS', vin.slice(3, 9), 'Vehicle descriptor section.'),
          fieldSlice('VIS', vin.slice(9), 'Vehicle identifier section.'),
          fieldSlice('official boundary', 'offline only', 'Registration, ownership, and inspection status require vehicle authority lookup.', 'red')
        ];
      }
      return [
        fieldSlice('plate prefix', compact.slice(0, Math.min(3, compact.length)), 'Leading plate/region evidence when the local format supports it.'),
        fieldSlice('plate serial', compact.slice(Math.min(3, compact.length)), 'Remaining registration display body.'),
        fieldSlice('normalized display', compact, 'Uppercase alphanumeric plate-like value.'),
        fieldSlice('official boundary', 'offline only', 'Registration status is not browser-proved.', 'red')
      ];
    }

    if (/date|calendar|week/.test(topic)) {
      const match = value.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})|(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/);
      return [
        fieldSlice('detected date', match ? match[0] : value, 'Date-like value found in browser input.'),
        fieldSlice('route locale pattern', text(suite.country && suite.country.date || 'local date'), 'Country display convention for UI parsing.'),
        fieldSlice('ISO handoff', match && match[1] ? match[0] : 'requires parser confirmation', 'Prefer ISO storage at API/database boundaries.'),
        fieldSlice('official boundary', 'offline only', 'Holiday, filing, and legal deadlines require the official calendar/source.', 'red')
      ];
    }

    if (/amount|money|currency|taxrate|decimal/.test(topic)) {
      return [
        fieldSlice('amount text', value, 'Browser-local amount/currency display.'),
        fieldSlice('currency', text(suite.country && suite.country.currency || 'local currency'), 'Route currency context.'),
        fieldSlice('decimal convention', text(suite.country && suite.country.decimal || 'local decimal'), 'Locale decimal separator expectation.'),
        fieldSlice('grouping convention', text(suite.country && suite.country.thousands || 'local grouping'), 'Locale thousands/grouping separator expectation.')
      ];
    }

    if (/ruc|nit|rut|vat|tax|company|register|business|customs|procurement|invoice|fiscal|einvoice/.test(topic) && ds.length >= 8) {
      if (ds.length === 11) {
        return digitBlocks(ds, [2, 8, 1], ['taxpayer type prefix', 'registration body', 'check digit'], ['Leading local taxpayer/person/company type block.', 'Main registry body used for official handoff.', 'Trailing local control/check digit.']);
      }
      if (ds.length === 10) {
        return digitBlocks(ds, [3, 6, 1], ['registry prefix', 'registry body', 'check digit'], ['Leading assignment/type block visible in many local tax IDs.', 'Main company/tax registry body.', 'Trailing verification digit or official handoff digit.']);
      }
      if (ds.length >= 12) {
        const front = Math.min(4, ds.length - 7);
        return digitBlocks(ds, [front, ds.length - front - 1, 1], ['registry/root block', 'entity body', 'check digit'], ['Leading registry/root evidence.', 'Main company/tax body.', 'Trailing control/check digit.']);
      }
      return anatomyFallbackChunks(value, 'tax identifier');
    }

    if (/dni|cedula|c[eé]dula|personal|identity|national|social|passport|permit|health|id-card/.test(topic) && ds.length >= 6) {
      if (ds.length === 8) {
        return digitBlocks(ds, [7, 1], ['identity body', 'control digit'], ['Seven-digit identity body.', 'Trailing local control/check digit or official handoff digit.']);
      }
      if (ds.length === 9) {
        return digitBlocks(ds, [8, 1], ['identity body', 'control digit'], ['Eight-digit identity body.', 'Trailing local control/check digit or official handoff digit.']);
      }
      if (ds.length === 10) {
        return digitBlocks(ds, [3, 6, 1], ['assignment prefix', 'identity body', 'control digit'], ['Leading assignment/series block.', 'Main identity body.', 'Trailing local control/check digit.']);
      }
      return anatomyFallbackChunks(value, 'identity');
    }

    if (/bank|account|payment|transfer|remittance|debit/.test(topic) && (ds.length >= 6 || compact.length >= 8)) {
      const target = ds.length >= 6 ? ds : compact;
      const prefixSize = Math.min(4, Math.max(2, Math.floor(target.length / 5)));
      return [
        fieldSlice('routing/prefix block', target.slice(0, prefixSize), 'Leading bank, branch, processor, or domestic routing evidence.'),
        fieldSlice('account/reference body', target.slice(prefixSize, -1) || target.slice(prefixSize), 'Main payment or account reference body.'),
        fieldSlice('control/check hint', target.length > prefixSize + 2 ? target.slice(-1) : 'not detected', 'Trailing digit/character where the local format uses one.'),
        fieldSlice('official boundary', 'offline only', 'Ownership, balance, payment acceptance, and bank/provider status require live systems.', 'red')
      ];
    }

    if (/csv|json|api|data|form|ocr|privacy|redaction|fixture|slug|regex|copy|transliteration|smoketest/.test(topic)) {
      const lines = text(value).split(/\r?\n/).filter((line) => line.trim());
      return [
        fieldSlice('source payload', shortValue(value, 120), 'Browser-local source value.'),
        fieldSlice('line count', String(lines.length || 1), 'Input rows available to the local parser.'),
        fieldSlice('detected digits', ds ? shortValue(ds, 80) : 'not detected', 'Identifier-like numeric evidence found inside the payload.'),
        fieldSlice('official boundary', 'offline only', 'Live registry, identity, tax, banking, or delivery status is not checked.', 'red')
      ];
    }

    return anatomyFallbackChunks(value, 'local value');
  }

  function addAnatomyToResult(suite, tool, result) {
    const anatomy = buildAnatomySlices(suite, tool, result);
    if (!anatomy.length) return result;
    const existing = asArray(result && result.breakdown);
    const next = Object.assign({}, result, {
      breakdownTitle: /evidence breakdown|field breakdown/i.test(text(result && result.breakdownTitle))
        ? text(result.breakdownTitle).replace(/evidence breakdown|field breakdown/i, 'anatomy & evidence breakdown')
        : (text(result && result.breakdownTitle) || tool.name + ' anatomy & evidence breakdown'),
      breakdownSummary: 'Segment-level anatomy, local parser evidence, and official-boundary notes for browser-only debugging.',
      breakdown: anatomy.concat(existing.filter((part) => !anatomy.some((slice) => text(slice.label).toLowerCase() === text(part && part.label).toLowerCase())).slice(0, 8))
    });
    next.developerJson = Object.assign({}, result && result.developerJson, { anatomy });
    return next;
  }

  function withToolSpecificContext(suite, tool, result) {
    const countryName = suite.country.name;
    const topic = [tool.code, tool.name].filter(Boolean).join(' / ');
    const normalized = text(result && (result.normalized || result.primary)).trim();
    const localNotes = [
      {
        title: `${tool.code} local evidence`,
        text: `${tool.name} analyzes ${countryName}-specific structure in this browser and keeps raw input local.`
      },
      {
        title: 'Official boundary',
        text: `${countryName} registry, tax, identity, banking, vehicle, postal, or filing status still requires the responsible official system.`
      },
      {
        title: 'Fixture safety',
        text: 'Use valid and invalid examples as structural test fixtures; a passing offline result is not a live-state proof.'
      },
      {
        title: 'Developer handling',
        text: `Copy normalized ${tool.code} values for forms, masked previews for logs, and field slices for parser tests.`
      }
    ];
    const suggestions = result && result.status === 'success'
      ? [
        { action: 'copy-normalized', label: `Copy normalized ${tool.code}`, detail: normalized || topic },
        { action: 'load-invalid', label: 'Load invalid fixture', detail: 'Compare the review path against the valid result.' },
        { action: 'run-batch', label: 'Run sample batch', detail: 'Replay valid, invalid, short, and prefix cases together.' }
      ]
      : [
        { action: 'load-valid', label: 'Load valid fixture', detail: `Restore a known-good ${countryName} sample.` },
        { action: 'use-short', label: 'Try short sample', detail: 'See the length and parser guard fail cleanly.' },
        { action: 'copy-normalized', label: 'Copy current normalized value', detail: normalized || 'No normalized value yet.' }
      ];
    return addAnatomyToResult(suite, tool, Object.assign({}, result, {
      qualityNotes: localNotes,
      suggestions
    }));
  }

  function forceIntentionalReview(suite, tool, input, result, intent) {
    if (intent !== 'review' && !intentionalReviewFixture(input)) return result;
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ');
    const forced = Object.assign({}, result, {
      status: 'review',
      headline: `${tool.code}: intentional invalid sample`,
      detail: `This fixture is deliberately invalid for ${suite.country.name}; use it to inspect the review path.`,
      primary: normalized || raw || 'invalid sample',
      normalized: normalized || raw,
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck('Intentional invalid fixture', false, 'Fixture accepted.', 'This sample is marked invalid and must not pass.'),
        statusCheck('Official boundary', true, 'No official lookup is made.', 'No official lookup is made.')
      ].concat(asArray(result && result.checks).slice(0, 3)),
      fields: [
        fieldSlice('source payload', shortValue(normalized, 120), 'Current browser-local value.', 'red'),
        fieldSlice('expected result', 'review', 'Invalid fixtures must exercise the review path.', 'red'),
        fieldSlice('tool', tool.name, tool.category),
        fieldSlice('official boundary', 'offline only', 'Official status remains outside this browser workbench.')
      ],
      breakdownTitle: `${tool.name} invalid fixture breakdown`,
      breakdownSummary: `The selected example is intentionally invalid so ${suite.country.name} parser/debug states are visible.`,
      breakdown: [
        fieldSlice('invalid fixture marker', raw.split(/\s+/).slice(0, 3).join(' ') || 'invalid', 'Visible sample intent.', 'red'),
        fieldSlice('source payload', shortValue(normalized, 120), 'Browser-local source value.', 'red'),
        fieldSlice('expected status', 'review', 'Invalid samples must never report success.', 'red'),
        fieldSlice('repair path', 'load valid sample', 'Compare against a valid fixture before official handoff.')
      ]
    });
    return withToolSpecificContext(suite, tool, forced);
  }

  const COUNTRY_INTELLIGENCE_PROFILES = {
    switzerland: {
      personalLabel: 'AHV / AVS',
      companyLabel: 'UID',
      taxLabel: 'MWST / TVA / IVA',
      kindLabels: { ahv: 'AHV / AVS', uid: 'UID' },
      parsers: {
        ahv(raw) {
          const ds = digitsOnly(raw);
          const expected = ean13CheckDigit(ds.slice(0, 12));
          const checksumOk = ds.length === 13 && Number(ds[12]) === expected;
          const prefixOk = ds.startsWith('756');
          return { normalized: ds.length === 13 ? `${ds.slice(0, 3)}.${ds.slice(3, 7)}.${ds.slice(7, 11)}.${ds.slice(11)}` : ds, ok: prefixOk && checksumOk, slices: [
            fieldSlice('country prefix', ds.slice(0, 3), 'Swiss AHV/AVS values use the 756 GS1 country prefix.', prefixOk ? 'green' : 'red'),
            fieldSlice('personal body', ds.slice(3, 12), 'Nine-digit personal body used before the EAN-style control digit.'),
            fieldSlice('check digit', `${ds.slice(12)} / expected ${expected}`, 'EAN-13 style AHV/AVS control digit.', checksumOk ? 'green' : 'red'),
            fieldSlice('official boundary', 'offline only', 'AHV identity/status requires official Swiss systems.', 'red')
          ], checks: [
            statusCheck('Thirteen digits', ds.length === 13, 'AHV/AVS has thirteen digits.', 'Expected thirteen digits.'),
            statusCheck('756 prefix', prefixOk, 'Swiss 756 prefix detected.', 'Expected 756 prefix.'),
            statusCheck('EAN control digit', checksumOk, 'Control digit matches.', 'Control digit needs review.')
          ] };
        },
        uid(raw) {
          const value = alnumOnly(raw);
          const ds = digitsOnly(value);
          const prefixOk = value.startsWith('CHE');
          const ok = prefixOk && ds.length === 9;
          return { normalized: ds.length === 9 ? `CHE-${ds.slice(0, 3)}.${ds.slice(3, 6)}.${ds.slice(6)}` : value, ok, slices: [
            fieldSlice('CHE prefix', prefixOk ? 'CHE' : 'not detected', 'Swiss UID display prefix.', prefixOk ? 'green' : 'red'),
            fieldSlice('block 1', ds.slice(0, 3), 'First UID numeric block.'),
            fieldSlice('block 2', ds.slice(3, 6), 'Second UID numeric block.'),
            fieldSlice('block 3', ds.slice(6, 9), 'Third UID numeric block; official status remains a registry concern.')
          ], checks: [
            statusCheck('CHE prefix', prefixOk, 'CHE prefix detected.', 'Expected CHE prefix.'),
            statusCheck('Nine UID digits', ds.length === 9, 'UID has nine digits.', 'Expected nine UID digits.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.ahv(raw); },
      parseCompany(raw) { return this.parsers.uid(raw); }
    },
    spain: {
      personalLabel: 'DNI / NIE / NIF',
      companyLabel: 'CIF / legal NIF',
      taxLabel: 'NIF-IVA',
      kindLabels: { id: 'Spanish ID', dni: 'DNI', nie: 'NIE', nif: 'NIF', cif: 'CIF' },
      parsers: {
        id(raw) {
          const value = alnumOnly(raw);
          if (/^[XYZ]\d{7}[A-Z]$/.test(value)) return this.nie(raw);
          if (/^\d{8}[A-Z]$/.test(value)) return this.dni(raw);
          return this.cif(raw);
        },
        nif(raw) { return this.id(raw); },
        dni(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^(\d{8})([A-Z])$/);
          const expected = match ? spanishIdLetter(match[1]) : '';
          const ok = !!match && match[2] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('DNI body', match && match[1], 'Eight-digit DNI body.'),
            fieldSlice('control letter', match ? `${match[2]} / expected ${expected}` : 'not detected', 'Modulo-23 DNI control letter.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('DNI shape', !!match, 'DNI shape detected.', 'Expected eight digits plus letter.'),
            statusCheck('Modulo-23', ok, 'Control letter matches.', 'Control letter needs review.')
          ] };
        },
        nie(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^([XYZ])(\d{7})([A-Z])$/);
          const mapped = match ? ({ X: '0', Y: '1', Z: '2' }[match[1]] + match[2]) : '';
          const expected = match ? spanishIdLetter(mapped) : '';
          const ok = !!match && match[3] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('NIE prefix', match && match[1], 'X/Y/Z foreigner prefix mapped to 0/1/2.'),
            fieldSlice('numeric body', mapped, 'Mapped body used for modulo-23.'),
            fieldSlice('control letter', match ? `${match[3]} / expected ${expected}` : 'not detected', 'Modulo-23 NIE control letter.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('NIE shape', !!match, 'NIE shape detected.', 'Expected X/Y/Z plus seven digits and letter.'),
            statusCheck('Modulo-23', ok, 'Control letter matches.', 'Control letter needs review.')
          ] };
        },
        cif(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^([ABCDEFGHJNPQRSUVW])(\d{7})([0-9A-J])$/);
          let control = '';
          if (match) {
            const digits = match[2].split('').map(Number);
            const sum = digits.reduce((total, digit, index) => {
              if (index % 2 === 0) {
                const doubled = digit * 2;
                return total + Math.floor(doubled / 10) + (doubled % 10);
              }
              return total + digit;
            }, 0);
            control = String((10 - (sum % 10)) % 10);
          }
          const ok = !!match && (match[3] === control || match[3] === 'JABCDEFGHI'[Number(control)]);
          return { normalized: value, ok, slices: [
            fieldSlice('entity prefix', match && match[1], 'Legal entity type prefix.'),
            fieldSlice('company body', match && match[2], 'Seven-digit CIF body.'),
            fieldSlice('control', match ? `${match[3]} / expected ${control}` : 'not detected', 'Spanish legal-entity checksum.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('CIF shape', !!match, 'CIF shape detected.', 'Expected entity prefix, seven digits, control.'),
            statusCheck('Weighted control', ok, 'Control value matches.', 'Control value needs review.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.id.call(this.parsers, raw); },
      parseCompany(raw) { return this.parsers.cif(raw); }
    },
    germany: {
      personalLabel: 'IdNr',
      companyLabel: 'Handelsregister',
      taxLabel: 'USt-IdNr',
      kindLabels: { taxid: 'German IdNr', steuernummer: 'Steuernummer', register: 'Handelsregister' },
      parsers: {
        taxid(raw) {
          const ds = digitsOnly(raw);
          const expected = germanIso7064Mod11_10(ds.slice(0, 10));
          const ok = ds.length === 11 && Number(ds[10]) === expected;
          return { normalized: ds, ok, slices: [
            fieldSlice('IdNr body', ds.slice(0, 10), 'First ten Steueridentifikationsnummer digits.'),
            fieldSlice('check digit', `${ds.slice(10)} / expected ${expected}`, 'ISO 7064 MOD 11,10 control digit.', ok ? 'green' : 'red'),
            fieldSlice('identity boundary', 'offline only', 'BZSt identity/status requires official systems.', 'red')
          ], checks: [
            statusCheck('Eleven digits', ds.length === 11, 'IdNr has eleven digits.', 'Expected eleven digits.'),
            statusCheck('ISO 7064', ok, 'Control digit matches.', 'Control digit needs review.')
          ] };
        },
        steuernummer(raw) {
          const value = text(raw).trim();
          const segments = value.split(/[\/\s-]+/).filter(Boolean);
          const ds = digitsOnly(value);
          const ok = ds.length >= 10 && ds.length <= 13;
          return { normalized: value, ok, slices: [
            fieldSlice('regional segments', segments.join(' / '), 'Bundesland/Finanzamt-style separated parts.'),
            fieldSlice('digits', ds, 'Digits available for ELSTER/tax-form normalization.'),
            fieldSlice('official boundary', 'offline only', 'Tax-office assignment and status require official systems.', 'red')
          ], checks: [
            statusCheck('Digit envelope', ok, 'Steuernummer digit count is plausible.', 'Steuernummer digit count needs review.')
          ] };
        },
        register(raw) {
          const value = text(raw).toUpperCase();
          const match = value.match(/\b(HRB|HRA)\s*([0-9]{1,8})\b/);
          return { normalized: match ? `${match[1]} ${match[2]}` : value.trim(), ok: !!match, slices: [
            fieldSlice('register type', match && match[1], 'HRB/HRA commercial-register type.'),
            fieldSlice('register number', match && match[2], 'Local court register number.'),
            fieldSlice('court handoff', /AMTSGERICHT|AG\b/.test(value) ? 'court evidence detected' : 'court not detected', 'Commercial-register status requires official lookup.')
          ], checks: [
            statusCheck('HR shape', !!match, 'Handelsregister reference detected.', 'Expected HRB/HRA reference.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.taxid(raw); },
      parseCompany(raw) { return this.parsers.register(raw); }
    },
    italy: {
      personalLabel: 'Codice fiscale',
      companyLabel: 'Partita IVA',
      taxLabel: 'IVA',
      kindLabels: { codicefiscale: 'Codice fiscale', piva: 'Partita IVA' },
      parsers: {
        codicefiscale(raw) {
          const value = alnumOnly(raw);
          const match = value.match(/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/);
          const expected = match ? italianCodiceFiscaleCheck(value) : '';
          const ok = !!match && value[15] === expected;
          return { normalized: value, ok, slices: [
            fieldSlice('surname/name code', value.slice(0, 6), 'First six letters encode surname/name consonant blocks.'),
            fieldSlice('date/gender code', value.slice(6, 11), 'YY month-letter day(+40 for female) block.'),
            fieldSlice('place code', value.slice(11, 15), 'Comune/foreign place Belfiore code.'),
            fieldSlice('control character', `${value.slice(15)} / expected ${expected}`, 'Italian codice fiscale checksum character.', ok ? 'green' : 'red')
          ], checks: [
            statusCheck('CF shape', !!match, 'Codice fiscale shape detected.', 'Expected 16-character CF shape.'),
            statusCheck('Control character', ok, 'Control character matches.', 'Control character needs review.')
          ] };
        },
        piva(raw) {
          const ds = digitsOnly(raw);
          const expected = italianVatCheck(ds.slice(0, 10));
          const ok = ds.length === 11 && Number(ds[10]) === expected;
          return { normalized: ds, ok, slices: [
            fieldSlice('VAT body', ds.slice(0, 10), 'First ten Partita IVA digits.'),
            fieldSlice('control digit', `${ds.slice(10)} / expected ${expected}`, 'Italian VAT control digit.', ok ? 'green' : 'red'),
            fieldSlice('Agenzia boundary', 'offline only', 'VAT existence/status requires official systems.', 'red')
          ], checks: [
            statusCheck('Eleven digits', ds.length === 11, 'Partita IVA has eleven digits.', 'Expected eleven digits.'),
            statusCheck('Checksum', ok, 'Control digit matches.', 'Control digit needs review.')
          ] };
        }
      },
      parsePersonal(raw) { return this.parsers.codicefiscale(raw); },
      parseCompany(raw) { return this.parsers.piva(raw); }
    },
    austria: {
      personalLabel: 'SVNR',
      companyLabel: 'Firmenbuchnummer',
      taxLabel: 'UID / USt',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const serial = ds.slice(0, 3);
        const checkDigit = ds.slice(3, 4);
        const datePart = ds.slice(4, 10);
        const day = Number(datePart.slice(0, 2));
        const month = Number(datePart.slice(2, 4));
        const year = inferYear(datePart.slice(4, 6));
        const weights = [3, 7, 9, 5, 8, 4, 2, 1, 6];
        const body = ds.slice(0, 3) + ds.slice(4, 10);
        const expected = weightedMod11Check(body, weights);
        const checksumOk = expected < 10 && Number(checkDigit) === expected;
        const dateOk = isValidDateParts(year, month, day);
        return { normalized: ds, ok: ds.length === 10 && dateOk && checksumOk, slices: [
          fieldSlice('serial block', serial, 'First three digits identify the local SVNR serial block.', 'blue'),
          fieldSlice('check digit', `${checkDigit} / expected ${expected}`, 'Weighted Austrian SVNR control digit.', checksumOk ? 'green' : 'red'),
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : datePart, 'Encoded DDMMYY date section.', dateOk ? 'green' : 'red'),
          fieldSlice('official boundary', 'offline only', 'Insurance/person status requires the official Austrian system.', 'red')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'SVNR has ten digits.', 'Expected ten SVNR digits.'),
          statusCheck('Date section', dateOk, 'Encoded date is calendar-valid.', 'Encoded date needs review.'),
          statusCheck('Weighted check digit', checksumOk, 'SVNR check digit matches local formula.', 'SVNR check digit does not match.')
        ] };
      },
      parseCompany(raw) {
        const match = text(raw).toUpperCase().match(/\bFN\s*([0-9]{1,7})\s*([A-Z])\b/);
        return { normalized: match ? `FN ${match[1]}${match[2].toLowerCase()}` : text(raw).trim(), ok: !!match, slices: [
          fieldSlice('registry prefix', match ? 'FN' : 'not detected', 'Firmenbuch number prefix.', match ? 'green' : 'red'),
          fieldSlice('number body', match && match[1], 'Company registry numeric body.'),
          fieldSlice('suffix letter', match && match[2], 'Registry suffix letter.')
        ] };
      }
    },
    belgium: {
      personalLabel: 'RRN / NISS',
      companyLabel: 'KBO / BCE',
      taxLabel: 'BTW / TVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const base = ds.slice(0, 9);
        const provided = Number(ds.slice(9, 11));
        const check1900 = 97 - (Number(base) % 97);
        const check2000 = 97 - (Number(`2${base}`) % 97);
        const checksumOk = provided === check1900 || provided === check2000;
        const year = provided === check2000 ? 2000 + Number(ds.slice(0, 2)) : inferYear(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        return { normalized: ds, ok: ds.length === 11 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}` : ds.slice(0, 6), 'YYMMDD date section.'),
          fieldSlice('sequence', ds.slice(6, 9), 'Birth-day sequence block.'),
          fieldSlice('check digits', `${ds.slice(9, 11)} / expected ${check1900} or ${check2000}`, 'Belgian modulo-97 control digits.', checksumOk ? 'green' : 'red'),
          fieldSlice('official boundary', 'offline only', 'National Register/BIS status requires official systems.', 'red')
        ], checks: [
          statusCheck('Eleven digits', ds.length === 11, 'RRN/NISS has eleven digits.', 'Expected eleven digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Modulo-97', checksumOk, 'Control digits match.', 'Control digits do not match.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const body = ds.slice(0, 8);
        const provided = Number(ds.slice(8, 10));
        const expected = 97 - (Number(body) % 97);
        const ok = ds.length === 10 && provided === expected;
        return { normalized: ds ? `BE${ds}` : text(raw).trim(), ok, slices: [
          fieldSlice('country prefix', /^BE/i.test(text(raw)) ? 'BE' : 'implicit BE', 'Belgian VAT/KBO display prefix.'),
          fieldSlice('enterprise body', body, 'KBO/BCE enterprise body.'),
          fieldSlice('check digits', `${ds.slice(8, 10)} / expected ${expected}`, 'Modulo-97 company control digits.', ok ? 'green' : 'red')
        ] };
      }
    },
    czechia: {
      personalLabel: 'Rodne cislo',
      companyLabel: 'ICO',
      taxLabel: 'DIC / DPH',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const yy = ds.slice(0, 2);
        const encodedMonth = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const gender = encodedMonth > 50 ? 'female month offset' : 'male/no month offset';
        const month = encodedMonth > 50 ? encodedMonth - 50 : encodedMonth;
        const year = inferYear(yy);
        const dateOk = isValidDateParts(year, month, day);
        const checksumOk = ds.length === 10 ? Number(ds) % 11 === 0 : ds.length === 9;
        return { normalized: ds.length > 6 ? `${ds.slice(0, 6)}/${ds.slice(6)}` : ds, ok: (ds.length === 9 || ds.length === 10) && dateOk && checksumOk, slices: [
          fieldSlice('date block', ds.slice(0, 6), 'YYMMDD with +50 month offset for female numbers.', dateOk ? 'green' : 'red'),
          fieldSlice('decoded birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 'not detected', 'Calendar interpretation of the first six digits.'),
          fieldSlice('gender/month evidence', gender, `Encoded month ${String(encodedMonth).padStart(2, '0')}.`),
          fieldSlice('serial/control block', ds.slice(6), ds.length === 10 ? 'Post-1954 body; whole number must be divisible by 11.' : 'Legacy nine-digit shape.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Length', ds.length === 9 || ds.length === 10, 'Rodne cislo has legacy or modern length.', 'Expected 9 or 10 digits.'),
          statusCheck('Calendar date', dateOk, 'Birth-date section is valid.', 'Birth-date section needs review.'),
          statusCheck('Modulo-11 rule', checksumOk, 'Modern checksum/legacy rule passes.', 'Modulo-11 rule does not pass.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod10Check(ds.slice(0, 7), [8, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 8 && Number(ds[7]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('ICO body', ds.slice(0, 7), 'First seven registration digits.'),
          fieldSlice('control digit', `${ds.slice(7)} / expected ${expected}`, 'Czech ICO weighted checksum.', ok ? 'green' : 'red'),
          fieldSlice('registry boundary', 'offline only', 'ARES/company existence is outside browser-only checks.', 'red')
        ] };
      }
    },
    denmark: {
      personalLabel: 'CPR',
      companyLabel: 'CVR',
      taxLabel: 'Moms / VAT',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const day = Number(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const year = inferYear(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        const gender = Number(ds.slice(-1)) % 2 ? 'male odd serial' : 'female even serial';
        return { normalized: ds.length > 6 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok: ds.length === 10 && dateOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : ds.slice(0, 6), 'DDMMYY date block.', dateOk ? 'green' : 'red'),
          fieldSlice('serial block', ds.slice(6), 'Individual serial block.'),
          fieldSlice('gender evidence', gender, 'Final digit parity convention.'),
          fieldSlice('checksum note', 'not universal', 'Modern CPR values are not reliably checksum-constrained offline.')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'CPR has ten digits.', 'Expected ten digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('No network', true, 'No CPR registry lookup is made.', 'No browser lookup allowed.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const sum = ds.slice(0, 8).split('').reduce((total, digit, index) => total + Number(digit) * [2, 7, 6, 5, 4, 3, 2, 1][index], 0);
        const ok = ds.length === 8 && sum % 11 === 0;
        return { normalized: ds, ok, slices: [
          fieldSlice('CVR body', ds, 'Eight-digit Danish company number.'),
          fieldSlice('weighted sum', String(sum), 'Weights 2,7,6,5,4,3,2,1.'),
          fieldSlice('modulo-11 status', ok ? 'passes' : 'review', 'Valid CVR values have sum divisible by 11.', ok ? 'green' : 'red')
        ] };
      }
    },
    finland: {
      personalLabel: 'HETU',
      companyLabel: 'Y-tunnus',
      taxLabel: 'ALV / VAT',
      parsePersonal(raw) {
        const normalized = text(raw).toUpperCase().replace(/\s+/g, '');
        const match = normalized.match(/^(\d{2})(\d{2})(\d{2})([+\-A])(\d{3})([0-9A-Z])$/);
        const checksumChars = '0123456789ABCDEFHJKLMNPRSTUVWXY';
        const yearBase = match && match[4] === '+' ? 1800 : match && match[4] === '-' ? 1900 : 2000;
        const day = match ? Number(match[1]) : 0;
        const month = match ? Number(match[2]) : 0;
        const year = match ? yearBase + Number(match[3]) : 0;
        const dateOk = !!match && isValidDateParts(year, month, day);
        const expected = match ? checksumChars[Number(match[1] + match[2] + match[3] + match[5]) % 31] : '';
        const checksumOk = !!match && match[6] === expected;
        return { normalized, ok: !!match && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : 'not detected', 'DDMMYY plus century sign.'),
          fieldSlice('century sign', match && match[4], '+ 1800s, - 1900s, A 2000s.'),
          fieldSlice('individual number', match && match[5], 'Three-digit individual block.'),
          fieldSlice('checksum', match ? `${match[6]} / expected ${expected}` : 'not detected', 'Modulo-31 HETU checksum.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('HETU shape', !!match, 'HETU shape detected.', 'Expected DDMMYYCZZZQ shape.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Modulo-31', checksumOk, 'Checksum character matches.', 'Checksum character does not match.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 7), [7, 9, 10, 5, 8, 4, 2]);
        const ok = ds.length === 8 && expected < 10 && Number(ds[7]) === expected;
        return { normalized: ds.length >= 8 ? `${ds.slice(0, 7)}-${ds.slice(7, 8)}` : ds, ok, slices: [
          fieldSlice('business body', ds.slice(0, 7), 'Y-tunnus body.'),
          fieldSlice('check digit', `${ds.slice(7, 8)} / expected ${expected}`, 'Weighted modulo-11 control digit.', ok ? 'green' : 'red')
        ] };
      }
    },
    ireland: {
      personalLabel: 'PPSN',
      companyLabel: 'CRO number',
      taxLabel: 'VAT / Revenue',
      parsePersonal(raw) {
        const value = alnumOnly(raw);
        const match = value.match(/^(\d{7})([A-W])([A-Z])?$/);
        const letters = 'WABCDEFGHIJKLMNOPQRSTUV';
        const bodySum = match ? match[1].split('').reduce((total, digit, index) => total + Number(digit) * (8 - index), 0) : 0;
        const expected = match ? letters[bodySum % 23] : '';
        const checksumOk = !!match && match[2] === expected;
        return { normalized: value, ok: !!match && checksumOk, slices: [
          fieldSlice('numeric body', match && match[1], 'Seven-digit PPSN body.'),
          fieldSlice('check letter', match ? `${match[2]} / expected ${expected}` : 'not detected', 'PPSN weighted check letter.', checksumOk ? 'green' : 'red'),
          fieldSlice('suffix', match && (match[3] || 'none'), 'Optional second letter for older/extended cases.')
        ], checks: [
          statusCheck('PPSN shape', !!match, 'PPSN shape detected.', 'Expected seven digits plus check letter.'),
          statusCheck('Check letter', checksumOk, 'Check letter matches.', 'Check letter needs review.')
        ] };
      },
      parseCompany(raw) {
        const value = alnumOnly(raw);
        const ok = /^\d{5,7}[A-Z]?$/.test(value);
        return { normalized: value, ok, slices: [
          fieldSlice('CRO body', value.replace(/[A-Z]$/, ''), 'Irish company registration number body.'),
          fieldSlice('suffix', (value.match(/[A-Z]$/) || [])[0] || 'none', 'Optional company suffix.'),
          fieldSlice('registry boundary', 'offline only', 'CRO status requires official lookup.', 'red')
        ] };
      }
    },
    norway: {
      personalLabel: 'Fodselsnummer',
      companyLabel: 'Organisasjonsnummer',
      taxLabel: 'MVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const day = Number(ds.slice(0, 2));
        const month = Number(ds.slice(2, 4));
        const year = inferYear(ds.slice(4, 6));
        const dateOk = isValidDateParts(year, month, day);
        const k1 = 11 - (ds.slice(0, 9).split('').reduce((total, digit, index) => total + Number(digit) * [3, 7, 6, 1, 8, 9, 4, 5, 2][index], 0) % 11);
        const check1 = k1 === 11 ? 0 : k1;
        const k2 = 11 - (ds.slice(0, 10).split('').reduce((total, digit, index) => total + Number(digit) * [5, 4, 3, 2, 7, 6, 5, 4, 3, 2][index], 0) % 11);
        const check2 = k2 === 11 ? 0 : k2;
        const checksumOk = ds.length === 11 && check1 < 10 && check2 < 10 && Number(ds[9]) === check1 && Number(ds[10]) === check2;
        return { normalized: ds, ok: ds.length === 11 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}` : ds.slice(0, 6), 'DDMMYY date block.'),
          fieldSlice('individual number', ds.slice(6, 9), 'Individual/person serial block.'),
          fieldSlice('check digit 1', `${ds.slice(9, 10)} / expected ${check1}`, 'First Norwegian control digit.', Number(ds[9]) === check1 ? 'green' : 'red'),
          fieldSlice('check digit 2', `${ds.slice(10, 11)} / expected ${check2}`, 'Second Norwegian control digit.', Number(ds[10]) === check2 ? 'green' : 'red')
        ], checks: [
          statusCheck('Eleven digits', ds.length === 11, 'Fodselsnummer has eleven digits.', 'Expected eleven digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Two check digits', checksumOk, 'Both check digits match.', 'Check digits need review.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 8), [3, 2, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 9 && expected < 10 && Number(ds[8]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('organization body', ds.slice(0, 8), 'Norwegian organization number body.'),
          fieldSlice('check digit', `${ds.slice(8)} / expected ${expected}`, 'Modulo-11 organization control digit.', ok ? 'green' : 'red')
        ] };
      }
    },
    portugal: {
      personalLabel: 'NIF',
      companyLabel: 'NIPC',
      taxLabel: 'IVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const expected = weightedMod11Check(ds.slice(0, 8), [9, 8, 7, 6, 5, 4, 3, 2]);
        const ok = ds.length === 9 && expected < 10 && Number(ds[8]) === expected;
        return { normalized: ds, ok, slices: [
          fieldSlice('NIF body', ds.slice(0, 8), 'First eight fiscal identifier digits.'),
          fieldSlice('check digit', `${ds.slice(8)} / expected ${expected}`, 'Portuguese weighted modulo-11 control digit.', ok ? 'green' : 'red'),
          fieldSlice('fiscal boundary', 'offline only', 'Taxpayer existence/status requires official systems.', 'red')
        ], checks: [
          statusCheck('Nine digits', ds.length === 9, 'NIF has nine digits.', 'Expected nine digits.'),
          statusCheck('Checksum', ok, 'NIF checksum matches.', 'NIF checksum needs review.')
        ] };
      },
      parseCompany(raw) { return this.parsePersonal(raw); }
    },
    romania: {
      personalLabel: 'CNP',
      companyLabel: 'CUI / CIF',
      taxLabel: 'TVA',
      parsePersonal(raw) {
        const ds = digitsOnly(raw);
        const century = { 1: 1900, 2: 1900, 3: 1800, 4: 1800, 5: 2000, 6: 2000 }[Number(ds[0])] || 1900;
        const year = century + Number(ds.slice(1, 3));
        const month = Number(ds.slice(3, 5));
        const day = Number(ds.slice(5, 7));
        const dateOk = isValidDateParts(year, month, day);
        const weights = '279146358279'.split('').map(Number);
        const sum = ds.slice(0, 12).split('').reduce((total, digit, index) => total + Number(digit) * weights[index], 0);
        const expected = sum % 11 === 10 ? 1 : sum % 11;
        const checksumOk = ds.length === 13 && Number(ds[12]) === expected;
        return { normalized: ds, ok: ds.length === 13 && dateOk && checksumOk, slices: [
          fieldSlice('sex/century digit', ds[0], 'First digit encodes sex and century.'),
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ds.slice(1, 7), 'YYMMDD date block.'),
          fieldSlice('county code', ds.slice(7, 9), 'Romanian county code block.'),
          fieldSlice('check digit', `${ds.slice(12)} / expected ${expected}`, 'CNP weighted checksum.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Thirteen digits', ds.length === 13, 'CNP has thirteen digits.', 'Expected thirteen digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Checksum', checksumOk, 'CNP checksum matches.', 'CNP checksum needs review.')
        ] };
      },
      parseCompany(raw) {
        const value = alnumOnly(raw);
        const ds = digitsOnly(value);
        const ok = ds.length >= 2 && ds.length <= 10;
        return { normalized: /^RO/.test(value) ? value : ds, ok, slices: [
          fieldSlice('VAT prefix', /^RO/.test(value) ? 'RO' : 'none', 'Romanian VAT prefix when present.'),
          fieldSlice('CUI/CIF body', ds, 'Company tax identifier body.'),
          fieldSlice('official boundary', 'offline only', 'ANAF/ONRC status requires official systems.', 'red')
        ] };
      }
    },
    sweden: {
      personalLabel: 'Personnummer',
      companyLabel: 'Organisationsnummer',
      taxLabel: 'Moms',
      parsePersonal(raw) {
        const ds = digitsOnly(raw).slice(-10);
        const yy = ds.slice(0, 2);
        const month = Number(ds.slice(2, 4));
        const day = Number(ds.slice(4, 6));
        const year = inferYear(yy);
        const dateOk = isValidDateParts(year, month, day);
        const expected = luhnCheckDigit(ds.slice(0, 9));
        const checksumOk = ds.length === 10 && Number(ds[9]) === expected;
        return { normalized: ds.length === 10 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok: ds.length === 10 && dateOk && checksumOk, slices: [
          fieldSlice('birth date', dateOk ? `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` : ds.slice(0, 6), 'YYMMDD date block.'),
          fieldSlice('birth number', ds.slice(6, 9), 'Individual number block.'),
          fieldSlice('gender evidence', Number(ds[8]) % 2 ? 'male odd digit' : 'female even digit', 'Penultimate digit parity convention.'),
          fieldSlice('check digit', `${ds.slice(9)} / expected ${expected}`, 'Luhn control digit.', checksumOk ? 'green' : 'red')
        ], checks: [
          statusCheck('Ten digits', ds.length === 10, 'Personnummer short form has ten digits.', 'Expected ten digits.'),
          statusCheck('Calendar date', dateOk, 'Date section is valid.', 'Date section needs review.'),
          statusCheck('Luhn checksum', checksumOk, 'Luhn checksum matches.', 'Luhn checksum needs review.')
        ] };
      },
      parseCompany(raw) {
        const ds = digitsOnly(raw).slice(-10);
        const expected = luhnCheckDigit(ds.slice(0, 9));
        const ok = ds.length === 10 && Number(ds[9]) === expected;
        return { normalized: ds.length === 10 ? `${ds.slice(0, 6)}-${ds.slice(6)}` : ds, ok, slices: [
          fieldSlice('organization body', ds.slice(0, 9), 'Swedish organization number body.'),
          fieldSlice('check digit', `${ds.slice(9)} / expected ${expected}`, 'Luhn control digit.', ok ? 'green' : 'red')
        ] };
      }
    }
  };

  function profileFor(suite) {
    return COUNTRY_INTELLIGENCE_PROFILES[suite && suite.country && suite.country.slug] || null;
  }

  function isTaxBusinessTool(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    if (kind === 'vat' || kind === 'eori' || kind === 'company' || kind === 'register') return true;
    const topic = [tool && tool.id, tool && tool.name, tool && tool.code, kind].map((item) => text(item).toLowerCase()).join(' ');
    if (/invoice|taxrate|tax-rate|taxreturn|tax-return|handoff|audit|onboarding|suffix|payroll|document|amount|date|remittance|e-?invoic/.test(topic)) return false;
    return /vat|eori|tax id|tax-id|tax number|tax-number|company number|company-number|registry id|registry-id|register number|business number|business-number|cui|cif|tin|nif|uid|ust|iva|btw|moms|mva|gst|ein|ruc|rut|nit/.test(topic);
  }

  const TAX_COMPANY_CHECK_REUSE = new Set(['belgium', 'czechia', 'denmark', 'finland', 'italy', 'norway', 'portugal', 'romania', 'spain', 'sweden', 'switzerland']);

  function taxInputParts(suite, tool, input) {
    const raw = text(input).trim();
    const wrongPrefix = raw.match(/^wrong\s+prefix\s+([A-Z]{2})(.*)$/i);
    const compact = wrongPrefix ? `${wrongPrefix[1]}${alnumOnly(wrongPrefix[2])}` : alnumOnly(raw);
    const expectedPrefix = routeIso2(suite) || sampleCountryPrefix(tool);
    const detectedPrefix = compact.match(/^[A-Z]{2}/) ? compact.slice(0, 2) : '';
    let body = compact;
    if (detectedPrefix) body = compact.slice(2);
    const markerMatch = body.match(/^([A-Z]{1,4})(?=\d)/);
    const marker = markerMatch ? markerMatch[1] : '';
    const bodyWithoutMarker = marker ? body.slice(marker.length) : body;
    const digits = digitsOnly(bodyWithoutMarker || body || compact);
    const separators = raw.replace(/[A-Z0-9]/gi, '').replace(/\s+/g, ' ').trim();
    const kind = text(tool && tool.kind).toLowerCase();
    return {
      raw,
      compact,
      expectedPrefix,
      detectedPrefix,
      body,
      marker,
      bodyWithoutMarker,
      digits,
      separators,
      prefixRequired: kind === 'vat' || kind === 'eori',
      kind
    };
  }

  function buildGenericTaxBusinessParsed(suite, tool, input, profile) {
    const parts = taxInputParts(suite, tool, input);
    const label = parts.kind === 'eori'
      ? 'EORI / customs'
      : parts.kind === 'company' || parts.kind === 'register'
        ? (profile && profile.companyLabel) || 'company registry'
        : (profile && profile.taxLabel) || tool.code || 'tax identifier';
    const prefixOk = !parts.prefixRequired || (parts.detectedPrefix && parts.detectedPrefix === parts.expectedPrefix);
    const bodyValue = parts.bodyWithoutMarker || parts.body || parts.compact;
    const bodyOk = /^[A-Z0-9]{6,18}$/.test(bodyValue) || (parts.kind !== 'vat' && /^[A-Z0-9]{4,24}$/.test(bodyValue));
    const repeatedPlaceholder = /^(\d)\1{5,}$/.test(parts.digits) || /^(?:0+|1+|9+)$/.test(parts.digits);
    const formatOk = parts.raw.length > 0 && prefixOk && bodyOk && !repeatedPlaceholder;
    const blockA = parts.digits.slice(0, Math.min(4, Math.max(2, parts.digits.length - 5)));
    const blockB = parts.digits.slice(blockA.length, -1) || parts.bodyWithoutMarker.slice(0, Math.max(0, parts.bodyWithoutMarker.length - 1));
    const blockC = parts.digits.slice(-1) || parts.bodyWithoutMarker.slice(-1);
    return {
      normalized: parts.compact || parts.raw,
      ok: formatOk,
      slices: [
        fieldSlice(parts.kind === 'eori' ? 'customs country prefix' : 'route country prefix', parts.detectedPrefix || 'not detected', `Expected ${parts.expectedPrefix || suite.country.name} for this ${suite.country.name} route.`, prefixOk ? 'green' : 'red'),
        fieldSlice('local type marker', parts.marker || 'none', 'VAT/EORI markers such as U, MVA, RT, or branch/type letters are preserved.'),
        fieldSlice(parts.kind === 'eori' ? 'customs body' : 'tax/business body', bodyValue || 'not detected', `${label} body retained as the official-system handoff key.`, bodyOk ? 'green' : 'red'),
        fieldSlice('registry/root block', blockA || 'not detected', 'Leading assignment, registry, taxpayer, or company-root evidence.'),
        fieldSlice('entity/body block', blockB || 'not detected', 'Main local identifier body used by downstream parsers.'),
        fieldSlice('control/check hint', blockC || 'not detected', 'Trailing digit/character where the local format exposes one.'),
        fieldSlice('display separators', parts.separators || 'none', 'Separators are display hints; normalized export keeps the compact key.'),
        fieldSlice('official boundary', 'offline only', 'Registration, VAT validity, customs authorization, filing status, and company existence remain official-system checks.', 'red')
      ],
      checks: [
        statusCheck('Input present', parts.raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(parts.prefixRequired ? 'Route prefix' : 'Route context', prefixOk, parts.detectedPrefix ? `${parts.detectedPrefix} matches ${parts.expectedPrefix}.` : `${suite.country.name} route context is attached.`, parts.detectedPrefix ? `Expected ${parts.expectedPrefix}; got ${parts.detectedPrefix}.` : `Expected ${parts.expectedPrefix} prefix for this route.`),
        statusCheck('Body envelope', bodyOk, `${bodyValue.length} compact body characters detected.`, 'Identifier body length/characters need review.'),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder digit body rejected.', 'Repeated placeholder digits should not pass.')
      ],
      taxParts: parts
    };
  }

  function buildTaxBusinessParsed(suite, tool, input, profile) {
    const generic = buildGenericTaxBusinessParsed(suite, tool, input, profile);
    const canReuseCompanyParser = profile && profile.parseCompany && TAX_COMPANY_CHECK_REUSE.has(suite.country.slug);
    if (!canReuseCompanyParser || (generic.taxParts.kind !== 'vat' && generic.taxParts.kind !== 'eori')) return generic;
    const companyParsed = profile.parseCompany.call(profile, input);
    if (!companyParsed) return generic;
    const mergedChecks = asArray(companyParsed.checks).length
      ? asArray(companyParsed.checks)
      : [statusCheck('Local checksum/shape replay', !!companyParsed.ok, 'Country company/tax parser accepted the body.', 'Country company/tax parser needs review.')];
    return Object.assign({}, generic, {
      ok: generic.ok && !!companyParsed.ok,
      normalized: companyParsed.normalized || generic.normalized,
      slices: [
        fieldSlice('route tax display', generic.normalized, `${suite.country.name} route prefix/body evidence before local parser replay.`, generic.ok ? 'green' : 'red')
      ].concat(asArray(companyParsed.slices), generic.slices.filter((slice) => !/registry\/root block|entity\/body block|control\/check hint/.test(text(slice.label))).slice(0, 5)),
      checks: generic.checks.concat(mergedChecks)
    });
  }

  function buildTaxBusinessResult(suite, tool, input, baseResult, profile) {
    if (!isTaxBusinessTool(tool)) return null;
    const parsed = buildTaxBusinessParsed(suite, tool, input, profile);
    const label = parsed.taxParts.kind === 'eori'
      ? 'EORI / customs identifier'
      : parsed.taxParts.kind === 'company' || parsed.taxParts.kind === 'register'
        ? (profile && profile.companyLabel) || 'company registry identifier'
        : (profile && profile.taxLabel) || 'tax/VAT identifier';
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? 'local tax/business structure verified' : 'tax/business structure needs review'}`,
      detail: parsed.ok
        ? `${suite.country.name} ${label} evidence was parsed locally with route prefix, body, masking, and official-boundary output.`
        : `${suite.country.name} ${label} needs review; compare prefix, body length, placeholder guard, and any local checksum evidence.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${label} anatomy & evidence breakdown`,
      breakdownSummary: `Decoded route prefix, local body evidence, control hints, parser replay, and official-boundary notes for ${suite.country.name}.`,
      breakdown: parsed.slices,
      checks: parsed.checks.concat([
        statusCheck('Official boundary', true, 'No registry, VIES, customs, tax, filing, or company-status lookup is made.', 'No official lookup is made.')
      ]),
      fields: [
        fieldSlice('normalized', normalized, 'Compact parser-normalized value for forms and fixtures.'),
        fieldSlice('masked', maskCompact(normalized), 'Log-safe preview.'),
        fieldSlice('route prefix', parsed.taxParts.expectedPrefix || suite.country.name, 'Expected country context for this route.'),
        fieldSlice('official boundary', 'offline only', 'Live status requires the responsible authority.', 'red')
      ],
      qualityNotes: [
        { title: 'Route-locked evidence', text: `${suite.country.name} prefix/body evidence is checked against the current country route.` },
        { title: 'Parser replay', text: 'Where a local public checksum/shape parser exists in the suite, it is replayed before reporting success.' },
        { title: 'Fixture safety', text: 'Valid/review samples are structural developer fixtures, not live companies or taxpayers.' },
        { title: 'Official boundary', text: 'VAT validity, EORI authorization, company existence, filing status, and ownership remain official-system checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized tax/business evidence for fixtures.', 'Keep masked previews in support logs.', 'Use official systems for live status.']
        : ['Compare against the valid sample.', 'Check route prefix, local marker, body length, and repeated placeholders.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      expectedPrefix: parsed.taxParts.expectedPrefix,
      detectedPrefix: parsed.taxParts.detectedPrefix,
      kind: parsed.taxParts.kind,
      normalized,
      masked: maskCompact(normalized),
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isContactAddressTool(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    return kind === 'phone' || kind === 'postal' || kind === 'address';
  }

  function validSampleValue(tool) {
    const sample = asArray(tool && tool.samples).find((item) => sampleIntent(item) !== 'review') || asArray(tool && tool.samples)[0];
    return text(sample && sample.value).trim();
  }

  function sampleCallingCode(tool) {
    const sample = validSampleValue(tool);
    const match = sample.match(/\+(\d{1,4})\b/);
    return match ? match[1] : '';
  }

  function postalToken(value) {
    const raw = text(value).replace(/^wrong\s+prefix\s+[A-Z]{2}\s+/i, '').trim();
    const tokens = raw.match(/[A-Z0-9][A-Z0-9 -]{1,12}[A-Z0-9]/gi) || [];
    for (let index = 0; index < Math.min(tokens.length, 3); index += 1) {
      const token = text(tokens[index]).trim();
      const compact = alnumOnly(token);
      if (compact.length >= 3 && compact.length <= 10 && /\d/.test(compact)) return token;
      const next = text(tokens[index + 1]).trim();
      const combined = `${token} ${next}`.trim();
      const combinedCompact = alnumOnly(combined);
      if (combinedCompact.length >= 5 && combinedCompact.length <= 8 && /\d/.test(combinedCompact) && /[A-Z]/i.test(combinedCompact)) return combined;
    }
    const digitFallback = raw.match(/\b\d{3,8}\b/);
    return digitFallback ? digitFallback[0] : '';
  }

  function postalShape(value) {
    return text(value).toUpperCase().replace(/[A-Z]/g, 'A').replace(/\d/g, '9').replace(/\s+/g, ' ').trim();
  }

  function buildPhoneParsed(suite, tool, input) {
    const raw = text(input).trim();
    const digits = digitsOnly(raw);
    const expectedCallingCode = sampleCallingCode(tool);
    const hasPlus = /\+/.test(raw);
    const startsWithCallingCode = expectedCallingCode ? digits.startsWith(expectedCallingCode) : digits.length >= 7;
    const national = expectedCallingCode && startsWithCallingCode ? digits.slice(expectedCallingCode.length) : digits;
    const nationalOk = national.length >= 5 && national.length <= 14;
    const repeatedPlaceholder = /^(\d)\1{5,}$/.test(national);
    const ok = raw.length > 0 && (!hasPlus || startsWithCallingCode) && nationalOk && !repeatedPlaceholder;
    const e164 = startsWithCallingCode && expectedCallingCode ? `+${digits}` : digits ? `+${digits}` : '';
    return {
      normalized: e164 || raw,
      ok,
      parts: { raw, digits, expectedCallingCode, hasPlus, national, startsWithCallingCode, repeatedPlaceholder, kind: 'phone' },
      slices: [
        fieldSlice('calling code', expectedCallingCode ? `+${expectedCallingCode}` : 'not detected', `Expected calling prefix inferred from the ${suite.country.name} valid sample.`, startsWithCallingCode || !hasPlus ? 'green' : 'red'),
        fieldSlice('national number', national || 'not detected', 'Subscriber/area evidence after the calling prefix.'),
        fieldSlice('area/mobile hint', national.slice(0, Math.min(3, national.length)) || 'not detected', 'Leading national digits retained for parser and routing tests.'),
        fieldSlice('E.164 preview', e164 || 'not detected', 'Copy-ready international display when enough digits are present.', ok ? 'green' : 'red'),
        fieldSlice('masked phone', national.length > 4 ? `+${expectedCallingCode || ''} ${national.slice(0, 2)}...${national.slice(-2)}` : maskCompact(e164 || raw), 'Log-safe phone preview.'),
        fieldSlice('official boundary', 'offline only', 'Line activity, ownership, portability, and carrier reachability require provider lookup.', 'red')
      ],
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck('Calling code', !hasPlus || startsWithCallingCode, expectedCallingCode ? `Calling code matches +${expectedCallingCode}.` : 'No route calling code fixture was detected.', expectedCallingCode ? `Expected +${expectedCallingCode}.` : 'Route calling code needs a valid sample.'),
        statusCheck('National length', nationalOk, `${national.length} national digits detected.`, 'National phone body length needs review.'),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder phone body rejected.', 'Repeated phone placeholders should not pass.')
      ]
    };
  }

  function buildPostalAddressParsed(suite, tool, input) {
    const kind = text(tool && tool.kind).toLowerCase();
    const raw = text(input).replace(/\s+/g, ' ').trim();
    const sampleCode = postalToken(validSampleValue(tool));
    const candidate = postalToken(raw);
    const compact = alnumOnly(candidate);
    const expectedShape = postalShape(sampleCode);
    const actualShape = postalShape(candidate);
    const locality = raw.replace(candidate, '').replace(/[,\s]+/g, ' ').trim();
    const hasText = /[A-Z]/i.test(raw);
    const hasNumber = /\d/.test(raw);
    const candidateOk = kind === 'address'
      ? raw.length >= 8 && (hasText || hasNumber)
      : compact.length >= 3 && compact.length <= 10 && (!expectedShape || actualShape.length === expectedShape.length || compact.length === alnumOnly(sampleCode).length);
    const ok = raw.length > 0 && candidateOk;
    return {
      normalized: raw,
      ok,
      parts: { raw, sampleCode, candidate, expectedShape, actualShape, locality, kind },
      slices: [
        fieldSlice(kind === 'postal' ? 'postal code' : 'postal/address token', candidate || 'not detected', `Postal evidence inferred for the ${suite.country.name} route.`, candidateOk ? 'green' : 'red'),
        fieldSlice('expected sample shape', expectedShape || 'not detected', 'Letter/digit pattern from the valid sample.'),
        fieldSlice('actual shape', actualShape || 'not detected', 'Letter/digit pattern from the current input.', candidateOk ? 'green' : 'red'),
        fieldSlice('area/local block', compact.slice(0, Math.min(3, compact.length)) || 'not detected', 'Leading postal area or routing evidence.'),
        fieldSlice('locality/street evidence', locality || raw, 'Remaining locality, street, or delivery text retained for handoff.'),
        fieldSlice('official boundary', 'offline only', 'Address existence, deliverability, geocoding, and postal authority status require official/provider lookup.', 'red')
      ],
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(kind === 'postal' ? 'Postal token' : 'Address text', candidateOk, kind === 'postal' ? `${compact.length} compact postal characters detected.` : 'Address text has enough local evidence.', 'Postal/address evidence needs review.'),
        statusCheck('Sample shape comparison', kind === 'address' || !expectedShape || actualShape.length === expectedShape.length || compact.length === alnumOnly(sampleCode).length, expectedShape ? `Compared against ${expectedShape}.` : 'No exact sample shape available.', expectedShape ? `Expected shape near ${expectedShape}; got ${actualShape || 'none'}.` : 'Load a route sample to compare shape.'),
        statusCheck('Official boundary', true, 'No postal, carrier, address, or geocoding lookup is made.', 'No official lookup is made.')
      ]
    };
  }

  function buildContactAddressResult(suite, tool, input, baseResult) {
    if (!isContactAddressTool(tool)) return null;
    const kind = text(tool.kind).toLowerCase();
    const parsed = kind === 'phone' ? buildPhoneParsed(suite, tool, input) : buildPostalAddressParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const label = kind === 'phone' ? 'phone number' : kind === 'postal' ? 'postal code' : 'address';
    const normalized = parsed.normalized || text(input).trim();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? 'local contact/address structure verified' : 'contact/address structure needs review'}`,
      detail: parsed.ok
        ? `${suite.country.name} ${label} evidence was parsed locally with route samples, masking, field slices, and official-boundary output.`
        : `${suite.country.name} ${label} needs review; compare sample shape, local body, and placeholder/length checks.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${label} anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} contact/address evidence, sample-shape comparison, masking, and official-boundary notes.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Parser-normalized display value for forms and fixtures.'),
        fieldSlice('masked', maskCompact(normalized), 'Log-safe preview.'),
        fieldSlice('route sample', validSampleValue(tool), 'Valid fixture used for local shape expectations.'),
        fieldSlice('official boundary', 'offline only', 'Live deliverability, ownership, carrier, or geocoding status requires official/provider lookup.', 'red')
      ],
      qualityNotes: [
        { title: 'Route-sample evidence', text: `${suite.country.name} shape expectations are inferred from the local valid sample carried by this route.` },
        { title: 'Browser-only parser', text: 'Formatting, splitting, masking, and sample comparison run locally without carrier, postal, or geocoder calls.' },
        { title: 'Fixture safety', text: 'Use valid/review samples for UI, import, CRM, and address-form tests, not as real contact proof.' },
        { title: 'Official boundary', text: 'Number ownership, deliverability, address existence, postal routing status, and geocoding remain provider or authority checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized contact/address evidence for fixtures.', 'Use the breakdown to preserve country and sample-shape assumptions.', 'Mask values in logs and screenshots.']
        : ['Compare against the valid sample.', 'Check length, local body, separators, and placeholder digits.', 'Use official/provider systems for live reachability.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isDocumentVehicleReferenceTool(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    const haystack = `${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (['document', 'passport', 'plate', 'vin', 'vehicle', 'vehiclemask', 'customs', 'tracking'].includes(kind)) return true;
    return /\b(passport|mrz|visa|document|driving[- ]?licen[cs]e|vehicle|plate|vin|tracking|customs)\b/.test(haystack);
  }

  function documentVehicleReferenceKind(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    const haystack = `${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (kind === 'vin' || /\bvin\b/.test(haystack)) return 'VIN';
    if (kind === 'plate' || /plate|registration/.test(haystack)) return 'Plate';
    if (kind === 'vehicle' || kind === 'vehiclemask' || /vehicle/.test(haystack)) return 'Vehicle';
    if (kind === 'customs' || /customs|declaration|importer|hs-code|hs code/.test(haystack)) return 'Customs';
    if (kind === 'tracking' || /tracking|carrier|parcel|shipment/.test(haystack)) return 'Tracking';
    if (/mrz/.test(haystack)) return 'MRZ';
    if (/passport/.test(haystack)) return 'Passport';
    return 'Document';
  }

  function compactShape(value) {
    return text(value).toUpperCase().replace(/[A-Z]/g, 'A').replace(/\d/g, '9').replace(/[^A9<]+/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function displayShapePreview(value, fallback) {
    const raw = text(value).replace(/\s+/g, ' ').trim();
    const fallbackText = text(fallback).replace(/\s+/g, ' ').trim();
    const shape = compactShape(raw);
    const compact = shape.replace(/\s+/g, '');
    const alphaOnlyPlaceholder = /^[A]+$/.test(compact) && compact.length >= 5;
    if (!shape || alphaOnlyPlaceholder) return shortValue(fallbackText || raw || 'sample', 28);
    return shortValue(shape, 28);
  }

  function structuredShapePreview(value, fallback, textFallback) {
    const preview = displayShapePreview(value, fallback);
    if (!/[0-9<]/.test(preview) && /^[A-Za-z ,./-]+$/.test(preview) && preview.length >= 5) {
      return text(textFallback) || preview;
    }
    return preview;
  }

  function mrzCharValue(char) {
    const c = text(char).toUpperCase();
    if (/^\d$/.test(c)) return Number(c);
    if (/^[A-Z]$/.test(c)) return c.charCodeAt(0) - 55;
    return 0;
  }

  function mrzCheckDigit(value) {
    const weights = [7, 3, 1];
    const sum = text(value).toUpperCase().split('').reduce((total, char, index) => total + mrzCharValue(char) * weights[index % 3], 0);
    return String(sum % 10);
  }

  function mrzLines(raw) {
    return text(raw).replace(/\\n/g, '\n').split(/\r?\n/).map((line) => line.trim().toUpperCase()).filter((line) => line.includes('<') || /^[A-Z0-9<]{20,}$/.test(line));
  }

  function mrzChecks(lines) {
    const line = lines.length >= 2 ? lines[1] : '';
    if (line.length < 30) return [];
    const checks = [];
    [
      ['document number check', line.slice(0, 9), line[9]],
      ['birth date check', line.slice(13, 19), line[19]],
      ['expiry date check', line.slice(21, 27), line[27]]
    ].forEach(([label, source, provided]) => {
      if (/^\d$/.test(text(provided))) {
        const expected = mrzCheckDigit(source);
        checks.push({ label, source, expected, provided, ok: expected === provided });
      }
    });
    return checks;
  }

  function routeShapeSample(tool) {
    return compactShape(validSampleValue(tool)).replace(/\s+/g, ' ');
  }

  function extractPrimaryToken(raw, kindLabel) {
    const source = text(raw).replace(/^wrong\s+prefix\s+[A-Z]{2}\s+/i, '').trim();
    if (kindLabel === 'MRZ' || /</.test(source)) return mrzLines(source).join('\n') || source;
    if (kindLabel === 'VIN') {
      const match = source.toUpperCase().match(/\b[A-HJ-NPR-Z0-9]{11,17}\b/);
      return match ? match[0] : alnumOnly(source).slice(0, 17);
    }
    if (kindLabel === 'Plate') {
      const match = source.toUpperCase().match(/\b[A-Z0-9][A-Z0-9 -]{1,12}[A-Z0-9]\b/);
      return match ? match[0].trim() : alnumOnly(source).slice(0, 12);
    }
    if (kindLabel === 'Tracking') {
      const match = source.toUpperCase().match(/\b[A-Z]{1,4}[A-Z0-9 -]{6,24}\b/);
      return match ? match[0].trim() : shortValue(source, 32);
    }
    if (kindLabel === 'Customs') {
      const hs = source.match(/\bHS\s*\d{4,10}\b/i);
      const importer = source.toUpperCase().match(/\b[A-Z]{2}[A-Z0-9]{6,14}\b/);
      return [importer && importer[0], hs && hs[0].toUpperCase()].filter(Boolean).join(' / ') || shortValue(source, 36);
    }
    const match = source.toUpperCase().match(/\b[A-Z]{1,4}[- ]?[A-Z0-9][A-Z0-9 -]{3,24}\b/);
    return match ? match[0].trim() : shortValue(source, 36);
  }

  function buildDocumentVehicleReferenceParsed(suite, tool, input) {
    const raw = text(input).trim();
    const kindLabel = documentVehicleReferenceKind(tool);
    const normalized = kindLabel === 'MRZ' ? mrzLines(raw).join('\n') : raw.replace(/\s+/g, ' ').trim();
    const compact = alnumOnly(normalized || raw);
    const token = extractPrimaryToken(raw, kindLabel);
    const tokenCompact = alnumOnly(token);
    const lines = mrzLines(raw);
    const checks = mrzChecks(lines);
    const repeatedPlaceholder = /^([A-Z0-9])\1{5,}$/i.test(tokenCompact);
    const vinForbidden = /[IOQ]/i.test(tokenCompact);
    const vinOk = kindLabel !== 'VIN' || (tokenCompact.length === 17 && !vinForbidden);
    const plateOk = kindLabel !== 'Plate' || (tokenCompact.length >= 3 && tokenCompact.length <= 12 && /[A-Z]/i.test(tokenCompact) && /\d/.test(tokenCompact));
    const mrzOk = kindLabel !== 'MRZ' || (lines.length >= 2 && lines.every((line) => line.length >= 20));
    const customsOk = kindLabel !== 'Customs' || (raw.length >= 8 && (/\bHS\s*\d{4,10}\b/i.test(raw) || /\d{6,}/.test(raw)));
    const trackingOk = kindLabel !== 'Tracking' || (raw.length >= 8 && /[A-Z]/i.test(raw) && /\d/.test(raw));
    const genericOk = tokenCompact.length >= 5 || lines.length >= 1;
    const ok = raw.length > 0 && genericOk && !repeatedPlaceholder && vinOk && plateOk && mrzOk && customsOk && trackingOk;
    const routeShape = routeShapeSample(tool);
    const currentShape = compactShape(token || normalized || raw);
    const baseSlices = [
      fieldSlice('primary token', token || 'not detected', `${kindLabel} evidence extracted from the current ${suite.country.name} route input.`, genericOk ? 'green' : 'red'),
      fieldSlice('route sample shape', routeShape || 'not detected', 'Letter/digit/MRZ shape inferred from the success sample.'),
      fieldSlice('current shape', currentShape || 'not detected', 'Letter/digit/MRZ shape for the current input.', genericOk ? 'green' : 'red'),
      fieldSlice('masked preview', maskCompact(normalized || token || raw), 'Log-safe value for tickets, imports, and support screenshots.'),
      fieldSlice('official boundary', 'offline only', 'Document authenticity, vehicle ownership, customs filing, and shipment status require official/provider lookup.', 'red')
    ];
    const domainSlices = [];
    if (kindLabel === 'VIN') {
      domainSlices.push(
        fieldSlice('WMI', tokenCompact.slice(0, 3) || 'not detected', 'World manufacturer identifier block.'),
        fieldSlice('VDS', tokenCompact.slice(3, 9) || 'not detected', 'Vehicle descriptor section.'),
        fieldSlice('VIS', tokenCompact.slice(9, 17) || 'not detected', 'Vehicle identifier section.'),
        fieldSlice('VIN charset', vinForbidden ? 'I/O/Q present' : 'I/O/Q absent', 'VINs exclude I, O, and Q in standard local intake checks.', vinForbidden ? 'red' : 'green')
      );
    } else if (kindLabel === 'MRZ') {
      domainSlices.push(
        fieldSlice('MRZ lines', String(lines.length), 'Detected machine-readable-zone lines.'),
        fieldSlice('document type', lines[0] ? lines[0].slice(0, 1) : 'not detected', 'Leading ICAO-style document type character.'),
        fieldSlice('issuing country hint', lines[0] ? lines[0].slice(2, 5).replace(/</g, '') : 'not detected', 'Country/authority code carried in the MRZ line.'),
        fieldSlice('MRZ check replay', checks.length ? checks.map((item) => `${item.label}: ${item.expected}/${item.provided}`).join(' | ') : 'not enough check slots', 'Checksum slots are replayed when numeric check digits are present; fixture status is shape-first unless the page has a verified official MRZ sample.', checks.every((item) => item.ok) ? 'green' : 'red')
      );
    } else if (kindLabel === 'Customs') {
      domainSlices.push(
        fieldSlice('importer/reference', token.split('/')[0] || token || 'not detected', 'Importer, declaration, or customs handoff token.'),
        fieldSlice('HS evidence', (raw.match(/\bHS\s*\d{4,10}\b/i) || ['not detected'])[0], 'Harmonized-system code evidence when present.'),
        fieldSlice('amount/currency hint', (raw.match(/\b\d[\d,. ]+\s*[A-Z]{3}\b/i) || ['not detected'])[0], 'Invoice or declaration amount evidence for handoff.')
      );
    } else if (kindLabel === 'Tracking') {
      domainSlices.push(
        fieldSlice('tracking prefix', tokenCompact.slice(0, Math.min(4, tokenCompact.length)) || 'not detected', 'Carrier/service prefix hint.'),
        fieldSlice('tracking body', tokenCompact.slice(Math.min(4, tokenCompact.length)) || 'not detected', 'Shipment or postal reference body.'),
        fieldSlice('status boundary', 'not checked', 'Carrier scans, delivery state, and package existence are live-provider checks.', 'red')
      );
    } else if (kindLabel === 'Plate' || kindLabel === 'Vehicle') {
      domainSlices.push(
        fieldSlice('registration prefix', tokenCompact.slice(0, Math.min(3, tokenCompact.length)) || 'not detected', 'Region/series prefix when the local format supports it.'),
        fieldSlice('registration body', tokenCompact.slice(Math.min(3, tokenCompact.length)) || 'not detected', 'Vehicle registration serial/body.'),
        fieldSlice('ownership boundary', 'not checked', 'Owner, inspection, insurance, and registration status require authority/provider lookup.', 'red')
      );
    } else {
      domainSlices.push(
        fieldSlice('document prefix', tokenCompact.slice(0, Math.min(4, tokenCompact.length)) || 'not detected', 'Visible type/authority prefix evidence.'),
        fieldSlice('document body', tokenCompact.slice(Math.min(4, tokenCompact.length)) || 'not detected', 'Main document/reference body.'),
        fieldSlice('authenticity boundary', 'not checked', 'Identity, document authenticity, and issuance remain official authority checks.', 'red')
      );
    }
    return {
      ok,
      normalized: normalized || raw,
      kindLabel,
      parts: { raw, normalized: normalized || raw, token, compact: tokenCompact || compact, routeShape, currentShape, mrzLines: lines, mrzChecks: checks, repeatedPlaceholder, vinForbidden },
      slices: domainSlices.concat(baseSlices),
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(`${kindLabel} token`, genericOk, `${tokenCompact.length || compact.length} compact characters detected.`, `${kindLabel} evidence needs more local structure.`),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder value rejected.', 'Repeated placeholder values should not pass.'),
        statusCheck('Domain replay', vinOk && plateOk && mrzOk && customsOk && trackingOk, `${kindLabel} browser-checkable shape replay passed.`, `${kindLabel} shape or replay evidence needs review.`),
        statusCheck('Official boundary', true, 'No official authority, registry, carrier, customs, or vehicle lookup is made.', 'No official lookup is made.')
      ]
    };
  }

  function buildDocumentVehicleReferenceResult(suite, tool, input, baseResult) {
    if (!isDocumentVehicleReferenceTool(tool)) return null;
    const parsed = buildDocumentVehicleReferenceParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const family = parsed.kindLabel.toLowerCase();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? `${parsed.kindLabel} local evidence verified` : `${parsed.kindLabel} evidence needs review`}`,
      detail: parsed.ok
        ? `${suite.country.name} ${family} evidence was parsed locally with token anatomy, masking, fixture shape, and official-boundary output.`
        : `${suite.country.name} ${family} evidence needs review; compare token shape, placeholder guard, and domain replay checks.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${parsed.kindLabel} anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${family} token anatomy, sample-shape replay, masking, and official-boundary notes.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Parser-normalized value for fixtures and intake forms.'),
        fieldSlice('masked', maskCompact(normalized), 'Log-safe preview.'),
        fieldSlice('route sample', validSampleValue(tool), 'Success fixture used for shape expectations.'),
        fieldSlice('official boundary', 'offline only', 'Live status, authenticity, ownership, filing, or carrier state requires official/provider lookup.', 'red')
      ],
      qualityNotes: [
        { title: 'Token anatomy', text: `${suite.country.name} ${family} inputs are split into visible local evidence blocks where the public shape allows it.` },
        { title: 'Browser-only replay', text: 'Shape, token extraction, VIN/MRZ-style replay, masking, and sample comparison run locally in the browser.' },
        { title: 'Fixture safety', text: 'Use these samples for UI, import, KYC, logistics, and transport fixtures; they are not live records.' },
        { title: 'Official boundary', text: 'Document authenticity, identity, vehicle ownership, customs filing, shipment state, and registry status remain official/provider checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized evidence for fixtures.', 'Use masked previews in tickets and logs.', 'Keep live status checks in official/provider systems.']
        : ['Compare against the valid sample.', 'Check prefix, token length, separators, and repeated placeholders.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind: parsed.kindLabel,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isBankAccountWorkflowTool(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    const id = text(tool && tool.id).toLowerCase();
    const name = text(tool && tool.name).toLowerCase();
    const topic = `${id} ${name} ${kind}`;
    if (/iban[- ]?(generator|validator)|pix|invoice|e[- ]?invoice|tax[- ]?authority|tax[- ]?rate|tax[- ]?return|passport|mrz|vehicle|customs|postal|phone/.test(topic)) return false;
    if (['bankcode', 'bankmask', 'bic', 'blz', 'sepa', 'statement'].includes(kind)) return true;
    if (kind === 'reconciliation' && /payment-reconciliation|bank[- ]?statement|statement/.test(id)) return true;
    if (kind === 'paymentref' && /domestic-transfer|direct-debit|sepa-transfer|mandate|bank-transfer/.test(id)) return true;
    return /bank-account|domestic-account|bank-routing|bic-swift|bank-code|masked-bank-account|domestic-transfer|sepa-transfer|direct-debit|payment-reconciliation|bank-statement|sort-code|routing-number|blz|bpay|payid/.test(id);
  }

  function bankAccountWorkflowKind(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    const topic = `${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (kind === 'bic' || /bic|swift/.test(topic)) return 'BIC / SWIFT';
    if (kind === 'blz' || /blz|bank[- ]?code|routing[- ]?number|sort[- ]?code/.test(topic)) return 'Bank code';
    if (kind === 'sepa' || /sepa|direct[- ]?debit|mandate/.test(topic)) return 'Direct debit mandate';
    if (kind === 'statement' || kind === 'reconciliation' || /statement|reconciliation/.test(topic)) return 'Bank statement';
    if (kind === 'bankmask' || /masked[- ]?bank/.test(topic)) return 'Masked account';
    if (/domestic[- ]?transfer|bank[- ]?transfer/.test(topic)) return 'Domestic transfer';
    return 'Domestic bank account';
  }

  function extractBankingToken(raw, kindLabel) {
    const source = text(raw).replace(/^wrong\s+prefix\s+[A-Z]{2}\s+/i, '').replace(/\s+/g, ' ').trim();
    if (kindLabel === 'BIC / SWIFT') {
      const match = source.toUpperCase().match(/\b[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}(?:[A-Z0-9]{3})?\b/);
      return match ? match[0] : alnumOnly(source).slice(0, 11);
    }
    const labelled = source.match(/\b(?:account|acct|routing|sort|bank|branch|bsb|aba|blz|mandate|reference|statement)\s*[:#-]?\s*([A-Z0-9][A-Z0-9 -]{3,34})/i);
    if (labelled) return labelled[1].trim();
    const longAlnum = source.match(/\b[A-Z]{0,4}\d[A-Z0-9 -]{5,34}\b/i);
    if (longAlnum) return longAlnum[0].trim();
    return shortValue(source, 42);
  }

  function bankingDigitTokens(raw) {
    return text(raw).match(/\d[\d -]{2,24}\d/g) || [];
  }

  function abaRoutingCheck(digits) {
    const ds = digitsOnly(digits);
    if (ds.length !== 9) return null;
    const n = ds.split('').map(Number);
    const sum = 3 * (n[0] + n[3] + n[6]) + 7 * (n[1] + n[4] + n[7]) + (n[2] + n[5] + n[8]);
    return { sum, ok: sum % 10 === 0 };
  }

  function bankRoutePrefix(suite, tool, kindLabel) {
    const route = routeIso2(suite);
    if (kindLabel === 'BIC / SWIFT') {
      const sampleToken = extractBankingToken(validSampleValue(tool), kindLabel);
      const sampleBic = alnumOnly(sampleToken).match(/^[A-Z]{4}([A-Z]{2})[A-Z0-9]{2}(?:[A-Z0-9]{3})?$/);
      if (sampleBic) return sampleBic[1];
    }
    return route || sampleCountryPrefix(tool);
  }

  function buildBankAccountWorkflowParsed(suite, tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const kindLabel = bankAccountWorkflowKind(tool);
    const routePrefix = bankRoutePrefix(suite, tool, kindLabel);
    const token = extractBankingToken(raw, kindLabel);
    const tokenCompact = alnumOnly(token);
    const digitTokens = bankingDigitTokens(raw).map((item) => digitsOnly(item));
    const primaryDigits = digitTokens.find((item) => item.length >= 6) || digitsOnly(token);
    const bicMatch = tokenCompact.match(/^([A-Z]{4})([A-Z]{2})([A-Z0-9]{2})([A-Z0-9]{3})?$/);
    const bicCountryOk = kindLabel !== 'BIC / SWIFT' || !routePrefix || !bicMatch || bicMatch[2] === routePrefix;
    const aba = abaRoutingCheck(primaryDigits.slice(0, 9));
    const repeatedPlaceholder = /^([A-Z0-9])\1{5,}$/i.test(tokenCompact) || /^(\d)\1{5,}$/.test(primaryDigits);
    const routeShape = compactShape(validSampleValue(tool));
    const currentShape = compactShape(token || normalized || raw);
    const hasBankWord = /\b(bank|account|routing|sort|branch|swift|bic|sepa|mandate|statement|reconciliation|transfer|debit|bpay|payid|aba|bsb|blz)\b/i.test(raw);
    const accountEnvelopeOk = tokenCompact.length >= 6 || primaryDigits.length >= 6 || hasBankWord;
    const bicOk = kindLabel !== 'BIC / SWIFT' || (!!bicMatch && (tokenCompact.length === 8 || tokenCompact.length === 11) && bicCountryOk);
    const statementOk = kindLabel !== 'Bank statement' || (raw.length >= 10 && (raw.split(/\r?\n/).length > 1 || /\d[\d,. ]+\s*[A-Z]{3}\b/i.test(raw) || hasBankWord));
    const mandateOk = kindLabel !== 'Direct debit mandate' || (accountEnvelopeOk && /mandate|debit|sepa|reference|transfer/i.test(raw));
    const ok = raw.length > 0 && accountEnvelopeOk && bicOk && statementOk && mandateOk && !repeatedPlaceholder;
    const baseSlices = [
      fieldSlice('route sample shape', routeShape || 'not detected', 'Letter/digit shape inferred from the route success sample.'),
      fieldSlice('current shape', currentShape || 'not detected', 'Letter/digit shape for the current banking token.', accountEnvelopeOk ? 'green' : 'red'),
      fieldSlice('masked preview', maskCompact(normalized || token || raw), 'Log-safe banking preview for tickets and screenshots.'),
      fieldSlice('official boundary', 'offline only', 'Bank existence, account ownership, beneficiary identity, balance, sanctions, and settlement require bank/provider systems.', 'red')
    ];
    const domainSlices = [];
    if (kindLabel === 'BIC / SWIFT') {
      domainSlices.push(
        fieldSlice('institution code', bicMatch ? bicMatch[1] : 'not detected', 'Four-letter institution code.'),
        fieldSlice('country code', bicMatch ? `${bicMatch[2]} / route ${routePrefix || 'unknown'}` : 'not detected', 'BIC country code compared with the current country route.', bicCountryOk && bicMatch ? 'green' : 'red'),
        fieldSlice('location code', bicMatch ? bicMatch[3] : 'not detected', 'Location/test/passive code block.'),
        fieldSlice('branch code', bicMatch && bicMatch[4] ? bicMatch[4] : 'primary office', 'Optional three-character branch code.')
      );
    } else if (kindLabel === 'Bank code') {
      domainSlices.push(
        fieldSlice('routing/bank code', primaryDigits.slice(0, Math.min(9, primaryDigits.length)) || token || 'not detected', 'Bank, branch, ABA, BLZ, BSB, sort-code, or local routing evidence.'),
        fieldSlice('routing checksum', aba ? `${aba.sum} / ${aba.ok ? 'ABA pass' : 'ABA review'}` : 'not available', 'ABA modulo-10 replay when a nine-digit US routing candidate is visible.', !aba || aba.ok ? 'green' : 'red'),
        fieldSlice('account/body hint', primaryDigits.length > 9 ? primaryDigits.slice(9) : 'not detected', 'Remaining domestic account body when visible.')
      );
    } else if (kindLabel === 'Direct debit mandate' || kindLabel === 'Domestic transfer') {
      domainSlices.push(
        fieldSlice('mandate/reference', token || 'not detected', 'Mandate, direct-debit, transfer, or banking reference token.'),
        fieldSlice('account/routing hint', primaryDigits || 'not detected', 'Account or routing digits retained for fixture handoff.'),
        fieldSlice('scheme hint', (/B2B/i.test(raw) ? 'B2B' : /CORE/i.test(raw) ? 'CORE' : /SEPA/i.test(raw) ? 'SEPA' : 'local scheme'), 'Visible direct-debit or domestic transfer scheme vocabulary.'),
        fieldSlice('settlement boundary', 'not checked', 'Mandate validity, beneficiary ownership, bank acceptance, and settlement state remain external.', 'red')
      );
    } else if (kindLabel === 'Bank statement') {
      domainSlices.push(
        fieldSlice('statement lines', String(raw ? raw.split(/\r?\n/).length : 0), 'Line count for statement/import fixtures.'),
        fieldSlice('date hint', workflowDateHint(raw) || 'not detected', 'Transaction date evidence when present.'),
        fieldSlice('amount/currency', workflowAmountCurrency(raw) || 'not detected', 'Statement amount or currency evidence.'),
        fieldSlice('reference hint', token || 'not detected', 'Narrative, reconciliation, or transaction reference.')
      );
    } else if (kindLabel === 'Masked account') {
      domainSlices.push(
        fieldSlice('visible prefix', tokenCompact.slice(0, Math.min(4, tokenCompact.length)) || 'not detected', 'Leading visible account/routing evidence.'),
        fieldSlice('visible suffix', tokenCompact.slice(-4) || 'not detected', 'Trailing visible account evidence for support workflows.'),
        fieldSlice('masked account', maskCompact(tokenCompact || normalized), 'Copy-safe display value for logs and screenshots.'),
        fieldSlice('privacy boundary', 'masked only', 'Masking does not validate account ownership or payment reachability.', 'red')
      );
    } else {
      domainSlices.push(
        fieldSlice('bank/routing block', primaryDigits.slice(0, Math.min(6, primaryDigits.length)) || tokenCompact.slice(0, 6) || 'not detected', 'Leading bank, branch, sort-code, BSB, routing, or local account block.'),
        fieldSlice('account body', primaryDigits.slice(Math.min(6, primaryDigits.length)) || tokenCompact.slice(6) || 'not detected', 'Domestic account body retained for fixtures.'),
        fieldSlice('display token', token || 'not detected', 'User-visible banking token with separators preserved.'),
        fieldSlice('ownership boundary', 'not checked', 'Account existence, ownership, beneficiary name, and funds availability require provider lookup.', 'red')
      );
    }
    return {
      ok,
      normalized,
      kindLabel,
      parts: { raw, normalized, token, compact: tokenCompact, routePrefix, digitTokens, primaryDigits, routeShape, currentShape, bic: bicMatch ? { institution: bicMatch[1], country: bicMatch[2], location: bicMatch[3], branch: bicMatch[4] || '' } : null, aba, repeatedPlaceholder },
      slices: domainSlices.concat(baseSlices),
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(`${kindLabel} evidence`, accountEnvelopeOk, 'Banking token, account digits, or banking vocabulary detected.', 'Bank/account evidence needs more local structure.'),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder banking value rejected.', 'Repeated placeholders should not pass.'),
        statusCheck('Domain replay', bicOk && statementOk && mandateOk, `${kindLabel} browser-checkable banking replay passed.`, `${kindLabel} shape or workflow evidence needs review.`),
        statusCheck('Official boundary', true, 'No bank, account, ownership, beneficiary, balance, sanctions, or settlement lookup is made.', 'No official lookup is made.')
      ]
    };
  }

  function buildBankAccountWorkflowResult(suite, tool, input, baseResult) {
    if (!isBankAccountWorkflowTool(tool)) return null;
    const parsed = buildBankAccountWorkflowParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const family = parsed.kindLabel.toLowerCase();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? `${parsed.kindLabel} local banking evidence verified` : `${parsed.kindLabel} banking evidence needs review`}`,
      detail: parsed.ok
        ? `${suite.country.name} ${family} evidence was parsed locally with routing/account anatomy, masking, fixture shape, and bank/provider boundary output.`
        : `${suite.country.name} ${family} needs review; compare routing/account evidence, placeholder guard, and domain replay checks.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${parsed.kindLabel} banking anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${family} evidence for bank-account fixtures, routing/debug handoff, masking, and reconciliation tests.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Parser-normalized banking value for forms, imports, and fixtures.'),
        fieldSlice('banking token', parsed.parts.token || 'not detected', 'Extracted account, routing, BIC, mandate, or statement token.'),
        fieldSlice('masked', maskCompact(normalized), 'Log-safe banking preview.'),
        fieldSlice('official boundary', 'offline only', 'Bank existence, account ownership, beneficiary identity, balance, sanctions, and settlement require bank/provider systems.', 'red')
      ],
      qualityNotes: [
        { title: 'Banking anatomy', text: `${suite.country.name} ${family} inputs are split into routing, branch, account, BIC, mandate, statement, and masking evidence where visible.` },
        { title: 'Browser-only replay', text: 'Shape checks, BIC country comparison, ABA checksum replay when visible, masking, sample comparison, and JSON export run locally.' },
        { title: 'Fixture safety', text: 'Use these values for UI, import, reconciliation, bank-file, and payment fixtures; they are not live bank records.' },
        { title: 'Official boundary', text: 'Account ownership, bank participation, beneficiary match, balance, sanctions screening, and settlement state remain provider/bank checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized banking evidence for fixtures.', 'Use masked previews in tickets and logs.', 'Keep live ownership and settlement checks in bank/provider systems.']
        : ['Compare against the valid sample.', 'Check routing/account length, BIC country, visible separators, and repeated placeholders.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind: parsed.kindLabel,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isLocaleDateCurrencyTool(tool) {
    const id = text(tool && tool.id).toLowerCase();
    const kind = text(tool && tool.kind).toLowerCase();
    const topic = `${id} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (/iban|bank-account|payment|invoice|tax|passport|mrz|vehicle|customs|postal|phone|document|address/.test(id)) return false;
    if (/locale-number|currency-decimal|date-locale|calendar-week|timezone-business-hours|holiday-calendar|number-parser|decimal-formatter|currency-formatter|date-formatter/.test(id)) return true;
    return (kind === 'date' || kind === 'amount' || kind === 'currency') && /locale|currency|decimal|date|calendar|timezone|week|business[- ]?hours/.test(topic);
  }

  function localeDateCurrencyKind(tool) {
    const id = text(tool && tool.id).toLowerCase();
    const topic = `${id} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (/currency|decimal|amount/.test(topic)) return 'Currency / decimal';
    if (/locale-number|number-parser/.test(topic)) return 'Locale number';
    if (/calendar-week|week/.test(topic)) return 'Calendar week';
    if (/timezone|business[- ]?hours|holiday/.test(topic)) return 'Business time';
    return 'Date / locale';
  }

  function extractLocaleNumber(raw) {
    const source = text(raw).replace(/\u00a0/g, ' ');
    const match = source.match(/[+-]?\d[\d .,'\u202f\u00a0]*(?:[,.]\d+)?/);
    return match ? match[0].replace(/\s+/g, ' ').trim() : '';
  }

  function parseLocaleNumber(raw) {
    const token = extractLocaleNumber(raw);
    const cleaned = token.replace(/[\s'\u202f\u00a0]/g, '');
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    let decimal = '';
    if (lastComma > -1 || lastDot > -1) decimal = lastComma > lastDot ? ',' : '.';
    const group = decimal === ',' ? (cleaned.includes('.') ? '.' : '') : decimal === '.' ? (cleaned.includes(',') ? ',' : '') : '';
    let normalized = cleaned;
    if (decimal) {
      if (group) normalized = normalized.replace(new RegExp(`\\${group}`, 'g'), '');
      normalized = normalized.replace(decimal, '.');
    } else {
      normalized = normalized.replace(/[,.]/g, '');
    }
    const numeric = /^[-+]?\d+(?:\.\d+)?$/.test(normalized) ? Number(normalized) : NaN;
    return { token, cleaned, decimal, group, normalized, numeric, ok: token.length > 0 && Number.isFinite(numeric) };
  }

  function extractCurrencyCode(raw) {
    const source = text(raw).toUpperCase();
    const code = source.match(/\b[A-Z]{3}\b/);
    if (code) return code[0];
    const symbol = source.match(/[€$£¥₩₹₽₺₴₦₫₱₪₡₲₵₭₮₸₼]/);
    return symbol ? symbol[0] : '';
  }

  function extractDateParts(raw) {
    const source = text(raw);
    const iso = source.match(/\b(20\d{2}|19\d{2})[-/.](0?[1-9]|1[0-2])[-/.](0?[1-9]|[12]\d|3[01])\b/);
    if (iso) return { token: iso[0], year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]), order: 'YMD' };
    const local = source.match(/\b(0?[1-9]|[12]\d|3[01])[-/.](0?[1-9]|1[0-2])[-/.](20\d{2}|19\d{2})\b/);
    if (local) return { token: local[0], year: Number(local[3]), month: Number(local[2]), day: Number(local[1]), order: 'DMY' };
    const us = source.match(/\b(0?[1-9]|1[0-2])[-/.](0?[1-9]|[12]\d|3[01])[-/.](20\d{2}|19\d{2})\b/);
    if (us) return { token: us[0], year: Number(us[3]), month: Number(us[1]), day: Number(us[2]), order: 'MDY' };
    return { token: '', year: 0, month: 0, day: 0, order: '' };
  }

  function isoWeekNumber(date) {
    const target = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    const day = target.getUTCDay() || 7;
    target.setUTCDate(target.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);
    return { year: target.getUTCFullYear(), week };
  }

  function buildLocaleDateCurrencyParsed(suite, tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const kindLabel = localeDateCurrencyKind(tool);
    const number = parseLocaleNumber(raw);
    const currency = extractCurrencyCode(raw);
    const dateParts = extractDateParts(raw);
    const dateOk = dateParts.token ? isValidDateParts(dateParts.year, dateParts.month, dateParts.day) : false;
    const dateObj = dateOk ? new Date(Date.UTC(dateParts.year, dateParts.month - 1, dateParts.day)) : null;
    const week = dateObj ? isoWeekNumber(dateObj) : null;
    const hasTimezone = /\b(?:UTC|GMT|[A-Z][A-Za-z_]+\/[A-Z][A-Za-z_]+|[+-]\d{2}:?\d{2})\b/.test(raw);
    const hasLocaleWord = /\b(locale|decimal|currency|date|calendar|week|timezone|business|hours|holiday|format|number)\b/i.test(raw);
    const routeShape = compactShape(validSampleValue(tool));
    const repeatedPlaceholder = /^(\d)\1{5,}$/.test(digitsOnly(raw));
    const kindOk = kindLabel === 'Currency / decimal'
      ? number.ok && !!currency
      : kindLabel === 'Locale number'
        ? number.ok
        : kindLabel === 'Calendar week'
          ? dateOk || /\bW(?:0?[1-9]|[1-4]\d|5[0-3])\b/i.test(raw)
          : kindLabel === 'Business time'
            ? dateOk || hasTimezone || /\b(?:09|9|17|5)\b/.test(raw)
            : dateOk;
    const ok = raw.length > 0 && kindOk && !repeatedPlaceholder;
    const domainSlices = [];
    if (kindLabel === 'Currency / decimal') {
      domainSlices.push(
        fieldSlice('amount token', number.token || 'not detected', 'Numeric amount extracted from the current input.', number.ok ? 'green' : 'red'),
        fieldSlice('currency marker', currency || 'not detected', 'ISO currency code or visible currency symbol.'),
        fieldSlice('decimal separator', number.decimal || 'none', 'Detected decimal separator for parser/export fixtures.'),
        fieldSlice('canonical number', number.ok ? number.normalized : 'not detected', 'Machine-safe decimal form using dot as decimal separator.', number.ok ? 'green' : 'red')
      );
    } else if (kindLabel === 'Locale number') {
      domainSlices.push(
        fieldSlice('number token', number.token || 'not detected', 'Localized numeric token extracted from the input.', number.ok ? 'green' : 'red'),
        fieldSlice('group separator', number.group || 'none', 'Detected thousands/grouping separator.'),
        fieldSlice('decimal separator', number.decimal || 'none', 'Detected decimal separator.'),
        fieldSlice('canonical number', number.ok ? number.normalized : 'not detected', 'Machine-safe numeric form for JSON/local JSON.', number.ok ? 'green' : 'red')
      );
    } else if (kindLabel === 'Calendar week') {
      domainSlices.push(
        fieldSlice('date token', dateParts.token || 'not detected', 'Date used for local calendar-week replay.', dateOk ? 'green' : 'red'),
        fieldSlice('parsed order', dateParts.order || 'not detected', 'Detected date component order.'),
        fieldSlice('ISO week replay', week ? `${week.year}-W${String(week.week).padStart(2, '0')}` : 'not available', 'Browser-local ISO week computation when a valid date is visible.', week ? 'green' : 'red'),
        fieldSlice('calendar boundary', 'local only', 'Public holidays and official business calendars require local source/provider data.', 'red')
      );
    } else if (kindLabel === 'Business time') {
      domainSlices.push(
        fieldSlice('date/time token', dateParts.token || (hasTimezone ? 'timezone evidence detected' : 'not detected'), 'Date or timezone evidence for business-hours fixtures.', (dateOk || hasTimezone) ? 'green' : 'red'),
        fieldSlice('timezone evidence', hasTimezone ? 'detected' : 'not detected', 'Timezone offset/name evidence retained for local JSON.'),
        fieldSlice('business-hour hint', (raw.match(/\b\d{1,2}(?::\d{2})?\s*(?:AM|PM)?\b/i) || ['not detected'])[0], 'Visible local time or hour hint.'),
        fieldSlice('holiday boundary', 'not checked', 'Official holidays, DST policy updates, and business closures require source data.', 'red')
      );
    } else {
      domainSlices.push(
        fieldSlice('date token', dateParts.token || 'not detected', 'Date extracted from the current input.', dateOk ? 'green' : 'red'),
        fieldSlice('component order', dateParts.order || 'not detected', 'Detected date component order for parser fixtures.'),
        fieldSlice('ISO date', dateOk ? `${dateParts.year}-${String(dateParts.month).padStart(2, '0')}-${String(dateParts.day).padStart(2, '0')}` : 'not available', 'Machine-safe ISO date export.', dateOk ? 'green' : 'red'),
        fieldSlice('ambiguity note', dateParts.day <= 12 && dateParts.month <= 12 && dateParts.order !== 'YMD' ? 'ambiguous day/month' : 'no obvious day/month ambiguity', 'Flags values that can flip between DMY and MDY.')
      );
    }
    return {
      ok,
      normalized,
      kindLabel,
      parts: { raw, normalized, number, currency, dateParts, week, hasTimezone, routeShape, repeatedPlaceholder },
      slices: domainSlices.concat([
        fieldSlice('route sample shape', routeShape || 'not detected', 'Letter/digit/separator shape inferred from the route success sample.'),
        fieldSlice('locale vocabulary', hasLocaleWord ? 'detected' : 'not detected', 'Local date, calendar, number, currency, or timezone vocabulary.'),
        fieldSlice('masked preview', maskCompact(normalized || raw), 'Log-safe locale payload preview.'),
        fieldSlice('official boundary', 'offline only', 'Legal tender status, exchange rates, holidays, DST policy, and business opening state require current source/provider data.', 'red')
      ]),
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(`${kindLabel} evidence`, kindOk, `${kindLabel} browser-checkable evidence detected.`, `${kindLabel} evidence needs a valid date, number, currency, week, or timezone hint.`),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder numeric value rejected.', 'Repeated numeric placeholders should not pass.'),
        statusCheck('Official boundary', true, 'No exchange-rate, holiday, legal-tender, DST-policy, or opening-hours lookup is made.', 'No official lookup is made.')
      ]
    };
  }

  function buildLocaleDateCurrencyResult(suite, tool, input, baseResult) {
    if (!isLocaleDateCurrencyTool(tool)) return null;
    const parsed = buildLocaleDateCurrencyParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const family = parsed.kindLabel.toLowerCase();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? `${parsed.kindLabel} local evidence verified` : `${parsed.kindLabel} evidence needs review`}`,
      detail: parsed.ok
        ? `${suite.country.name} ${family} evidence was parsed locally with separator/date anatomy, machine-safe exports, ambiguity hints, and official-boundary output.`
        : `${suite.country.name} ${family} needs review; compare date/number/currency tokens, ambiguity, and placeholder guard.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${parsed.kindLabel} locale anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${family} evidence for parser tests, localized forms, import/export fixtures, and local JSON.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Parser-normalized locale value for forms, imports, and fixtures.'),
        fieldSlice('machine number', parsed.parts.number && parsed.parts.number.ok ? parsed.parts.number.normalized : 'not available', 'Canonical number when the input exposes one.'),
        fieldSlice('ISO date/week', parsed.parts.week ? `${parsed.parts.week.year}-W${String(parsed.parts.week.week).padStart(2, '0')}` : parsed.parts.dateParts && parsed.parts.dateParts.token ? parsed.parts.dateParts.token : 'not available', 'Machine-safe date/week hint when visible.'),
        fieldSlice('official boundary', 'offline only', 'Exchange rates, legal tender status, holidays, DST policy, and opening state require current source/provider data.', 'red')
      ],
      qualityNotes: [
        { title: 'Locale anatomy', text: `${suite.country.name} ${family} inputs are split into date, number, separator, currency, week, and timezone evidence where visible.` },
        { title: 'Browser-only replay', text: 'Separator detection, canonical number export, date parsing, ISO week replay, ambiguity flags, masking, and JSON export run locally.' },
        { title: 'Fixture safety', text: 'Use these values for UI, import, CSV, API, accounting, and localization fixtures; they are not live exchange-rate or holiday records.' },
        { title: 'Official boundary', text: 'Exchange rates, legal tender status, holidays, DST policy updates, and live business openings remain source/provider checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized locale evidence for fixtures.', 'Use canonical number/date fields in API tests.', 'Keep source-backed exchange-rate and holiday checks outside this browser parser.']
        : ['Compare against the valid sample.', 'Check separators, date order, currency marker, and repeated placeholders.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind: parsed.kindLabel,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isDeveloperDataWorkflowTool(tool) {
    const id = text(tool && tool.id).toLowerCase();
    const kind = text(tool && tool.kind).toLowerCase();
    if (/iban|bank-account|payment|invoice-number|e-invoic|tax-id|tax-rate|tax-return|vat|eori|passport-mrz|mrz-passport|vehicle|vin|phone|postal|address-normalizer|currency|date-locale|calendar|locale-number/.test(id)) return false;
    if (/csv-locale|json-fixture|api-payload|data-quality|form-field|integration-smoke|regex-pack|personal-data-fixture|accessibility-locale-copy|support-ticket-scrubber|pii-masker|privacy-redaction|document-ocr|slug-normalizer|form-autofill|webhook-local-payload|json-schema|openapi-country|graphql-input|sql-seed|test-case-matrix|data-retention|ecommerce-checkout|shipping-label/.test(id)) return true;
    return ['csv', 'fixture', 'payload', 'dataquality', 'form', 'regex', 'privacy', 'ocr', 'slug', 'accessibility', 'developer'].includes(kind);
  }

  function developerDataWorkflowKind(tool) {
    const id = text(tool && tool.id).toLowerCase();
    const topic = `${id} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (/csv|delimiter|row|header/.test(topic)) return 'CSV / import';
    if (/json-fixture|json-schema|webhook|payload|api|openapi|graphql/.test(topic)) return 'API / JSON payload';
    if (/regex|slug/.test(topic)) return 'Pattern / slug';
    if (/privacy|pii|redaction|scrubber|personal-data|data-retention/.test(topic)) return 'Privacy / redaction';
    if (/ocr|document-ocr/.test(topic)) return 'OCR cleanup';
    if (/form|autofill|accessibility|label/.test(topic)) return 'Form / accessibility';
    if (/sql|seed|test-case|matrix|fixture/.test(topic)) return 'Fixture / test data';
    return 'Data quality';
  }

  function parseJsonLike(raw) {
    const source = text(raw).trim();
    if (!source || !/^[\[{]/.test(source)) return { present: false, ok: false, type: 'text', keys: [], error: '' };
    try {
      const parsed = JSON.parse(source);
      const keys = Array.isArray(parsed)
        ? Object.keys(parsed[0] || {})
        : parsed && typeof parsed === 'object'
          ? Object.keys(parsed)
          : [];
      return { present: true, ok: true, type: Array.isArray(parsed) ? 'array' : typeof parsed, keys: keys.slice(0, 12), error: '', size: source.length };
    } catch (error) {
      const keyMatches = [...source.matchAll(/"([^"]+)"\s*:/g)].map((match) => match[1]);
      return { present: true, ok: false, type: 'invalid json', keys: keyMatches.slice(0, 12), error: shortValue(error && error.message, 80), size: source.length };
    }
  }

  function parseCsvLike(raw) {
    const source = text(raw).trim();
    const lines = source.split(/\r?\n/).filter((line) => line.trim().length);
    const candidates = [',', ';', '\t', '|'];
    let delimiter = '';
    let bestScore = 0;
    candidates.forEach((candidate) => {
      const score = lines.slice(0, 5).reduce((total, line) => total + line.split(candidate).length - 1, 0);
      if (score > bestScore) {
        bestScore = score;
        delimiter = candidate;
      }
    });
    const delimiterLabel = delimiter === '\t' ? 'tab' : delimiter || 'not detected';
    const headers = delimiter && lines[0] ? lines[0].split(delimiter).map((item) => item.trim()).filter(Boolean).slice(0, 12) : [];
    const width = delimiter && lines[0] ? lines[0].split(delimiter).length : 0;
    const rowsOk = !delimiter || lines.slice(1, 12).every((line) => line.split(delimiter).length === width);
    return { present: lines.length > 0, delimiter, delimiterLabel, rows: lines.length, headers, width, rowsOk, sampleLine: lines[0] || '' };
  }

  function extractFieldKeys(raw) {
    const source = text(raw);
    const json = parseJsonLike(source);
    const csv = parseCsvLike(source);
    const labelled = [...source.matchAll(/\b([A-Za-z][A-Za-z0-9_-]{2,32})\s*[:=]/g)].map((match) => match[1]);
    const words = [...source.matchAll(/\b(?:field|key|column|header|label|name)\s+([A-Za-z][A-Za-z0-9_-]{2,32})\b/gi)].map((match) => match[1]);
    return Array.from(new Set([].concat(json.keys || [], csv.headers || [], labelled, words))).slice(0, 12);
  }

  function safeFixtureFor(suite, tool, keys) {
    const base = keys.length ? keys : ['country', 'locale', 'value', 'reference'];
    const fixture = {};
    base.slice(0, 8).forEach((key, index) => {
      const clean = text(key).replace(/[^A-Za-z0-9_]/g, '_') || `field_${index + 1}`;
      fixture[clean] = index === 0 ? suite.country.slug : index === 1 ? currentLocale() : `${tool.code || 'VAL'}_${String(index + 1).padStart(2, '0')}`;
    });
    fixture._fixture = true;
    fixture._officialBoundary = 'offline only';
    return fixture;
  }

  function buildDeveloperDataWorkflowParsed(suite, tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const kindLabel = developerDataWorkflowKind(tool);
    const json = parseJsonLike(raw);
    const csv = parseCsvLike(raw);
    const keys = extractFieldKeys(raw);
    const lineCount = raw ? raw.split(/\r?\n/).length : 0;
    const routeShape = compactShape(validSampleValue(tool));
    const hasDevWord = /\b(csv|json|api|payload|schema|field|form|regex|slug|fixture|test|matrix|privacy|pii|redact|scrub|ocr|label|accessibility|webhook|graphql|openapi|sql)\b/i.test(raw);
    const privacySignals = raw.match(/\b(?:email|phone|name|address|dob|birth|passport|account|token|secret|ssn|id)\b/gi) || [];
    const hasStructure = json.present || csv.delimiter || keys.length > 0 || lineCount > 1 || hasDevWord;
    const repeatedPlaceholder = /^([A-Z0-9])\1{5,}$/i.test(alnumOnly(raw));
    const jsonOk = !json.present || json.ok;
    const csvOk = !csv.delimiter || (csv.headers.length > 0 && csv.rowsOk);
    const regexOk = kindLabel !== 'Pattern / slug' || /[A-Za-z0-9]/.test(raw);
    const privacyOk = kindLabel !== 'Privacy / redaction' || raw.length >= 4;
    const ok = raw.length > 0 && hasStructure && jsonOk && csvOk && regexOk && privacyOk && !repeatedPlaceholder;
    const fixture = safeFixtureFor(suite, tool, keys);
    const domainSlices = [];
    if (kindLabel === 'CSV / import') {
      domainSlices.push(
        fieldSlice('delimiter', csv.delimiterLabel, 'Detected CSV delimiter for import fixtures.', csv.delimiter ? 'green' : 'red'),
        fieldSlice('headers', csv.headers.length ? csv.headers.join(', ') : 'not detected', 'Header columns extracted from the first row.'),
        fieldSlice('row count', String(csv.rows), 'Non-empty CSV-like rows detected.'),
        fieldSlice('row width', csv.width ? `${csv.width} columns / ${csv.rowsOk ? 'consistent' : 'review'}` : 'not available', 'Checks whether sample rows keep the same column count.', csv.rowsOk ? 'green' : 'red')
      );
    } else if (kindLabel === 'API / JSON payload') {
      domainSlices.push(
        fieldSlice('payload type', json.present ? json.type : 'text payload', 'JSON validity/type when the payload is JSON-like.', !json.present || json.ok ? 'green' : 'red'),
        fieldSlice('keys', keys.length ? keys.join(', ') : 'not detected', 'Top-level keys, headers, or labelled fields extracted locally.'),
        fieldSlice('payload size', String(raw.length), 'Character count for fixture/import tests.'),
        fieldSlice('JSON error', json.error || 'none', 'Parser error if JSON-like input is malformed.', json.error ? 'red' : 'green')
      );
    } else if (kindLabel === 'Privacy / redaction') {
      domainSlices.push(
        fieldSlice('sensitive hints', privacySignals.length ? Array.from(new Set(privacySignals.map((item) => item.toLowerCase()))).join(', ') : 'not detected', 'PII/secret-like vocabulary detected for scrubber tests.'),
        fieldSlice('masked preview', maskCompact(normalized), 'Support-safe preview for tickets and logs.'),
        fieldSlice('field keys', keys.length ? keys.join(', ') : 'not detected', 'Fields to include in privacy review fixtures.'),
        fieldSlice('privacy boundary', 'local only', 'Legal basis, retention policy, and production data classification remain governance checks.', 'red')
      );
    } else if (kindLabel === 'Pattern / slug') {
      const slug = normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      domainSlices.push(
        fieldSlice('slug preview', slug || 'not detected', 'ASCII slug generated from the local input.'),
        fieldSlice('pattern tokens', keys.length ? keys.join(', ') : alnumOnly(raw).slice(0, 24) || 'not detected', 'Tokens useful for regex/slug fixtures.'),
        fieldSlice('regex boundary', 'browser syntax only', 'Business acceptance and localization policy are product/source checks.', 'red')
      );
    } else if (kindLabel === 'OCR cleanup') {
      domainSlices.push(
        fieldSlice('line count', String(lineCount), 'OCR/source text line count.'),
        fieldSlice('field candidates', keys.length ? keys.join(', ') : 'not detected', 'Label-like fields detected in OCR text.'),
        fieldSlice('cleanup preview', shortValue(normalized, 90) || 'not detected', 'Whitespace-normalized OCR text.'),
        fieldSlice('authenticity boundary', 'not checked', 'Document authenticity and source image quality require separate review.', 'red')
      );
    } else if (kindLabel === 'Form / accessibility') {
      domainSlices.push(
        fieldSlice('field keys', keys.length ? keys.join(', ') : 'not detected', 'Detected form fields, labels, or keys.'),
        fieldSlice('label evidence', /\blabel|aria|placeholder|required|autocomplete\b/i.test(raw) ? 'detected' : 'not detected', 'Accessibility/form vocabulary detected.'),
        fieldSlice('fixture JSON', JSON.stringify(fixture), 'Safe local field fixture for UI tests.'),
        fieldSlice('accessibility boundary', 'local lint only', 'Assistive-tech behavior still needs browser/device testing.', 'red')
      );
    } else {
      domainSlices.push(
        fieldSlice('field keys', keys.length ? keys.join(', ') : 'not detected', 'Detected local data-quality fields.'),
        fieldSlice('record shape', json.present ? json.type : csv.delimiter ? `CSV ${csv.width || '?'} columns` : `${lineCount} lines`, 'Payload/import shape summary.'),
        fieldSlice('fixture JSON', JSON.stringify(fixture), 'Safe generated fixture for parser/import tests.'),
        fieldSlice('quality boundary', 'local only', 'Completeness, source freshness, and production truth require source systems.', 'red')
      );
    }
    return {
      ok,
      normalized,
      kindLabel,
      parts: { raw, normalized, json, csv, keys, lineCount, routeShape, privacySignals: Array.from(new Set(privacySignals)), fixture, repeatedPlaceholder },
      slices: domainSlices.concat([
        fieldSlice('route sample shape', routeShape || 'not detected', 'Letter/digit/separator shape inferred from the route success sample.'),
        fieldSlice('developer handoff', keys.length ? `${keys.length} keys` : `${lineCount} lines`, 'Compact handoff summary for fixtures and test data.'),
        fieldSlice('masked preview', maskCompact(normalized || raw), 'Log-safe developer payload preview.'),
        fieldSlice('official boundary', 'offline only', 'Source truth, production data classification, legal acceptance, and accessibility conformance need source/provider review.', 'red')
      ]),
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a payload, CSV, field list, or fixture sample.'),
        statusCheck(`${kindLabel} evidence`, hasStructure, 'Developer data structure, keys, rows, payload, or workflow vocabulary detected.', 'Developer data evidence needs keys, rows, JSON, CSV, or workflow vocabulary.'),
        statusCheck('JSON/CSV replay', jsonOk && csvOk, 'JSON/CSV browser replay passed or was not required.', 'JSON parse or CSV row-width evidence needs review.'),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder developer payload rejected.', 'Repeated placeholders should not pass.'),
        statusCheck('Official boundary', true, 'No source truth, legal classification, production retention, or full accessibility audit is claimed.', 'No official lookup is made.')
      ]
    };
  }

  function buildDeveloperDataWorkflowResult(suite, tool, input, baseResult) {
    if (!isDeveloperDataWorkflowTool(tool)) return null;
    const parsed = buildDeveloperDataWorkflowParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const family = parsed.kindLabel.toLowerCase();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? `${parsed.kindLabel} local developer evidence verified` : `${parsed.kindLabel} developer evidence needs review`}`,
      detail: parsed.ok
        ? `${suite.country.name} ${family} evidence was parsed locally with keys, rows, payload shape, safe fixture output, masking, and source-boundary notes.`
        : `${suite.country.name} ${family} needs review; compare keys, JSON/CSV shape, placeholder guard, and privacy/source boundaries.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${parsed.kindLabel} developer anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${family} evidence for imports, fixtures, payload QA, privacy scrubbing, form tests, and developer handoff.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Whitespace-normalized developer payload for fixtures and handoff.'),
        fieldSlice('keys', parsed.parts.keys.length ? parsed.parts.keys.join(', ') : 'not available', 'Extracted fields/headers/keys.'),
        fieldSlice('safe fixture', JSON.stringify(parsed.parts.fixture), 'Generated local fixture with no live identity/status claim.'),
        fieldSlice('official boundary', 'offline only', 'Source truth, data classification, legal acceptance, and full accessibility conformance require source/provider review.', 'red')
      ],
      qualityNotes: [
        { title: 'Developer anatomy', text: `${suite.country.name} ${family} inputs are split into keys, headers, rows, payload type, privacy hints, fixture output, and source-boundary evidence where visible.` },
        { title: 'Browser-only replay', text: 'JSON parsing, CSV delimiter/row checks, key extraction, slug/pattern previews, masking, and fixture JSON generation run locally.' },
        { title: 'Fixture safety', text: 'Generated fixtures are structural developer samples, not real people, companies, addresses, government forms, or production records.' },
        { title: 'Official boundary', text: 'Production source truth, legal classification, retention policy, regulatory acceptance, and accessibility conformance remain source/provider checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy the safe fixture JSON for tests.', 'Use extracted keys to wire import/API assertions.', 'Keep production truth and compliance decisions in source systems.']
        : ['Compare against the valid sample.', 'Fix JSON/CSV shape, add field keys, or use clear fixture vocabulary.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind: parsed.kindLabel,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function isPaymentInvoiceWorkflowTool(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    if (['paymentref', 'payment', 'remittance', 'invoice', 'einvoice', 'procurement'].includes(kind)) return true;
    const haystack = `${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (/iban[- ]?generator|iban[- ]?validator|tax[- ]?rate|tax[- ]?return/.test(haystack)) return false;
    return /\b(payment[- ]?reference|payment[- ]?ref|remittance|invoice|e[- ]?invoice|procurement|purchase[- ]?order|po[- ]?number|tender|rfp|rfq)\b/.test(haystack);
  }

  function paymentInvoiceWorkflowKind(tool) {
    const kind = text(tool && tool.kind).toLowerCase();
    const haystack = `${tool && tool.id || ''} ${tool && tool.name || ''} ${tool && tool.summary || ''}`.toLowerCase();
    if (kind === 'einvoice' || /e[- ]?invoice|peppol|ubl/.test(haystack)) return 'E-invoice';
    if (kind === 'invoice' || /invoice/.test(haystack)) return 'Invoice';
    if (kind === 'remittance' || /remittance/.test(haystack)) return 'Remittance';
    if (kind === 'procurement' || /procurement|purchase[- ]?order|\bpo[- ]?number\b|tender|rfp|rfq/.test(haystack)) return 'Procurement';
    if (kind === 'payment' || kind === 'paymentref' || /payment/.test(haystack)) return 'Payment reference';
    return 'Workflow reference';
  }

  function workflowPayloadType(raw) {
    const source = text(raw).trim();
    if (/^\s*[\[{]/.test(source) || /"[^"]+"\s*:/.test(source)) return 'JSON-like payload';
    if (/<[A-Z][A-Z0-9:_-]*(?:\s|>)/i.test(source)) return 'XML-like payload';
    if (/PEPPOL|UBL|INVOICE/i.test(source)) return 'E-invoice text';
    if (source.includes('\n')) return 'Multi-line text';
    return 'Single-line text';
  }

  function workflowAmountCurrency(raw) {
    const source = text(raw).toUpperCase();
    const match = source.match(/\b(?:[A-Z]{3}\s*)?\d[\d,. ]{1,15}(?:\s*[A-Z]{3})?\b/);
    if (!match) return '';
    const token = match[0].replace(/\s+/g, ' ').trim();
    return /\d/.test(token) ? token : '';
  }

  function workflowDateHint(raw) {
    const source = text(raw);
    const match = source.match(/\b(?:20\d{2}|19\d{2})[-/.](?:0?[1-9]|1[0-2])[-/.](?:0?[1-9]|[12]\d|3[01])\b|\b(?:0?[1-9]|[12]\d|3[01])[-/.](?:0?[1-9]|1[0-2])[-/.](?:20\d{2}|19\d{2})\b/);
    return match ? match[0] : '';
  }

  function workflowPartyHint(raw) {
    const source = text(raw).replace(/\s+/g, ' ').trim();
    const labelled = source.match(/\b(?:buyer|seller|supplier|payer|payee|vendor|customer|beneficiary|account)\s*[:#-]?\s*([A-Z0-9][A-Z0-9 .,&/-]{2,40})/i);
    if (labelled) return labelled[1].trim();
    const iban = source.match(/\b[A-Z]{2}\d{2}[A-Z0-9]{8,30}\b/i);
    if (iban) return iban[0].toUpperCase();
    return '';
  }

  function extractWorkflowReference(raw, kindLabel) {
    const source = text(raw).replace(/^wrong\s+prefix\s+[A-Z]{2}\s+/i, '').replace(/\s+/g, ' ').trim();
    const jsonId = source.match(/["'](?:invoiceNumber|invoiceNo|invoiceId|id|reference|paymentReference|poNumber)["']\s*:\s*["']([^"']{3,40})["']/i);
    if (jsonId) return jsonId[1].trim();
    const xmlId = source.match(/<(?:cbc:)?(?:ID|InvoiceNumber|PaymentID|BuyerReference|OrderReference)[^>]*>([^<]{3,60})</i);
    if (xmlId) return xmlId[1].trim();
    const labelled = source.match(/\b(?:INV|INVOICE|FACT|FAC|RF|PAY|PMT|REM|PO|RFP|RFQ|TENDER|ORDER)\s*[:#-]?\s*([A-Z0-9][A-Z0-9/-]{2,30})\b/i);
    if (labelled) return `${labelled[0]}`.trim();
    const structured = source.match(/\b(?:RF\d{2}[A-Z0-9]{4,25}|INV[- ]?[A-Z0-9]{4,24}|PO[- ]?[A-Z0-9]{4,24}|RFP[- ]?[A-Z0-9]{3,22}|RFQ[- ]?[A-Z0-9]{3,22})\b/i);
    if (structured) return structured[0].toUpperCase();
    const token = source.match(/\b[A-Z]{1,6}[-/]?\d[A-Z0-9/-]{3,28}\b/i);
    if (token) return token[0].toUpperCase();
    const digitToken = source.match(/\b\d{5,24}\b/);
    if (digitToken && kindLabel !== 'E-invoice') return digitToken[0];
    return shortValue(source, 42);
  }

  function buildPaymentInvoiceWorkflowParsed(suite, tool, input) {
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ').trim();
    const kindLabel = paymentInvoiceWorkflowKind(tool);
    const reference = extractWorkflowReference(raw, kindLabel);
    const referenceCompact = alnumOnly(reference);
    const amountCurrency = workflowAmountCurrency(raw);
    const dateHint = workflowDateHint(raw);
    const partyHint = workflowPartyHint(raw);
    const payloadType = workflowPayloadType(raw);
    const lineCount = raw ? raw.split(/\r?\n/).length : 0;
    const routeSample = validSampleValue(tool);
    const routeShape = compactShape(routeSample);
    const currentShape = compactShape(reference || normalized || raw);
    const hasWorkflowWord = /\b(payment|reference|remittance|invoice|factura|rechnung|fatura|po|order|rfp|rfq|tender|supplier|buyer|payee|payer|amount|total|currency|peppol|ubl)\b/i.test(raw);
    const hasPayloadEvidence = /JSON-like|XML-like|E-invoice/.test(payloadType);
    const hasAmountEvidence = !!amountCurrency && /\d/.test(amountCurrency);
    const repeatedPlaceholder = /^([A-Z0-9])\1{5,}$/i.test(referenceCompact);
    const referenceOk = referenceCompact.length >= 4 && referenceCompact.length <= 36 && !repeatedPlaceholder;
    const invoiceOk = !/Invoice|E-invoice/.test(kindLabel) || referenceOk || hasPayloadEvidence || (hasAmountEvidence && hasWorkflowWord);
    const paymentOk = !/Payment|Remittance/.test(kindLabel) || referenceOk || hasAmountEvidence || hasWorkflowWord;
    const procurementOk = kindLabel !== 'Procurement' || /\b(PO|ORDER|RFP|RFQ|TENDER|PROCUREMENT|SUPPLIER|BUYER)\b/i.test(raw) || referenceOk;
    const ok = raw.length > 0 && (referenceOk || hasPayloadEvidence || hasAmountEvidence || hasWorkflowWord) && invoiceOk && paymentOk && procurementOk && !repeatedPlaceholder;
    const domainSlices = [];
    if (kindLabel === 'E-invoice') {
      domainSlices.push(
        fieldSlice('payload type', payloadType, 'Browser-local payload classification for XML/JSON/text e-invoice fixtures.', hasPayloadEvidence || raw.length > 0 ? 'green' : 'red'),
        fieldSlice('invoice/reference id', reference || 'not detected', 'Invoice, buyer reference, order reference, or payment reference extracted from the payload.', referenceOk ? 'green' : 'red'),
        fieldSlice('tax/currency evidence', amountCurrency || 'not detected', 'Amount/currency evidence useful for e-invoice parser fixtures.'),
        fieldSlice('schema boundary', 'not certified', 'Network delivery, Peppol access point, signature, tax clearance, and schema certification remain external.', 'red')
      );
    } else if (kindLabel === 'Invoice') {
      domainSlices.push(
        fieldSlice('invoice reference', reference || 'not detected', 'Invoice number or commercial reference token.'),
        fieldSlice('amount/currency', amountCurrency || 'not detected', 'Total, amount, or currency evidence when visible.'),
        fieldSlice('date hint', dateHint || 'not detected', 'Issue/due date evidence when present.'),
        fieldSlice('fiscal boundary', 'not checked', 'Tax clearance, fiscal validity, buyer/supplier existence, and filing state require official systems.', 'red')
      );
    } else if (kindLabel === 'Remittance') {
      domainSlices.push(
        fieldSlice('remittance reference', reference || 'not detected', 'Reference or purpose token that can travel with the payment.'),
        fieldSlice('purpose text', shortValue(normalized, 80) || 'not detected', 'Human-readable remittance/purpose line retained for handoff.'),
        fieldSlice('amount/currency', amountCurrency || 'not detected', 'Payment amount evidence when visible.'),
        fieldSlice('settlement boundary', 'not checked', 'Bank acceptance, settlement, beneficiary ownership, and sanction screening remain external.', 'red')
      );
    } else if (kindLabel === 'Procurement') {
      domainSlices.push(
        fieldSlice('procurement reference', reference || 'not detected', 'PO, tender, RFP/RFQ, or order reference extracted locally.'),
        fieldSlice('buyer/supplier hint', partyHint || 'not detected', 'Counterparty evidence retained for procurement fixtures.'),
        fieldSlice('amount/currency', amountCurrency || 'not detected', 'Budget, award, or order amount evidence when visible.'),
        fieldSlice('award boundary', 'not checked', 'Tender award, supplier eligibility, and official procurement status remain authority checks.', 'red')
      );
    } else {
      domainSlices.push(
        fieldSlice('payment reference', reference || 'not detected', 'Payment reference token extracted for copy/paste fixtures.'),
        fieldSlice('amount/currency', amountCurrency || 'not detected', 'Amount or ISO-currency evidence when visible.'),
        fieldSlice('party/account hint', partyHint || 'not detected', 'Beneficiary, payer, or account hint kept as handoff context.'),
        fieldSlice('settlement boundary', 'not checked', 'Payment acceptance, account ownership, clearing, and fraud status remain external.', 'red')
      );
    }
    return {
      ok,
      normalized,
      kindLabel,
      parts: {
        raw,
        normalized,
        reference,
        amountCurrency,
        dateHint,
        partyHint,
        payloadType,
        lineCount,
        routeShape,
        currentShape,
        repeatedPlaceholder,
        hasPayloadEvidence,
        hasAmountEvidence
      },
      slices: domainSlices.concat([
        fieldSlice('route sample shape', routeShape || 'not detected', 'Letter/digit shape inferred from the route success sample.'),
        fieldSlice('current shape', currentShape || 'not detected', 'Letter/digit shape for the extracted reference or payload.', referenceOk || hasPayloadEvidence ? 'green' : 'red'),
        fieldSlice('line count', String(lineCount), 'Payload/message line count for import and QA fixtures.'),
        fieldSlice('masked preview', maskCompact(normalized || reference || raw), 'Log-safe workflow preview for tickets and screenshots.'),
        fieldSlice('official boundary', 'offline only', 'Live settlement, invoice clearance, procurement award, and registry status require official/provider systems.', 'red')
      ]),
      checks: [
        statusCheck('Input present', raw.length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        statusCheck(`${kindLabel} evidence`, referenceOk || hasPayloadEvidence || hasAmountEvidence || hasWorkflowWord, 'Reference, payload, amount, or workflow vocabulary detected.', 'Workflow evidence needs a reference, payload, amount, or clear business vocabulary.'),
        statusCheck('Placeholder guard', !repeatedPlaceholder, 'Repeated-placeholder reference rejected.', 'Repeated placeholders should not pass.'),
        statusCheck('Domain replay', invoiceOk && paymentOk && procurementOk, `${kindLabel} browser-checkable workflow replay passed.`, `${kindLabel} workflow evidence needs review.`),
        statusCheck('Official boundary', true, 'No settlement, fiscal clearance, e-invoice delivery, or procurement authority lookup is made.', 'No official lookup is made.')
      ]
    };
  }

  function buildPaymentInvoiceWorkflowResult(suite, tool, input, baseResult) {
    if (!isPaymentInvoiceWorkflowTool(tool)) return null;
    const parsed = buildPaymentInvoiceWorkflowParsed(suite, tool, input);
    const status = parsed.ok ? 'success' : 'review';
    const normalized = parsed.normalized || text(input).trim();
    const family = parsed.kindLabel.toLowerCase();
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? `${parsed.kindLabel} workflow evidence verified` : `${parsed.kindLabel} workflow evidence needs review`}`,
      detail: parsed.ok
        ? `${suite.country.name} ${family} evidence was parsed locally with reference extraction, amount/currency hints, masking, and official-boundary output.`
        : `${suite.country.name} ${family} needs review; compare reference, payload, amount/currency evidence, and placeholder guard.`,
      primary: normalized,
      normalized,
      breakdownTitle: `${parsed.kindLabel} workflow anatomy & evidence breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${family} evidence for payment, invoicing, e-invoice, remittance, and procurement fixtures.`,
      breakdown: parsed.slices,
      checks: parsed.checks,
      fields: [
        fieldSlice('normalized', normalized, 'Parser-normalized workflow text for forms, imports, and fixtures.'),
        fieldSlice('reference', parsed.parts.reference || 'not detected', 'Extracted copy/paste reference token.'),
        fieldSlice('masked', maskCompact(normalized), 'Log-safe preview.'),
        fieldSlice('official boundary', 'offline only', 'Live settlement, tax clearance, e-invoice delivery, and award status require official/provider systems.', 'red')
      ],
      qualityNotes: [
        { title: 'Workflow anatomy', text: `${suite.country.name} ${family} inputs are split into reference, amount/currency, date, party/account, payload, and route-shape evidence when present.` },
        { title: 'Browser-only replay', text: 'Reference extraction, payload classification, masking, sample comparison, and JSON export run locally without bank, tax, or procurement calls.' },
        { title: 'Fixture safety', text: 'Use these values for UI, import, ERP, accounting, payment, and procurement fixtures; they are not live commercial records.' },
        { title: 'Official boundary', text: 'Settlement, account ownership, tax clearance, e-invoice delivery, supplier status, and procurement award state remain official/provider checks.' }
      ],
      suggestions: parsed.ok
        ? ['Copy normalized workflow evidence for fixtures.', 'Use the extracted reference in parser and import tests.', 'Keep masked previews in tickets, logs, and screenshots.']
        : ['Compare against the valid sample.', 'Add a clear reference, amount/currency, payload, or workflow label.', 'Keep this as a negative fixture if the failure is intentional.']
    });
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      kind: parsed.kindLabel,
      normalized,
      masked: maskCompact(normalized),
      routeSample: validSampleValue(tool),
      parts: parsed.parts,
      status: result.status,
      checks: result.checks,
      breakdown: result.breakdown,
      officialBoundary: 'offline only'
    });
    return result;
  }

  function buildProfileResult(suite, tool, input, baseResult) {
    const profile = profileFor(suite);
    if (!profile) return null;
    const kind = text(tool.kind).toLowerCase();
    let parsed = null;
    let label = tool.name;
    const exactParser = profile.parsers && profile.parsers[kind];
    if (exactParser) {
      parsed = exactParser.call(profile.parsers, input);
      label = (profile.kindLabels && profile.kindLabels[kind]) || label;
    } else if ((kind === 'personal' || kind === 'social') && profile.parsePersonal) {
      parsed = profile.parsePersonal.call(profile, input);
      label = profile.personalLabel || label;
    } else if ((kind === 'company' || kind === 'register') && profile.parseCompany) {
      parsed = profile.parseCompany.call(profile, input);
      label = profile.companyLabel || label;
    } else if (kind === 'vat' || kind === 'eori') {
      parsed = buildTaxBusinessParsed(suite, tool, input, profile);
      label = profile.taxLabel || label;
    }
    if (!parsed) return null;
    const status = parsed.ok ? 'success' : 'review';
    const result = Object.assign({}, baseResult, {
      status,
      headline: `${tool.code}: ${parsed.ok ? 'local structure verified' : 'local structure needs review'}`,
      detail: parsed.ok
        ? `${label} parser replayed local structure and control evidence in this browser.`
        : `${label} parser found a shape or control issue; compare with the valid preset.`,
      primary: parsed.normalized || text(input).trim(),
      normalized: parsed.normalized || text(input).trim(),
      breakdownTitle: `${label} field breakdown`,
      breakdownSummary: `Decoded ${suite.country.name} ${label} blocks, local control evidence, and official-boundary notes.`,
      breakdown: parsed.slices,
      checks: [
        statusCheck('Input present', text(input).trim().length > 0, 'Input is available locally.', 'Paste a value or load a sample.'),
        ...asArray(parsed.checks),
        statusCheck('Official boundary', true, 'No official registry, identity, tax, or banking lookup is made.', 'No official lookup is made.')
      ],
      suggestions: parsed.ok
        ? ['Copy the normalized value for fixtures.', 'Use the field breakdown to document parser assumptions.', 'Use official systems for regulated status.']
        : ['Load the valid preset and compare each decoded block.', 'Check digit length, date block, country prefix, and control digit.', 'Do not treat offline review as official rejection.']
    });
    result.fields = [
      fieldSlice('normalized', result.normalized, 'Parser-normalized local value.'),
      fieldSlice('masked', text(result.normalized).length > 8 ? `${text(result.normalized).slice(0, 3)}...${text(result.normalized).slice(-4)}` : `${text(result.normalized).slice(0, 1)}...`, 'Log-safe preview.'),
      fieldSlice('tool', tool.name, tool.category),
      fieldSlice('official boundary', 'offline only', 'Official status requires the responsible local system.')
    ];
    result.developerJson = Object.assign({}, baseResult && baseResult.developerJson, {
      suite: suite.suiteId,
      tool: tool.id,
      country: suite.country.slug,
      status: result.status,
      normalized: result.normalized,
      checks: result.checks,
      breakdown: result.breakdown
    });
    if (parsed.taxParts) {
      result.developerJson.expectedPrefix = parsed.taxParts.expectedPrefix;
      result.developerJson.detectedPrefix = parsed.taxParts.detectedPrefix;
      result.developerJson.kind = parsed.taxParts.kind;
      result.developerJson.masked = maskCompact(result.normalized);
      result.developerJson.officialBoundary = 'offline only';
    }
    return result;
  }

  function buildIbanGeneratorResult(suite, tool, input, intent) {
    const labels = labelsFor(suite);
    const raw = text(input || (tool.samples && tool.samples[0] && tool.samples[0].value) || '').trim();
    const intentionalReview = intent === 'review' || intentionalReviewFixture(raw);
    const wrongPrefixMatch = raw.match(/^wrong\s+prefix\s+([A-Z]{2})\s+(.+)$/i);
    const compact = wrongPrefixMatch ? `ZZ${alnumOnly(wrongPrefixMatch[2])}` : alnumOnly(raw);
    const profile = ibanProfileForSuite(suite);
    const country = countryCodeForSuite(suite, tool, compact);
    const pastedCountry = compact.match(/^[A-Z]{2}/) ? compact.slice(0, 2) : '';
    const routeCountryOk = !profile || !pastedCountry || pastedCountry === country;
    let bban = compact;
    if (country && bban.startsWith(country)) {
      bban = /^\d{2}/.test(bban.slice(2, 4)) ? bban.slice(4) : bban.slice(2);
    }
    const generated = generateIban(country, bban);
    const present = bban.length >= 4 && /^[A-Z]{2}$/.test(country);
    const lengthOk = profile ? generated.iban.length === profile.length : generated.iban.length >= 15 && generated.iban.length <= 34;
    const valid = present && routeCountryOk && lengthOk && generated.remainder === 1 && !intentionalReview;
    const grouped = groupIban(generated.iban);
    const masked = maskIban(generated.iban);
    const profileSlices = ibanProfileSlices(generated.iban, profile);
    return {
      status: valid ? 'success' : 'review',
      headline: valid ? `${labels.ibanGenerator}: ${labels.offlinePassed}` : `${labels.ibanGenerator}: ${labels.reviewNeeded}`,
      detail: valid ? `${suite.country.name} IBAN check digits were generated locally from route-locked BBAN/account evidence.` : 'Review the route country, expected length, BBAN body, or selected sample intent.',
      primary: grouped,
      normalized: generated.iban,
      checks: [
        statusCheck('Route country', /^[A-Z]{2}$/.test(country) && routeCountryOk, profile ? `${country} route country locked to ${suite.country.name}.` : `${country} country prefix ready.`, pastedCountry ? `${pastedCountry} does not match expected ${country}.` : 'Expected a two-letter ISO country code.'),
        statusCheck('BBAN/account body', bban.length >= 4, `${bban.length} BBAN characters detected.`, 'Provide the local account body after the country/check digits.'),
        statusCheck('Country IBAN length', lengthOk, profile ? `${generated.iban.length}/${profile.length} characters for ${country}.` : `${generated.iban.length} characters.`, profile ? `Expected ${profile.length} characters for ${country}; got ${generated.iban.length}.` : 'Expected a normal IBAN length.'),
        statusCheck('Check digits', generated.checkDigits.length === 2, `Generated ${generated.checkDigits}.`, 'Could not generate check digits.'),
        statusCheck('MOD-97 verification', generated.remainder === 1, 'Generated IBAN verifies to remainder 1.', `Generated remainder is ${generated.remainder}.`),
        statusCheck('Sample intent', !intentionalReview, 'Normal generate/inspect path.', 'Intentional review fixture preserved for debugging.')
      ],
      fields: [
        fieldSlice(labels.generatedIban, grouped, 'Copy-ready grouped display.', valid ? 'green' : 'red'),
        fieldSlice(labels.mod97CheckDigits, generated.checkDigits, 'ISO 13616 check digits computed locally.'),
        fieldSlice(labels.bbanBody, generated.bban, 'Local account body used before country/check digits.'),
        fieldSlice('Masked display', masked, 'Log-safe generated preview.')
      ],
      breakdownTitle: `${tool.name} field breakdown`,
      breakdownSummary: profile ? `Generated ${suite.country.name} IBAN slices for payment fixtures, parser tests, and MOD-97 debugging.` : 'Generated IBAN slices for payment fixtures, parser tests, and MOD-97 debugging.',
      breakdown: [
        fieldSlice('country prefix', generated.country, 'Two-letter ISO country prefix.'),
        fieldSlice('generated check digits', generated.checkDigits, '98 - MOD-97(BBAN + country + 00).', valid ? 'green' : 'red'),
        fieldSlice('BBAN/account body', generated.bban, 'Country-specific account body supplied by the user.'),
        fieldSlice('expected route length', profile ? String(profile.length) : '15-34', profile ? `${suite.country.name} IBAN profile length.` : 'Generic IBAN length range.', lengthOk ? 'green' : 'red'),
        fieldSlice('MOD-97 remainder', String(generated.remainder), 'A valid generated IBAN has remainder 1.', generated.remainder === 1 ? 'green' : 'red'),
        fieldSlice('official boundary', 'offline only', 'Generated values are structural fixtures, not live account ownership proof.', 'red')
      ].concat(profileSlices),
      qualityNotes: asArray(tool.qualityNotes).length ? tool.qualityNotes : [
        { title: 'Fixture only', text: 'Generated IBANs are structural fixtures unless your app binds them to real account data.' },
        { title: 'No lookup', text: 'Bank existence, account ownership, and payment acceptance are never proven in this browser.' },
        { title: 'Debug value', text: 'Use generated values for parser tests, UI fixtures, and MOD-97 debugging.' },
        { title: 'Privacy', text: 'Prefer masked generated examples in logs and support screenshots.' }
      ],
      suggestions: valid ? ['Copy the generated IBAN into test fixtures.', 'Use the paired country IBAN validator to verify downstream parsing.'] : ['Paste a BBAN/account body or full IBAN-like value.', 'Check country prefix and BBAN length.'],
      developerJson: {
        suite: suite.suiteId,
        tool: tool.id,
        country,
        expectedCountry: profile ? profile.code : null,
        expectedLength: profile ? profile.length : null,
        bban,
        checkDigits: generated.checkDigits,
        iban: generated.iban,
        grouped,
        masked,
        mod97: generated.remainder,
        routeCountryOk,
        lengthOk,
        fieldSlices: profileSlices,
        generatedLocally: true,
        officialBoundary: 'offline only'
      }
    };
  }

  function isWeakFactoryResult(result) {
    const breakdownText = asArray(result && result.breakdown)
      .map((part) => `${part.label || ''} ${part.value || ''} ${part.note || part.detail || ''}`)
      .join(' ')
      .toLowerCase();
    return breakdownText.includes('identifier evidence') || breakdownText.includes('tax evidence') || breakdownText.includes('payment evidence') || breakdownText.includes('workflow');
  }

  function enhanceAnalyzerResult(suite, tool, input, result, context) {
    const intent = context && context.sampleIntent;
    if (tool.kind === 'ibangenerator' || /iban-generator/i.test(`${tool.id} ${tool.name}`)) {
      return withToolSpecificContext(suite, tool, buildIbanGeneratorResult(suite, tool, input, intent));
    }
    const profileResult = buildProfileResult(suite, tool, input, result);
    if (profileResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, profileResult), intent);
    const bankAccountWorkflowResult = buildBankAccountWorkflowResult(suite, tool, input, result);
    if (bankAccountWorkflowResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, bankAccountWorkflowResult), intent);
    const localeDateCurrencyResult = buildLocaleDateCurrencyResult(suite, tool, input, result);
    if (localeDateCurrencyResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, localeDateCurrencyResult), intent);
    const developerDataWorkflowResult = buildDeveloperDataWorkflowResult(suite, tool, input, result);
    if (developerDataWorkflowResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, developerDataWorkflowResult), intent);
    const documentVehicleReferenceResult = buildDocumentVehicleReferenceResult(suite, tool, input, result);
    if (documentVehicleReferenceResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, documentVehicleReferenceResult), intent);
    const paymentInvoiceWorkflowResult = buildPaymentInvoiceWorkflowResult(suite, tool, input, result);
    if (paymentInvoiceWorkflowResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, paymentInvoiceWorkflowResult), intent);
    const taxBusinessResult = buildTaxBusinessResult(suite, tool, input, result, profileFor(suite));
    if (taxBusinessResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, taxBusinessResult), intent);
    const contactAddressResult = buildContactAddressResult(suite, tool, input, result);
    if (contactAddressResult) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, contactAddressResult), intent);
    if (!isWeakFactoryResult(result)) return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, result), intent);
    const raw = text(input).trim();
    const normalized = raw.replace(/\s+/g, ' ');
    const localTerms = [tool.code, tool.name, suite.country.name].filter(Boolean).join(' / ');
    const enhanced = Object.assign({}, result, {
      breakdownTitle: `${tool.name} evidence breakdown`,
      breakdownSummary: `Detected ${suite.country.name} parser evidence groups for debugging and handoff.`,
      breakdown: [
        fieldSlice('source payload', shortValue(normalized, 120), 'Browser-local source value.'),
        fieldSlice('local vocabulary', localTerms, 'Country/tool-specific labels used for this workflow.'),
        fieldSlice('line count', String(raw ? raw.split(/\r?\n/).length : 0), 'Parser input shape.'),
        fieldSlice('official boundary', 'offline only', 'Live status remains outside this browser workbench.', 'red')
      ]
    });
    return forceIntentionalReview(suite, tool, input, withToolSpecificContext(suite, tool, enhanced), intent);
  }

  function normalizeResult(tool, result) {
    const next = result || defaultAnalyze(tool, '');
    next.status = next.status === 'success' ? 'success' : 'review';
    next.headline = firstNonEmpty([next.headline], tool.name);
    next.detail = firstNonEmpty([next.detail], 'Local browser analysis completed.');
    next.primary = firstNonEmpty([next.primary, next.normalized], '');
    next.normalized = firstNonEmpty([next.normalized, next.primary], '');
    next.checks = asArray(next.checks);
    next.fields = asArray(next.fields);
    next.breakdown = asArray(next.breakdown);
    next.qualityNotes = asArray(next.qualityNotes).length ? next.qualityNotes : tool.qualityNotes;
    next.suggestions = asArray(next.suggestions);
    next.developerJson = next.developerJson || { tool: tool.id, status: next.status, normalized: next.normalized };
    return next;
  }

  function injectStyles() {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .csf-shell {
        --csf-accent: #0f766e;
        --csf-accent-2: #2563eb;
        --csf-accent-3: #f59e0b;
        --csf-success: #047857;
        --csf-success-2: #0891b2;
        --csf-review: #dc2626;
        --csf-review-soft: #fef2f2;
        --csf-line: #d8e2ef;
        --csf-ink: #0f172a;
        --csf-muted: #64748b;
        color: var(--csf-ink);
      }
      .csf-copy-toast {
        position: fixed;
        top: var(--csf-toast-top, 1rem);
        left: var(--csf-toast-left, 50%);
        z-index: 9999;
        border: 2px solid color-mix(in srgb, var(--csf-success) 42%, var(--csf-line));
        border-radius: 999px;
        background: linear-gradient(135deg, #fff, color-mix(in srgb, var(--csf-success) 10%, #fff));
        color: #065f46;
        padding: .78rem 1.2rem;
        font-size: .92rem;
        font-weight: 950;
        box-shadow: 0 22px 64px rgba(15, 23, 42, .24);
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, calc(-100% - .55rem)) scale(.98);
        transition: opacity .18s ease, transform .18s ease;
      }
      .csf-copy-toast.is-visible {
        opacity: 1;
        transform: translate(-50%, calc(-100% - .78rem)) scale(1);
      }
      .workbench-card.csf-shell {
        padding: clamp(1rem, 2vw, 1.35rem);
        width: 100%;
      }
      .csf-shell * { box-sizing: border-box; }
      .csf-hero,
      .csf-context,
      .csf-panel,
      .csf-result-card,
      .csf-quality,
      .csf-advanced,
      .csf-mini,
      .csf-step,
      .csf-segment,
      .csf-primary,
      .csf-samples,
      .csf-input,
      .csf-iban-fixture-bar,
      .csf-tax-business-bar,
      .csf-contact-address-bar,
      .csf-document-reference-bar,
      .csf-bank-account-bar,
      .csf-locale-format-bar,
      .csf-developer-data-bar,
      .csf-payment-workflow-bar,
      .csf-textarea {
        min-width: 0;
        max-width: 100%;
      }
      .csf-hero {
        border: 1px solid var(--csf-line);
        border-top: 4px solid var(--csf-accent);
        border-radius: .95rem;
        background:
          linear-gradient(125deg, color-mix(in srgb, var(--csf-accent) 9%, #fff), #fff 46%, color-mix(in srgb, var(--csf-accent-2) 7%, #fff));
        padding: 1rem 1.25rem 1.1rem;
        margin: .9rem 0 1.05rem;
        box-shadow: 0 18px 44px rgba(15, 23, 42, .065);
      }
      .csf-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 1.25rem;
        align-items: center;
      }
      .csf-kicker,
      .csf-label,
      .csf-step span,
      .csf-segment span {
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .13em;
        text-transform: uppercase;
      }
      .csf-mark {
        display: flex;
        width: 3.25rem;
        height: 3.25rem;
        align-items: center;
        justify-content: center;
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 25%, var(--csf-line));
        border-left: 5px solid var(--csf-accent);
        border-right: 5px solid var(--csf-accent-2);
        border-radius: .68rem;
        background: #fff;
        font-size: .95rem;
        font-weight: 950;
        margin: .45rem 0 .38rem;
      }
      .csf-title {
        margin: .05rem 0;
        font-size: clamp(1.32rem, 1.75vw, 1.68rem);
        line-height: 1.16;
        letter-spacing: 0;
      }
      .csf-summary {
        max-width: 44rem;
        margin: .35rem 0 0;
        color: var(--csf-muted);
        font-size: .88rem;
        line-height: 1.42;
      }
      .csf-chips {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
        margin-top: .7rem;
      }
      .csf-chip,
      .csf-pill {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        padding: .28rem .58rem;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 850;
      }
      .csf-pill[data-state="success"] {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 8%, #fff);
        color: var(--csf-success);
      }
      .csf-pill[data-state="review"] {
        border-color: #fecaca;
        background: var(--csf-review-soft);
        color: var(--csf-review);
      }
      .csf-context {
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 22%, var(--csf-line));
        border-radius: .95rem;
        background:
          linear-gradient(120deg, #fff, color-mix(in srgb, var(--csf-accent) 5%, #fff) 52%, color-mix(in srgb, var(--csf-accent-2) 6%, #fff));
        padding: clamp(.95rem, 1.7vw, 1.25rem);
        margin: 0 0 1.05rem;
        box-shadow: 0 14px 34px rgba(15, 23, 42, .052);
      }
      .csf-context-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(18rem, .95fr);
        gap: 1rem;
        align-items: start;
      }
      .csf-context h3 {
        margin: .14rem 0 .38rem;
        font-size: clamp(1.02rem, 1.25vw, 1.2rem);
        line-height: 1.18;
        letter-spacing: 0;
      }
      .csf-context p {
        margin: 0;
        color: var(--csf-muted);
        font-size: .86rem;
        line-height: 1.5;
      }
      .csf-context-cards {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: .62rem;
      }
      .csf-context-card {
        min-width: 0;
        border: 1px solid var(--csf-line);
        border-radius: .75rem;
        background: rgba(255, 255, 255, .78);
        padding: .72rem .78rem;
      }
      .csf-context-card strong {
        display: block;
        margin-top: .28rem;
        color: var(--csf-ink);
        font-size: .78rem;
        line-height: 1.28;
      }
      .csf-samples span {
        display: block;
        margin-bottom: .42rem;
        font-size: .98rem;
        font-weight: 900;
      }
      .csf-related-links {
        display: flex;
        flex-wrap: wrap;
        gap: .42rem;
      }
      .csf-related-links a {
        display: inline-flex;
        max-width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: rgba(255, 255, 255, .9);
        color: var(--csf-ink);
        padding: .34rem .58rem;
        font-size: .76rem;
        font-weight: 850;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .csf-related-links a,
      .csf-sample-button,
      .csf-button,
      .csf-rich-tab,
      .csf-suggestion {
        transition: box-shadow .16s ease, border-color .16s ease, background-color .16s ease, color .16s ease;
      }
      .csf-related-links a:hover,
      .csf-sample-button:hover,
      .csf-button:hover,
      .csf-rich-tab:hover,
      .csf-suggestion:hover {
        border-color: color-mix(in srgb, var(--csf-accent) 46%, var(--csf-line));
        box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--csf-accent) 22%, transparent), 0 9px 20px rgba(15, 23, 42, .08);
      }
      .csf-related-links a:focus-visible,
      .csf-sample-button:focus-visible,
      .csf-button:focus-visible,
      .csf-rich-tab:focus-visible,
      .csf-suggestion:focus-visible {
        outline: 3px solid color-mix(in srgb, var(--csf-accent-2) 34%, transparent);
        outline-offset: 3px;
      }
      .csf-sample-button:active,
      .csf-button:active,
      .csf-rich-tab:active,
      .csf-suggestion:active {
        box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--csf-accent) 28%, transparent);
      }
      .csf-iban-fixture-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-tax-business-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-contact-address-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-document-reference-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-payment-workflow-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-bank-account-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-locale-format-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-developer-data-bar {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 12.5rem), 1fr));
        gap: .62rem;
        margin: .18rem 0 .9rem;
        width: 100%;
      }
      .csf-iban-fixture-bar article,
      .csf-tax-business-bar article,
      .csf-contact-address-bar article,
      .csf-document-reference-bar article,
      .csf-bank-account-bar article,
      .csf-locale-format-bar article,
      .csf-developer-data-bar article,
      .csf-payment-workflow-bar article {
        min-width: 0;
        max-width: 100%;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 22%, var(--csf-line));
        border-radius: .78rem;
        background: linear-gradient(180deg, #fff, color-mix(in srgb, var(--csf-accent) 6%, #fff));
        padding: .72rem .82rem;
        overflow-wrap: anywhere;
      }
      .csf-iban-fixture-bar span,
      .csf-tax-business-bar span,
      .csf-contact-address-bar span,
      .csf-document-reference-bar span,
      .csf-bank-account-bar span,
      .csf-locale-format-bar span,
      .csf-developer-data-bar span,
      .csf-payment-workflow-bar span {
        display: block;
        color: var(--csf-muted);
        font-size: .66rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .csf-iban-fixture-bar strong,
      .csf-tax-business-bar strong,
      .csf-contact-address-bar strong,
      .csf-document-reference-bar strong,
      .csf-bank-account-bar strong,
      .csf-locale-format-bar strong,
      .csf-developer-data-bar strong,
      .csf-payment-workflow-bar strong {
        display: block;
        margin-top: .26rem;
        color: var(--csf-ink);
        font-size: .98rem;
        line-height: 1.22;
        overflow-wrap: anywhere;
        word-break: normal;
      }
      .csf-iban-fixture-bar small,
      .csf-tax-business-bar small,
      .csf-contact-address-bar small,
      .csf-document-reference-bar small,
      .csf-bank-account-bar small,
      .csf-locale-format-bar small,
      .csf-developer-data-bar small,
      .csf-payment-workflow-bar small {
        display: block;
        margin-top: .2rem;
        color: var(--csf-muted);
        font-size: .76rem;
        line-height: 1.35;
        overflow-wrap: anywhere;
        word-break: normal;
      }
      .csf-iban-instant-result {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .75rem;
        margin: .72rem 0 .58rem;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 30%, var(--csf-line));
        border-radius: .82rem;
        background: linear-gradient(135deg, color-mix(in srgb, var(--csf-accent) 9%, #fff), #fff 60%);
        padding: .72rem .82rem;
      }
      .csf-iban-instant-result[hidden],
      .csf-iban-batch-output[hidden] {
        display: none;
      }
      .csf-iban-instant-result div {
        min-width: 0;
        display: grid;
        gap: .18rem;
      }
      .csf-iban-instant-result span,
      .csf-iban-batch-tools label span {
        color: var(--csf-muted);
        font-size: .66rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .csf-iban-instant-result strong {
        color: var(--csf-ink);
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        font-size: clamp(1rem, 1.25vw, 1.16rem);
        line-height: 1.15;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .csf-iban-instant-result small {
        color: var(--csf-muted);
        font-size: .76rem;
        font-weight: 750;
      }
      .csf-iban-batch-tools {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        gap: .52rem;
        margin: .42rem 0 .72rem;
      }
      .csf-iban-batch-tools label {
        display: grid;
        gap: .24rem;
      }
      .csf-iban-batch-tools select {
        min-height: 2.35rem;
        border: 1px solid var(--csf-line);
        border-radius: .64rem;
        background: #fff;
        padding: 0 1.8rem 0 .68rem;
        color: var(--csf-ink);
        font: 850 .82rem/1 var(--csf-font);
      }
      .csf-iban-batch-output {
        width: 100%;
        min-height: 8.5rem;
        margin: .2rem 0 .72rem;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 24%, var(--csf-line));
        border-radius: .78rem;
        background: #fff;
        padding: .72rem .82rem;
        color: var(--csf-ink);
        font: 760 .88rem/1.55 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        resize: vertical;
      }
      .csf-presets-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: .72rem;
      }
      .csf-presets-grid label {
        min-width: 0;
      }
      .csf-presets-grid span {
        display: block;
        margin-bottom: .32rem;
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      .csf-select,
      .csf-textarea {
        width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: .75rem;
        background: #fff;
        padding: .72rem .85rem;
        color: var(--csf-ink);
        font: inherit;
        font-size: .92rem;
        font-weight: 760;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .csf-textarea {
        min-height: 8.25rem;
        resize: vertical;
      }
      .csf-sample-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: .45rem;
      }
      .csf-sample-button {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        padding: .42rem .68rem;
        font-size: .82rem;
        font-weight: 900;
        cursor: pointer;
      }
      .csf-sample-button[data-tone="success"] {
        border-color: color-mix(in srgb, var(--csf-success) 26%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 7%, #fff);
        color: var(--csf-success);
      }
      .csf-sample-button[data-tone="review"] {
        border-color: color-mix(in srgb, #b45309 22%, var(--csf-line));
        background: #fffbeb;
        color: #92400e;
      }
      .csf-input {
        width: 100%;
        padding: 1.05rem 0;
      }
      .csf-input-iban-generator .csf-textarea {
        min-height: 6.25rem;
        font-family: "SFMono-Regular", ui-monospace, Menlo, Consolas, monospace;
        font-size: .98rem;
        line-height: 1.55;
        letter-spacing: 0;
      }
      .csf-batch {
        margin-top: .9rem;
        border: 1px solid var(--csf-line);
        border-radius: .9rem;
        background: #fff;
        overflow: hidden;
      }
      .csf-batch summary {
        padding: .78rem .9rem;
        color: var(--csf-ink);
        font-size: .9rem;
        font-weight: 950;
        cursor: pointer;
      }
      .csf-batch-body {
        border-top: 1px solid var(--csf-line);
        padding: .9rem;
      }
      .csf-batch textarea {
        min-height: 5.5rem;
      }
      .csf-batch-results {
        display: grid;
        gap: .5rem;
        margin-top: .72rem;
      }
      .csf-batch-item {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: .7rem;
        align-items: center;
        border: 1px solid var(--csf-line);
        border-radius: .68rem;
        padding: .58rem .7rem;
        background: #f8fafc;
        font-size: .82rem;
        font-weight: 800;
      }
      .csf-batch-item.is-success {
        border-color: color-mix(in srgb, var(--csf-success) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 6%, #fff);
      }
      .csf-batch-item.is-review {
        border-color: #fecaca;
        background: var(--csf-review-soft);
      }
      .csf-rich-lab {
        border: 1px solid color-mix(in srgb, var(--csf-accent) 22%, var(--csf-line));
        border-radius: .95rem;
        background: linear-gradient(135deg, #fff, color-mix(in srgb, var(--csf-accent) 7%, #fff), color-mix(in srgb, var(--csf-accent-2) 5%, #fff));
        padding: .78rem .9rem;
        margin: 0 0 1.05rem;
        box-shadow: 0 18px 42px rgba(15, 23, 42, .045);
      }
      .csf-rich-lab summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .9rem;
        cursor: pointer;
        list-style: none;
      }
      .csf-rich-lab summary::-webkit-details-marker {
        display: none;
      }
      .csf-rich-summary-title {
        display: grid;
        gap: .18rem;
        min-width: 0;
      }
      .csf-rich-summary-title strong {
        font-size: .95rem;
        line-height: 1.2;
      }
      .csf-rich-summary-title small {
        color: var(--csf-muted);
        font-size: .78rem;
        font-weight: 720;
        line-height: 1.35;
      }
      .csf-rich-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: .9rem;
        padding: .75rem 0;
        border-bottom: 1px solid color-mix(in srgb, var(--csf-accent) 16%, var(--csf-line));
      }
      .csf-rich-head h3 {
        margin: .18rem 0 0;
        font-size: 1.02rem;
        line-height: 1.22;
      }
      .csf-rich-head p {
        margin: .25rem 0 0;
        color: var(--csf-muted);
        font-size: .84rem;
        line-height: 1.45;
        font-weight: 720;
      }
      .csf-rich-badge {
        flex: 0 0 auto;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 32%, var(--csf-line));
        border-radius: 999px;
        background: #fff;
        color: var(--csf-accent);
        font-size: .78rem;
        font-weight: 950;
        padding: .42rem .66rem;
      }
      .csf-rich-grid {
        display: grid;
        grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
        gap: .75rem;
        margin-top: .75rem;
      }
      .csf-rich-card {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        background: rgba(255, 255, 255, .9);
        padding: .68rem;
        min-width: 0;
      }
      .csf-rich-card .csf-textarea {
        min-height: 4.8rem;
      }
      .csf-rich-card h4 {
        margin: .2rem 0 .55rem;
        font-size: .9rem;
      }
      .csf-rich-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        margin: .85rem 0 .65rem;
      }
      .csf-rich-tab {
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 900;
        padding: .45rem .66rem;
        cursor: pointer;
      }
      .csf-rich-tab[aria-selected="true"] {
        border-color: color-mix(in srgb, var(--csf-accent) 42%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-accent) 10%, #fff);
        color: var(--csf-accent);
      }
      .csf-rich-panel[hidden] {
        display: none;
      }
      .csf-rich-output {
        display: grid;
        gap: .5rem;
        max-height: 16rem;
        overflow: auto;
      }
      .csf-rich-line {
        display: grid;
        grid-template-columns: 2.4rem minmax(0, 1fr) 4.9rem minmax(0, .72fr);
        gap: .5rem;
        align-items: center;
        border: 1px solid var(--csf-line);
        border-radius: .68rem;
        background: #fff;
        padding: .5rem .6rem;
        font-size: .8rem;
        font-weight: 800;
      }
      .csf-rich-line code,
      .csf-rich-line span {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .csf-rich-pass {
        color: var(--csf-success);
        font-weight: 950;
      }
      .csf-rich-review {
        color: #b45309;
        font-weight: 950;
      }
      .csf-rich-code {
        margin: 0;
        border-radius: .78rem;
        background: #111827;
        color: #dbeafe;
        padding: .85rem;
        overflow: auto;
        max-height: 22rem;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 650 .78rem/1.55 ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .csf-rich-related {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
      }
      .csf-rich-related a {
        display: inline-flex;
        align-items: center;
        max-width: 100%;
        border: 1px solid var(--csf-line);
        border-radius: 999px;
        background: #fff;
        color: var(--csf-ink);
        font-size: .78rem;
        font-weight: 850;
        padding: .42rem .62rem;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .csf-row,
      .csf-actions,
      .csf-section-head,
      .csf-result-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .8rem;
        flex-wrap: wrap;
      }
      .csf-row h2 {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.2;
      }
      .csf-actions {
        justify-content: flex-start;
        margin-top: .85rem;
      }
      .csf-button {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        background: #fff;
        padding: .68rem .9rem;
        color: var(--csf-ink);
        font-size: .9rem;
        font-weight: 900;
        cursor: pointer;
      }
      .csf-button-primary {
        background: var(--csf-success);
        border-color: var(--csf-success);
        color: #fff;
        box-shadow: 0 10px 24px color-mix(in srgb, var(--csf-success) 22%, transparent);
      }
      .csf-button-ghost {
        border: 0;
        color: var(--csf-muted);
      }
      .csf-button-primary:hover {
        background: color-mix(in srgb, var(--csf-success) 88%, #000);
        border-color: color-mix(in srgb, var(--csf-success) 88%, #000);
      }
      .csf-results {
        display: grid;
        gap: 1rem;
      }
      .csf-panel,
      .csf-result-card,
      .csf-quality {
        border: 1px solid var(--csf-line);
        border-radius: .95rem;
        background: #fff;
        padding: 1.15rem;
        box-shadow: 0 20px 50px rgba(15, 23, 42, .06);
      }
      .csf-result-card.is-success {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: linear-gradient(125deg, color-mix(in srgb, var(--csf-success) 8%, #fff), #fff 50%, color-mix(in srgb, var(--csf-success-2) 5%, #fff));
      }
      .csf-result-card.is-review {
        border-color: #fecaca;
        background: linear-gradient(125deg, color-mix(in srgb, var(--csf-review) 7%, #fff), #fff 54%, color-mix(in srgb, var(--csf-accent-2) 5%, #fff));
      }
      .csf-status {
        display: grid;
        place-items: center;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: .78rem;
        background: color-mix(in srgb, var(--csf-success) 12%, #fff);
        color: var(--csf-success);
        font-size: 1.55rem;
        font-weight: 950;
      }
      .is-review .csf-status {
        background: color-mix(in srgb, var(--csf-review) 10%, #fff);
        color: var(--csf-review);
      }
      .csf-headline {
        margin: 0;
        font-size: 1.3rem;
      }
      .csf-detail {
        margin: .2rem 0 0;
        color: var(--csf-muted);
        font-size: .92rem;
        font-weight: 750;
      }
      .csf-primary {
        margin: .95rem 0;
        padding: .82rem;
        border: 1px solid var(--csf-line);
        border-radius: .75rem;
        background: #f8fafc;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: .95rem;
        font-weight: 900;
        overflow: auto;
        overflow-wrap: anywhere;
        white-space: pre-wrap;
      }
      .csf-grid,
      .csf-pipeline {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
        gap: .72rem;
        margin: .8rem 0;
      }
      .csf-mini,
      .csf-step {
        border: 1px solid var(--csf-line);
        border-radius: .78rem;
        padding: .82rem;
        background: #fff;
        min-width: 0;
        overflow: hidden;
      }
      .csf-step.is-pass {
        border-color: color-mix(in srgb, var(--csf-success) 28%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 7%, #fff);
      }
      .csf-step.is-review {
        border-color: #fecaca;
        background: var(--csf-review-soft);
      }
      .csf-mini strong,
      .csf-step strong,
      .csf-segment strong {
        display: block;
        margin: .28rem 0;
        color: var(--csf-ink);
        font-size: .98rem;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .csf-mini small,
      .csf-note,
      .csf-step small {
        display: block;
        color: var(--csf-muted);
        font-size: .82rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }
      .csf-bar {
        height: .36rem;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--csf-success), var(--csf-success-2), var(--csf-accent-2));
        margin: .82rem 0 1rem;
      }
      .csf-panel.is-review .csf-bar {
        background: linear-gradient(90deg, var(--csf-review), var(--csf-accent-3), var(--csf-accent-2));
      }
      .csf-panel.is-success .csf-bar {
        background: linear-gradient(90deg, var(--csf-success), var(--csf-success-2), color-mix(in srgb, var(--csf-success) 55%, var(--csf-accent-2)));
      }
      .csf-section-head {
        justify-content: flex-start;
        margin-bottom: .8rem;
      }
      .csf-section-head h3 {
        margin: 0;
        font-size: .94rem;
        letter-spacing: .11em;
        text-transform: uppercase;
      }
      .csf-section-head p {
        margin: .2rem 0 0;
        color: var(--csf-muted);
        font-size: .9rem;
        font-weight: 700;
      }
      .csf-icon {
        display: grid;
        place-items: center;
        min-width: 3.1rem;
        height: 3.1rem;
        border: 1px solid color-mix(in srgb, var(--csf-accent) 24%, var(--csf-line));
        border-radius: .72rem;
        background: color-mix(in srgb, var(--csf-accent) 9%, #fff);
        color: var(--csf-accent);
        font-weight: 950;
      }
      .csf-panel.is-success .csf-icon {
        border-color: color-mix(in srgb, var(--csf-success) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-success) 9%, #fff);
        color: var(--csf-success);
      }
      .csf-panel.is-review .csf-icon {
        border-color: color-mix(in srgb, var(--csf-review) 24%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-review) 9%, #fff);
        color: var(--csf-review);
      }
      .csf-traps {
        padding: .95rem 1rem;
        box-shadow: 0 12px 28px rgba(15, 23, 42, .045);
      }
      .csf-traps .csf-section-head {
        gap: .68rem;
        margin-bottom: .64rem;
      }
      .csf-traps .csf-icon {
        min-width: 2.5rem;
        height: 2.5rem;
        border-radius: .68rem;
        font-size: .9rem;
      }
      .csf-traps .csf-section-head h3 {
        font-size: .82rem;
        letter-spacing: .09em;
      }
      .csf-traps .csf-section-head p {
        margin-top: .12rem;
        font-size: .8rem;
        line-height: 1.35;
        font-weight: 680;
      }
      .csf-trap-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: .38rem .9rem;
        margin: 0;
        padding-left: 1.05rem;
        color: var(--csf-muted);
        font-size: .8rem;
        line-height: 1.42;
      }
      .csf-trap-list li {
        padding-left: .1rem;
      }
      .csf-breakdown {
        background: linear-gradient(120deg, #fff, #f8fafc 55%, color-mix(in srgb, var(--csf-accent-2) 6%, #fff));
      }
      .csf-breakdown-body {
        display: grid;
        gap: .85rem;
      }
      .csf-strip-panel {
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 15%, var(--csf-line));
        border-radius: .86rem;
        background: rgba(255, 255, 255, .72);
        padding: clamp(1rem, 1.7vw, 1.35rem);
        overflow: hidden;
      }
      .csf-strip-label {
        display: block;
        margin: 0 0 .55rem;
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 950;
        letter-spacing: .13em;
        text-transform: uppercase;
      }
      .csf-segments {
        display: flex;
        flex-wrap: wrap;
        gap: .6rem;
        justify-content: center;
        margin: .8rem .25rem 1rem;
      }
      .csf-segment {
        min-width: min(10.5rem, 100%);
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 25%, var(--csf-line));
        border-radius: .78rem;
        background: #fff;
        padding: 1rem 1.15rem;
        text-align: center;
        overflow: hidden;
      }
      .csf-segment span,
      .csf-mini span,
      .csf-label {
        overflow-wrap: anywhere;
        word-break: normal;
      }
      .csf-strip {
        display: flex;
        flex-wrap: wrap;
        gap: .55rem;
        justify-content: center;
        margin: .85rem .25rem 1rem;
      }
      .csf-token {
        display: grid;
        min-width: 4.15rem;
        min-height: 3.3rem;
        place-items: center;
        border: 1px solid color-mix(in srgb, var(--csf-accent-2) 28%, var(--csf-line));
        border-radius: .55rem;
        background: #fff;
        color: var(--csf-ink);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 1.05rem;
        font-weight: 950;
        padding: .7rem .95rem;
        box-shadow: 0 8px 18px rgba(15, 23, 42, .045);
        overflow: hidden;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .csf-segment strong {
        color: var(--csf-ink);
        font-size: clamp(.9rem, 1vw, 1.03rem);
        line-height: 1.25;
        max-width: 100%;
        overflow-wrap: anywhere;
        word-break: break-word;
      }
      .csf-token,
      .csf-token *,
      .csf-segment strong,
      .csf-segment strong * {
        color: var(--csf-ink) !important;
        -webkit-text-fill-color: var(--csf-ink);
      }
      .csf-quality {
        background: linear-gradient(120deg, #fff, color-mix(in srgb, var(--csf-accent-3) 8%, #fff));
      }
      .csf-advanced {
        border: 1px solid var(--csf-line);
        border-radius: .95rem;
        background: #fff;
        overflow: hidden;
      }
      .csf-advanced summary {
        padding: .82rem 1rem;
        font-size: .95rem;
        font-weight: 950;
        cursor: pointer;
      }
      .csf-advanced pre {
        margin: 0;
        background: #0f172a;
        color: #e5eefc;
        padding: .9rem;
        font-size: .78rem;
        line-height: 1.5;
        overflow: auto;
        white-space: pre-wrap;
        overflow-wrap: anywhere;
      }
      .csf-debug-grid {
        display: grid;
        grid-template-columns: minmax(0, min(100%, 54rem));
        gap: .85rem;
        justify-content: center;
        padding: .35rem 1rem 1rem;
      }
      .csf-debug-grid > div {
        min-width: 0;
        width: 100%;
      }
      .csf-debug-grid .csf-section-head {
        justify-content: center;
        margin-top: .35rem;
      }
      .csf-debug-table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border-radius: .72rem;
        background: #fff;
      }
      .csf-debug-table th,
      .csf-debug-table td {
        border-bottom: 1px solid var(--csf-line);
        padding: .55rem .6rem;
        text-align: left;
        font-size: .8rem;
        overflow-wrap: anywhere;
      }
      .csf-suggestions {
        display: grid;
        gap: .58rem;
      }
      .csf-suggestion {
        width: 100%;
        min-width: 0;
        border: 1px solid var(--csf-line);
        border-radius: .72rem;
        background: #fff;
        color: var(--csf-ink);
        padding: .62rem .72rem;
        text-align: left;
        font: inherit;
        font-size: .84rem;
        font-weight: 850;
        cursor: pointer;
        overflow-wrap: anywhere;
      }
      .csf-suggestion small {
        display: block;
        margin-top: .16rem;
        color: var(--csf-muted);
        font-size: .72rem;
        line-height: 1.35;
      }
      .csf-debug-table th {
        color: var(--csf-muted);
        font-size: .68rem;
        font-weight: 950;
        letter-spacing: .11em;
        text-transform: uppercase;
      }
      .csf-suggestions {
        display: grid;
        gap: .55rem;
      }
      .csf-suggestion {
        border: 1px solid var(--csf-line);
        border-radius: .7rem;
        background: #fff;
        padding: .65rem .75rem;
        color: var(--csf-muted);
        font-size: .84rem;
        font-weight: 780;
      }
      .csf-api-tabs {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        margin: .75rem 0;
      }
      .csf-api-tabs span {
        border: 1px solid var(--csf-line);
        border-radius: .6rem;
        padding: .42rem .62rem;
        background: #fff;
        font-size: .82rem;
        font-weight: 900;
      }
      .csf-api-tabs span:first-child {
        border-color: color-mix(in srgb, var(--csf-accent) 35%, var(--csf-line));
        background: color-mix(in srgb, var(--csf-accent) 10%, #fff);
        color: var(--csf-accent);
      }
      .csf-json-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .75rem;
        margin: .2rem 0 .7rem;
      }
      .csf-json-head span {
        color: var(--csf-muted);
        font-size: .7rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }
      @media (max-width: 760px) {
        .csf-hero-grid,
        .csf-context-grid { grid-template-columns: 1fr; }
        .csf-context-cards { grid-template-columns: 1fr; }
        .csf-iban-fixture-bar { grid-template-columns: 1fr; }
        .csf-tax-business-bar { grid-template-columns: 1fr; }
        .csf-contact-address-bar { grid-template-columns: 1fr; }
        .csf-document-reference-bar { grid-template-columns: 1fr; }
        .csf-bank-account-bar { grid-template-columns: 1fr; }
        .csf-locale-format-bar { grid-template-columns: 1fr; }
        .csf-developer-data-bar { grid-template-columns: 1fr; }
        .csf-payment-workflow-bar { grid-template-columns: 1fr; }
        .csf-trap-list { grid-template-columns: 1fr; }
        .csf-presets-grid { grid-template-columns: 1fr; }
        .csf-rich-grid { grid-template-columns: 1fr; }
        .csf-rich-head { flex-direction: column; }
        .csf-rich-line { grid-template-columns: 2.1rem minmax(0, 1fr); }
        .csf-rich-line span:last-child { grid-column: 2; }
        .csf-debug-grid { grid-template-columns: 1fr; }
        .csf-title { font-size: 1.42rem; }
        .csf-panel,
        .csf-result-card,
        .csf-quality { padding: .95rem; }
        .csf-json-head { align-items: stretch; flex-direction: column; }
        .csf-segments { justify-content: stretch; }
        .csf-segment { width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  function toastRoot() {
    if (typeof document === 'undefined') return null;
    let toast = document.querySelector('[data-csf-copy-toast]');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'csf-copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.dataset.csfCopyToast = 'true';
      document.body.appendChild(toast);
    }
    return toast;
  }

  function positionCopyToast(toast, trigger) {
    if (!toast || !trigger || !trigger.getBoundingClientRect) {
      toast.style.setProperty('--csf-toast-left', '50%');
      toast.style.setProperty('--csf-toast-top', '1rem');
      return;
    }
    const rect = trigger.getBoundingClientRect();
    const center = Math.max(72, Math.min(window.innerWidth - 72, rect.left + rect.width / 2));
    const top = Math.max(58, rect.top);
    toast.style.setProperty('--csf-toast-left', `${center}px`);
    toast.style.setProperty('--csf-toast-top', `${top}px`);
  }

  function showCopyToast(suite, message, trigger) {
    const toast = toastRoot();
    if (!toast) return;
    const labels = labelsFor(suite);
    toast.textContent = message || labels.copied || 'Copied';
    positionCopyToast(toast, trigger);
    toast.classList.add('is-visible');
    clearTimeout(showCopyToast.timer);
    showCopyToast.timer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 1450);
  }

  function copyText(suite, value, message, trigger) {
    const payload = text(value);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(payload).then(() => showCopyToast(suite, message, trigger)).catch(() => showCopyToast(suite, message, trigger));
      return;
    }
    showCopyToast(suite, message, trigger);
  }

  function toolContextProfile(tool) {
    const haystack = `${tool.id || ''} ${tool.name || ''} ${tool.code || ''} ${tool.category || ''} ${tool.kind || ''}`.toLowerCase();
    if (/iban/.test(haystack)) {
      return {
        subject: 'bank-account routing evidence',
        usedFor: 'payments, bank forms, payout onboarding',
        checks: 'country prefix, check digits, BBAN structure',
        boundary: 'bank ownership and account status'
      };
    }
    if (/vat|ust|iva|btw|moms|mva/.test(haystack)) {
      return {
        subject: 'tax-registration evidence',
        usedFor: 'VAT onboarding, invoices, tax forms',
        checks: 'prefix, length, checksum or format shape',
        boundary: 'tax authority registration status'
      };
    }
    if (/invoice|factur|rechnung|faktura|fatura|e-?invoic/.test(haystack)) {
      return {
        subject: 'invoice and accounting reference evidence',
        usedFor: 'ERP imports, invoice matching, audit trails',
        checks: 'year hints, sequence shape, separators',
        boundary: 'source accounting-system truth'
      };
    }
    if (/eori|customs|taric|excise|intrastat/.test(haystack)) {
      return {
        subject: 'customs and trade-registration evidence',
        usedFor: 'imports, exports, customs onboarding',
        checks: 'country prefix, identifier body, copied payload',
        boundary: 'customs authority registration status'
      };
    }
    if (/passport|id card|identity|national id|rodne|person|pesel|nif|nie|dni|ssn|social/.test(haystack)) {
      return {
        subject: 'personal-identifier structure evidence',
        usedFor: 'KYC forms, test fixtures, data intake',
        checks: 'length, date hints, control digits, masking',
        boundary: 'identity ownership and legal status'
      };
    }
    if (/company|registry|register|firma|siren|siret|cvr|kvk|handels|business/.test(haystack)) {
      return {
        subject: 'company-registry identifier evidence',
        usedFor: 'vendor onboarding, compliance checks, CRM data',
        checks: 'registry shape, prefixes, sequence blocks',
        boundary: 'live company registration status'
      };
    }
    if (/postal|post ?code|zip|address|cep/.test(haystack)) {
      return {
        subject: 'address and postal-format evidence',
        usedFor: 'shipping forms, address cleanup, signup flows',
        checks: 'postal pattern, spacing, local formatting',
        boundary: 'deliverability and official address existence'
      };
    }
    if (/phone|e\.?164|mobile|msisdn/.test(haystack)) {
      return {
        subject: 'phone-number formatting evidence',
        usedFor: 'contact forms, SMS tests, CRM normalization',
        checks: 'country code, local length, E.164 display',
        boundary: 'line ownership and carrier status'
      };
    }
    if (/vehicle|vin|plate|license|driving|renavam/.test(haystack)) {
      return {
        subject: 'vehicle-intake identifier evidence',
        usedFor: 'fleet records, insurance intake, vehicle forms',
        checks: 'prefixes, length, serial groups, masking',
        boundary: 'registry ownership and live vehicle status'
      };
    }
    if (/bank|routing|swift|bic|clearing|sort|branch|konto|account/.test(haystack)) {
      return {
        subject: 'bank-routing and account-format evidence',
        usedFor: 'payments setup, reconciliation, bank uploads',
        checks: 'routing blocks, branch codes, account body',
        boundary: 'bank-side account existence'
      };
    }
    if (/csv|locale|format|number|currency|date|normalizer|formatter/.test(haystack)) {
      return {
        subject: 'locale-format normalization evidence',
        usedFor: 'CSV imports, exports, data cleanup',
        checks: 'dates, decimals, separators, local display',
        boundary: 'business meaning of the source data'
      };
    }
    return {
      subject: `${tool.code || 'local'} format evidence`,
      usedFor: 'forms, fixtures, imports, handoff checks',
      checks: 'local structure, normalized value, safe preview',
      boundary: 'official registry or source-system status'
    };
  }

  function renderToolContext(suite, tool) {
    const labels = labelsFor(suite);
    const locale = currentLocale();
    const rawProfile = tool.contextProfile || toolContextProfile(tool);
    const profile = locale === 'en' ? rawProfile : {
      subject: localizeRuntimePhrase(rawProfile.subject, locale),
      usedFor: localizeRuntimePhrase(rawProfile.usedFor, locale),
      checks: localizeRuntimePhrase(rawProfile.checks, locale),
      boundary: localizeRuntimePhrase(rawProfile.boundary, locale)
    };
    const countryName = localizedCountryDisplayName(suite, locale);
    const contextSentences = {
      de: [
        `${tool.name} hilft Teams in ${countryName}, ${profile.subject} zu pruefen, bevor Daten in Formulare, Importe oder Compliance-Workflows gehen.`,
        `${tool.summary} Das Browser-Ergebnis eignet sich fuer Normalisierung und Debugging; ${profile.boundary} bleibt beim zustaendigen offiziellen System oder Anbieter.`
      ],
      es: [
        `${tool.name} ayuda a equipos de ${countryName} a inspeccionar ${profile.subject} antes de pasarlo a formularios, importaciones o workflows de cumplimiento.`,
        `${tool.summary} El resultado solo en navegador sirve para normalizar y depurar; ${profile.boundary} sigue perteneciendo al sistema oficial o proveedor responsable.`
      ],
      fr: [
        `${tool.name} aide les équipes ${countryName} à inspecter ${profile.subject} avant l’entrée dans les formulaires, imports ou workflows de conformité.`,
        `${tool.summary} Le résultat uniquement navigateur sert à normaliser et déboguer, tandis que ${profile.boundary} reste du ressort du système officiel ou fournisseur responsable.`
      ],
      pl: [
        `${tool.name} pomaga zespołom ${countryName} sprawdzić ${profile.subject}, zanim trafi do formularzy, importów lub workflow zgodności.`,
        `${tool.summary} Wynik w przeglądarce służy do normalizacji i debugowania; ${profile.boundary} pozostaje po stronie właściwego systemu oficjalnego lub dostawcy.`
      ],
      'pt-BR': [
        `${tool.name} ajuda equipes de ${countryName} a inspecionar ${profile.subject} antes de enviar para formulários, importações ou fluxos de conformidade.`,
        `${tool.summary} O resultado somente no navegador serve para normalização e depuração; ${profile.boundary} continua no sistema oficial ou provedor responsável.`
      ],
      uk: [
        `${tool.name} допомагає командам ${countryName} перевіряти ${profile.subject}, перш ніж дані підуть у форми, імпорти або compliance-сценарії.`,
        `${tool.summary} Браузерний результат корисний для нормалізації й дебагу; ${profile.boundary} лишається відповідальністю офіційної системи або провайдера.`
      ]
    };
    const [firstSentence, secondSentence] = contextSentences[locale] || [
      `${tool.name} helps ${countryName} teams inspect ${profile.subject} before it moves into forms, imports, or compliance workflows.`,
      `${tool.summary} The browser-only result is useful for normalization and debugging, while ${profile.boundary} still belongs to the responsible official or source system.`
    ];
    return `
      <section class="csf-context" aria-label="${esc(labels.toolContextTitle)}">
        <div class="csf-context-grid">
          <div>
            <span class="csf-kicker">${esc(labels.toolContextTitle)}</span>
            <h3>${esc(tool.name)}</h3>
            <p>${esc(firstSentence)} ${esc(secondSentence)}</p>
          </div>
          <div class="csf-context-cards">
            <article class="csf-context-card">
              <span class="csf-label">${esc(labels.usedFor)}</span>
              <strong>${esc(profile.usedFor)}</strong>
            </article>
            <article class="csf-context-card">
              <span class="csf-label">${esc(labels.checksLocally)}</span>
              <strong>${esc(profile.checks)}</strong>
            </article>
            <article class="csf-context-card">
              <span class="csf-label">${esc(labels.officialBoundaryShort)}</span>
              <strong>${esc(profile.boundary)}</strong>
            </article>
          </div>
        </div>
      </section>
    `;
  }

  function renderHero(suite, tool) {
    const labels = labelsFor(suite);
    const chips = asArray(tool.chips).length ? tool.chips : [labels.browserOnly, labels.offlineChecks, formatLabel(labels.countrySpecific, suite), labels.fieldBreakdown, labels.qualityNotes];
    return `
      <section class="csf-hero">
        <div class="csf-hero-grid">
          <div>
            <span class="csf-kicker">${esc(formatLabel(labels.workbench, suite))}</span>
            <h2 class="csf-title">${esc(tool.name)}</h2>
            <p class="csf-summary">${esc(tool.summary)}</p>
            <div class="csf-chips">${chips.map((chip) => `<span class="csf-chip">${esc(chip)}</span>`).join('')}</div>
          </div>
        </div>
      </section>
    `;
  }

  function integrationTrapItems(suite, tool) {
    const custom = asArray(tool.integrationTraps).filter(Boolean);
    if (custom.length) return custom.slice(0, 10);
    const primary = [
      tool.id,
      tool.name,
      tool.code,
      tool.kind,
      tool.category
    ].map(text).join(' ').toLowerCase();
    const joined = [
      primary,
      tool.summary,
      asArray(tool.chips).join(' ')
    ].map(text).join(' ').toLowerCase();
    const has = (pattern) => pattern.test(joined);
    const hasPrimary = (pattern) => pattern.test(primary);
    const countryName = suite.country && suite.country.name || 'this country';
    const localeNote = `Persist ${countryName} country and locale metadata with exported fixtures so downstream services do not silently apply another market's rules.`;
    const fixtureNote = 'Keep success, malformed, short, wrong-prefix, and edge-case fixtures in CI; generated happy paths alone miss most integration regressions.';

    if (hasPrimary(/tax|vat|tin|ein|ssn|itin|invoice|receipt|company|business|registry|register|customs|importer|procurement|license|licence|kyb|ownership/)) {
      return [
        'Separate format/checksum evidence from official registration, filing, tax-status, and company-status lookups.',
        'Do not auto-pad, truncate, or “repair” submitted identifiers unless the user can see the original value and approve the normalized value.',
        'Version tax and invoice fixtures by jurisdiction and filing period; old samples can stay syntactically valid while business rules change.',
        'Keep company, branch, tax, and invoice fields as named payload properties instead of collapsing everything into one display string.',
        fixtureNote,
        localeNote
      ];
    }

    if (hasPrimary(/privacy|pii|redact|mask|scrubber|retention|support ticket|personal data|fixture generator|json fixture|seed|test case|regex|slug|transliteration/)) {
      return [
        'Decide which fields are safe fixtures and which are personal data before exporting JSON, screenshots, or test seeds.',
        'Keep reversible masking out of shared logs; use irreversible redaction for tickets, analytics, demos, and vendor handoffs.',
        'Test Unicode, mixed scripts, emoji, long names, punctuation, and copied spreadsheet cells before using generated fixtures in CI.',
        'Do not let generated fake data resemble real customer records closely enough to be mistaken for production data.',
        fixtureNote,
        localeNote
      ];
    }

    if (hasPrimary(/api|payload|openapi|graphql|webhook|csv|sql|schema|integration|smoke|audit trail|data quality|ocr|document/)) {
      return [
        'Keep normalized fields, raw source text, and parser diagnostics separate so API consumers can debug rejects without re-parsing the display string.',
        'Test batch imports with empty rows, duplicate rows, extra columns, bad encodings, pasted spreadsheet quotes, and mixed newline styles.',
        'Do not make API success depend on UI-only formatting; server payloads should carry explicit country, locale, currency, and field-type metadata.',
        'Use stable error codes for integration tests, not only translated human-readable messages.',
        fixtureNote,
        localeNote
      ];
    }

    if (hasPrimary(/passport|mrz|identity|national id|id card|citizen|personal|social|health|driving|driver|vehicle|plate|vin|residence/)) {
      return [
        'Mask personal identifiers by default in logs, screenshots, analytics events, and support tickets; expose raw values only in the local form state.',
        'Do not treat a local pattern match as proof of identity, age, residency, entitlement, vehicle ownership, or document authenticity.',
        'Keep document type, issuing country, serial/body, check digit, and expiry fields separate so OCR corrections do not corrupt the whole value.',
        'Test lowercase, transliterated names, OCR-confused characters, pasted separators, and expired/edge-date samples.',
        fixtureNote,
        localeNote
      ];
    }

    if (hasPrimary(/address|postal|postcode|zip|phone|e164|locality|municipality|region|province|state|timezone|time zone|holiday|calendar|date|hours/)) {
      return [
        'Do not treat formatted address, postal, or phone syntax as proof of deliverability, number ownership, or service coverage.',
        'Preserve the user-entered display value alongside normalized components; users often need local punctuation for invoices, labels, and support forms.',
        'Test leading zeroes, local-language place names, region aliases, mobile/fixed-line prefixes, and pasted international formats.',
        'Keep timezone, calendar, and holiday logic explicit in payloads instead of inferring it from browser locale.',
        fixtureNote,
        localeNote
      ];
    }

    if (hasPrimary(/iban|bban|bank|account|routing|swift|bic|payment|sepa|ach|fedwire|bpay|pix|remittance|payout|refund|chargeback|reconciliation/)) {
      return [
        'Store the normalized routing/account payload separately from the human display mask so bank files, logs, and UI previews do not drift.',
        'Replay checksum, bank-code, branch-code, account-body, and country-prefix slices after every formatter or masking change.',
        'Treat a structurally valid payment reference as syntax only; ownership, settlement reachability, sanctions, and balance checks belong to payment providers or banks.',
        'Test copy/paste with spaces, hyphens, non-breaking spaces, leading zeroes, and pasted statement text before wiring imports.',
        fixtureNote,
        localeNote
      ];
    }

    return [
      'Keep raw input, normalized value, display value, and masked preview as separate fields in forms, exports, and logs.',
      'Do not treat local browser analysis as live official status, ownership, eligibility, or legal acceptance.',
      'Exercise valid, invalid, short, wrong-context, pasted, and generated samples before wiring the workflow into production forms.',
      'Record country, locale, currency, and data-source assumptions with every exported payload.',
      'Mask personal or commercially sensitive values before sharing debugger output outside the local browser.'
    ];
  }

  function renderIntegrationTraps(suite, tool) {
    const labels = labelsFor(suite);
    const locale = currentLocale();
    const items = integrationTrapItems(suite, tool).map((item) => localizeRuntimePhrase(item, locale));
    return `
      <section class="csf-panel csf-traps" aria-label="${esc(labels.integrationTraps)}">
        <div class="csf-section-head">
          <span class="csf-icon">!</span>
          <div><h3>${esc(labels.integrationTraps)}</h3><p>${esc(labels.integrationTrapsSummary)}</p></div>
        </div>
        <ul class="csf-trap-list">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </section>
    `;
  }
  function renderInput(suite, tool) {
    const labels = labelsFor(suite);
    const isIbanGen = isIbanGeneratorTool(tool);
    const isBankAccount = !isIbanGen && isBankAccountWorkflowTool(tool);
    const isLocaleFormat = !isIbanGen && !isBankAccount && isLocaleDateCurrencyTool(tool);
    const isDeveloperData = !isIbanGen && !isBankAccount && !isLocaleFormat && isDeveloperDataWorkflowTool(tool);
    const isDocumentReference = !isIbanGen && !isBankAccount && !isLocaleFormat && !isDeveloperData && isDocumentVehicleReferenceTool(tool);
    const isPaymentWorkflow = !isIbanGen && !isBankAccount && !isLocaleFormat && !isDeveloperData && !isDocumentReference && isPaymentInvoiceWorkflowTool(tool);
    const isTaxBiz = !isIbanGen && !isBankAccount && !isLocaleFormat && !isDeveloperData && !isDocumentReference && !isPaymentWorkflow && isTaxBusinessTool(tool);
    const isContactAddress = !isIbanGen && !isLocaleFormat && !isTaxBiz && isContactAddressTool(tool);
    const profile = isIbanGen ? ibanProfileForSuite(suite) : null;
    const routeCountry = isIbanGen ? countryCodeForSuite(suite, tool, '') : '';
    const routePrefix = routeIso2(suite) || sampleCountryPrefix(tool);
    const taxProfile = isTaxBiz ? profileFor(suite) : null;
    const taxLabel = isTaxBiz
      ? (text(tool.kind).toLowerCase() === 'eori'
        ? 'EORI / customs'
        : (text(tool.kind).toLowerCase() === 'company' || text(tool.kind).toLowerCase() === 'register')
          ? (taxProfile && taxProfile.companyLabel) || 'company registry'
          : (taxProfile && taxProfile.taxLabel) || tool.code || 'tax/VAT')
      : '';
    const contactKind = text(tool.kind).toLowerCase();
    const contactSample = isContactAddress ? validSampleValue(tool) : '';
    const contactMain = contactKind === 'phone'
      ? (sampleCallingCode(tool) ? `+${sampleCallingCode(tool)}` : 'sample')
      : (postalShape(postalToken(contactSample)) || 'sample');
    const contactLabel = contactKind === 'phone' ? 'Calling code' : contactKind === 'postal' ? 'Postal shape' : 'Address sample';
    const documentKind = isDocumentReference ? documentVehicleReferenceKind(tool) : '';
    const documentSample = isDocumentReference ? validSampleValue(tool) : '';
    const documentToken = isDocumentReference ? extractPrimaryToken(documentSample, documentKind) : '';
    const documentShape = isDocumentReference ? routeShapeSample(tool) : '';
    const bankKind = isBankAccount ? bankAccountWorkflowKind(tool) : '';
    const bankSample = isBankAccount ? validSampleValue(tool) : '';
    const bankToken = isBankAccount ? extractBankingToken(bankSample, bankKind) : '';
    const bankShape = isBankAccount ? structuredShapePreview(bankToken || bankSample, bankToken || bankSample, 'account text') : '';
    const localeKind = isLocaleFormat ? localeDateCurrencyKind(tool) : '';
    const localeSample = isLocaleFormat ? validSampleValue(tool) : '';
    const localeNumber = isLocaleFormat ? parseLocaleNumber(localeSample) : null;
    const localeDate = isLocaleFormat ? extractDateParts(localeSample) : null;
    const localePrimary = isLocaleFormat
      ? (localeNumber && localeNumber.token) || (localeDate && localeDate.token) || shortValue(localeSample, 24)
      : '';
    const localeShape = isLocaleFormat ? structuredShapePreview(localePrimary || localeSample, localePrimary || localeSample, 'locale sample') : '';
    const developerKind = isDeveloperData ? developerDataWorkflowKind(tool) : '';
    const developerSample = isDeveloperData ? validSampleValue(tool) : '';
    const developerKeys = isDeveloperData ? extractFieldKeys(developerSample) : [];
    const developerShape = isDeveloperData ? shortValue(developerKeys.join(', ') || developerSample, 28) : '';
    const paymentKind = isPaymentWorkflow ? paymentInvoiceWorkflowKind(tool) : '';
    const paymentSample = isPaymentWorkflow ? validSampleValue(tool) : '';
    const paymentReference = isPaymentWorkflow ? extractWorkflowReference(paymentSample, paymentKind) : '';
    const paymentShape = isPaymentWorkflow ? structuredShapePreview(paymentReference || paymentSample, paymentReference || paymentSample, 'reference text') : '';
    const locale = currentLocale();
    const L = (value) => localizeRuntimePhrase(value, locale);
    const countryName = localizedCountryDisplayName(suite, locale);
    return `
      <section class="csf-input ${isIbanGen ? 'csf-input-iban-generator' : ''} ${isTaxBiz ? 'csf-input-tax-business' : ''} ${isContactAddress ? 'csf-input-contact-address' : ''} ${isDocumentReference ? 'csf-input-document-reference' : ''} ${isBankAccount ? 'csf-input-bank-account' : ''} ${isLocaleFormat ? 'csf-input-locale-format' : ''} ${isDeveloperData ? 'csf-input-developer-data' : ''} ${isPaymentWorkflow ? 'csf-input-payment-workflow' : ''}">
        <div class="csf-row">
          <h2>${esc(localizedActionLabel(tool.actionLabel, labels))}</h2>
          <span class="csf-pill" data-state="waiting" data-csf-state>${esc(labels.waiting)}</span>
        </div>
        ${isIbanGen ? `
          <div class="csf-iban-fixture-bar" aria-label="${esc(labels.ibanGenerator)} route context">
            <article><span>${esc(L('Route country'))}</span><strong>${esc(routeCountry || countryName)}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Expected length'))}</span><strong>${esc(profile ? profile.length : '15-34')}</strong><small>${esc(L('IBAN characters'))}</small></article>
            <article><span>${esc(L('Generate mode'))}</span><strong>${esc(L('Fresh fixture'))}</strong><small>${esc(L('New local value every click'))}</small></article>
          </div>
        ` : ''}
        ${isTaxBiz ? `
          <div class="csf-tax-business-bar" aria-label="${esc(tool.code || 'Tax')} route context">
            <article><span>${esc(L('Route prefix'))}</span><strong>${esc(routePrefix || countryName)}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Local label'))}</span><strong>${esc(L(taxLabel))}</strong><small>${esc(L(tool.kind || tool.category || 'tax'))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Shape + checksum'))}</strong><small>${esc(L('When local parser exists'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('Offline only'))}</strong><small>${esc(L('No registry status claim'))}</small></article>
          </div>
        ` : ''}
        ${isContactAddress ? `
          <div class="csf-contact-address-bar" aria-label="${esc(tool.code || 'Contact')} route context">
            <article><span>${esc(L(contactLabel))}</span><strong>${esc(contactMain)}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Local sample'))}</span><strong>${esc(shortValue(contactSample, 24))}</strong><small>${esc(L('Shape source'))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Format + mask'))}</strong><small>${esc(L('Browser-local only'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No live proof'))}</strong><small>${esc(L('Carrier/postal/geocode external'))}</small></article>
          </div>
        ` : ''}
        ${isDocumentReference ? `
          <div class="csf-document-reference-bar" aria-label="${esc(tool.code || 'Document')} route context">
            <article><span>${esc(L('Family'))}</span><strong>${esc(L(documentKind))}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Route shape'))}</span><strong>${esc(structuredShapePreview(documentShape || documentToken || documentSample, documentToken || documentSample, 'document token'))}</strong><small>${esc(shortValue(documentToken || documentSample, 24))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Token + anatomy'))}</strong><small>${esc(L('VIN/MRZ when available'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No live proof'))}</strong><small>${esc(L('Registry/carrier/authority external'))}</small></article>
          </div>
        ` : ''}
        ${isBankAccount ? `
          <div class="csf-bank-account-bar" aria-label="${esc(tool.code || 'Bank')} route context">
            <article><span>${esc(L('Family'))}</span><strong>${esc(L(bankKind))}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Route shape'))}</span><strong>${esc(bankShape || L('sample'))}</strong><small>${esc(shortValue(bankToken || bankSample, 24))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Routing + account'))}</strong><small>${esc(L('BIC/ABA when visible'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No live proof'))}</strong><small>${esc(L('Ownership/settlement external'))}</small></article>
          </div>
        ` : ''}
        ${isLocaleFormat ? `
          <div class="csf-locale-format-bar" aria-label="${esc(tool.code || 'Locale')} route context">
            <article><span>${esc(L('Family'))}</span><strong>${esc(L(localeKind))}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Route shape'))}</span><strong>${esc(localeShape || L('sample'))}</strong><small>${esc(shortValue(localePrimary || localeSample, 24))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Date + number'))}</strong><small>${esc(L('Week/decimal when visible'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No live source'))}</strong><small>${esc(L('Rates/holidays/DST external'))}</small></article>
          </div>
        ` : ''}
        ${isDeveloperData ? `
          <div class="csf-developer-data-bar" aria-label="${esc(tool.code || 'Data')} route context">
            <article><span>${esc(L('Family'))}</span><strong>${esc(L(developerKind))}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Fixture fields'))}</span><strong>${esc(developerShape || L('sample'))}</strong><small>${esc(shortValue(developerKeys.join(', ') || developerSample, 24))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Keys + payload'))}</strong><small>${esc(L('JSON/CSV when visible'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No source truth'))}</strong><small>${esc(L('Privacy/compliance external'))}</small></article>
          </div>
        ` : ''}
        ${isPaymentWorkflow ? `
          <div class="csf-payment-workflow-bar" aria-label="${esc(tool.code || 'Payment')} route context">
            <article><span>${esc(L('Family'))}</span><strong>${esc(L(paymentKind))}</strong><small>${esc(countryName)}</small></article>
            <article><span>${esc(L('Route shape'))}</span><strong>${esc(paymentShape || L('sample'))}</strong><small>${esc(shortValue(paymentReference || paymentSample, 24))}</small></article>
            <article><span>${esc(L('Replay'))}</span><strong>${esc(L('Reference + amount'))}</strong><small>${esc(L('Payload anatomy when available'))}</small></article>
            <article><span>${esc(L('Boundary'))}</span><strong>${esc(L('No live proof'))}</strong><small>${esc(L('Settlement/fiscal/award external'))}</small></article>
          </div>
        ` : ''}
        <div class="csf-presets-grid">
          <label>
            <span>${esc(labels.presets)}</span>
            <div class="csf-sample-buttons" data-csf-samples>
              ${tool.samples.map((sample, index) => `<button class="csf-sample-button" type="button" data-csf-sample="${index}" data-csf-sample-intent="${esc(sample.intent || sampleIntent(sample))}" data-tone="${esc(sample.tone || (index === 0 ? 'success' : 'review'))}">${esc(sample.label)}</button>`).join('')}
            </div>
          </label>
        </div>
        <textarea class="csf-textarea" spellcheck="false" data-csf-input aria-label="${esc(isIbanGen ? `${suite.country.name} BBAN or IBAN to repair` : tool.name)}">${esc(tool.samples[0].value)}</textarea>
        ${isIbanGen ? `
          <div class="csf-iban-instant-result" data-csf-iban-instant hidden>
            <div>
              <span>${esc(L('Generated IBAN'))}</span>
              <strong data-csf-iban-instant-value></strong>
              <small data-csf-iban-instant-meta></small>
            </div>
            <button class="csf-button" type="button" data-csf-iban-copy>${esc(L('Copy IBAN'))}</button>
          </div>
          <div class="csf-iban-batch-tools">
            <label>
              <span>${esc(L('Batch generate'))}</span>
              <select data-csf-iban-batch-count>
                <option value="5">5 IBANs</option>
                <option value="10" selected>10 IBANs</option>
                <option value="25">25 IBANs</option>
                <option value="50">50 IBANs</option>
                <option value="100">100 IBANs</option>
              </select>
            </label>
            <button class="csf-button" type="button" data-csf-iban-batch-generate>${esc(L('Generate batch'))}</button>
            <button class="csf-button" type="button" data-csf-iban-batch-copy disabled>${esc(L('Copy batch'))}</button>
          </div>
          <textarea class="csf-iban-batch-output" spellcheck="false" readonly hidden data-csf-iban-batch-output aria-label="${esc(L('Generated IBAN batch'))}"></textarea>
        ` : ''}
        <div class="csf-actions">
          <button class="csf-button csf-button-primary" type="button" data-csf-run>${esc(tool.buttonLabel || localizedActionLabel(tool.actionLabel, labels))}</button>
          <button class="csf-button" type="button" data-csf-copy>${esc(labels.copyResult)}</button>
          <button class="csf-button" type="button" data-csf-download>${esc(labels.downloadResult)}</button>
          <button class="csf-button csf-button-ghost" type="button" data-csf-clear>${esc(labels.clear)}</button>
        </div>
        <details class="csf-batch">
          <summary>${esc(labels.batchValidation)} <small>${esc(labels.batchSummary)}</small></summary>
          <div class="csf-batch-body">
            <textarea class="csf-textarea" spellcheck="false" data-csf-batch-input placeholder="${esc(tool.samples.map((sample) => sample.value).slice(0, 3).join('\n'))}"></textarea>
            <div class="csf-actions">
              <button class="csf-button" type="button" data-csf-batch-run>${esc(labels.runBatch)}</button>
              <button class="csf-button" type="button" data-csf-batch-copy>${esc(labels.copyBatchJson)}</button>
              <button class="csf-button csf-button-ghost" type="button" data-csf-batch-clear>${esc(labels.clearBatch)}</button>
            </div>
            <div class="csf-batch-results" data-csf-batch-results></div>
          </div>
        </details>
      </section>
    `;
  }

  function routePath() {
    if (typeof location === 'undefined') return '/en/';
    return location.pathname || '/en/';
  }

  function localePrefix() {
    const locale = currentLocale();
    return `/${locale}/`;
  }

  function renderRichRelatedLinks(suite, tool) {
    const locale = localePrefix();
    const countryPath = `${locale}${suite.country.slug}/`;
    const related = suite.tools
      .filter((item) => item.id !== tool.id)
      .slice(0, 12)
      .map((item) => localizeTool(suite, item));
    if (!related.length) return '';
    return `<div class="csf-rich-related">${related.map((item) => `
      <a href="${esc(countryPath + item.id + '/')}">${esc(item.name)}</a>
    `).join('')}</div>`;
  }

  function renderRichLayer(suite, tool) {
    const labels = labelsFor(suite);
    const history = readHistory(suite, tool);
    const badge = formatLabel(labels.localBadge, {
      country: suite.country,
      code: tool.code
    }).replace(/\{code\}/g, tool.code);
    return `
      <details class="csf-rich-lab" data-csf-rich-layer>
        <summary>
          <span class="csf-rich-summary-title">
            <strong>${esc(labels.advancedTools)}</strong>
            <small>${esc(labels.advancedToolsSummary)}</small>
          </span>
          <span class="csf-rich-badge">${esc(badge)}</span>
        </summary>
        <div class="csf-rich-head">
          <div>
            <span class="csf-kicker">${esc(labels.premiumDebugLayer)}</span>
            <h3>${esc(formatLabel(labels.toolIntelligence, suite))}</h3>
            <p>${esc(labels.toolIntelligenceSummary)}</p>
          </div>
        </div>
        <div class="csf-rich-grid">
          <article class="csf-rich-card">
            <span class="csf-label">${esc(labels.recentValidations)}</span>
            <h4>${esc(labels.browserHistory)}</h4>
            <select class="csf-select" data-csf-rich-history>
              <option value="">${esc(labels.noHistory)}</option>
              ${history.map((item) => `<option value="${esc(item)}">${esc(shortValue(item, 52))}</option>`).join('')}
            </select>
          </article>
          <article class="csf-rich-card">
            <span class="csf-label">${esc(labels.batchDiagnostics || labels.batchValidation)}</span>
            <h4>${esc(labels.multiRowValidator)}</h4>
            <textarea class="csf-textarea" spellcheck="false" data-csf-rich-batch-input placeholder="${esc(tool.samples.map((sample) => sample.value).slice(0, 3).join('\n'))}"></textarea>
            <div class="csf-actions">
              <button class="csf-button csf-button-primary" type="button" data-csf-rich-batch-run>${esc(labels.runBatch)}</button>
              <button class="csf-button" type="button" data-csf-rich-load-current>${esc(labels.useCurrentInput)}</button>
            </div>
          </article>
        </div>
        <div class="csf-rich-tabs" role="tablist">
          <button class="csf-rich-tab" type="button" aria-selected="true" data-csf-rich-tab="batch">${esc(labels.batchResult)}</button>
          <button class="csf-rich-tab" type="button" aria-selected="false" data-csf-rich-tab="json">${esc(labels.rawJson)}</button>
          <button class="csf-rich-tab" type="button" aria-selected="false" data-csf-rich-tab="related">${esc(labels.relatedLocalTools)}</button>
        </div>
        <div class="csf-rich-panel" data-csf-rich-panel="batch"><div class="csf-rich-output" data-csf-rich-batch-output><p>${esc(labels.batchEmpty)}</p></div></div>
        <div class="csf-rich-panel" data-csf-rich-panel="json" hidden><pre class="csf-rich-code" data-csf-rich-json>{}</pre></div>
        <div class="csf-rich-panel" data-csf-rich-panel="related" hidden>${renderRichRelatedLinks(suite, tool) || `<p>${esc(labels.relatedLocalFallback)}</p>`}</div>
      </details>
    `;
  }

  function cardGrid(items) {
    return `<div class="csf-grid">${asArray(items).map((item) => `
      <article class="csf-mini">
        <span class="csf-label">${esc(item.label)}</span>
        <strong>${esc(item.value)}</strong>
        ${item.note ? `<small class="csf-note">${esc(item.note)}</small>` : ''}
      </article>
    `).join('')}</div>`;
  }

  function renderTokenStrip(result) {
    const parts = asArray(result.breakdown).filter((part) => text(part.value).trim()).slice(0, 16);
    if (!parts.length) return '';
    return `<div class="csf-strip">${parts.map((part) => `
      <span class="csf-token" title="${esc(part.label || '')}: ${esc(part.note || '')}">${esc(shortValue(part.value, 12))}</span>
    `).join('')}</div>`;
  }

  function debuggerRows(result) {
    const rows = [];
    for (const check of asArray(result.checks)) {
      rows.push({ step: check.label, evidence: check.pass ? 'Pass' : 'Review', detail: check.text || '' });
    }
    for (const part of asArray(result.breakdown).slice(0, 8)) {
      rows.push({ step: part.label, evidence: part.value, detail: part.note || '' });
    }
    return rows.slice(0, 12);
  }

  function renderPipeline(suite, result) {
    const labels = labelsFor(suite);
    const resultPassed = result.status === 'success';
    return `
      <section class="csf-panel is-${result.status}">
        <div class="csf-section-head">
          <span class="csf-icon">✓</span>
          <div><h3>${esc(labels.validationPipeline)}</h3><p>${esc(labels.localChecksCompleted)}</p></div>
        </div>
        <div class="csf-bar"></div>
        <div class="csf-pipeline">${result.checks.map((check) => `
          <article class="csf-step ${resultPassed || check.pass ? 'is-pass' : 'is-review'}">
            <span>${esc(resultPassed || check.pass ? labels.pass : labels.review)}</span>
            <strong>${esc(check.label)}</strong>
            <small>${esc(check.text)}</small>
          </article>
        `).join('')}</div>
      </section>
    `;
  }

  function renderResult(suite, result) {
    const labels = labelsFor(suite);
    return `
      <section class="csf-result-card is-${result.status}">
        <div class="csf-result-top">
          <span class="csf-status">${result.status === 'success' ? '✓' : '!'}</span>
          <div><h2 class="csf-headline">${esc(result.headline)}</h2><p class="csf-detail">${esc(result.detail)}</p></div>
          <button class="csf-button" type="button" data-csf-copy-value="${esc(result.normalized)}">${esc(labels.copyNormalized)}</button>
        </div>
        <div class="csf-primary">${esc(result.primary)}</div>
        ${cardGrid(result.fields)}
      </section>
    `;
  }

  function renderBreakdown(suite, result) {
    const labels = labelsFor(suite);
    const isGeneratedAnatomy = asArray(result && result.developerJson && result.developerJson.anatomy).length > 0;
    const strip = isGeneratedAnatomy ? '' : renderTokenStrip(result);
    const segments = isGeneratedAnatomy ? '' : `<div class="csf-segments">${result.breakdown.map((part) => `
            <article class="csf-segment">
              <strong>${esc(part.value)}</strong>
              <span>${esc(part.label)}</span>
            </article>
          `).join('')}</div>`;
    return `
      <section class="csf-panel csf-breakdown">
        <div class="csf-section-head">
          <span class="csf-icon">▥</span>
          <div><h3>${esc(result.breakdownTitle || labels.fieldBreakdown)}</h3><p>${esc(result.breakdownSummary || labels.localStructuralSlices)}</p></div>
        </div>
        <div class="csf-breakdown-body">
          ${strip ? `<div class="csf-strip-panel"><span class="csf-strip-label">${esc(labels.identifierBreakdown)}</span>${strip}<p class="csf-note">${esc(labels.hoverBreakdown)}</p></div>` : ''}
          ${segments}
          ${cardGrid(result.breakdown)}
        </div>
      </section>
    `;
  }

  function renderQuality(suite, result) {
    const labels = labelsFor(suite);
    const notes = asArray(result.qualityNotes).slice(0, 4);
    const noteLabels = [labels.privacyBoundary, labels.officialLookupBoundary, labels.fixtureSafety, labels.developerHandling];
    const compactTitle = (value) => /^official lookup boundary$/i.test(text(value)) ? labels.officialLookupBoundary : value;
    return `
      <section class="csf-quality">
        <div class="csf-section-head">
          <span class="csf-icon">◇</span>
          <div><h3>${esc(labels.qualityNotes)}</h3><p>${esc(labels.qualityNotesSummary)}</p></div>
        </div>
        <div class="csf-grid">${notes.map((note, index) => `
          <article class="csf-mini">
            <span class="csf-label">${esc(noteLabels[index] || labels.qualityNote)}</span>
            <strong>${esc(compactTitle(note.title || noteLabels[index] || labels.qualityNote))}</strong>
            <small class="csf-note">${esc(note.text || note)}</small>
          </article>
        `).join('')}</div>
      </section>
    `;
  }

  function renderAdvanced(suite, result) {
    const labels = labelsFor(suite);
    const tool = suite.toolById && suite.toolById.get(result.developerJson && result.developerJson.tool) ? suite.toolById.get(result.developerJson.tool) : { id: result.developerJson && result.developerJson.tool || 'tool' };
    const locale = currentLocale();
    const L = (value) => localizeRuntimePhrase(value, locale);
    const rows = debuggerRows(result).map((row) => ({
      step: L(row.step),
      evidence: L(row.evidence),
      detail: L(row.detail)
    }));
    return `
      <section class="csf-results">
        <details class="csf-advanced" open>
          <summary>${esc(L(labels.calculationDebugger))}</summary>
          <div class="csf-debug-grid">
            <div>
              <div class="csf-section-head"><span class="csf-icon">▶</span><div><h3>${esc(L(labels.replayCalculation))}</h3><p>${esc(L(labels.validationLog))}</p></div></div>
              <table class="csf-debug-table">
                <thead><tr><th>${esc(L('Step'))}</th><th>${esc(L('Evidence'))}</th><th>${esc(L('Detail'))}</th></tr></thead>
                <tbody>${rows.map((row) => `<tr><td>${esc(row.step)}</td><td>${esc(row.evidence)}</td><td>${esc(row.detail)}</td></tr>`).join('')}</tbody>
              </table>
            </div>
          </div>
        </details>
        <details class="csf-advanced" open>
          <summary>${esc(L(labels.rawJsonOutput))}</summary>
          <div class="csf-json-head">
            <span>${esc(labels.browserBoundary)}</span>
            <button class="csf-button" type="button" data-csf-copy-json>${esc(labels.copyDeveloperJson || 'Copy developer JSON')}</button>
          </div>
          <pre data-csf-json-output>${esc(JSON.stringify(result.developerJson || result, null, 2))}</pre>
        </details>
      </section>
    `;
  }

  function renderResultBlocks(suite, result) {
    return `<section class="csf-results">${renderResult(suite, result)}${renderPipeline(suite, result)}${renderBreakdown(suite, result)}${renderQuality(suite, result)}${renderAdvanced(suite, result)}</section>`;
  }

  function createSuite(config) {
    const errors = validateSuiteConfig(config);
    if (errors.length) {
      throw new Error(`Country Suite Factory config invalid:\n- ${errors.join('\n- ')}`);
    }

    const suite = Object.assign({}, config);
    suite.tools = config.tools.map((tool) => Object.assign({ suiteId: config.suiteId }, tool));
    suite.toolById = new Map(suite.tools.map((tool) => [tool.id, tool]));

    function analyze(tool, input, context) {
      const handler = tool.analyze || config.analyze || defaultAnalyze;
      const rawResult = handler(tool, input, suite);
      return localizeResult(suite, normalizeResult(tool, enhanceAnalyzerResult(suite, tool, input, rawResult, context || {})));
    }

    function mount(target, options) {
      if (typeof document === 'undefined') return null;
      injectStyles();
      const requestedElement = typeof target === 'string' ? document.querySelector(target) : target;
      if (!requestedElement) return null;
      const rootElement = requestedElement.closest && requestedElement.closest('.workbench-card')
        ? requestedElement.closest('.workbench-card')
        : requestedElement;
      if (rootElement.dataset.csfMounted === suite.suiteId) return rootElement;

      const toolId = options && options.toolId
        ? options.toolId
        : requestedElement.dataset.toolId || rootElement.dataset.toolId || location.pathname.split('/').filter(Boolean).pop();
      const rawTool = suite.toolById.get(toolId) || suite.tools[0];
      const tool = localizeTool(suite, rawTool);
      const labels = labelsFor(suite);
      rootElement.dataset.csfMounted = suite.suiteId;
      rootElement.dataset.csfToolKind = isIbanGeneratorTool(tool) ? 'ibangenerator' : text(tool.kind || 'generic');
      rootElement.classList.add('csf-shell');
      if (rootElement !== requestedElement) rootElement.classList.add('csf-promoted-shell');
      rootElement.style.setProperty('--csf-accent', suite.theme.accent);
      rootElement.style.setProperty('--csf-accent-2', suite.theme.accent2);
      rootElement.style.setProperty('--csf-accent-3', suite.theme.accent3 || '#f59e0b');
      rootElement.innerHTML = `${renderHero(suite, tool)}${renderToolContext(suite, tool)}${renderRichLayer(suite, tool)}${renderIntegrationTraps(suite, tool)}${renderInput(suite, tool)}<div data-csf-output></div>`;

      const input = rootElement.querySelector('[data-csf-input]');
      const output = rootElement.querySelector('[data-csf-output]');
      const state = rootElement.querySelector('[data-csf-state]');
      const historySelect = rootElement.querySelector('[data-csf-history]');
      const batchInput = rootElement.querySelector('[data-csf-batch-input]');
      const batchResults = rootElement.querySelector('[data-csf-batch-results]');
      const richHistorySelect = rootElement.querySelector('[data-csf-rich-history]');
      const richBatchInput = rootElement.querySelector('[data-csf-rich-batch-input]');
      const richBatchResults = rootElement.querySelector('[data-csf-rich-batch-output]');
      const richJson = rootElement.querySelector('[data-csf-rich-json]');
      const ibanInstant = rootElement.querySelector('[data-csf-iban-instant]');
      const ibanInstantValue = rootElement.querySelector('[data-csf-iban-instant-value]');
      const ibanInstantMeta = rootElement.querySelector('[data-csf-iban-instant-meta]');
      const ibanQuickCopy = rootElement.querySelector('[data-csf-iban-copy]');
      const ibanBatchCount = rootElement.querySelector('[data-csf-iban-batch-count]');
      const ibanBatchGenerate = rootElement.querySelector('[data-csf-iban-batch-generate]');
      const ibanBatchCopy = rootElement.querySelector('[data-csf-iban-batch-copy]');
      const ibanBatchOutput = rootElement.querySelector('[data-csf-iban-batch-output]');
      let lastResult = null;
      let lastBatch = [];
      let activeSampleIntent = sampleIntent(tool.samples[0]);

      function refreshHistory() {
        const history = readHistory(suite, tool);
        const options = `<option value="">${esc(labels.noHistory)}</option>${history.map((item) => `<option value="${esc(item)}">${esc(shortValue(item, 52))}</option>`).join('')}`;
        if (historySelect) historySelect.innerHTML = options;
        if (richHistorySelect) richHistorySelect.innerHTML = options;
      }

      function richSnapshot() {
        const result = lastResult || analyze(rawTool, input.value, { sampleIntent: activeSampleIntent });
        return {
          country: suite.country.name,
          countrySlug: suite.country.slug,
          tool: tool.id,
          route: routePath(),
          input: input.value,
          status: result.status,
          normalized: result.normalized,
          headline: result.headline,
          fields: result.fields,
          checks: result.checks,
          breakdown: result.breakdown,
          offlineOnly: true,
          capturedAt: new Date().toISOString()
        };
      }

      function refreshRichPanels() {
        const result = lastResult || analyze(rawTool, input.value, { sampleIntent: activeSampleIntent });
        if (richJson) richJson.textContent = JSON.stringify(richSnapshot(), null, 2);
      }

      function syncIbanInstant(result, batchText) {
        if (!isIbanGeneratorTool(tool) || !ibanInstant || !result || !result.normalized) return;
        ibanInstant.hidden = false;
        ibanInstant.dataset.csfIbanCopyValue = result.normalized;
        if (ibanInstantValue) ibanInstantValue.textContent = result.primary || groupIban(result.normalized);
        if (ibanInstantMeta) {
          const data = result.developerJson || {};
          ibanInstantMeta.textContent = `${data.country || suite.country.iso2 || suite.country.name} / ${data.checkDigits || '--'} check digits / MOD-97 ${data.mod97 == null ? '--' : data.mod97}`;
        }
        if (batchText && ibanBatchOutput) {
          ibanBatchOutput.value = batchText;
          ibanBatchOutput.hidden = false;
          if (ibanBatchCopy) ibanBatchCopy.disabled = false;
        }
      }

      function resetIbanInstant() {
        if (ibanInstant) {
          ibanInstant.hidden = true;
          delete ibanInstant.dataset.csfIbanCopyValue;
        }
        if (ibanInstantValue) ibanInstantValue.textContent = '';
        if (ibanInstantMeta) ibanInstantMeta.textContent = '';
        if (ibanBatchOutput) {
          ibanBatchOutput.value = '';
          ibanBatchOutput.hidden = true;
        }
        if (ibanBatchCopy) ibanBatchCopy.disabled = true;
      }

      function run(options) {
        const shouldFreshGenerate = options && options.freshGenerate && isIbanGeneratorTool(tool) && activeSampleIntent !== 'review' && !intentionalReviewFixture(input.value);
        if (shouldFreshGenerate) {
          input.value = freshIbanGeneratorInput(suite, tool, input.value);
          activeSampleIntent = 'valid';
        }
        lastResult = analyze(rawTool, input.value, { sampleIntent: activeSampleIntent });
        output.innerHTML = renderResultBlocks(suite, lastResult);
        state.textContent = lastResult.status === 'success' ? labels.offlinePassed : labels.reviewNeeded;
        state.dataset.state = lastResult.status;
        syncIbanInstant(lastResult);
        writeHistory(suite, tool, input.value);
        refreshHistory();
        refreshRichPanels();
      }

      function runBatch() {
        const values = text(batchInput && batchInput.value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 100);
        lastBatch = values.map((value) => {
          const result = analyze(rawTool, value, { sampleIntent: intentionalReviewFixture(value) ? 'review' : '' });
          return {
            input: value,
            status: result.status,
            normalized: result.normalized,
            headline: result.headline,
            checks: result.checks
          };
        });
        if (batchResults) {
          batchResults.innerHTML = lastBatch.map((item) => `
            <div class="csf-batch-item is-${esc(item.status)}">
              <span>${esc(shortValue(item.input, 72))}</span>
              <strong>${esc(item.status === 'success' ? labels.pass : labels.review)}</strong>
            </div>
          `).join('');
        }
      }

      function runRichBatch() {
        const values = text(richBatchInput && richBatchInput.value).split(/\r?\n/).map((item) => item.trim()).filter(Boolean).slice(0, 100);
        if (!values.length) {
          if (richBatchResults) richBatchResults.innerHTML = `<p>${esc(labels.pasteOnePerLine)}</p>`;
          return;
        }
        const previous = input.value;
        const rows = values.map((value, index) => {
          const result = analyze(rawTool, value, { sampleIntent: intentionalReviewFixture(value) ? 'review' : '' });
          writeHistory(suite, tool, value);
          return {
            index: index + 1,
            input: value,
            status: result.status,
            output: result.primary || result.normalized || result.headline
          };
        });
        input.value = previous;
        if (richBatchResults) {
          richBatchResults.innerHTML = rows.map((item) => `
            <div class="csf-rich-line">
              <strong>#${esc(item.index)}</strong>
              <code>${esc(shortValue(item.input, 90))}</code>
              <span class="${item.status === 'success' ? 'csf-rich-pass' : 'csf-rich-review'}">${esc(item.status === 'success' ? labels.pass : labels.review)}</span>
              <span>${esc(shortValue(item.output, 120))}</span>
            </div>
          `).join('');
        }
        lastBatch = rows;
        refreshHistory();
        refreshRichPanels();
      }

      rootElement.querySelector('[data-csf-run]').addEventListener('click', () => run({ freshGenerate: true }));
      rootElement.querySelector('[data-csf-clear]').addEventListener('click', () => {
        input.value = '';
        activeSampleIntent = '';
        output.innerHTML = '';
        state.textContent = labels.waiting;
        state.dataset.state = 'waiting';
        resetIbanInstant();
      });
      rootElement.querySelector('[data-csf-copy]').addEventListener('click', (event) => {
        const value = lastResult ? lastResult.normalized : input.value;
        if (value != null) copyText(suite, value, null, event.currentTarget);
      });
      rootElement.querySelector('[data-csf-download]').addEventListener('click', () => {
        const value = lastResult ? JSON.stringify(lastResult.developerJson || lastResult, null, 2) : input.value;
        const blob = new Blob([value], { type: 'application/json;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${tool.id}-analysis.json`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
      rootElement.addEventListener('click', (event) => {
        const copy = event.target.closest('[data-csf-copy-value]');
        if (copy) copyText(suite, copy.dataset.csfCopyValue || '', null, copy);
        const copyJson = event.target.closest('[data-csf-copy-json]');
        if (copyJson) {
          const value = JSON.stringify(lastResult && (lastResult.developerJson || lastResult) || richSnapshot(), null, 2);
          copyText(suite, value, labels.copyDeveloperJson || 'Copy developer JSON', copyJson);
        }
        const repair = event.target.closest('[data-csf-repair-action]');
        if (!repair) return;
        const action = repair.dataset.csfRepairAction;
        if (action === 'copy-normalized') {
          copyText(suite, text(lastResult && lastResult.normalized || input.value), null, repair);
        }
        if (action === 'load-valid') {
          const sample = tool.samples.find((item) => item.tone === 'success') || tool.samples[0];
          if (sample) {
            input.value = sample.value;
            activeSampleIntent = sampleIntent(sample);
            run();
          }
        }
        if (action === 'load-invalid') {
          const sample = tool.samples.find((item) => item.tone === 'review' && /invalid/i.test(item.label)) || tool.samples.find((item) => item.tone === 'review');
          if (sample) {
            input.value = sample.value;
            activeSampleIntent = sampleIntent(sample);
            run();
          }
        }
        if (action === 'use-short') {
          input.value = makeShortSample(input.value || (tool.samples[0] && tool.samples[0].value) || '');
          activeSampleIntent = 'review';
          run();
        }
        if (action === 'run-batch') {
          const values = tool.samples.map((item) => item.value).filter(Boolean).slice(0, 6).join('\n');
          if (richBatchInput) {
            richBatchInput.value = values;
            runRichBatch();
            const richLayer = rootElement.querySelector('[data-csf-rich-layer]');
            if (richLayer) richLayer.open = true;
          } else if (batchInput) {
            batchInput.value = values;
            runBatch();
          }
        }
      });
      rootElement.querySelectorAll('[data-csf-sample]').forEach((button) => {
        button.addEventListener('click', () => {
          const sample = tool.samples[Number(button.dataset.csfSample)] || tool.samples[0];
          input.value = sample.value;
          activeSampleIntent = button.dataset.csfSampleIntent || sampleIntent(sample);
          run();
        });
      });
      if (historySelect) historySelect.addEventListener('change', () => {
        if (historySelect.value) {
          input.value = historySelect.value;
          activeSampleIntent = intentionalReviewFixture(input.value) ? 'review' : '';
          run();
        }
      });
      if (richHistorySelect) richHistorySelect.addEventListener('change', () => {
        if (richHistorySelect.value) {
          input.value = richHistorySelect.value;
          activeSampleIntent = intentionalReviewFixture(input.value) ? 'review' : '';
          run();
        }
      });
      input.addEventListener('input', () => {
        activeSampleIntent = intentionalReviewFixture(input.value) ? 'review' : '';
      });
      const batchRun = rootElement.querySelector('[data-csf-batch-run]');
      if (batchRun) batchRun.addEventListener('click', runBatch);
      const richBatchRun = rootElement.querySelector('[data-csf-rich-batch-run]');
      if (richBatchRun) richBatchRun.addEventListener('click', runRichBatch);
      const richLoadCurrent = rootElement.querySelector('[data-csf-rich-load-current]');
      if (richLoadCurrent) richLoadCurrent.addEventListener('click', () => {
        if (richBatchInput) richBatchInput.value = input.value || '';
      });
      rootElement.querySelectorAll('[data-csf-rich-tab]').forEach((tab) => {
        tab.addEventListener('click', () => {
          const id = tab.dataset.csfRichTab;
          rootElement.querySelectorAll('[data-csf-rich-tab]').forEach((item) => item.setAttribute('aria-selected', item === tab ? 'true' : 'false'));
          rootElement.querySelectorAll('[data-csf-rich-panel]').forEach((panel) => { panel.hidden = panel.dataset.csfRichPanel !== id; });
          refreshRichPanels();
        });
      });
      const batchCopy = rootElement.querySelector('[data-csf-batch-copy]');
      if (batchCopy) batchCopy.addEventListener('click', (event) => {
        copyText(suite, JSON.stringify(lastBatch, null, 2), null, event.currentTarget);
      });
      const batchClear = rootElement.querySelector('[data-csf-batch-clear]');
      if (batchClear) batchClear.addEventListener('click', () => {
        if (batchInput) batchInput.value = '';
        if (batchResults) batchResults.innerHTML = '';
        lastBatch = [];
      });
      if (ibanQuickCopy) {
        ibanQuickCopy.addEventListener('click', (event) => {
          const value = ibanInstant && ibanInstant.dataset.csfIbanCopyValue;
          if (value) copyText(suite, value, labels.copyResult, event.currentTarget);
        });
      }
      if (ibanBatchGenerate) {
        ibanBatchGenerate.addEventListener('click', () => {
          const count = Number(ibanBatchCount && ibanBatchCount.value) || 10;
          const rows = generateIbanBatchRows(suite, tool, input.value, count);
          if (!rows.length) return;
          input.value = rows[0].bban;
          activeSampleIntent = 'valid';
          lastResult = analyze(rawTool, input.value, { sampleIntent: activeSampleIntent });
          output.innerHTML = renderResultBlocks(suite, lastResult);
          state.textContent = labels.offlinePassed;
          state.dataset.state = 'success';
          syncIbanInstant(lastResult, rows.map((row) => row.grouped).join('\n'));
          writeHistory(suite, tool, input.value);
          refreshHistory();
          refreshRichPanels();
        });
      }
      if (ibanBatchCopy) {
        ibanBatchCopy.addEventListener('click', (event) => {
          const value = ibanBatchOutput && ibanBatchOutput.value;
          if (value) copyText(suite, value, labels.copyBatchJson || labels.copyResult, event.currentTarget);
        });
      }
      run();
      refreshRichPanels();
      return rootElement;
    }

    return {
      version: VERSION,
      config: suite,
      validate: () => validateSuiteConfig(suite),
      analyze,
      mount
    };
  }

  root.ValidoHubCountrySuiteFactory = {
    version: VERSION,
    validateSuiteConfig,
    createSuite
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
