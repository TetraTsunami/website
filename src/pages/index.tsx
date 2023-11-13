import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";
import { faChevronDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { NextPage } from "next";
import Head from "next/head";
import IconButtonRow2 from "../components/IconButtonRow2";
import Projects from "../layouts/Projects";
import textStyles from "../styles/text.module.scss";

const fadeUpDelay = (i: number) => ({ animationDelay: i * 0.1 + 0.3 + "s"})
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Tsuni!</title>
            </Head>
            <main className="text-black dark:text-white">
                <section
                    id="home"
                    className="flex flex-col items-center justify-center h-screen p-8
                    container mx-auto relative text-center"
                >
                    <h2 className="text-4xl font-semibold">
                        <span className={textStyles["animateFadeUp"]} style={fadeUpDelay(0)}>
                            Hello
                        </span>{" "}
                        <span className={textStyles["animateFadeUp"]} style={fadeUpDelay(1)}>
                            world!
                        </span>
                    </h2>
                    <h1 className={`text-8xl font-extrabold text-transparent ${textStyles.gradientTitleText}`}>
                        <span
                            className={textStyles["animateFadeUp"]} style={fadeUpDelay(5)}
                        >
                            I{"'"}m
                        </span>{" "}
                        <span
                            className={textStyles["animateFadeUp"]} style={fadeUpDelay(6)}
                        >
                            Tsuni!
                        </span>
                    </h1>

                    <IconButtonRow2
                        buttons={[
                            {
                                icon: faEnvelope,
                                href: "mailto:tsuni@tsuni.dev",
                                title: "tsuni@tsuni.dev",
                            },
                            {
                                icon: faGithub,
                                href: "https://github.com/TetraTsunami",
                                title: "TetraTsunami",
                            },
                        ]}
                        startingFade={9}
                    />
                    <a id="scroll-hint" href="#about" className="absolute bottom-0 mb-8 p-2 animate-bounce-slow">
                        <FontAwesomeIcon icon={faChevronDown} />
                    </a>
                </section>
                <section
                    id="about"
                    className="flex flex-col items-center justify-center h-96 p-8 bg-violet-200 dark:bg-slate-900"
                >
                    <div className="container mx-auto">
                        <h2
                            className={`text-4xl font-semibold text-center ${textStyles.terminal}`}
                        >
                            Who am I?
                        </h2>
                        <p className={`text-lg text-center my-2 mx-4`}>
                            I{"'"}m a 18 year old self-taught developer from
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
                    <h2
                        className={`text-3xl md:text-4xl leading-normal font-semibold text-gray-700 dark:text-slate-200
                            ${textStyles.terminal}`}
                    >
                        Check out my projects!
                    </h2>
                    <Projects />
                </section>
            </main>
        </>
    );
};

export default Home;
