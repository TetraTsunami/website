"use client";
import Link from "next/link";
import { useEffect } from "react";
import DarkToggle from "../components/DarkToggle";
import NowPlayingIcon from "../components/NowPlayingIcon";
import Image from "next/image";
import { logo } from "../images";
import { usePathname } from "next/navigation";

function PageLink({
    name,
    href,
    children,
}: {
    name: string;
    href: string;
    children?: any;
}) {
    const isActive = usePathname() === href;

    return (
        <Link href={href} className={`hover:bg-gray-300 dark:hover:bg-gray-600 h-9 p-2 rounded-md transition-colors ${
            isActive ? "bg-gray-400/25" : ""
        }`} passHref>
            {children}
            {name}
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
        <header className="fixed left-0 right-0 top-0 h-fit bg-white p-3 text-white backdrop-blur-md dark:bg-gray-900">
            <div className="container mx-auto flex h-fit flex-row flex-wrap items-center justify-between px-4 pt-0 text-black sm:flex-nowrap dark:text-white">
                <div className="h-full p-0">
                    <Link href="/" passHref>
                        <Image
                            src={logo}
                            alt="Tsuni logo"
                            className="aspect-auto h-12 w-auto"
                            />
                    </Link>
                </div>
                <div className="flex-grow" />
                <nav>
                    <ul className="flex flex-row items-center justify-around">
                        <li className="m-2">
                            <PageLink name="Home" href="/" />
                        </li>
                        <li className="m-2 w-max">
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
