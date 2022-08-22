import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

import SEO from '../next-seo.config'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* adds seo to every page */}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
