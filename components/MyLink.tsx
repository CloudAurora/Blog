import * as React from 'react'
import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps {
    className?: string
    style?: React.CSSProperties
}

export const MyLink = React.forwardRef<any, React.PropsWithChildren<Props>>(
    (props, ref) => {
        const {
            href,
            as,
            prefetch,
            replace,
            scroll,
            shallow,
            passHref,
            ...rest
        } = props
        return (
            <Link
                href={href}
                as={as}
                ref={ref}
                prefetch={prefetch}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref={passHref}
            >
                <a {...rest}>{props.children}</a>
            </Link>
        )
    }
)
