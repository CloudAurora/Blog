import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
// import styles from 'styles/splash.module.less'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '40vh',
            objectFit: 'cover',
            objectPosition: '40% center',
            marginBottom: '-30vh',
        },
    })
)
export const Splash = () => {
    const classes = useStyles()
    return null
    // return <img src="/static/banner3.jpg" className={classes.root} />
}
