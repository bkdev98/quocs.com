import '@/styles/globals.css'
import 'remixicon/fonts/remixicon.css'
import type { AppProps } from 'next/app'
import { FC, ReactNode } from 'react'
import CommandBar from '@/components/CommandBar'

const Noop: FC<{ children: ReactNode }> = ({ children }) => children

export default function App({ Component, pageProps }: AppProps & {
  Component: { Layout: FC<{ children: ReactNode }> } & AppProps['Component']
}) {
  const Layout = Component.Layout || Noop

  return (
    <CommandBar>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CommandBar>
  )
}
