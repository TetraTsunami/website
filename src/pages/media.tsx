import type { NextPage } from "next";
import Head from "next/head";
import HistoryGrid from "../components/HistoryGrid";
import NowPlayingDetail from "../components/NowPlayingDetail";
import textStyles from "../styles/text.module.scss";

const fadeUpDelay = (i: number) => ({ animationDelay: i * 0.1 + 0.3 + "s" });
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
                        <span
                            className={textStyles["animateFadeUp"]}
                            style={fadeUpDelay(0)}
                        >
                            Here&apos;s
                        </span>{" "}
                        <span
                            className={textStyles["animateFadeUp"]}
                            style={fadeUpDelay(1)}
                        >
                            what
                        </span>{" "}
                        <span
                            className={textStyles["animateFadeUp"]}
                            style={fadeUpDelay(2)}
                        >
                            I&apos;m
                        </span>{" "}
                        <span
                            className={`h-16 ${textStyles["animateFadeUp"]}`}
                            style={fadeUpDelay(3)}
                        >
                            listening
                        </span>{" "}
                        <span
                            className={textStyles["animateFadeUp"]}
                            style={fadeUpDelay(4)}
                        >
                            to.
                        </span>
                    </h2>
                </section>
                <section className="flex flex-col items-center justify-center p-8 container mx-auto">
                    <h2 className="text-4xl mb-8 animate-fade-up animation-delay-500 animation-fill-backward">
                        Now Playing
                    </h2>
                    <NowPlayingDetail />
                </section>
                <section className="flex flex-col items-center justify-center p-8 container mx-auto">
                    <h2 className="text-4xl mb-8 animate-fade-up animation-delay-700 animation-fill-backward">
                        Recently Played
                    </h2>
                    <HistoryGrid />
                </section>
            </main>
        </>
    );
};

export default Media;
