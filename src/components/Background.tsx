import { useEffect, useState } from "react";
import styles from "./background.module.scss";

export default function Background() {
    const [scrollY, setScroll] = useState(0);
    useEffect(() => {
        let id: number
        function simpleParallax() {
            id = requestAnimationFrame(simpleParallax)
            setScroll(window.scrollY);
        }
        id = requestAnimationFrame(simpleParallax)

        return function cleanup() {
            cancelAnimationFrame(id)
        };
    });
    
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-r from-purple-900 to-gray-800">
            <div className={`absolute inset-0 dark:opacity-0 transition-opacity bg-gradient-to-r from-pink-200 to-violet-300`} />

            <div
                style={{ backgroundPositionY: `${scrollY / 4}px` }}
                className={`w-full h-full absolute transition-opacity opacity-30 dark:opacity-80 ${styles.camo}`}
            />
            <div
                style={{ backgroundPositionY: `${scrollY / 2}px` }}
                className={`w-full h-full absolute dark:opacity-50 ${styles.dots}`}
            />
        </div>
    );
}