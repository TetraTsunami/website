import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DarkToggle from "../components/DarkToggle";

function PageLink({ name, href }: { name: string; href: string }) {
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link href={href} passHref>
            <a className={`hover:bg-gray-600 p-3 rounded-xl ${isActive ? "bg-gray-600/25" : ""}`}>{name}</a>
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
                            <PageLink name="Home" href="/" />
                        </li>
                        <li className="mx-4">
                            <PageLink name="Media" href="/media" />
                        </li>
                    </ul>
                </nav>
                <DarkToggle />
            </div>
        </header>
    );
}
