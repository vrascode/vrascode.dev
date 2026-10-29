import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import '@/app/globals.css';
import { routing } from '@/i18n/routing';
import { identity } from '@/lib/identity';
import { Providers } from '@/components/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';

// SHA-256 of public/images/vras-icon2.png, used to invalidate previously cached icons.
const faviconVersion = '?v=3abf1b3f21c6b5a6ecf251505abeb3d3a01f5dc3554544466aa7f7684e862990';

export const metadata: Metadata = {
  metadataBase: new URL(identity.links.portfolio),
  applicationName: identity.brand,
  authors: [{ name: identity.name, url: identity.links.github }],
  creator: identity.name,
  icons: {
    icon: [
      { url: `/images/vras-icon2.png${faviconVersion}`, type: 'image/png', sizes: '1254x1254' },
      { url: `/favicon.ico${faviconVersion}`, sizes: 'any' }
    ],
    apple: [{ url: `/apple-touch-icon.png${faviconVersion}`, type: 'image/png', sizes: '180x180' }]
  },
  robots: process.env.VERCEL_ENV === 'preview' ? { index: false, follow: false } : { index: true, follow: true }
};

export function generateStaticParams() { return routing.locales.map(locale => ({ locale })); }

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <html lang={locale === 'pt' ? 'pt-BR' : 'en'} suppressHydrationWarning><body><NextIntlClientProvider><Providers><Header /><main id="main" tabIndex={-1}>{children}</main><Footer /><BackToTop /></Providers></NextIntlClientProvider></body></html>;
}
