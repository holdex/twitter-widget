<script lang="ts">
    export let tag: string;
    export let className: string = undefined;

    let content: any;
    function uplift(node, _) {
        // content will only be defined after the first render, so all logic can be done in update
        return {
            update({ tag, content, className }) {
                const el = document.createElement(`${tag}`);
                el.appendChild(content);
                if (className) {
                    el.classList.add(className);
                }
                node.appendChild(el);
            },
        };
    }
</script>

<style>
    div {
        /* This removes the divs from the flow, so they do not have any effect on the layout */
        display: contents;
    }
</style>

<div use:uplift={{ content, tag, className }}>
    <div bind:this={content}>
        <slot />
    </div>
</div>
