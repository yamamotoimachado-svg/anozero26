const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['pt', 'en'],
    defaultLocale: 'pt',
    localeDetection: false,
  }
};

module.exports = nextConfig;