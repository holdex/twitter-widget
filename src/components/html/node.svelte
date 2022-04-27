<script>
    import Handler from "./handler.svelte";

    export let node;
    export let components;

    const { replies, parsedText } = node;
</script>

<svelte:component this={components.Tweet} data={node}>
    <svelte:component this={components.div} className="content-container">
        <Handler node={parsedText} {components} />
    </svelte:component>
    {#if replies && Array.isArray(replies)}
        {#each replies as child}
            <svelte:self node={child} {components} />
        {/each}
    {/if}
</svelte:component>
