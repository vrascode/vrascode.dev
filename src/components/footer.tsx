import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { identity } from '@/lib/identity';
import { Brand } from './brand';

export async function Footer() {
  const t = await getTranslations('Footer');
  return <footer className="site-footer"><div className="container">
    <div className="footer-top"><Link href="/" aria-label={identity.brand}><Brand /></Link><p>{t('note')}</p><div className="footer-links"><a href={identity.links.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14} /></a><a href={identity.links.repository} target="_blank" rel="noopener noreferrer">{t('source')} <ArrowUpRight size={14} /></a></div></div>
    <div className="footer-bottom"><span>{t('rights', { year: new Date().getFullYear() })}</span><span>{t('location')}<span className="footer-dot">·</span>vrascode.dev</span></div>
  </div></footer>;
}
