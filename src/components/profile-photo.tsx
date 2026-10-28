import Image from 'next/image';
import { profilePhotoPath } from '@/lib/profile-assets';

export function ProfilePhoto({ alt, className, preload = false }: { alt: string; className: string; preload?: boolean }) {
  return <div className={`profile-photo ${className}`}><Image src={profilePhotoPath} alt={alt} width={960} height={1200} sizes={className === 'profile-photo-home' ? '(max-width: 800px) 72vw, 300px' : '(max-width: 800px) 82vw, 430px'} preload={preload} /></div>;
}
