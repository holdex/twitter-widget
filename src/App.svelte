<script>
    import { setContext } from "svelte";

    import Node from "./components/html/node.svelte";
    import components from "./components/twitter-layout";

    export let ast;
    export let skeleton;
    export let theme = "light";

    const TweetSkeleton = components.TweetSkeleton;
    setContext("theme", theme);
</script>

<div class="tweet" class:tweet--dark={theme === "dark"}>
    {#if skeleton}
        <TweetSkeleton />
    {:else}
        <Node {components} node={ast[0]} />
    {/if}
</div>

<style lang="sass" src="./tweet.sass">

</style>
