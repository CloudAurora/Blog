import * as React from 'react'
import unified, { Transformer } from 'unified'
import markdown from 'remark-parse'
import slug from 'remark-slug'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import highlight from 'rehype-highlight'
import { hljsDefineGraphQL } from 'utils'
import util from 'mdast-util-toc'

const tocProcessor = unified()
    .use(remark2rehype)
    .use(rehype2react, { createElement: React.createElement })

export const useRemark = (body: string, skipToc?: boolean) => {
    const [toc, setToc] = React.useState<JSX.Element | null>(null)
    const docProcessor = React.useMemo(
        () =>
            unified()
                .use(markdown)
                .use(() => {
                    const transformer: Transformer = (node) => {
                        if (skipToc) return
                        const result = util(node, {})
                        if (!result.map) return
                        const tocNode = tocProcessor().runSync(result.map)
                        setToc(tocProcessor().stringify(tocNode) as any)
                    }
                    return transformer
                })
                .use(slug)
                .use(remark2rehype)
                .use(highlight, {
                    ignoreMissing: true,
                    languages: {
                        graphql: hljsDefineGraphQL,
                    },
                })
                .use(rehype2react, { createElement: React.createElement }),
        [skipToc]
    )

    const doc = React.useMemo<JSX.Element>(() => {
        if (!body) return null
        const md = docProcessor().processSync(body) as any
        return md.result
    }, [docProcessor, body])

    return [doc, toc] as const
}
