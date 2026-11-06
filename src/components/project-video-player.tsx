'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ProjectVideo } from '@/lib/project-videos';

export function ProjectVideoPlayer({ video, label }: { video: ProjectVideo; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const t = useTranslations('VideoShowcase');
  useEffect(() => {
    const element = ref.current;
    const pause = () => { if (document.hidden) element?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => { element?.pause(); document.removeEventListener('visibilitychange', pause); };
  }, []);
  return <><video ref={ref} className="project-video-player" controls playsInline preload="metadata" poster={video.poster} aria-label={label} onError={() => setFailed(true)}>
    <source src={video.src} type={video.type} />
    <a href={video.src}>{label}</a>
  </video>{failed && <p role="status">{t('videoError')} <a className="text-link" href={video.src}>{t('openVideo')}</a></p>}</>;
}
