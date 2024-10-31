import type { Metadata, NextPage } from "next";
import textStyles from "@/styles/text.module.scss";
import NPComboGrid from "@/components/NPComboGrid";

export const metadata: Metadata = {
    title: 'Posts - Tsuni!',
}
  
const fadeUpDelay = (i: number) => ({ animationDelay: i * 0.1 + 0.3 + "s" });
const Media: NextPage = () => {
    return (
        <main className="min-h-screen">
            <section
                className="container mx-auto px-2 pb-16 pt-32 sm:px-8"
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
            <section className="container mx-auto flex flex-col items-center justify-center px-2 py-8 sm:px-8">
                <NPComboGrid />
            </section>
        </main>
    );
};

export default Media;
