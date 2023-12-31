import type { NextPage } from "next";
import HistoryGrid from "@/components/HistoryGrid";
import NowPlayingDetail from "@/components/NowPlayingDetail";
import textStyles from "@/styles/text.module.scss";

const fadeUpDelay = (i: number) => ({ animationDelay: i * 0.1 + 0.3 + "s" });
const Media: NextPage = () => {
    return (
        <main className="min-h-screen dark:text-white">
            <section
                className="container mx-auto px-8 pb-16 pt-32"
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
            <section className="container mx-auto flex flex-col items-center justify-center p-8">
                <h2 className="mb-8 animate-fade-up text-4xl animation-delay-500 animation-fill-backward">
                    Now Playing
                </h2>
                <div className="mx-auto rounded-3xl bg-bkg/55 p-8 shadow-i-lg backdrop-blur-sm transition-colors">
                    <NowPlayingDetail />
                </div>
            </section>
            <section className="container mx-auto flex flex-col items-center justify-center p-8">
                <h2 className="mb-8 animate-fade-up text-4xl animation-delay-700 animation-fill-backward">
                    Recently Played
                </h2>
                <HistoryGrid />
            </section>
        </main>
    );
};

export default Media;
