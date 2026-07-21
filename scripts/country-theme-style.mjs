function rgbTriplet(value, fallback) {
  const source = Array.isArray(value) ? value.join(' ') : String(value || '');
  const parts = source.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number) || [];
  if (parts.length !== 3 || parts.some(part => !Number.isFinite(part))) return fallback;
  return parts.map(part => Math.max(0, Math.min(255, Math.round(part)))).join(' ');
}

export function countryThemeStyle(model) {
  const identity = model?.visualIdentity || {};
  const primary = rgbTriplet(identity.heroAccentPrimary || identity.accentPrimary || identity.primary, '15 118 110');
  const secondary = rgbTriplet(identity.heroAccentSecondary || identity.accentSecondary || identity.secondary, '37 99 235');
  const tertiary = rgbTriplet(identity.heroAccentTertiary || identity.accentTertiary || identity.tertiary, '255 255 255');

  return [
    `--vh-country-accent-primary: ${primary}`,
    `--vh-country-accent-secondary: ${secondary}`,
    `--vh-country-accent-tertiary: ${tertiary}`,
    `--vh-country-flag-color-1: ${primary}`,
    `--vh-country-flag-color-2: ${secondary}`,
    `--vh-country-flag-color-3: ${tertiary}`
  ].join('; ');
}

export function countryThemeStyleAttr(model) {
  return `style="${countryThemeStyle(model)}"`;
}
