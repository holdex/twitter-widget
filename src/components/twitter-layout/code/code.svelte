<script>
    const { className, ...rest } = $$props;
</script>

<style>
    code {
        font-size: 14px;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
            serif;
    }
    code.inline {
        color: var(--inline-code-color);
        font-size: 1rem;
        white-space: pre-wrap;
    }
</style>

<code class={className} {...rest}>
    <slot />
</code>
