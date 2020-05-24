import * as React from 'react'

import styles from 'styles/markdown.module.css'

interface Props {
    toc?: React.ReactNode
}

export const MdRender = ({ toc, children }: React.PropsWithChildren<Props>) => {
    return (
        <div className={styles.markdown}>
            {toc ?? null}
            {children}
        </div>
    )
}
