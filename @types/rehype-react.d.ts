declare module 'rehype-react' {
    import * as React from 'react'
    interface Options {
        createElement: typeof React.createElement
        Fragment?: React.ComponentType<{ children?: React.ReactNode }>
        components?: {
            [tagName: string]: React.ComponentType<any>
        }
        prefix?: string
    }
    export default (options: Options) => any
}
