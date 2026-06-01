import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/cold-email-follow-up-timing-templates-sequences/:path*',
        destination: '/blog/guia-cold-email-espana-2025',
        permanent: true,
      },
      {
        source: '/asunto-email-perfecto-cold-email-ejemplos/:path*',
        destination: '/blog/tasa-respuesta-cold-email',
        permanent: true,
      },
      {
        source: '/cold-email-subject-lines-get-opened-examples/:path*',
        destination: '/en/blog/improve-cold-email-reply-rate',
        permanent: true,
      },
      {
        source: '/guia/:path*',
        destination: '/blog/guia-cold-email-espana-2025',
        permanent: true,
      },
      {
        source: '/gracias2442/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/gracias/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/privacidad/:path*',
        destination: '/es/privacy',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
