<script>
    import App from "./App.svelte";
</script>

<style lang="sass" global>
    div *,
	div	*:before,
	div *:after
        margin: 0
        padding: 0
        box-sizing: border-box
</style>

<div>
    <App {...$$props} />
</div>
