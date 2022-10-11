import "@fontsource/rubik/variable.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Background from "../components/Background";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import "../styles/globals.scss";
config.autoAddCss = false;

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Background />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
};

export default MyApp;
