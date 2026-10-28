import { ImageResponse } from 'next/og';

export const alt = 'Matheus Sulino | Full-Stack Developer — VRAS CODE';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '65px 75px', width: '100%', height: '100%', background: '#09090b', color: '#f5f5f5', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24 }}><span style={{ color: '#a3e635', fontWeight: 700 }}>VRAS CODE</span><span style={{ color: '#a1a1aa' }}>vrascode.dev</span></div><div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 78, letterSpacing: '-4px', fontWeight: 700 }}>Matheus Sulino.</span><span style={{ fontSize: 34, color: '#a3e635', marginTop: 18 }}>Full-Stack Developer</span></div><div style={{ display: 'flex', borderTop: '1px solid #27272a', paddingTop: 25, fontSize: 21, color: '#a1a1aa' }}>{locale === 'pt' ? 'Ciência da Computação · UFT · Palmas, Brasil' : 'Computer Science · UFT · Palmas, Brazil'}</div></div>, size);
}
