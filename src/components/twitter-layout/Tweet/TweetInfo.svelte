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
        "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23697882%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E";
    let heartSrcHover =
        "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23E0245E%22%20d%3D%22M12%2021.638h-.014C9.403%2021.59%201.95%2014.856%201.95%208.478c0-3.064%202.525-5.754%205.403-5.754%202.29%200%203.83%201.58%204.646%202.73.813-1.148%202.353-2.73%204.644-2.73%202.88%200%205.404%202.69%205.404%205.755%200%206.375-7.454%2013.11-10.037%2013.156H12zM7.354%204.225c-2.08%200-3.903%201.988-3.903%204.255%200%205.74%207.035%2011.596%208.55%2011.658%201.52-.062%208.55-5.917%208.55-11.658%200-2.267-1.822-4.255-3.902-4.255-2.528%200-3.94%202.936-3.952%202.965-.23.562-1.156.562-1.387%200-.015-.03-1.426-2.965-3.955-2.965z%22%2F%3E%3C%2Fsvg%3E";
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
