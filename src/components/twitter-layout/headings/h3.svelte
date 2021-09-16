<script>
    import PermaLink from "./permalink.svelte";
</script>

<style>
    h3 {
        font-size: 1.5rem;
    }
</style>

<h3 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h3>
