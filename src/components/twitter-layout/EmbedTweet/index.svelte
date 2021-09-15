<script lang="ts">
    import Node from "../../html/node.svelte";
    import components from "..";

    export let ast: any;
</script>


<Node {components} node={ast} />
