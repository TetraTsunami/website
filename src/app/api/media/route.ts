import { getHistory } from "@/lib/tautulli";
const baseUrl = process.env.TAUTULLI_URL || "http://localhost:8181",
    plexUser = process.env.PLEX_USER || "";

export const GET = async () => {
    return Response.json(await formatHistory());
};


export async function formatHistory() {
    const timestamp = Date.now();
    const response = await getHistory(plexUser, 1);
    const intermediate = await response.json();
    const data = intermediate.response.data.data;
    return {
        timestamp: timestamp,
        data: data.map((item: any) => {
            return {
                title: item.title,
                parent: item.parent_title,
                artist: item.grandparent_title,
                imageUrl: `${baseUrl}/pms_image_proxy?img=${item.thumb}&width=100&height=100`,
            };
        }),
    };
}

export const revalidate = 0