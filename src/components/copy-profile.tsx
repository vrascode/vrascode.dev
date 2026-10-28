'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { identity } from '@/lib/identity';

export function CopyProfile() {
  const t = useTranslations('Contact');
  const [result, setResult] = useState<'copied' | 'copyError' | null>(null);
  return <div><button className="button button-secondary" onClick={async () => { try { await navigator.clipboard.writeText(identity.links.github); setResult('copied'); } catch { setResult('copyError'); } }}>{result === 'copied' ? <Check size={16} /> : <Copy size={16} />}{t('copy')}</button><span className="copy-feedback" role="status">{result ? t(result) : ''}</span></div>;
}
