import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<div style={{ display: 'flex', width: '100%', height: '100%', background: '#09090f', alignItems: 'center', justifyContent: 'center' }}><svg width="130" height="130" viewBox="0 0 64 64"><path d="M13 16h10l9 24 9-24h10L32 55z" fill="#a78bfa" /><path d="m24 9 8 15 8-15" fill="none" stroke="#a78bfa" strokeWidth="3" /></svg></div>, size);
}
