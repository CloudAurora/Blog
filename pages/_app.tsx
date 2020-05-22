import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import SearchAppBar from 'components/app-bar'
import { theme } from 'styles/theme'
import styles from 'styles/app.module.less'
// import { MyBreadcrumb } from 'components/breadcrumb'
import { Container } from '@material-ui/core'
import { Splash } from 'components/splash'

export default ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        jssStyles?.parentElement?.removeChild(jssStyles)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <section className={styles.layout}>
                <SearchAppBar />
                <main className={styles.main}>
                    <Splash />
                    <Container maxWidth="lg" className={styles.container}>
                        {/* <MyBreadcrumb /> */}
                        <Component {...pageProps} />
                    </Container>
                </main>
            </section>
        </ThemeProvider>
    )
}
