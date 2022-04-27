
import twttr from "twitter-text";

export default function parser(text, data, media) {
    let elements = {};
    let newText = text;

    if (data.entities.urls) {
        [newText, elements] = parseUrls(newText, elements, data.entities.urls, media);
    }

    if (data.entities.mentions) {
        [newText, elements] = parseMentions(newText, elements);
    }

    if (data.entities.hashtags) {
        [newText, elements] = parseHashtags(newText, elements);
    }

    if (data.entities.cashtags) {
        [newText, elements] = parseCashtags(newText, elements);
    }

    let parsed = [];
    let index = 0;

    newText.split(/(~+)/gu).forEach(token => {
        if (/(~+)/gu.test(token)) {
            parsed.push(elements[`p${index}`]);
            index += token.length;
        } else {
            parsed.push({
                type: "text",
                value: token
            });
            index += token.length;
        }
    });
    return parsed;
}

let parseUrls = (text, elements, entries, media) => {

    let urls = twttr.extractUrlsWithIndices(text);

    let mediaIndex = 0;
    urls.forEach(url => {
        let start = url.indices[0];
        let end = url.indices[1];
        let value = url.url;

        let entry = entries.find(entry => entry.url === value);

        let expanded_url = entry.expanded_url;
        let display_url = entry.display_url;

        if (/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/.test(expanded_url)) {
            let element = {
                type: "space"
            };
            text = replaceRange(text, start, end, getTilds(value.length));
            elements = Object.assign(elements, {
                [`p${start}`]: element
            });
        } else if (/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)\/photo\/.*$/.test(expanded_url)) {
            let element = {
                ...media[mediaIndex],
                type: "image",
                src: media[mediaIndex].url,
            };
            mediaIndex += 1;
            text = replaceRange(text, start, end, getTilds(value.length));
            elements = Object.assign(elements, {
                [`p${start}`]: element
            });
        } else if (/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)\/video\/.*$/.test(expanded_url)) {
            let element = {
                ...media[mediaIndex],
                type: "video",
                src: media[mediaIndex].url,
            };
            mediaIndex += 1;
            text = replaceRange(text, start, end, getTilds(value.length));
            elements = Object.assign(elements, {
                [`p${start}`]: element
            });
        } else if (entry.title) {
            let element = {
                type: "link-preview",
                href: value,
                title: entry.title,
                active: false,
                description: entry.description,
                images: entry.images,
                value: expanded_url
            };
            text = replaceRange(text, start, end, getTilds(value.length));
            elements = Object.assign(elements, {
                [`p${start}`]: element
            });
        } else {
            let element = {
                type: "link",
                href: value,
                value: expanded_url
            };
            text = replaceRange(text, start, end, getTilds(value.length));
            elements = Object.assign(elements, {
                [`p${start}`]: element
            });
        }
    });

    if (elements && Object.values(elements).filter(element => element.type === "image").length === 0) {
        let preview = Object.values(elements).find(entry => entry.type === "link-preview");

        if (preview) {
            preview.active = true;
        }
    }

    return [text, elements];
}

let parseMentions = (text, elements) => {
    let mentions = twttr.extractMentionsOrListsWithIndices(text);

    mentions.forEach(mention => {
        let start = mention.indices[0];
        let end = mention.indices[1];
        let value = mention.screenName;

        let element = {
            type: "mention",
            href: `https://twitter.com/${value}`,
            value: `@${value}`
        };

        text = replaceRange(text, start, end, getTilds(value.length + 1));
        elements = Object.assign(elements, {
            [`p${start}`]: element
        });
    });

    return [text, elements];
}

let parseHashtags = (text, elements) => {
    let hashtags = twttr.extractHashtagsWithIndices(text);

    hashtags.forEach(hashtag => {
        let start = hashtag.indices[0];
        let end = hashtag.indices[1];
        let value = hashtag.hashtag;

        let element = {
            type: "hashtag",
            href: `https://twitter.com/hashtag/${value}?src=hashtag_click`,
            value: `#${value}`
        };

        text = replaceRange(text, start, end, getTilds(value.length + 1));
        elements = Object.assign(elements, {
            [`p${start}`]: element
        });
    });

    return [text, elements];
}

let parseCashtags = (text, elements) => {
    let cashtags = twttr.extractCashtagsWithIndices(text);

    cashtags.forEach(cashtag => {
        let start = cashtag.indices[0];
        let end = cashtag.indices[1];
        let value = cashtag.cashtag;

        let element = {
            type: "cashtag",
            href: `https://twitter.com/search?q=%24${value}&src=cashtag_click`,
            value: `$${value}`
        };

        text = replaceRange(text, start, end, getTilds(value.length + 1));
        elements = Object.assign(elements, {
            [`p${start}`]: element
        });
    });

    return [text, elements];
}

function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
}

function getTilds(length) {
    let tilds = [];
    for (let i = 0; i < length; i++) {
        tilds.push("~");
    }
    return tilds.join("");
}