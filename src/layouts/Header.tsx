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
            <div className="container mx-auto flex flex-row justify-between items-center h-12 px-4">
                <h1 className="text-2xl flex-grow text-black dark:text-white">
                    TetraTsunami
                </h1>
                <nav>
                    <ul className="flex flex-row items-center justify-around">
                        <li className="mx-4 text-black dark:text-white">
                            <a href="#about">About</a>
                        </li>
                        <li className="mx-4 text-black dark:text-white">
                            <a href="#projects">Projects</a>
                        </li>
                    </ul>
                </nav>
                <DarkToggle />
            </div>
        </header>
    );
}
