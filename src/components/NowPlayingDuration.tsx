import { useEffect, useState } from "react";
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

export default function NowPlayingDuration() {
    const { data, error, mutate} = useSWR("/api/nowplaying", fetcher);
    const [elapsed, setElapsed] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(0);
    const [animationDuration, setAnimationDuration] = useState(0);
    const activity = data as Activity;

    useEffect(() => {
        const interval = setInterval(() => {
            // Updating the duration every second
            if (activity.timestamp > lastUpdated) {
                setAnimationDuration(0);
                setElapsed(+activity.elapsed);
                setLastUpdated(+activity.timestamp);
            } else if (elapsed > activity.duration) {
                // The duration has ended, so we need to refresh the data
                setAnimationDuration(0);
                mutate("/api/nowplaying");
            } else {
                setAnimationDuration(1000);
                setElapsed((prevState) => +prevState + 1000);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [activity, mutate, elapsed, lastUpdated]);

    if (error) return <div>Error</div>;
    if (!data) return <div className="loading">Loading...</div>;

    return (
        <div className="rounded-full h-4 w-full bg-gray-500 relative">
            <div
                className="rounded-full bg-green-400 absolute left-0 top-0 bottom-0 ease-linear origin-left"
                style={{
                    animationDuration: `${animationDuration}ms`,
                    transitionProperty: "width",
                    width: `${((elapsed / activity.duration) * 100).toFixed(2)}%`,
                }}
            ></div>
        </div>
    );
}

//  <progress
//      className="rounded-full overflow-hidden"
//      value={Math.round((activity.elapsed / activity.duration) * 100)}
//      max="100"
//  />;

// `${activity.elapsed / activity.duration * 100}%`
