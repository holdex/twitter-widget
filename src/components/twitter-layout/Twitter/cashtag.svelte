<script lang="ts">
	import Link from './link.svelte';
	const { href, children } = $$props;
</script>

<Link {href} type="$">
	{children[0].replace(/^\$/, '')}
</Link>
