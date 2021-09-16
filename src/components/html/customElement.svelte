<script>
    import { onMount } from "svelte";
    export let tag;
    export let className = undefined;

    let component = null;

    onMount(async () => {
        let module = await import(`svelte-elements/src/${tag}.svelte`);
        component = module.default;
    });
</script>

<svelte this={component} class={className}>
    <slot />
</svelte>
