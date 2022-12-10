import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import PageLayout from '../components/PageLayout'
import Home from './index'

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
  )
}

App.getLayout = PageLayout
