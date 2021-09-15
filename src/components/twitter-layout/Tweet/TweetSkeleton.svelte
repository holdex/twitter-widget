<script lang="ts">
    import Skeleton from "../skeleton/index.svelte";

    export let simple: boolean = false;
</script>

<style>
    .container {
        background: var(--tweet-bg-color);
        border: var(--tweet-border);
        border-radius: 5px;
        margin: var(--container-margin);
    }
    .content {
        padding: 1.25rem 1.25rem 0.625rem 1.25rem;
    }
    .footer {
        height: 2.5rem;
        padding: 0.625rem 1.25rem;
        border-top: var(--tweet-border);
    }
</style>

<div class="container">
    <div class="content">
        <Skeleton style="height: 2.25rem" />
        <Skeleton style="height: 7rem; margin: 1.25rem 0" />
        <Skeleton style="height: 1.25rem" />
    </div>
    {#if !simple}
        <div class="footer">
            <Skeleton style="height: 1.25rem" />
        </div>
    {/if}
</div>
