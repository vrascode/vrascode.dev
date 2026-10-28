'use client';

import { ThemeProvider } from 'next-themes';
import { SmoothScroll } from './smooth-scroll';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <SmoothScroll />{children}
  </ThemeProvider>;
}
