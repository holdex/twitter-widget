<script>
    import { getContext } from "svelte";

    import { formatNumber } from "../../lib/utils";

    export let tweet;

    const userUrl = `https://twitter.com/${tweet.username}`;
    const tweetUrl = `${userUrl}/status/${tweet.id}`;
    const count = tweet.replies + tweet.retweets;
    const isConversation = tweet.ctaType === "conversation" || count > 4;

    const theme = getContext("theme");

    let isH = false;

    let onMouseEnter = () => (isH = true);
    let onMouseLeave = () => (isH = false);

    let chevronSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/chevron.png";
    let profileSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/person.png";
    let replySrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/reply.png";
    let replySrcHover =
        "https://storage.googleapis.com/stage-holdex-public/assets/reply-hover.png";
</script>

{#if isConversation}
    <a
        class="exclude {theme}"
        href={tweetUrl}
        title="View the conversation on Twitter"
        target="_blank"
        rel="noopener noreferrer"
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
    >
        {#if isH}
            <img class="icon icon-reply" alt="reply" src={replySrcHover} />
        {:else}
            <img class="icon icon-reply" alt="reply" src={replySrc} />
        {/if}
        <span class="text">
            {count ? formatNumber(count) : tweet.ctaCount} people are talking about
            this
        </span>
        <img class="icon icon-chevron" alt="chevron" src={chevronSrc} />
    </a>
{:else}
    <a
        class="exclude {theme}"
        href={userUrl}
        title={`View ${tweet.name}'s profile on Twitter`}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img class="icon icon-profile" alt="user" src={profileSrc} />
        <span class="text">See {tweet.name}'s other Tweets</span>
        <img class="icon icon-chevron" alt="chevron" src={chevronSrc} />
    </a>
{/if}

<style lang="sass">
    @import "../../common"

    a
        display: flex
        color: map-get($light, tweet-link-color)
        font-size: 0.875rem
        align-items: center
        padding: 0.625rem 1.25rem
        text-decoration: none
        border-top: map-get($light, tweet-border)
        transition: color 0.3s ease-in-out

        &:hover
            color: map-get($light, tweet-link-color-hover)

        &.dark
            color: map-get($dark, tweet-link-color)
            border-top: map-get($dark, tweet-border)

            &:hover
                color: map-get($dark, tweet-link-color-hover)

    .icon
        width: 1.25em
        object-fit: contain

    .icon-chevron
        margin-left: auto

    .text
        margin-left: 0.25rem
</style>
