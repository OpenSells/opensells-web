import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'OpenSells — Genera leads B2B con IA en segundos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 50%, #ede9fe 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.06)',
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#8b5cf6',
            borderRadius: '16px',
            padding: '16px 32px',
            marginBottom: '32px',
          }}
        >
          <span style={{ color: 'white', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            OpenSells
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: '900px',
            marginBottom: '24px',
            letterSpacing: '-1px',
          }}
        >
          Empresas a las que llamar,
          <br />
          con la llamada preparada
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#64748b',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.4,
          }}
        >
          Leads B2B con su teléfono y una ficha de llamada hecha por IA. Empieza gratis, sin tarjeta.
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '48px',
            fontSize: '18px',
            color: '#94a3b8',
            fontWeight: 500,
          }}
        >
          opensells.com
        </div>
      </div>
    ),
    { ...size }
  );
}
