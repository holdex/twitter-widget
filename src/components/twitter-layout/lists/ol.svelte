<script>
    const { className, ...rest } = $$props;
</script>

<style>
    ol {
        margin: var(--text-margin);
        padding-left: 1rem;
    }
</style>

<ol class={className} {...rest}>
    <slot />
</ol>
