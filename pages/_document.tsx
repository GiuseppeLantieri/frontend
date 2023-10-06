import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="it" >
      <Head >
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <body >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}