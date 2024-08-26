import { faCodepen, faDiscord, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconButtonRow1 from "../components/IconButtonRow1";
import NowPlayingText from "../components/NowPlayingText";

export default function Footer() {
    return (
        <footer className="bg-slate-900 px-3 py-2 text-white">
            <div className="container mx-auto flex min-h-12 flex-row flex-wrap items-center justify-around lg:justify-between">
                <NowPlayingText />
                <IconButtonRow1
                    buttons={[
                        {
                            icon: faEnvelope,
                            href: "mailto:tsuni@[this domain]",
                            title: "tsuni@[this domain]",
                        },
                        {
                            icon: faGithub,
                            href: "https://github.com/TetraTsunami",
                            title: "Github",
                        },
                        {
                            icon: faTwitter,
                            href: "https://twitter.com/tsuniHD",
                            title: "Twitter/X",
                        },
                        {
                            icon: faDiscord,
                            href: "https://discord.gg/AH7XHAkY3p",
                            title: "@tsni",
                        },
                        {
                            icon: faCodepen,
                            href: "https://codepen.io/TetraTsunami",
                            title: "Codepen",
                        },
                    ]}
                />
            </div>
        </footer>
    );
}
