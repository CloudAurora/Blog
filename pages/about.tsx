import MDXDocument from 'mdx/about.mdx'
import { Card, CardContent, Container, makeStyles } from '@material-ui/core'
import { isServer } from 'utils'
import { Comment } from 'components/comment'
import { Helmet } from 'react-helmet'
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(-2),
        borderRadius: 0,
    },
}))
export default () => {
    const classes = useStyle()
    console.log(process.env.NEXT_PUBLIC_GITALK_CLIENT_ID)
    return (
        <Container maxWidth="lg">
            <Helmet>
                <title>About - Code Aurora</title>
            </Helmet>
            <Card className={classes.root}>
                <CardContent>
                    <MDXDocument />
                </CardContent>
            </Card>
            <Comment id="About" />
        </Container>
    )
}
