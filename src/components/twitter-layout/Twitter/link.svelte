<script lang="ts">
	const { href, title, type } = $$props;
</script>

<a {href} target="_blank" rel="noopener noreferrer" title={title || href}>
	<s>{type}</s>
	<b><slot /></b>
</a>

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
