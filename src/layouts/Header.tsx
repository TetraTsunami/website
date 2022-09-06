import Link from "next/link";
import { useEffect } from "react";
import DarkToggle from "../components/DarkToggle";

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
        <header className="backdrop-blur-md bg-white dark:bg-gray-900 text-white py-4 fixed top-0 left-0 right-0">
            <div className="container mx-auto flex flex-row justify-between items-center h-12 px-4 text-black dark:text-white">
                <Link href="/" passHref>
                    <a className="hover:underline text-2xl flex-grow">
                        TetraTsunami
                    </a>
                </Link>
                <nav>
                    <ul className="flex flex-row items-center justify-around">
                        <li className="mx-4">
                            <Link href="/#about" passHref>
                                <a className="hover:underline">About</a>
                            </Link>
                        </li>
                        <li className="mx-4">
                            <Link href="/#projects" passHref>
                                <a className="hover:underline">Projects</a>
                            </Link>
                        </li>
                        <li className="mx-4">
                            <Link href="/media" passHref>
                                <a className="hover:underline">Media</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <DarkToggle />
            </div>
        </header>
    );
}
