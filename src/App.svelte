<script>
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    import Node from "./components/html/node.svelte";
    import components from "./components/twitter-layout";

    export let ast;
    export let skeleton;
    export let theme = "light";

    const TweetSkeleton = components.TweetSkeleton;

    let themeStyle = writable(theme);
    $: $themeStyle = theme;

    setContext("theme", themeStyle);
</script>

<div class="tweet" class:tweet--dark={$themeStyle === "dark"}>
    {#if skeleton || (ast && ast.length === 0)}
        <TweetSkeleton />
    {:else}
        <Node {components} node={ast[0]} />
    {/if}
</div>

<style lang="sass" src="./tweet.sass">

</style>
