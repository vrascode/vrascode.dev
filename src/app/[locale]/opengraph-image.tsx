import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Matheus Sulino | Full-Stack Developer — VRAS CODE';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const photoPath = join(process.cwd(), 'public', 'images', 'matheus-sulino.png.jpeg');
  const photo = existsSync(photoPath) ? `data:image/jpeg;base64,${readFileSync(photoPath).toString('base64')}` : null;
  const headline = locale === 'pt' ? 'Desenvolvedor Full Stack' : 'Full-Stack Developer';
  // eslint-disable-next-line @next/next/no-img-element
  return new ImageResponse(<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 72px', width: '100%', height: '100%', background: '#09090f', color: '#f8fafc', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', flex: 1 }}><span style={{ color: '#a78bfa', fontWeight: 700, fontSize: 24 }}>VRAS CODE · vrascode.dev</span><div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 67, letterSpacing: '-3px', fontWeight: 700 }}>Matheus Sulino</span><span style={{ fontSize: 30, color: '#a78bfa', marginTop: 15 }}>{headline}</span></div><div style={{ display: 'flex', borderTop: '1px solid #302f42', paddingTop: 20, fontSize: 18, color: '#a1a1aa' }}>{locale === 'pt' ? 'Ciência da Computação · UFT · Campus Palmas' : 'Computer Science · UFT · Palmas campus'}</div></div>{photo ? <img src={photo} alt="" style={{ width: '286px', height: '374px', objectFit: 'cover', objectPosition: 'center 34%', border: '1px solid #302f42', borderRadius: 14, marginLeft: 42 }} /> : <div style={{ display: 'flex', marginLeft: 54, width: 275, height: 315, borderRadius: 140, border: '1px solid #302f42', alignItems: 'center', justifyContent: 'center', color: '#a78bfa', fontSize: 132, fontWeight: 700 }}>V</div>}</div>, size);
}
