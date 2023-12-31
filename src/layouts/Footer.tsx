import { faCodepen, faDiscord, faGithub, faMastodon, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconButtonRow1 from "../components/IconButtonRow1";
import NowPlayingText from "../components/NowPlayingText";
import textStyles from "../styles/text.module.scss";

export default function Footer() {
    return (
        <footer className="bg-gray-900 py-4 text-white">
            <div className="container mx-auto flex flex-row flex-wrap items-center justify-around px-4 lg:justify-between">
                <NowPlayingText />
                <p
                    className={`my-2 mx-4 ${textStyles.terminal} [--terminal-color:#a78bfa]`}
                >
                    Let{"'"}s build something together!
                </p>
                <IconButtonRow1
                    buttons={[
                        {
                            icon: faEnvelope,
                            href: "mailto:tsuni@tsuni.dev",
                            title: "tsuni@tsuni.dev",
                        },
                        {
                            icon: faDiscord,
                            href: "https://discord.gg/j7yUFW9ERu",
                            title: "Tsuni#0849",
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
                            icon: faTwitter,
                            href: "https://twitter.com/TetraJump",
                            title: "Twitter",
                        },
                        {
                            icon: faMastodon,
                            rel: "me",
                            href: "https://social.vivaldi.net/@tsuni",
                            title: "Mastodon"
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
