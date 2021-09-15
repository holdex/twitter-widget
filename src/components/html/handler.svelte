<script context="module" lang="ts">
    function getContainerClassName(dataType: string) {
        if (!dataType) return;

        const [type, count] = dataType.split(" ");

        switch (type) {
            case "image-container":
                return `image-container image-count-${count}`;
            case "gif-container":
            case "video-container":
                return type;
        }
    }

    function handleProps(n: any) {
        const props = { ...n.props };

        // Always send className as a string
        if (props.className && Array.isArray(props.className)) {
            props.className = props.className.join(" ");
        }
        if (n.data) {
            props.data = n.data;
        }

        return props;
    }
</script>

<script lang="ts">
    import CustomElement from "./customElement.svelte";

    export let node: any;
    export let components: any;

    let props = handleProps(node);
    const { data } = props;
    const type = props.dataType || (data && data.type);
</script>

{#if typeof node === "string"}
    {@html node}
{:else if node.tag === "div"}
    {#if type === "tweet"}
        <svelte:component this={components.Tweet} {...props}>
            {#if node?.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {:else if type === "pool-container"}
        <svelte:component this={components.Pool} {...props}>
            {#if node?.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {:else}
        <svelte:component
            this={components.div}
            clasName={getContainerClassName(type)}
            {...props}
        >
            {#if node?.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {/if}
{:else if node.tag === "img"}
    {#if type === "emoji-for-text"}
        <svelte:component this={components.Emoji} {...props} />
    {:else if type === "media-image"}
        <svelte:component this={components.img} {...props} />
    {:else}
        {null}
    {/if}
{:else if node.tag === "a"}
    {#if type === "mention"}
        <svelte:component
            this={components.Mention}
            {...props}
            children={node.nodes}
        />
    {:else if type === "hashtag"}
        <svelte:component
            this={components.Hashtag}
            {...props}
            children={node.nodes}
        />
    {:else if type === "cashtag"}
        <svelte:component
            this={components.Cashtag}
            {...props}
            children={node.nodes}
        />
    {:else if type === "quote-tweet"}
        <svelte:component this={components.EmbeddedTweet} {...props} />
    {:else}
        <svelte:component this={components.a} {...props}>
            {#if node?.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {/if}
{:else if node.tag === "blockquote"}
    {#if props.data?.ast}
        <svelte:component
            this={components.EmbeddedTweet}
            ast={props.data?.ast[0]}
        />
    {:else if props.className?.includes("Tweet")}
        <svelte:component
            this={components.Tweet}
            node={node.nodes}
            {...props}
        />
    {:else}
        <svelte:component this={components.blockquote} {...props}>
            {#if node?.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {/if}
{:else if components[node.tag]}
    <svelte:component this={components[node.tag]} {...props}>
        {#if node?.nodes && Array.isArray(node.nodes)}
            {#each node.nodes as child}
                <svelte:self node={child} {components} />
            {/each}
        {/if}
    </svelte:component>
{:else}
    <CustomElement tag={node.tag} {...props}>
        {#if node?.nodes && Array.isArray(node.nodes)}
            {#each node.nodes as child}
                <svelte:self node={child} {components} />
            {/each}
        {/if}
    </CustomElement>
{/if}
