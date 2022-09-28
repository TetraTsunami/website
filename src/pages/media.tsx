import type { NextPage } from "next";
import Head from "next/head";
import NowPlayingDetail from "../components/NowPlayingDetail";
import textStyles from "../styles/text.module.scss";

const Media: NextPage = () => {
    return (
        <>
            <Head>
                <title>Media - Tsuni!</title>
            </Head>
            <main className="min-h-screen dark:text-white">
                <section
                    className="px-8 pt-32 pb-16
                container mx-auto"
                >
                    <h2
                        className={`text-6xl text-center font-bold ${textStyles.gradientTitleText}`}
                    >
                        <span className={textStyles["animateFadeUp-1"]}>
                            Here&apos;s
                        </span>{" "}
                        <span className={textStyles["animateFadeUp-2"]}>
                            what
                        </span>{" "}
                        <span className={textStyles["animateFadeUp-3"]}>
                            I&apos;m
                        </span>{" "}
                        <span className={`h-16 ${textStyles["animateFadeUp-4"]}`}>
                            listening
                        </span>{" "}
                        <span className={textStyles["animateFadeUp-5"]}>
                            to.
                        </span>
                    </h2>
                </section>
                <section className="flex flex-col items-center justify-center p-8 container mx-auto">
                    <h2 className="text-4xl mb-8">Now Playing</h2>
                    <NowPlayingDetail />
                </section>
            </main>
        </>
    );
};

export default Media;
