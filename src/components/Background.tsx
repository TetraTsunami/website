"use client";
import { useEffect, useState, useContext } from "react";
import styles from "./background.module.scss";
import { BGContext } from "@/app/providers";

export default function Background() {
    const { theme } = useContext(BGContext);
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
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Dark */}
            <div className="absolute inset-0" 
                style={{"background": `linear-gradient(90deg, ${theme.dark1}, ${theme.dark2}`}} />
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-900 to-gray-800 transition-opacity duration-300`}
                style={{"opacity": theme.isActive ? "0": "1"}} />
            {/* Light */}
            <div className="absolute inset-0 dark:opacity-0" 
                style={{"background": `linear-gradient(90deg, ${theme.light1}, ${theme.light2}`}} />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-300 transition-opacity duration-300 dark:opacity-0" 
                style={ theme.isActive ? {"opacity": 0 } : {}} />

            <div
                style={{ ["--scrollY" as any]: `${Math.round(scrollY / 4) % 376}px` }}
                className={`transition-opacity opacity-30 dark:opacity-80 ${styles.camo}`}
            />
            <div
                style={{ ["--scrollY" as any]: `${Math.round(scrollY / 2) % 376}px` }}
                className={`w-full h-full absolute dark:opacity-50 ${styles.dots}`}
            />
        </div>
    );
}