<script>
    const { href, title, type } = $$props;
</script>

<style>
    a {
        color: #22bad9;
        text-decoration: none;
    }
    a:hover > b {
        text-decoration: underline;
    }
    s {
        text-decoration: none;
    }
</style>

<a {href} target="_blank" rel="noopener noreferrer" title={title || href}>
    <s>{type}</s>
    <b><slot /></b>
</a>
