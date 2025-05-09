import Background from "@/components/Background";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Viewport } from "next";
import { Metadata } from "next";
import { neon, rubik } from "@/fonts/fonts";
import Script from "next/script";
import Providers from "./providers";
config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Tsuni",
    description: "Tsuni's lovely website",
    metadataBase: new URL('https://tsuni.dev'),
    openGraph: {
        images: '/images/reallogo.png',
    },
};

export const viewport: Viewport = {
    themeColor: "#d6b2f6",
    initialScale: 1,
    width: "device-width",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`bg-slate-900 ${rubik.className} ${neon.variable}`} suppressHydrationWarning={true}>
            <head>
                <link rel="preconnect" href="https://net.tsuni.dev" />
            </head>
            <body className={`text-content`}>
                {/*we need sync scripts so that the theme is loaded before the page is rendered*/}
                {/*eslint-disable-next-line @next/next/no-sync-scripts*/ }
                <script src="/theme.js" />
                <Script id="remove-loading" strategy="afterInteractive">
                    {`document.documentElement.classList.remove('noAnimate')`}
                </Script>
                <Script
                    src="https://net.tsuni.dev/js/pls.js"
                    strategy="lazyOnload"
                />
                <Header />
                <Providers>
                    <Background />
                    {children}
                </Providers>
                <Footer />
            </body>
        </html>
    );
}
