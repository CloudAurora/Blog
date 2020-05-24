declare module 'markdown-toc' {
    export interface TocItem {
        content: string
        slug: string
        lvl: number
        i: number
        seen: number
    }
    export interface TocResult {
        json: TocItem[]
    }

    declare var handler: (body: string, options?: any) => TocResult
        
    export = handler
}
