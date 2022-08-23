/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

module.exports = withPWA({
  reactStrictMode: true,
  // docker
  output: "standalone",
  // next-seo
  compress: false,
  // pwa
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  // react-intl
  i18n: {
    locales: ["en", "fr", "de"],
    defaultLocale: "en",
  },
  webpack(config, { dev, ...other }) {
    if (!dev) {
      // https://formatjs.io/docs/guides/advanced-usage#react-intl-without-parser-40-smaller
      config.resolve.alias["@formatjs/icu-messageformat-parser"] =
        "@formatjs/icu-messageformat-parser/no-parser";
    }
    return config;
  },
});
