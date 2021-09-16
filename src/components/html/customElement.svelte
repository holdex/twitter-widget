<script>
    import * as elements from "svelte-elements/src";
    export let tag;
    export let className = undefined;

    let component = elements[tag];
</script>

<svelte this={component} class={className}>
    <slot />
</svelte>
