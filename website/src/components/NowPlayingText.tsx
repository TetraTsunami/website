"use client";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronCircleRight,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from "swr";
import Error from "./util/Error";
import Loading from "./util/Loading";

async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
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

export default function NowPlayingText() {
  const { data, error } = useSWR("/api/nowplaying", fetcher);
  const activity = data as Activity;

  if (error) return <Error className="w-96" />;
  if (!data) return <Loading icon={faMusic} className="w-96" />;
  return (
    <Link className="m-2 mx-4 flex hover:underline" href="/media" passHref>
      <FontAwesomeIcon
        icon={faChevronCircleRight}
        className="inline text-orange-400"
        size={"lg" as SizeProp}
      />
      <span className="pl-2 text-gray-400">
        <span className="text-white">{activity.title || "Not Playing"}</span> –
        Plex
      </span>
    </Link>
  );
}
