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

// SHA-256 of the rounded favicon derivative, used to invalidate cached icons.
const faviconVersion = '?v=9aa196ee2fe97e529f3371cffe080417cc7c9954f811ca26afa0c6fa8bcf26f1';

export const metadata: Metadata = {
  metadataBase: new URL(identity.links.portfolio),
  applicationName: identity.brand,
  authors: [{ name: identity.name, url: identity.links.github }],
  creator: identity.name,
  icons: {
    icon: [
      { url: `/images/vras-icon-rounded.png${faviconVersion}`, type: 'image/png', sizes: '1254x1254' },
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
