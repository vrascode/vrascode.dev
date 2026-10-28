import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { identity } from '@/lib/identity';
import { publicPaths } from '@/lib/metadata';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...publicPaths, ...projects.map(project => `/projects/${project.slug}`)];
  return routing.locales.flatMap(locale => paths.map(path => ({
    url: `${identity.links.portfolio}/${locale}${path}`,
    alternates: { languages: { en: `${identity.links.portfolio}/en${path}`, 'pt-BR': `${identity.links.portfolio}/pt${path}` } }
  })));
}
