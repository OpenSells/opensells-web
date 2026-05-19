import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  const title = post?.title ?? 'Blog | OpenSells';
  const readTime = post?.readTime ?? '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ffffff 60%, #ede9fe 100%)',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(139, 92, 246, 0.07)',
          }}
        />

        {/* Top: logo + blog label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              background: '#8b5cf6',
              borderRadius: '10px',
              padding: '8px 20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'white', fontSize: '22px', fontWeight: 800 }}>OpenSells</span>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '18px', fontWeight: 500 }}>Blog</span>
          {readTime && (
            <>
              <span style={{ color: '#cbd5e1', fontSize: '16px' }}>·</span>
              <span style={{ color: '#94a3b8', fontSize: '18px' }}>{readTime}</span>
            </>
          )}
        </div>

        {/* Middle: post title */}
        <div
          style={{
            fontSize: title.length > 60 ? '42px' : '52px',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.2,
            maxWidth: '960px',
            letterSpacing: '-1px',
          }}
        >
          {title}
        </div>

        {/* Bottom: URL */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#8b5cf6',
              }}
            />
            <span style={{ color: '#64748b', fontSize: '18px', fontWeight: 500 }}>
              opensells.com/blog
            </span>
          </div>
          <span style={{ color: '#cbd5e1', fontSize: '16px' }}>Cold Email · B2B Leads · IA</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
