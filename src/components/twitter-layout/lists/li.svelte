<script>
    const { className, ...rest } = $$props;
</script>

<style>
    li {
        padding-left: 0;
        margin: var(--li-margin);
    }
</style>

<li class={className} {...rest}>
    <slot />
</li>
