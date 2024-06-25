import { Html, Head, Main, NextScript } from 'next/document';
const settings = require('@/setting/settings.json');

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{settings.title}</title>
        <link rel='icon' href={settings.icon}></link>
        <script src="https://cdn.ckeditor.com/ckeditor5/41.4.2/classic/ckeditor.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
