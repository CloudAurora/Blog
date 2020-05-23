import React from 'react'
import { makeStyles, Theme, createStyles, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))
export const Loading = () => {
    const classes = useStyles();
    return (
        <section className={classes.root}>
            <CircularProgress size={90}/> 
        </section>
    )
}
