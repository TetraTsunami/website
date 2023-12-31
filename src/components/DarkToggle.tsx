"use client"
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function DarkToggle() {
    const [isDark, setIsDark] = useState(false);
    
    useEffect(() => {
        const root = document.documentElement;
        if (root.classList.contains("dark")) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    } , []);

    const toggleDark = () => {
        const root = document.documentElement;
        root.classList.toggle("dark")
        localStorage.theme =  !isDark ? "dark" : "light";
        setIsDark((e) => (!e));
    }

    return (
        <button
            className="m-2 flex h-9 w-9 items-center justify-center rounded-md bg-gray-200 p-2 text-black outline-2 outline-violet-400 transition-colors hover:outline dark:bg-gray-700 dark:text-white"
            onClick={toggleDark}
        >
            <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
            <p className="visible-hidden">Toggle dark mode</p>
        </button>
    );
}