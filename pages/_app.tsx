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
import { Container, CssBaseline } from '@material-ui/core'
import { Splash } from 'components/splash'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'stretch',
            flexFlow: 'column nowrap',
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            width: '100vw',
            height: '100vh',
            background: '#f0f0f0',
            minHieght: '100vh',
        },
        main: {
            flex: '1 1 auto',
            minHeight: '100%',
            padding: 0,
        },
        container: {
            padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
            height: '100%',
            minHeight: '100%',
            position: 'relative',
            zIndex: 1,
        },
    })
)
export default ({ Component, pageProps }: AppProps) => {
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
                    <Splash />
                    <Container maxWidth="lg" className={classes.container}>
                        {/* <MyBreadcrumb /> */}
                        <Component {...pageProps} />
                    </Container>
                </main>
            </section>
        </ThemeProvider>
    )
}
