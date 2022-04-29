<script>
    import App from "./App.svelte";

    const { html } = $$props;
</script>

{#if html}
    <App {...$$props} />
{:else}
    <div>
        <App {...$$props} />
    </div>
{/if}

<style lang="sass" global>
    div *,
	div	*:before,
	div *:after
        margin: 0
        padding: 0
        box-sizing: border-box
</style>
