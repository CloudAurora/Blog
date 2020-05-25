import React from 'react'
import {
    makeStyles,
    Theme,
    createStyles,
    CircularProgress,
} from '@material-ui/core'

const useStyles = makeStyles<Theme, Props>((theme: Theme) =>
    createStyles({
        root: (props) => ({
            display: 'flex',
            width: props.width ?? '100%',
            height: props.height ?? '100%',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
        }),
    })
)

interface Props {
    width?: number | string

    height?: number | string
    size?: number | string
}

export const Loading = (props: Props) => {
    const classes = useStyles(props)
    return (
        <section className={classes.root}>
            <CircularProgress size={props.size} />
        </section>
    )
}
