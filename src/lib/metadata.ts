import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { identity } from './identity';

export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const canonical = `${identity.links.portfolio}/${locale}${path}`;
  const fullTitle = title.startsWith(`${identity.name} |`)
    ? title
    : `${title} | ${title.includes(identity.name) ? identity.brand : `${identity.name} | ${identity.brand}`}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical,
      languages: { en: `${identity.links.portfolio}/en${path}`, 'pt-BR': `${identity.links.portfolio}/pt${path}`, 'x-default': `${identity.links.portfolio}/en${path}` }
    },
    openGraph: {
      title, description, url: canonical, siteName: identity.brand,
      locale: locale === 'pt' ? 'pt_BR' : 'en_US', type: 'website',
      images: [{ url: `${identity.links.portfolio}/${locale}/opengraph-image`, width: 1200, height: 630, alt: locale === 'pt' ? 'Matheus Sulino | Desenvolvedor Full Stack — VRAS CODE' : identity.pageTitle }]
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${identity.links.portfolio}/${locale}/opengraph-image`] }
  };
}

export const publicPaths = ['', '/projects', '/about', '/experience', '/contact'];
