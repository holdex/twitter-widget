import fetchAst from "./lib/fetchAst";

export async function getTweet({ tweetId, env }) {
    const tweet = await fetchAst(tweetId);

    if (tweet && tweet.length) {
        return {
            status: 200,
            headers: {
                "content-type": "application/json",
                "Cache-Control": env === "development" ? "no-cache" : "public, max-age=1440",
            },
            body: { data: tweet, error: null },
        };
    } else {
        return {
            status: 404,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                data: null,
                error: "Not found",
            }),
        };
    }
}