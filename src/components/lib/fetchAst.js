import GithubSlugger from 'github-slugger';
import { getTweetData } from './twitter/tweetHtmlEmbed';
import getTweetHtml from './twitter/parseHtml';
import htmlToAst from './markdown/htmlToAst';

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

export default async function parseTweetHtml(tweetHTML, fetcher) {
    const tweet = tweetHTML && getTweetData(tweetHTML);
    if (!tweet) return undefined;

    const context = new Context();
    const html = await getTweetHtml(tweet, context, fetcher);
    const ast = await htmlToAst(html, context);

    return ast;
}