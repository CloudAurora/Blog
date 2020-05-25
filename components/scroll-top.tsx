import * as React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { isServer } from 'utils'

interface Props {
    // children?: React.ReactElement
    element?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    })
)

export function ScrollTop(props: Props) {
    const classes = useStyles()
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: isServer() ? undefined : document.getElementById('container') as any,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector(props.element ?? 'article')

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    return (
        <Zoom in={trigger}>
            <div
                onClick={handleClick}
                role="presentation"
                className={classes.root}
            >
                <Fab
                    color="secondary"
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </div>
        </Zoom>
    )
}
