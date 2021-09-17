import GithubSlugger from 'github-slugger';
import { fetchTweetHtml } from './twitter/api';
import htmlToAst from './markdown/htmlToAst';
import { getTweetData } from './twitter/tweetHtmlEmbed';
import getTweetHtml from './twitter/parseHtml';

class Context {
    constructor() {
        this.slugger = new GithubSlugger();
        this.map = [];
    }
    get(id) {
        return this.map[Number(id)];
    }
    add(data, nodes) {
        return this.map.push({ data, nodes }) - 1;
    }
}

export default async function fetchAst(tweetId) {
    const tweetHtml = await fetchTweetHtml(tweetId);
    const tweet = tweetHtml && getTweetData(tweetHtml);

    if (!tweet) return;

    const context = new Context();
    const html = await getTweetHtml(tweet, context, this);
    const ast = await htmlToAst(html, context);
    return ast;
}