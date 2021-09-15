<script lang="ts">
	const { className, ...rest } = $$props;
</script>

<ul class={className} {...rest}>
	<slot />
</ul>

<style>
	ul {
		margin: var(--text-margin);
		list-style-type: none;
		padding-left: 1rem;
	}
	ul :global(li:before) {
		content: '-';
		color: var(--accents-3);
		position: absolute;
		margin-left: -1rem;
	}
</style>
