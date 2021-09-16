<script>
    const { className, ...rest } = $$props;
</script>

<style>
    blockquote {
        background: var(--accents-1);
        color: var(--accents-5);
        border: 1px solid var(--accents-2);
        margin: var(--container-margin);
        padding: 0 1.25rem;
    }
</style>

<blockquote class={className} {...rest}>
    <slot />
</blockquote>
