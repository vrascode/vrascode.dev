import type { MetadataRoute } from 'next';
import { identity } from '@/lib/identity';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', ...(process.env.VERCEL_ENV === 'preview' ? { disallow: '/' } : { allow: '/' }) }, sitemap: `${identity.links.portfolio}/sitemap.xml`, host: identity.links.portfolio };
}
