<script>
    const { className, ...rest } = $$props;
</script>

<style>
    pre {
        color: var(--code-color);
        background: var(--code-bg-color);
        padding: 1.25rem;
        margin: var(--container-margin);
        white-space: pre;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }
</style>

<pre class="className" {...rest}><slot /></pre>
