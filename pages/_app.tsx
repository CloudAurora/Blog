import React from 'react'
import {
    ThemeProvider,
    makeStyles,
    Theme,
    createStyles,
} from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import SearchAppBar from 'components/app-bar'
import { theme } from 'styles/theme'
// import styles from 'styles/app.module.less'
// import { MyBreadcrumb } from 'components/breadcrumb'
import { CssBaseline, Grid, Hidden } from '@material-ui/core'
import { SideMenu } from 'components/side-menu'
import { withApollo } from 'apollo/client'
import 'styles/global.css'
import { SideDrawer } from 'components/side-drawer'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'stretch',
            flexFlow: 'column nowrap',
            position: 'relative',
            overflow: 'hidden',
            width: '100vw',
            height: '100vh',
            background: '#f0f0f0',
            minHieght: '100vh',
        },
        main: {
            flex: '1 1 auto',
            display: 'flex',
            overflow: 'hidden',
            padding: 0,
            paddingTop: theme.spacing(1),
        },
        container: {
            flexGrow: 1,
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            minHeight: '100%',
            height: '100%',
            overflow: 'hidden auto',
        },
        part: {
            height: '100%',
            flexGrow: 1,
            [theme.breakpoints.down('lg')]: {
                paddingLeft: '0 !important',
                paddingRight: '0 !important'
            },
            minHeight: '100%',
            maxWidth: '100%'
        },
        partSide: {
            height: '100%',
            position: 'sticky',
            top: 0,
            left: 0,
            flexShrink: 0,
            overflow: 'auto',
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
    })
)

export default withApollo(({ Component, pageProps }: AppProps) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        jssStyles?.parentElement?.removeChild(jssStyles)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <section className={classes.root}>
                <SearchAppBar toggleDrawer={() => setOpen(!open)} open={open} />
                <main className={classes.main}>
                    <SideDrawer open={open} setOpen={setOpen} />
                    <Grid
                        container
                        className={classes.container}
                        id="container"
                        spacing={3}
                        wrap={'nowrap'}
                    >
                        {/* <MyBreadcrumb /> */}
                        <Grid
                            item
                            xs={1}
                            md={1}
                            lg={3}
                            xl={2}
                            className={classes.partSide}
                        >
                            <SideMenu />
                        </Grid>
                        <Grid item className={classes.part}>
                            <Component {...pageProps} />
                        </Grid>
                    </Grid>
                </main>
            </section>
        </ThemeProvider>
    )
})
