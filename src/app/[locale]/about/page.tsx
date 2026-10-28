import { getTranslations } from 'next-intl/server';
import { resolveLocale, type PageProps } from '@/lib/locale';
import { pageMetadata } from '@/lib/metadata';
import { Monogram } from '@/components/brand';
import { TechnologySection } from '@/components/technology-section';
import { ContactBanner } from '@/components/contact-banner';

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const t = await getTranslations('Meta');
  return pageMetadata(locale, '/about', t('about'), t('aboutDescription'));
}

export default async function AboutPage({ params }: PageProps) {
  await resolveLocale(params);
  const t = await getTranslations('About');
  return <div className="container"><header className="page-header"><p className="eyebrow">{t('label')}</p><h1>{t('title')}</h1></header>
    <div className="bio-layout"><div className="bio-copy"><p>{t('intro')}</p><p>{t('body')}</p><p>{t('body2')}</p></div><div className="bio-mark"><Monogram /></div></div>
    <section className="section" id="education"><p className="eyebrow">{t('educationLabel')}</p><h2 className="section-title">{t('educationTitle')}</h2><div className="education-panel"><div><h3>{t('degree')}</h3><p>{t('university')}</p><p>{t('location')}</p></div><div className="education-status"><span className="status-dot" />{t('status')}</div></div></section>
    <section className="section"><h2 className="section-title">{t('approach')}</h2><div className="principles-grid">{([1, 2, 3] as const).map(n => <div key={n}><span className="mono">0{n}</span><h3>{t(`principle${n}`)}</h3><p>{t(`principle${n}Body`)}</p></div>)}</div></section>
    <TechnologySection /><ContactBanner />
  </div>;
}
