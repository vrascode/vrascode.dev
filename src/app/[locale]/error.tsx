'use client';

import { useTranslations } from 'next-intl';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('Error');
  return <div className="container error-page"><h1>{t('title')}</h1><p>{t('body')}</p><button className="button button-primary" onClick={reset}>{t('retry')}</button></div>;
}
