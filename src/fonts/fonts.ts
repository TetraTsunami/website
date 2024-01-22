import { Rubik } from "next/font/google";
import localFont from "next/font/local";

const rubik = Rubik({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-rubik"
});

const neon = localFont({
    src: "./neon_monaspace_v1.ttf",
    display: "swap",
    variable: "--font-neon"
});

export { rubik, neon };
