import { ArrowUpRight, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { identity } from '@/lib/identity';
import { getProfileContacts } from '@/lib/public-contacts';

export async function ProfileLinks() {
  const [t, contacts] = await Promise.all([getTranslations('Contact'), Promise.resolve(getProfileContacts())]);
  const profiles = [
    { name: 'LinkedIn', description: t('linkedinDescription'), label: t('linkedinCta'), href: identity.links.linkedin, icon: 'in' },
    { name: 'GitHub', description: t('githubDescription'), label: t('githubCta'), href: identity.links.github, icon: 'GH' },
    ...(contacts.email ? [{ name: t('emailLabel'), description: t('emailDescription'), label: t('emailCta'), href: `mailto:${contacts.email}`, icon: 'email' }] : []),
    ...(contacts.whatsapp ? [{ name: t('whatsappLabel'), description: t('whatsappDescription'), label: t('whatsappCta'), href: `https://wa.me/${contacts.whatsapp}?text=${encodeURIComponent(t('whatsappMessage'))}`, icon: 'wa' }] : [])
  ];

  return <div className="profile-links">{profiles.map(profile => <article className="profile-link-card" key={profile.name}>
    <div className={`profile-link-icon profile-icon-${profile.icon}`} aria-hidden="true">{profile.icon === 'email' ? <Mail size={20} /> : <span>{profile.icon}</span>}</div>
    <div className="profile-link-copy"><h2>{profile.name}</h2><p>{profile.description}</p></div>
    <a className="button button-secondary" href={profile.href} target={profile.href.startsWith('http') ? '_blank' : undefined} rel={profile.href.startsWith('http') ? 'noopener noreferrer' : undefined}><span>{profile.label}</span><ArrowUpRight size={15} /></a>
  </article>)}</div>;
}
