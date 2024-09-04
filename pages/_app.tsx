import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PortfolioProvider } from '../context/PortfolioContext'
import Portfolio from './Portfolio'

function MyApp({ Component, pageProps }: AppProps) {
  return <PortfolioProvider>
    <Portfolio>
      <Component {...pageProps} />
    </Portfolio>
  </PortfolioProvider>
}

export default MyApp
