import { getTranslations } from 'next-intl/server';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { identity } from '@/lib/identity';
import { CopyProfile } from '@/components/copy-profile';
import { ProfileLinks } from '@/components/profile-links';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/contact', t('contact'), t('contactDescription'));
}

export default async function ContactPage({ params }: PageProps) {
  await resolveLocale(params);
  const t = await getTranslations('Contact');
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1><p>{t('body')}</p></header><div className="contact-layout"><div><ProfileLinks /><div className="hero-actions"><CopyProfile /></div></div><aside className="contact-location"><p className="eyebrow">{t('locationLabel')}</p><p>{t('location')}</p><p className="role-note">{identity.name}<br />{t('role')}</p></aside></div></div>;
}
