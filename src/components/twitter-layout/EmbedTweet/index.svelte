<script>
    import Node from "../../html/node.svelte";
    import components from "..";

    export let ast;
</script>

<Node {components} node={ast} />
