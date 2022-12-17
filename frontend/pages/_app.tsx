import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import PageLayout from '../components/PageLayout'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { store } from '../src/store'

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </Provider>
  )
}

App.getLayout = PageLayout
