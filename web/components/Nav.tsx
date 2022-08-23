import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

export default function Nav() {
  const { locale, locales, asPath } = useRouter()

  return (
    <nav>
      <li >
        <Link href="/" passHref>
          <a>
            <FormattedMessage
              defaultMessage="Home"
              description="Nav: Index name"
            />
          </a>
        </Link>
      </li>
      <li >
        <Link href="/about" passHref>
          <a>
            <FormattedMessage
              defaultMessage="About"
              description="Nav: About item"
            />
          </a>
        </Link>
      </li>

      <li></li>

      {locales?.map((availableLocale) => (
        <li key={availableLocale} >
          <Link
            href={asPath}
            locale={availableLocale}
            passHref
            prefetch={false}
          >
            <a
              style={{ color: availableLocale === locale ? 'red' : 'default' }}
            >
              {availableLocale}
            </a>
          </Link>
        </li>
      ))
      }
    </nav >
  )
}
