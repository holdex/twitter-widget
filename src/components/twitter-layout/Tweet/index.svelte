<script>
    import TweetHeader from "./TweetHeader.svelte";
    import TweetInfo from "./TweetInfo.svelte";
    import TweetAction from "./TweetAction.svelte";

    const { data, className } = $$props;
</script>

<div class="tweet {className}">
    <blockquote>
        <TweetHeader tweet={data} />
        <slot />
        <TweetInfo tweet={data} />
    </blockquote>
    <TweetAction tweet={data} />
</div>

<style>
    .tweet {
        color: var(--tweet-font-color);
        font: var(--tweet-font);
        overflow: hidden;
        background: var(--tweet-bg-color);
        border: var(--tweet-border);
        border-radius: 5px;
        margin: var(--container-margin);
    }
    .tweet:hover {
        border: var(--tweet-border-hover);
        transition: border-color 0.3s ease-in-out;
    }
    blockquote {
        position: relative;
        padding: 1.25rem 1.25rem 0.625rem 1.25rem;
    }

    .tweet :global(.icon) {
        display: inline-block;
        height: 1.25em;
        vertical-align: text-bottom;
        background-size: contain;
        background-repeat: no-repeat;
    }
</style>
