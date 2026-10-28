import identity from '../../content/identity.json';
import type { Locale } from '@/i18n/routing';

export { identity };
export const getIdentity = (locale: Locale) => identity.locales[locale === 'pt' ? 'pt-BR' : 'en'];
