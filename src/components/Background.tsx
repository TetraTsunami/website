"use client";
import { useContext } from "react";
import styles from "./background.module.scss";
import { BGContext } from "@/app/providers";
import { usePathname } from "next/navigation";

export default function Background() {
    const { theme } = useContext(BGContext);
    const path  = usePathname();
    const readingMode = path.includes("/posts/");
    
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
                className={`opacity-30 dark:opacity-80 ${styles.camo} ${readingMode ? styles.static : ""}`}
            />
            <div
                className={`w-full h-full absolute 0 ${styles.dots}`}
            />
        </div>
    );
}