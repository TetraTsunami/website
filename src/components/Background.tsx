"use client";
import { useContext } from "react";
import styles from "./background.module.css";
import { BGContext } from "@/app/providers";

export default function Background() {
    const theme = useContext(BGContext);
    
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Dark */}
            <div className="absolute inset-0" 
                style={{"background": `linear-gradient(90deg, ${theme.dark1}, ${theme.dark2}`}} />
            <div className={`absolute inset-0 bg-gradient-to-r from-purple-900 to-gray-800 transition-opacity duration-300`}
                style={{"opacity": theme.isActive ? "0": "1"}} />
            {/* Light */}
            <div className="absolute inset-0 dark:opacity-0" 
                style={{"background": `linear-gradient(90deg, ${theme.light1}, ${theme.light2})`, ...(!theme.isActive && {"opacity": "0"})}} />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-purple-300 transition-opacity duration-300 dark:opacity-0" 
                style={ theme.isActive ? {"opacity": 0 } : undefined} />
            <div
                className={`opacity-30 dark:opacity-80 ${styles.camo}`}
                style={ theme.focus ? {"opacity": "0"} : undefined}
            />
            <div
                className={`w-full h-full absolute 0 ${styles.dots}`}
                style={ theme.focus ? {"opacity": "0"} : undefined}
            />
        </div>
    );
}