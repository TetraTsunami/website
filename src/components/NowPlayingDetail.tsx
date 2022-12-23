import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
    faChevronCircleRight,
    faMusic,
    faPause,
    faPlay
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Error from "./util/Error";
import Loading from "./util/Loading";
import StyledProgress1 from "./util/StyledProgress1";

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

export default function NowPlayingDetail() {
    const { data, error, isValidating, mutate } = useSWR("/api/nowplaying", fetcher);
    const [elapsed, setElapsed] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(0);
    const activity = data as Activity;

    useEffect(() => {
        const updateElapsed = async () => {
            if (!data || !activity.isPlaying) return;
            
            if (activity.timestamp > lastUpdated) {
                setElapsed(
                    +activity.elapsed + (Date.now() - activity.timestamp)
                );
                setLastUpdated(+activity.timestamp);
            } else {
                setElapsed((prevState) => 
                     +prevState + 1000
                );
            }
        };
        updateElapsed();

        const interval = setInterval(() => {
            // Updating the duration every second
            updateElapsed();
        }, 1000);
        return () => clearInterval(interval);
    }, [activity]);

    
    if (error) return <Error className="w-96 h-48" />;
    if (!data)
        return <Loading icon={faMusic} className="w-96 h-48 rounded-xl" />;
    
    if (elapsed > +activity.duration && !isValidating) {
        // The duration has ended, so we need to refresh the data
        mutate();
    }
    return (
        <div className="w-96 h-48 dark:text-white animate-fade-up">
            <div className="mb-2 clear-both">
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                    size={"lg" as SizeProp}
                    className="text-orange-400"
                />
                <p className="inline text-gray-600 dark:text-gray-400 my-2">
                    {" "}
                    – Plex
                </p>
            </div>
            {activity.imageUrl ? (
                <picture className="float-left mr-2">
                    <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        width={96}
                        height={96}
                        className="rounded-lg aspect-square object-cover bg-violet-300"
                    />
                </picture>
            ) : (
                <div className="float-left bg-gray-400 w-24 h-24 mr-2 flex justify-center items-center rounded-lg">
                    <FontAwesomeIcon icon={faPause} />
                </div>
            )}
            <div className="min-h-24 max-h-26 overflow-auto">
                <h1 className="text-lg">{activity.title || "Not Playing"}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {activity.artist || ""}
                </p>
                <p className="text-sm overflow-clip text-gray-600 dark:text-gray-400">
                    {activity.parent || ""}
                </p>
            </div>
            <div className="pt-2 clear-both flex items-center">
                <FontAwesomeIcon
                    icon={activity.isPlaying ? faPlay : faPause}
                    className="mr-2"
                />
                <StyledProgress1
                    value={elapsed}
                    max={activity.duration || 1}
                    indeterminate={(isValidating) ? true : false}
                />
            </div>
        </div>
    );
}
