

export default function parser(text, data) {
    let urls = [], mentions = [], hashtags = [], cashtags = [];
    let newText = text;

    [newText, urls] = parseUrls(newText, data.entities.urls);
    [newText, mentions] = parseMentions(newText, data.entities.mentions);
    [newText, hashtags] = parseHashtags(newText, data.entities.hashtags);
    [newText, cashtags] = parseCashtags(newText, data.entities.cashtags);

    newText.match(/~/g);
}

let parseUrls = (text, entries) => {
    let elements = [];

    entries.forEach(entry => {
        let start = entry.start;
        let end = entry.end;

        let url = entry.url;
        let expanded_url = entry.expanded_url;
        let display_url = entry.display_url;

        if (/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+).*$/.test(expanded_url)) {
            text = replaceRange(text, start, end, getTilds(url.length));
            continue;
        }

        let element = {
            type: "link",
            href: expanded_url,
            value: url
        };
        text = replaceRange(text, start, end, getTilds(url.length));
        elements.push(element);
    });

    return [text, elements];
}

let parseMentions = (text, entries) => {
    let elements = [];

    entries.forEach(entry => {
        let start = entry.start;
        let end = entry.end;
        let username = entry.username;

        let href = `https://twitter.com/${username}`;
        let value = `@${username}`;

        let element = {
            type: "mention",
            href: href,
            value: value
        };

        text = replaceRange(text, start, end, getTilds(value.length));
        elements.push(element);
    });

    return [text, elements];
}

let parseHashtags = (text, entries) => {
    let elements = [];

    entries.forEach(entry => {
        let start = entry.start;
        let end = entry.end;
        let tag = entry.tag;

        let href = `https://twitter.com/hashtag/${tag}?src=hashtag_click`;
        let value = `#${tag}`;

        let element = {
            type: "hashtag",
            href: href,
            value: value
        };

        text = replaceRange(text, start, end, getTilds(value.length));
        elements.push(element);
    });

    return [text, elements];
}

let parseCashtags = (text, entries) => {
    let elements = [];

    entries.forEach(entry => {
        let start = entry.start;
        let end = entry.end;
        let tag = entry.tag;

        let href = `https://twitter.com/search?q=%24${tag}&src=cashtag_click`;
        let value = `$${tag}`;

        let element = {
            type: "cashtag",
            href: href,
            value: value
        };

        text = replaceRange(text, start, end, getTilds(value.length));
        elements.push(element);
    });

    return [text, elements];
}

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function getTilds = (length) => {
    let tilds = [];
    for (let i = 0; i < length; i++) {
        tilds.push("~");
    }
    return tilds.join("");
}
