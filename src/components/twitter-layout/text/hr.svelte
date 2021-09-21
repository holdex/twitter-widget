<script>
    const { className, ...rest } = $$props;
</script>

<hr class={className} {...rest} />

<style>
    hr {
        border: 0;
        border-top: 1px solid var(--accents-2);
        margin: var(--text-margin);
    }
</style>
