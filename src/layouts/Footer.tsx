import { faCodepen, faDiscord, faGithub, faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconButtonRow1 from "../components/IconButtonRow1";
import NowPlayingText from "../components/NowPlayingText";

export default function Footer() {
    return (
        <footer className="bg-slate-900 py-4 text-white">
            <div className="container mx-auto flex flex-row flex-wrap items-center justify-around px-4 lg:justify-between">
                <NowPlayingText />
                <IconButtonRow1
                    buttons={[
                        {
                            icon: faEnvelope,
                            href: "mailto:tsuni@[this domain]",
                            title: "tsuni@[this domain]",
                        },
                        {
                            icon: faDiscord,
                            href: "https://discord.gg/AH7XHAkY3p",
                            title: "@tsni",
                        },
                        {
                            icon: faGithub,
                            href: "https://github.com/TetraTsunami",
                            title: "Github",
                        },
                        {
                            icon: faCodepen,
                            href: "https://codepen.io/TetraTsunami",
                            title: "Codepen",
                        },
                        {
                            icon: faTwitch,
                            href: "https://www.twitch.tv/tetrajump",
                            title: "Twitch",
                        },
                    ]}
                />
            </div>
        </footer>
    );
}
