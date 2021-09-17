<script>
    export let id;
</script>

<style>
    span[id] {
        display: block;
        position: absolute;
        visibility: hidden;
        margin-top: calc(-1 * var(--heading-margin-top));
        padding-top: var(--heading-margin-top);
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    a:hover {
        color: inherit;
        border-bottom: 1px solid;
        transition: color .3s ease-in-out;
    }
    a:hover ~ .permalink {
        visibility: visible;
    }
    .permalink {
        visibility: hidden;
        display: none;
        font-weight: 500;
    }
    @media screen and (min-width: 992px) {
        a {
            margin-right: 0.5rem;
        }
        .permalink {
            display: inline-block;
        }
    }
</style>

<template>
    <span {id} />
    <a href={`#${id}`}>
        <slot />
    </a>
    <span class="permalink">#</span>
</template>
