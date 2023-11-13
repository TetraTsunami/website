import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DarkToggle from "../components/DarkToggle";
import NowPlayingIcon from "../components/NowPlayingIcon";
import Image from "next/image";
import { logo } from "../images";

function PageLink({
    name,
    href,
    children,
}: {
    name: string;
    href: string;
    children?: any;
}) {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref>
            <a
                className={`hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl transition-colors ${
                    isActive ? "bg-gray-400/25" : ""
                }`}
            >
                {children}
                {name}
            </a>
        </Link>
    );
}

export default function Header() {
    useEffect(() => {
        function scrollHeader() {
            if (window.scrollY > 0) {
                document
                    .getElementsByTagName("header")[0]
                    ?.classList.add("scrolled");
            } else {
                document
                    .getElementsByTagName("header")[0]
                    ?.classList.remove("scrolled");
            }
        }
        document.addEventListener("scroll", scrollHeader);

        return function cleanup() {
            document.removeEventListener("scroll", scrollHeader);
        };
    });

    return (
        <header className="backdrop-blur-md bg-white dark:bg-gray-900 text-white p-3 fixed top-0 left-0 right-0">
            <div className="container mx-auto flex flex-row flex-wrap sm:flex-nowrap justify-between items-center pt-4 sm:h-12 sm:pt-0 px-4 text-black dark:text-white">
                <div className="h-full p-0 w-full">
                    <Link href="/" passHref>
                        <a className="hover:underline">
                            <img src="/images/reallogo.png" alt="Tsuni logo" className="h-full"/>
                        </a>
                    </Link>
                </div>
                <div className="flex-grow" />
                <nav>
                    <ul className="flex flex-row items-center justify-around">
                        <li className="m-5">
                            <PageLink name="Home" href="/" />
                        </li>
                        <li className="m-5 w-max">
                            <PageLink name="Media" href="/media">
                                <NowPlayingIcon />
                            </PageLink>
                        </li>
                    </ul>
                </nav>
                <DarkToggle />
            </div>
        </header>
    );
}
