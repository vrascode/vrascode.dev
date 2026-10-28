'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { Brand } from './brand';

const subscribe = () => () => {};
const navItems = [{ href: '/projects', key: 'projects' }, { href: '/about', key: 'about' }, { href: '/experience', key: 'experience' }, { href: '/contact', key: 'contact' }] as const;

export function Header() {
  const t = useTranslations('Nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const isLight = mounted && resolvedTheme === 'light';
  const otherLocale = locale === 'en' ? 'pt' : 'en';
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  function close() { dialog.current?.close(); }
  function onClose() { setOpen(false); document.body.style.overflow = ''; menuButton.current?.focus(); }

  return <>
    <a className="skip-link" href="#main">{t('skip')}</a>
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="home-link" aria-label={`VRAS CODE — ${t('home')}`}><Brand /></Link>
        <nav className="desktop-nav" aria-label={t('navigation')}>
          {navItems.map(item => <Link key={item.key} href={item.href} className={pathname.startsWith(item.href) ? 'active' : ''} aria-current={pathname.startsWith(item.href) ? 'page' : undefined}>{t(item.key)}{item.key === 'contact' && <ArrowUpRight size={14} />}</Link>)}
        </nav>
        <div className="header-controls">
          <Link className="locale-switch" href={pathname} locale={otherLocale} aria-label={t('language')} hrefLang={otherLocale === 'pt' ? 'pt-BR' : 'en'} onClick={event => { event.preventDefault(); router.replace(`${pathname}${window.location.search}${window.location.hash}`, { locale: otherLocale }); }}><span className={locale === 'en' ? 'selected' : ''}>EN</span><span className="locale-divider">/</span><span className={locale === 'pt' ? 'selected' : ''}>PT</span></Link>
          <button className="icon-button theme-button" type="button" aria-label={t(isLight ? 'dark' : 'light')} onClick={() => setTheme(isLight ? 'dark' : 'light')}>{isLight ? <Moon size={18} /> : <Sun size={18} />}</button>
          <button ref={menuButton} className="icon-button mobile-menu-button" aria-label={t('openMenu')} aria-haspopup="dialog" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); document.body.style.overflow = 'hidden'; }}><Menu size={22} /></button>
        </div>
      </div>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-dialog" aria-labelledby="menu-title" onClose={onClose} onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="mobile-dialog-content">
        <div className="mobile-dialog-top"><span id="menu-title" className="eyebrow">{t('menu')}</span><button type="button" className="icon-button" aria-label={t('closeMenu')} onClick={close}><X /></button></div>
        <nav aria-label={t('navigation')}><Link href="/" onClick={close}>{t('home')}</Link>{navItems.map((item, index) => <Link key={item.key} href={item.href} onClick={close}><span className="mono muted">0{index + 1}</span>{t(item.key)}<ArrowUpRight size={22} /></Link>)}</nav>
        <Brand />
      </div>
    </dialog>
  </>;
}
