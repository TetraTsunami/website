import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Script src="/theme.js" strategy="beforeInteractive" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
