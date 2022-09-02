import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import IconButtonRowSm from "../components/IconButtonRowSm";
import Projects from "../layouts/Projects";
import textStyles from "../styles/text.module.scss";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Tsuni!</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Script src="https://net.tsuni.dev/js/pls.js" />
            <main className="text-black dark:text-white">
                <section
                    id="home"
                    className="flex flex-col items-center justify-center h-screen p-8
                    container mx-auto"
                >
                    <h2 className="text-4xl font-semibold">
                        <span className={textStyles["animateFadeUp-1"]}>
                            Hello
                        </span>{" "}
                        <span className={textStyles["animateFadeUp-2"]}>
                            world!
                        </span>
                    </h2>
                    <h1 className="text-8xl font-extrabold text-transparent">
                        <span
                            className={`bg-clip-text bg-gradient-to-t from-violet-500 to-violet-700 ${textStyles["animateFadeUp-5"]}`}
                        >
                            I{"'"}m
                        </span>{" "}
                        <span
                            className={`bg-clip-text bg-gradient-to-t from-violet-500 to-violet-700 ${textStyles["animateFadeUp-6"]}`}
                        >
                            Tsuni!
                        </span>
                    </h1>

                    <IconButtonRowSm
                        buttons={[
                            {
                                icon: faEnvelope,
                                href: "mailto:tsuni@tsuni.dev",
                                title: "tsuni@tsuni.dev",
                            },
                            {
                                icon: faDiscord,
                                href: "https://discord.gg/j7yUFW9ERu",
                                title: "Tsuni#0001",
                            },
                        ]}
                        startingFade={9}
                    />
                </section>
                <section
                    id="about"
                    className="flex flex-col items-center justify-center h-96 p-8 bg-violet-200 dark:bg-violet-900"
                >
                    <div className="container mx-auto">
                        <h2 className="text-4xl font-semibold">Who am I?</h2>
                        <p className={`my-2 mx-4 ${textStyles.terminal}`}>
                            I{"'"}m a 17 year old self-taught developer from
                            Wisconsin, USA. I{"'"}m currently working on a few
                            projects, including this website, a Discord bot, and
                            a Minecraft server.
                        </p>
                    </div>
                </section>
                <section
                    id="projects"
                    className="flex flex-col items-center justify-center p-8 my-32 container mx-auto"
                >
                    <h1
                        className={`text-3xl md:text-4xl leading-normal font-extrabold text-gray-700 dark:text-slate-200
                            ${textStyles.terminal}`}
                    >
                        Check out my projects!
                    </h1>
                    <Projects />
                </section>
            </main>
        </>
    );
};

export default Home;
