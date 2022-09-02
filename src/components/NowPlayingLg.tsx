import { faChevronCircleRight, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
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
}

export default function NowPlayingLg() {
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
            <progress
                value={Math.round(activity.elapsed / activity.duration * 100)}
                max="100"
            ></progress>
        </div>
    );
}
