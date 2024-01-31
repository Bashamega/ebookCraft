
import { Html, Head, Main, NextScript } from 'next/document'
const settings = require('@/setting/settings.json')
export default function Document() {
  return (
    <Html lang="en">
      <head>
        <title>{settings.title}</title>
        <link rel='icon' href={settings.icon}></link>
        </head>
      <Head/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
