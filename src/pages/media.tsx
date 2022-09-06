import type { NextPage } from "next";
import NowPlayingDetail from "../components/NowPlayingDetail";

const Media: NextPage = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen p-8 container mx-auto">
            <NowPlayingDetail />
        </section>
    );
};

export default Media;
