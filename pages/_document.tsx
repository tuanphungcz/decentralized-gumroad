/* eslint-disable react/no-danger */
import Document, { Main, Head, NextScript, Html } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
