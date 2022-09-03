import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}

interface Activity {
    isPlaying: boolean;
    elapsed: number;
    duration: number;
    title: string;
    parent: string;
    artist: string;
    imageUrl: string;
    guid: string;
    timestamp: number;
}

export default function NowPlayingText() {
    const { data, error } = useSWR("/api/nowplaying", fetcher);
    const activity = data as Activity;
    
    if (error) return <div>Error</div>;
    if (!data) return <div className="loading">Loading...</div>;
    return (
        <div className="m-2 mx-4">
            <FontAwesomeIcon
                icon={faChevronCircleRight}
                className="inline text-orange-400"
                size={"lg" as SizeProp}
            />
            <span className="pl-2 text-gray-400">
                <span className="text-white">{activity.title || "Not Playing"}</span> – Plex
            </span>
        </div>
    );
}
