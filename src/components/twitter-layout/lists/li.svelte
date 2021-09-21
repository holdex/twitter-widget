<script>
    const { className, ...rest } = $$props;
</script>

<li class={className} {...rest}>
    <slot />
</li>

<style>
    li {
        padding-left: 0;
        margin: var(--li-margin);
    }
</style>
