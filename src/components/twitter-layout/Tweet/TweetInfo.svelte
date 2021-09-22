<script>
    import format from "date-fns/format";
    import { getContext } from "svelte";
    import { formatNumber } from "../../lib/utils";

    export let tweet;

    const likeUrl = `https://twitter.com/intent/like?tweet_id=${tweet.id}`;
    const tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`;
    const createdAt = new Date(tweet.createdAt);
    const theme = getContext("theme");

    let isH = false;

    let onMouseEnter = () => (isH = true);
    let onMouseLeave = () => (isH = false);

    let heartSrc =
        "https://storage.googleapis.com/stage-holdex-public/assets/heart.png";
    let heartSrcHover =
        "https://storage.googleapis.com/stage-holdex-public/assets/heart-hover.png";
</script>

<div class="info">
    <a
        class="like exclude {theme}"
        href={likeUrl}
        title="Like"
        target="_blank"
        rel="noopener noreferrer"
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
    >
        <div class="heart">
            {#if isH}
                <img class="icon icon-heart" alt="heart" src={heartSrcHover} />
            {:else}
                <img class="icon icon-heart" alt="heart" src={heartSrc} />
            {/if}
        </div>
        {#if tweet.heartCount || tweet.likes > 0}
            <span class="likes"
                >{tweet.heartCount || formatNumber(tweet.likes)}</span
            >
        {/if}
    </a>
    {#if createdAt}
        <a
            class="time exclude {theme}"
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
        >
            <time
                title={`Time Posted: ${createdAt.toUTCString()}`}
                dateTime={createdAt.toISOString()}
            >
                {format(createdAt, "h:mm a - MMM d, y")}
            </time>
        </a>
    {/if}
</div>

<style lang="sass">
    @import "../../common"

    a
        text-decoration: none

    .info
        font-size: 0.875rem
        display: flex

    .icon-heart
        position: relative
        width: 1.25em
        height: 1.25em
        object-fit: contain

    .like
        display: flex
        color: map-get($light, tweet-color-gray)
        margin-right: 0.75rem

        &:visited
            color: map-get($light, tweet-link-color)

        &:hover
            color: map-get($light, tweet-color-red)

        &.dark
            color: map-get($dark, tweet-color-gray)

            &:visited
                color: map-get($dark, tweet-link-color)

            &:hover
                color: map-get($dark, tweet-color-red)

    .likes
        margin-left: 0.25rem

    .time
        color: map-get($light, tweet-color-gray)

        &:hover,
        &:focus
            color: map-get($light, tweet-link-color-hover)

        &:focus
            text-decoration: underline

        &.dark
            color: map-get($dark, tweet-color-gray)

            &:hover,
            &:focus
                color: map-get($dark, tweet-link-color-hover)
</style>
