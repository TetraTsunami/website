import { getActivity } from "@/lib/tautulli";
const baseUrl = process.env.TAUTULLI_URL || "http://localhost:8181",
    plexUser = process.env.PLEX_USER || "";

export const GET = async () => {
    const timestamp = Date.now();
    const response = await getActivity();

    if (response.status > 400) {
        return Response.json({ isPlaying: false });
    }

    const intermediate = await response.json();
    const data = intermediate.response.data;
    const session = data.sessions.filter(
        (session: any) => session.user === plexUser
    )[0];

    if (!session || data.stream_count === 0) {
        return Response.json({ isPlaying: false });
    }
    const isPlaying = session.state == "playing" ? true : false,
        elapsed = session.view_offset,
        duration = session.duration,
        title = session.title,
        artist = session.grandparent_title || "", // original_title and grandparent_title's values fluctuate depending on the type of media and its organization.
        parent = session.parent_title,
        imageUrl =
            baseUrl +
            "/pms_image_proxy?img=" +
            session.thumb +
            "&width=100&height=100",
        guid = session.guid;

    return Response.json({
        isPlaying,
        elapsed,
        duration,
        title,
        parent,
        artist,
        imageUrl,
        guid,
        timestamp,
    });
};
