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
import { Container, CssBaseline, Grid } from '@material-ui/core'
import { Splash } from 'components/splash'
import { SideMenu } from 'components/side-menu'
import { withApollo } from 'apollo/client'

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
            height: '100%',
            overflow: 'hidden',
            padding: 0,
            paddingTop: theme.spacing(1)
        },
        container: {
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            height: '100%',
            minHeight: '100%',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1,
        },
        part: {
            height: '100%',
            overflow: 'auto',
        },
    })
)
export default withApollo(({ Component, pageProps }: AppProps) => {
    const classes = useStyles()
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        jssStyles?.parentElement?.removeChild(jssStyles)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <section className={classes.root}>
                <SearchAppBar />
                <main className={classes.main}>
                    <Grid container className={classes.container} spacing={3}>
                        {/* <MyBreadcrumb /> */}
                        <Grid item xs={4} lg={2} className={classes.part}>
                            <SideMenu />
                        </Grid>
                        <Grid item xs className={classes.part}>
                            <Component {...pageProps} />
                        </Grid>
                    </Grid>
                </main>
            </section>
        </ThemeProvider>
    )
})
