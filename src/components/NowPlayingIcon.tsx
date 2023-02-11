import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";

async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
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

export default function NowPlayingIcon() {
    const { data, error } = useSWR("/api/nowplaying", fetcher);
    const activity = data as Activity;

    if (error) return;
    if (!data) return;
    if (!activity.isPlaying) return;
    return (
        <FontAwesomeIcon
            icon={faPlay}
            className="inline text-violet-400 mx-2 animate-pulse"
            size={"md" as SizeProp}
        />
    );
}
