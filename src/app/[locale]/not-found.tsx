import { getTranslations } from 'next-intl/server';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('Error');
  return <div className="container error-page"><span className="eyebrow">404</span><h1>{t('notFoundTitle')}</h1><p>{t('notFoundBody')}</p><Link href="/" className="button button-primary"><ArrowLeft size={16} />{t('home')}</Link></div>;
}
