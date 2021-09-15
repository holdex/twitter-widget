<script lang="ts">
    import Handler from "./handler.svelte";

    export let node: any;
    export let components: any;
</script>

<Handler {node} {components} />
