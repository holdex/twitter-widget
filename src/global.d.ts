/// <reference types="svelte" />

// CSS modules
type CSSModuleClasses = { readonly [key: string]: string }

declare module '*.module.css' {
    const classes: CSSModuleClasses
    export default classes
}

// CSS
declare module '*.css' {
    const css: string
    export default css
}
// Built-in asset types
// see `src/constants.ts`

// images
declare module '*.jpg' {
    const src: string
    export default src
}
declare module '*.jpeg' {
    const src: string
    export default src
}
declare module '*.png' {
    const src: string
    export default src
}
declare module '*.gif' {
    const src: string
    export default src
}
declare module '*.svg' {
    const src: string
    export default src
}
declare module '*.ico' {
    const src: string
    export default src
}
declare module '*.webp' {
    const src: string
    export default src
}
declare module '*.avif' {
    const src: string
    export default src
}