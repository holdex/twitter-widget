<script>
    import Node from "./components/html/node.svelte";
    import components from "./components/twitter-layout";

    export let ast;
    export let skeleton;
    export let theme = "light";

    const TweetSkeleton = components.TweetSkeleton;
</script>

<style lang="sass" src="./tweet.sass">

</style>

<div class="tweet" class:tweet--dark={theme === "dark"}>
    {#if skeleton}
        <TweetSkeleton />
    {:else}
        <Node {components} node={ast[0]} />
    {/if}
</div>
