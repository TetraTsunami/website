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
        <li>
            <Link href={href} className={`h-10 flex gap-2 items-center hover:bg-gray-300 dark:hover:bg-gray-600 px-2 rounded-md transition-colors ${
                isActive ? "bg-gray-200 dark:bg-gray-700" : ""
            }`} passHref>
                {children}
                {name}
            </Link>
        </li>
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
        <header className="fixed left-0 right-0 top-0 bg-bkg px-3 py-2 text-white backdrop-blur-md">
            <div className="container mx-auto flex flex-row flex-wrap items-center justify-between gap-2 px-4 pt-0 text-black dark:text-white sm:flex-nowrap">
                <div className="h-full p-0">
                    <Link href="/" passHref>
                        <Image
                            src={logo}
                            alt="Tsuni logo"
                            className="aspect-auto h-12 w-auto"
                            priority={true}
                            />
                    </Link>
                </div>
                <div className="flex-grow" />
                <nav>
                    <ul className="flex h-10 flex-row items-center justify-around gap-2">
                        <PageLink name="Home" href="/" />
                        <PageLink name="Media" href="/media">
                            <NowPlayingIcon />
                        </PageLink>
                    </ul>
                </nav>
                <DarkToggle />
            </div>
        </header>
    );
}
