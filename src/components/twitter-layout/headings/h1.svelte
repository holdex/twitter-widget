<script>
    import PermaLink from "./permalink.svelte";
</script>

<style>
    h1 {
        font-size: 2rem;
    }
</style>

<h1 class="heading">
    <PermaLink id={$$props.data.id}>
        <slot />
    </PermaLink>
</h1>
