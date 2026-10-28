import { ArrowUpRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function ContactBanner() {
  const t = await getTranslations('Contact');
  return <section className="contact-banner"><div><p className="eyebrow">{t('label')}</p><h2><Link href="/contact">{t('homeCta')}</Link></h2><p>{t('homeBody')}</p></div><Link href="/contact" className="contact-circle" aria-label={t('title')}><ArrowUpRight size={36} strokeWidth={1.4} /></Link></section>;
}
