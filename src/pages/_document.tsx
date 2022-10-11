import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en" id="html" className="noAnimate">
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Script src="/theme.js" strategy="beforeInteractive" />
                <Script
                    src="https://net.tsuni.dev/js/pls.js"
                    strategy="afterInteractive"
                />
                <Script id="remove-loading" strategy="afterInteractive">
                    {`document.documentElement.classList.remove('noAnimate')`}
                </Script>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
