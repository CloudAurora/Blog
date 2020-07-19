declare module 'rehype-highlight' {
    interface Options {
        ignoreMissing?: boolean
        languages?: Record<string, any>
        aliases?: Record<string, string[]>
        prefix?: string
    }
    export default (options: Options) => any
}
