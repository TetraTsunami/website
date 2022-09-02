import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head></Head>
            <body>
                <Script src="/theme.js" strategy="beforeInteractive" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
