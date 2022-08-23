import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { IntlProvider } from 'react-intl'

import SEO from '../next-seo.config'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale } = useRouter()

  return (
    <>
      {/* adds seo to every page */}
      <DefaultSeo {...SEO} additionalLinkTags={[
        {
          rel: 'manifest',
          href: '/manifest.json'
        },
        {
          href: '/icons/favicon-16x16.png',
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
        },
        {
          href: '/icons/favicon-32x32.png',
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32'
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-icon.png',
        },
      ]} />

      <IntlProvider
        locale={locale!}
        defaultLocale={defaultLocale}
        messages={pageProps.intlMessages}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </>
  )
}

export default MyApp
