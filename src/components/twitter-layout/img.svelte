<script>
    import { onMount } from "svelte";

    const { width, height, src, className, alt, ...rest } = $$props;

    onMount(async () => {
        // @ts-ignore
        await import("@github/details-dialog-element");
    });
</script>

<details>
    <summary style="padding-bottom: {(height / width) * 100 || 0}%;">
        <div class="wrapper">
            <img {...rest} {alt} src={`${src}&name=small`} />
        </div>
    </summary>

    <details-dialog>
        <div class="bg" data-close-dialog />
        <img {...rest} {alt} src={`${src}&name=large`} {width} {height} />
    </details-dialog>
</details>

<style>
    details {
        height: 100%;
        overflow: hidden;
    }

    .wrapper {
        position: absolute;
        display: block;
        overflow: hidden;
        inset: 0px;
        margin: 0;
    }

    .wrapper img {
        position: absolute;
        inset: 0px;
        box-sizing: border-box;
        padding: 0px;
        border: none;
        margin: auto;
        display: block;
        width: 0px;
        height: 0px;
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        max-height: 100%;
        object-fit: cover;
    }
    summary {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        list-style: none;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    summary :global(img) {
        cursor: pointer;
        object-fit: cover;
    }
    :global(details-dialog) {
        position: fixed;
        top: 0;
        left: 50%;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        text-align: center;
        transform: translateX(-50%);
        padding: 5vh 1.5rem;
        z-index: 999;
    }
    details[open] :global(details-dialog > .bg) {
        position: fixed;
        background: rgba(0, 0, 0, 0.3);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: -1;
    }
    @media screen and (max-width: 450px) {
        :global(details-dialog) {
            padding: 5vh 1rem;
        }
    }
</style>
