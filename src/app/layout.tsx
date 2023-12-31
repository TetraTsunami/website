import Background from "@/components/Background";
import Footer from "@/layouts/Footer";
import Header from "@/layouts/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Viewport } from "next";
import { Metadata } from "next";
import { Rubik } from 'next/font/google';
import Script from "next/script";
import "@/styles/globals.scss";
config.autoAddCss = false;

export const metadata: Metadata = {
    title: "Tsuni!",
    description: "Tsuni's lovely website",
};

export const viewport: Viewport = {
    themeColor: "black",
    initialScale: 1,
    width: "device-width",
};

const rubik = Rubik({
    subsets: ['latin'],
    display: 'swap',
  })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={rubik.className}>
            <body>
                <Script src="/theme.js" strategy="beforeInteractive" />
                <Script id="remove-loading" strategy="afterInteractive">
                    {`document.documentElement.classList.remove('noAnimate')`}
                </Script>
                <Script
                    src="https://net.tsuni.dev/js/pls.js"
                    strategy="lazyOnload"
                />
                <Background />
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
