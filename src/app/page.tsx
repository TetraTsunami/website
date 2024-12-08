import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Projects from "@/layouts/Projects";
import textStyles from "@/styles/text.module.scss";
import { neon } from "@/fonts/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Metadata } from "next";
import HomeHeader from "@/components/HomeHeader";

export const metadata: Metadata = {
    title: 'Homepage - Tsuni!',
}

export default function Home() {
    return (
        <main className="pb-8 pt-16">
            <HomeHeader />
            <div className="container mx-auto flex animate-fade-up flex-col gap-32 rounded-3xl bg-bkg/55 px-8 pb-8 pt-32 shadow-i-lg backdrop-blur-sm transition-colors animation-delay-[3s] animation-fill-backward">
                <section id="about">
                    <h2
                        className={`text-3xl md:text-4xl font-semibold mb-4 text-center ${textStyles.terminal} ${neon.className}`}
                    >
                        whois Tsuni
                    </h2>
                    <p className="mx-auto mb-4 max-w-prose text-center text-lg">
                        {`Heya! I'm Tsuni, a 20 year old developer from Wisconsin, USA.
                        I'm currently studying Computer Science at
                        UW-Madison. When I'm not programming, you'll find me hiking, mountain
                        biking, reading, tinkering with my old-PC-turned-server, or playing video games.
                        I'm always looking out for new projects that excite me, so feel free to reach out!`}
                    </p>
                    <p className="mx-auto mb-4 max-w-prose text-center text-lg italic">
                        {`Here's a quick peek at what I'm up to right now:`}
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://dsc-readme.tsuni.dev/api/user/214167454291722241" alt="Discord status" className="mx-auto my-2" width={500} loading="lazy" />
                </section>
                <section
                    id="projects"
                    className="container mx-auto flex flex-col items-center justify-center"
                >
                    <h2
                        className={`text-3xl md:text-4xl leading-normal font-semibold text-content
                            ${textStyles.terminal} ${neon.className}`}
                    >
                        ls projects
                    </h2>
                    <Projects />
                    <div className="text-center hover:text-accent">
                        <FontAwesomeIcon
                            icon={faGithub}
                            size={"xl" as SizeProp}
                        />
                        {" "}
                        <a href="https://github.com/TetraTsunami" className="text-lg">See more projects on my GitHub!</a>
                    </div>
                </section>
            </div>
        </main>
    );
}
