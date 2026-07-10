(function () {
  'use strict';

  const BRAND_REGISTRY = {
    pix: brand('PIX', 'Payment system', 'glyph', 'Not bundled', 'payment-transfer', 'Payment transfer glyph', 'Banco Central do Brasil PIX documentation', 'Use a project-owned transfer glyph until official usage is approved.'),
    java: brand('Java', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Oracle Java brand resources', 'Use monochrome wordmark treatment unless official usage is approved.'),
    python: brand('Python', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Python Software Foundation trademark usage policy', 'Use monochrome wordmark treatment unless official usage is approved.'),
    go: brand('Go', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Go brand guidelines', 'Use monochrome wordmark treatment unless official usage is approved.'),
    kotlin: brand('Kotlin', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Kotlin brand assets', 'Use monochrome wordmark treatment unless official usage is approved.'),
    csharp: brand('C#', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Microsoft trademark guidelines', 'Use text-first monochrome treatment.'),
    dotnet: brand('.NET', 'Framework', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Microsoft trademark guidelines', 'Use text-first monochrome treatment.'),
    nodejs: brand('Node.js', 'Runtime', 'monochrome', 'Not bundled', 'runtime', 'Runtime glyph', 'OpenJS Foundation trademark policy', 'Use monochrome wordmark treatment unless official usage is approved.'),
    react: brand('React', 'Framework', 'monochrome', 'Not bundled', 'framework', 'Framework glyph', 'Meta open source brand guidance', 'Use monochrome wordmark treatment unless official usage is approved.'),
    nextjs: brand('Next.js', 'Framework', 'monochrome', 'Not bundled', 'framework', 'Framework glyph', 'Vercel brand resources', 'Use monochrome wordmark treatment unless official usage is approved.'),
    typescript: brand('TypeScript', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Microsoft trademark guidelines', 'Use text-first monochrome treatment.'),
    javascript: brand('JavaScript', 'Programming language', 'monochrome', 'Not bundled', 'code', 'Code glyph', 'Ecma International language references', 'Use text-first monochrome treatment.'),
    docker: brand('Docker', 'Platform', 'monochrome', 'Not bundled', 'container', 'Container glyph', 'Docker brand guidelines', 'Use monochrome treatment unless official usage is approved.'),
    kubernetes: brand('Kubernetes', 'Platform', 'monochrome', 'Not bundled', 'orchestration', 'Orchestration glyph', 'CNCF project artwork guidance', 'Use monochrome treatment unless official usage is approved.'),
    postgresql: brand('PostgreSQL', 'Database', 'monochrome', 'Not bundled', 'database', 'Database glyph', 'PostgreSQL trademark policy', 'Use monochrome wordmark treatment unless official usage is approved.'),
    mysql: brand('MySQL', 'Database', 'monochrome', 'Not bundled', 'database', 'Database glyph', 'Oracle trademark guidelines', 'Use monochrome wordmark treatment unless official usage is approved.'),
    mongodb: brand('MongoDB', 'Database', 'monochrome', 'Not bundled', 'database', 'Database glyph', 'MongoDB brand resources', 'Use monochrome wordmark treatment unless official usage is approved.'),
    redis: brand('Redis', 'Database', 'monochrome', 'Not bundled', 'database', 'Database glyph', 'Redis trademark policy', 'Use monochrome wordmark treatment unless official usage is approved.'),
    jwt: brand('JWT', 'Standard', 'glyph', 'Not bundled', 'token', 'Token glyph', 'JWT introduction and specification references', 'Use a project-owned token glyph.'),
    stripe: brand('Stripe', 'Payment platform', 'monochrome', 'Not bundled', 'payment-card', 'Payment card glyph', 'Stripe trademark and brand guidelines', 'Use monochrome treatment unless official usage is approved.'),
    visa: brand('Visa', 'Payment network', 'glyph', 'Not bundled', 'payment-card', 'Payment card glyph', 'Visa brand and trademark guidance', 'Use payment-card glyph unless official usage is approved.'),
    mastercard: brand('Mastercard', 'Payment network', 'glyph', 'Not bundled', 'payment-card', 'Payment card glyph', 'Mastercard brand center', 'Use payment-card glyph unless official usage is approved.'),
    amex: brand('American Express', 'Payment network', 'glyph', 'Not bundled', 'payment-card', 'Payment card glyph', 'American Express trademark guidance', 'Use payment-card glyph unless official usage is approved.'),
    swift: brand('SWIFT', 'Financial messaging standard', 'glyph', 'Not bundled', 'international-transfer', 'International transfer glyph', 'SWIFT trademark guidance', 'Use a project-owned international transfer glyph.'),
    sepa: brand('SEPA', 'Payment area standard', 'semantic', 'No single official product logo required', 'payment-area', 'Payment area glyph', 'European Payments Council SEPA references', 'Use semantic payment area glyph.'),
    iban: brand('IBAN', 'Banking standard', 'semantic', 'No single official product logo required', 'bank-account', 'Bank account glyph', 'ISO 13616 / SWIFT IBAN registry references', 'Use semantic bank-account glyph.'),
    bizum: brand('Bizum', 'Payment system', 'glyph', 'Not bundled', 'payment-transfer', 'Payment transfer glyph', 'Bizum official service references', 'Use a project-owned transfer glyph until official usage is approved.'),
    vies: brand('VIES', 'EU VAT validation system', 'glyph', 'Not bundled', 'tax-document', 'Tax document glyph', 'European Commission VIES references', 'Use a project-owned tax document glyph.'),
    europeanUnion: brand('European Union', 'Public institution', 'glyph', 'Not bundled', 'government-portal', 'Government portal glyph', 'European Union official site', 'Use a project-owned public institution glyph until official usage is approved.'),
    gobiernoEspana: brand('Gobierno de España', 'Government portal', 'glyph', 'Not bundled', 'government-portal', 'Government portal glyph', 'La Moncloa and Administracion.gob.es official references', 'Use a project-owned government portal glyph until official usage is approved.'),
    agenciaTributaria: brand('Agencia Tributaria', 'Tax authority', 'glyph', 'Not bundled', 'tax-document', 'Tax document glyph', 'Agencia Tributaria official site', 'Use a project-owned tax document glyph until official usage is approved.'),
    seguridadSocialEspana: brand('Seguridad Social', 'Social security authority', 'glyph', 'Not bundled', 'government-portal', 'Government portal glyph', 'Seguridad Social official portal', 'Use a project-owned government portal glyph until official usage is approved.'),
    bancoEspana: brand('Banco de España', 'Central bank', 'glyph', 'Not bundled', 'central-bank', 'Central bank glyph', 'Banco de España official site', 'Use a project-owned central bank glyph until official usage is approved.'),
    correosEspana: brand('Correos', 'Postal authority', 'glyph', 'Not bundled', 'postal', 'Postal glyph', 'Correos official site', 'Use a project-owned postal glyph until official usage is approved.'),
    github: brand('GitHub', 'Developer platform', 'monochrome', 'Not bundled', 'code-host', 'Code host glyph', 'GitHub logos and usage guidelines', 'Use monochrome treatment unless official usage is approved.'),
    openapi: brand('OpenAPI', 'API specification', 'monochrome', 'Not bundled', 'api', 'API glyph', 'OpenAPI Initiative references', 'Use monochrome treatment unless official usage is approved.'),
    graphql: brand('GraphQL', 'API query language', 'monochrome', 'Not bundled', 'api', 'API glyph', 'GraphQL trademark guidance', 'Use monochrome treatment unless official usage is approved.'),
    govbr: brand('gov.br', 'Government portal', 'glyph', 'Not bundled', 'government-portal', 'Government portal glyph', 'gov.br brand and service references', 'Use a project-owned government portal glyph until official usage is approved.'),
    bancoCentralBrasil: brand('Banco Central do Brasil', 'Central bank', 'glyph', 'Not bundled', 'central-bank', 'Central bank glyph', 'Banco Central do Brasil official site', 'Use a project-owned central bank glyph until official usage is approved.'),
    receitaFederal: brand('Receita Federal', 'Tax authority', 'glyph', 'Not bundled', 'tax-document', 'Tax document glyph', 'Receita Federal official site', 'Use a project-owned tax document glyph until official usage is approved.'),
    correios: brand('Correios', 'Postal authority', 'glyph', 'Not bundled', 'postal', 'Postal glyph', 'Correios official site', 'Use a project-owned postal glyph until official usage is approved.')
  };

  function brand(name, category, mode, officialAvailability, glyph, semanticFallback, documentationSource, notes) {
    return {
      name,
      category,
      preferredRenderingMode: mode,
      officialAssetAvailability: officialAvailability,
      monochromeAsset: mode === 'monochrome' ? 'Registered monochrome text treatment' : 'Not configured',
      glyphAsset: glyph,
      semanticFallback,
      documentationSource,
      notes
    };
  }

  function getBrand(key) {
    return BRAND_REGISTRY[key] || null;
  }

  function createBrandMark(key, options) {
    const brandEntry = getBrand(key);
    if (!brandEntry) {
      return null;
    }

    const mark = document.createElement('span');
    mark.className = `brand-asset brand-asset-${brandEntry.preferredRenderingMode}`;
    mark.dataset.brandKey = key;
    mark.dataset.brandMode = brandEntry.preferredRenderingMode;
    mark.title = `${brandEntry.name} - ${brandEntry.preferredRenderingMode}`;
    mark.setAttribute('aria-label', brandEntry.name);

    const symbol = document.createElement('span');
    symbol.className = 'brand-asset-symbol';
    symbol.setAttribute('aria-hidden', 'true');
    symbol.appendChild(createGlyph(brandEntry.glyphAsset));

    const label = document.createElement('span');
    label.className = 'brand-asset-label';
    label.textContent = (options && options.label) || brandEntry.name;

    mark.append(symbol, label);
    return mark;
  }

  function createGlyph(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('aria-hidden', 'true');
    svg.classList.add('brand-asset-svg');
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('fill', 'none');
    group.setAttribute('stroke', 'currentColor');
    group.setAttribute('stroke-width', '2');
    group.setAttribute('stroke-linecap', 'round');
    group.setAttribute('stroke-linejoin', 'round');
    svg.appendChild(group);

    const add = (tag, attrs) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([attr, value]) => node.setAttribute(attr, value));
      group.appendChild(node);
      return node;
    };

    switch (name) {
      case 'payment-transfer':
        add('path', { d: 'M9 10h11' });
        add('path', { d: 'M17 7l4 3-4 3' });
        add('path', { d: 'M23 22H12' });
        add('path', { d: 'M15 19l-4 3 4 3' });
        add('rect', { x: '5', y: '5', width: '22', height: '22', rx: '7' });
        break;
      case 'central-bank':
        add('path', { d: 'M6 14h20' });
        add('path', { d: 'M8 14v9' });
        add('path', { d: 'M14 14v9' });
        add('path', { d: 'M20 14v9' });
        add('path', { d: 'M24 14v9' });
        add('path', { d: 'M5 24h22' });
        add('path', { d: 'M16 6l10 6H6l10-6z' });
        break;
      case 'government-portal':
        add('rect', { x: '6', y: '7', width: '20', height: '18', rx: '4' });
        add('path', { d: 'M10 13h12' });
        add('path', { d: 'M10 18h7' });
        add('circle', { cx: '22', cy: '20', r: '2' });
        break;
      case 'tax-document':
        add('path', { d: 'M10 5h9l5 5v17H10z' });
        add('path', { d: 'M19 5v6h5' });
        add('path', { d: 'M14 16h6' });
        add('path', { d: 'M14 21h4' });
        break;
      case 'postal':
        add('rect', { x: '5', y: '9', width: '22', height: '15', rx: '3' });
        add('path', { d: 'M6 11l10 8 10-8' });
        break;
      case 'international-transfer':
        add('circle', { cx: '16', cy: '16', r: '10' });
        add('path', { d: 'M6 16h20' });
        add('path', { d: 'M16 6c3 3 4 6 4 10s-1 7-4 10' });
        add('path', { d: 'M16 6c-3 3-4 6-4 10s1 7 4 10' });
        add('path', { d: 'M22 11l4 3-4 3' });
        break;
      case 'bank-account':
        add('rect', { x: '6', y: '9', width: '20', height: '14', rx: '3' });
        add('path', { d: 'M10 14h12' });
        add('path', { d: 'M10 18h7' });
        break;
      case 'payment-card':
        add('rect', { x: '5', y: '9', width: '22', height: '14', rx: '3' });
        add('path', { d: 'M5 14h22' });
        add('path', { d: 'M10 19h4' });
        break;
      case 'token':
        add('rect', { x: '5', y: '8', width: '22', height: '16', rx: '4' });
        add('path', { d: 'M10 13h3' });
        add('path', { d: 'M15 13h7' });
        add('path', { d: 'M10 18h8' });
        add('path', { d: 'M20 18h2' });
        break;
      case 'database':
        add('ellipse', { cx: '16', cy: '8', rx: '9', ry: '4' });
        add('path', { d: 'M7 8v12c0 2.2 4 4 9 4s9-1.8 9-4V8' });
        add('path', { d: 'M7 14c0 2.2 4 4 9 4s9-1.8 9-4' });
        break;
      case 'api':
        add('rect', { x: '6', y: '7', width: '20', height: '18', rx: '4' });
        add('path', { d: 'M11 16h10' });
        add('path', { d: 'M16 11v10' });
        break;
      case 'code-host':
        add('rect', { x: '6', y: '8', width: '20', height: '16', rx: '4' });
        add('path', { d: 'M12 14l-3 3 3 3' });
        add('path', { d: 'M20 14l3 3-3 3' });
        break;
      case 'container':
        add('rect', { x: '6', y: '10', width: '20', height: '12', rx: '3' });
        add('path', { d: 'M10 10V7h5v3' });
        add('path', { d: 'M17 10V7h5v3' });
        add('path', { d: 'M10 16h12' });
        break;
      case 'orchestration':
        add('circle', { cx: '16', cy: '16', r: '8' });
        add('path', { d: 'M16 8v16' });
        add('path', { d: 'M8 16h16' });
        add('path', { d: 'M10.5 10.5l11 11' });
        add('path', { d: 'M21.5 10.5l-11 11' });
        break;
      case 'runtime':
      case 'framework':
      case 'code':
      default:
        add('path', { d: 'M12 11l-5 5 5 5' });
        add('path', { d: 'M20 11l5 5-5 5' });
        add('path', { d: 'M18 8l-4 16' });
        break;
    }
    return svg;
  }

  window.ValidoHubBrands = {
    registry: BRAND_REGISTRY,
    getBrand,
    createBrandMark
  };
}());
