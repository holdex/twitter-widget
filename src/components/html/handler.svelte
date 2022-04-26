<script context="module">
    function getContainerClassName(dataType) {
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

    function handleProps(n) {
        const props = { ...n };

        if (n.data) {
            props.data = n.data;
        }

        if (n.includes) {
            props.includes = n.includes;
        }

        return props;
    }
</script>

<script>
    import CustomElement from "./customElement.svelte";

    export let node;
    export let components;

    let props = handleProps(node);
    const { data, includes } = props;
</script>

<svelte:component this={components.Tweet} data={props}>
    <svelte:component this={components.p}>
        {@html data.text}
    </svelte:component>
    {#if includes && Array.isArray(includes.tweets)}
        {#each includes.tweets as child}
            <svelte:self
                node={{ data: child, includes: { users: includes.users } }}
                {components}
            />
        {/each}
    {/if}
</svelte:component>

<!-- {#if typeof node === "string"}
    {@html node}
{:else if node.tag === "div"}
    {#if type === "tweet"}
        <svelte:component this={components.Tweet} {...props}>
            {#if node && node.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {:else if type === "pool-container"}
        <svelte:component this={components.Pool} {...props}>
            {#if node && node.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {:else}
        <svelte:component
            this={components.div}
            className={getContainerClassName(type)}
        >
            {#if node && node.nodes && Array.isArray(node.nodes)}
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
        <svelte:self {...props} {components} />
    {:else}
        <svelte:component this={components.a} {...props} children={node.nodes}>
            {#if node && node.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {/if}
{:else if node.tag === "blockquote"}
    {#if props.data && props.data.ast}
        <svelte:self node={props.data.ast[0]} {components} />
    {:else if props.className && props.className.includes("Tweet")}
        <svelte:component
            this={components.Tweet}
            node={node.nodes}
            {...props}
        />
    {:else}
        <svelte:component this={components.blockquote} {...props}>
            {#if node && node.nodes && Array.isArray(node.nodes)}
                {#each node.nodes as child}
                    <svelte:self node={child} {components} />
                {/each}
            {/if}
        </svelte:component>
    {/if}
{:else if components[node.tag]}
    <svelte:component
        this={components[node.tag]}
        {...props}
        className={props.className}
    >
        {#if node && node.nodes && Array.isArray(node.nodes)}
            {#each node.nodes as child}
                <svelte:self node={child} {components} />
            {/each}
        {/if}
    </svelte:component>
{:else if node.tag === "br"}
    <br />
{:else}
    <CustomElement tag={node.tag} {...props}>
        {#if node && node.nodes && Array.isArray(node.nodes)}
            {#each node.nodes as child}
                <svelte:self node={child} {components} />
            {/each}
        {/if}
    </CustomElement>
{/if} -->
