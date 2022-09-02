import "@fontsource/rubik/variable.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Background from "../components/Background";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import "../styles/globals.scss";
config.autoAddCss = false;

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <>
            <Background />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </>
    );
};

export default MyApp;
