<script>
    const { width, height, src, className, alt, ...rest } = $$props;
</script>

<style>
    summary {
        position: relative;
        box-sizing: border-box;
        padding-bottom: var(--height) / var(--width) * 100%;
    }

    details {
        height: 100%;
        overflow: hidden;
    }
    summary {
        position: relative;
        height: 100%;
        list-style: none;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    summary :global(img) {
        cursor: pointer;
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

<details style="--height={height}; --width={width};">
    <summary>
        <img {...rest} {alt} src={`${src}&name=small`} />
    </summary>

    <details-dialog>
        <div class="bg" data-close-dialog />
        <img {...rest} {alt} src={`${src}&name=large`} {width} {height} />
    </details-dialog>
</details>
