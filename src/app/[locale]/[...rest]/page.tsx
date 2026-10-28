import { notFound } from 'next/navigation';
import { resolveLocale, type PageProps } from '@/lib/locale';

export default async function UnknownPage({ params }: PageProps) { await resolveLocale(params); notFound(); }
