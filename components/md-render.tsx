import * as React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import slug from 'remark-slug'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import highlight from 'rehype-highlight'
import { hljsDefineGraphQL } from 'utils'
import styles from 'styles/markdown.module.css'
interface Props {
    children: string
}

var processor = unified()
    .use(markdown)
    .use(slug)
    //   .use(github, {repository: 'rehypejs/rehype-react'})
    .use(remark2rehype)
    .use(highlight, {
        ignoreMissing: true,
        languages: {
            'graphql': hljsDefineGraphQL
        }
    })
    .use(rehype2react, { createElement: React.createElement })

export const MdRender = ({ children }: Props) => {
    const md = processor.processSync(children) as any
    return <div className={styles.markdown}>{md.result}</div>
}
