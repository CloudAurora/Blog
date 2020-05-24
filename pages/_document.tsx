import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { theme } from 'styles/theme'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="zh-cn">
                <Head>
                    {/* PWA primary color */}
                    <meta
                        name="theme-color"
                        content={theme.palette.primary.main}
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    {/* <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@4/distr/fira_code.css"
                    /> */}
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.3/styles/agate.min.css"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: React.ComponentType<any>) => (props: any) =>
                sheet.collect(<App {...props} />),
        })
    const initialProps = await Document.getInitialProps(ctx)
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheet.getStyleElement(),
        ],
    }
}
