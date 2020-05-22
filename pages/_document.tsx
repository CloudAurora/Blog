import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { theme } from 'styles/theme'
import { CssBaseline } from '@material-ui/core'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
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
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/themes/prism-tomorrow.min.css"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/components/prism-core.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.20.0/plugins/autoloader/prism-autoloader.min.js"></script>
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
