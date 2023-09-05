import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import PageLayout from '../src/common/layout/PageLayout'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
import { store } from '../src/store'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

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
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
          <ToastContainer autoClose={2000} theme='colored' />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

App.getLayout = PageLayout
