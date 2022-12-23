const baseUrl = process.env.TAUTULLI_URL || "http://localhost:8181",
    apiKey = process.env.TAUTULLI_API_KEY || "";

export async function getActivity() {
    return fetch(`${baseUrl}/api/v2?apikey=${apiKey}&cmd=get_activity`);
}

export async function getHistory(user, grouping) {
    return fetch(
        `${baseUrl}/api/v2?apikey=${apiKey}&cmd=get_history&user=${user}&grouping=${grouping}`
    );
}
