import { faChevronCircleRight, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSWR from "swr";
import NowPlayingDuration from "./NowPlayingDuration";

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

export default function NowPlayingDetail() {
    const { data, error } = useSWR("/api/nowplaying", fetcher);
    const activity = data as Activity;
    
    if (error) return <div>Error</div>;
    if (!data) return <div className="loading">Loading...</div>;
    return (
        <div>
            <FontAwesomeIcon icon={ faChevronCircleRight } />
            <picture className="float-left">
                <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    width={64}
                    height={64}
                />
            </picture>
            <h1>{activity.title}</h1>
            <p>{activity.artist}</p>
            <p>{activity.parent}</p>
            <FontAwesomeIcon icon={activity.isPlaying ? faPlay : faPause} />
            <NowPlayingDuration />
        </div>
    );
}
