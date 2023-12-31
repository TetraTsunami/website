"use client"
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
    }, [activity, data, lastUpdated]);

    
    if (error) return <Error className="h-48 w-96" />;
    if (!data)
        return <Loading icon={faMusic} className="h-48 w-96 rounded-xl" />;
    
    if (elapsed > +activity.duration && !isValidating) {
        // The duration has ended, so we need to refresh the data
        mutate();
    }
    return (
        <div className="h-48 w-96 animate-fade-up dark:text-white">
            <div className="clear-both mb-2">
                <FontAwesomeIcon
                    icon={faChevronCircleRight}
                    size={"lg" as SizeProp}
                    className="text-orange-400"
                />
                <p className="my-2 inline text-gray-600 dark:text-gray-400">
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
                        className="aspect-square rounded-lg bg-violet-300 object-cover"
                    />
                </picture>
            ) : (
                <div className="float-left mr-2 flex h-24 w-24 items-center justify-center rounded-lg bg-violet-300/50">
                    <FontAwesomeIcon icon={faPause} />
                </div>
            )}
            <div className="max-h-26 min-h-24 overflow-auto">
                <h1 className="text-lg">{activity.title || "Not Playing"}</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {activity.artist || ""}
                </p>
                <p className="overflow-clip text-sm text-gray-600 dark:text-gray-400">
                    {activity.parent || ""}
                </p>
            </div>
            <div className="clear-both flex items-center pt-2">
                <FontAwesomeIcon
                    icon={activity.isPlaying ? faPlay : faPause}
                    className="mr-2"
                />
                <StyledProgress1
                    value={elapsed}
                    max={activity.duration || 1}
                    indeterminate={isValidating ? true : false}
                />
            </div>
        </div>
    );
}
