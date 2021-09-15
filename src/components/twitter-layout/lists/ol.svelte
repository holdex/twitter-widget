<script lang="ts">
	const { className, ...rest } = $$props;
</script>

<ol class={className} {...rest}>
	<slot />
</ol>

<style>
	ol {
		margin: var(--text-margin);
		padding-left: 1rem;
	}
</style>
