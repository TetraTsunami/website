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
        <div className="flex justify-center items-center">
            <button
                className="w-9 h-9 p-2 m-4 rounded-md flex items-center justify-center 
                bg-gray-200 text-black 
                dark:bg-gray-700 dark:text-white
                transition-colors
                hover:outline outline-2 outline-violet-400"
                onClick={toggleDark}
            >
                <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
                <p className="visible-hidden">Toggle dark mode</p>
            </button>
        </div>
    );
}