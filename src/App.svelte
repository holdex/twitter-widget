<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    import Node from "./components/html/node.svelte";
    import components from "./components/twitter-layout";

    export let ast;
    export let skeleton;
    export let theme = "light";
    export let html = false;

    const TweetSkeleton = components.TweetSkeleton;

    let themeStyle = writable(theme);
    $: $themeStyle = theme;

    setContext("theme", themeStyle);
</script>

<div class="tweet" class:tweet--dark={$themeStyle === "dark"}>
    {#if skeleton}
        <TweetSkeleton />
    {:else}
        <Node {components} node={ast} html={html} />
    {/if}
</div>

<style lang="sass" src="./tweet.sass">

</style>
