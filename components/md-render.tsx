import * as React from 'react'
import unified from 'unified'
import markdown from 'remark-parse'
import slug from 'remark-slug'
import toc from 'remark-toc'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'
import styles from 'styles/md.module.less'
import { Typography } from '@material-ui/core'

interface Props {
    children: string
}

var processor = unified()
    .use(markdown)
    .use(slug)
    .use(toc)
    //   .use(github, {repository: 'rehypejs/rehype-react'})
    .use(remark2rehype)
    //   .use(highlight)
    .use(rehype2react, { createElement: React.createElement })

export const MdRender = ({ children }: Props) => {
    const md = processor.processSync(children) as any
    return (
        <Typography
            variant="body1"
            
            component="div"
            className={styles['md-container']}
        >
            {md.result}
        </Typography>
    )
}
