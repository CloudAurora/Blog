import MDXDocument from 'mdx/about.mdx'
import { Card, CardContent, Container, makeStyles } from '@material-ui/core'
import GitalkComponent from "gitalk/dist/gitalk-component";
import { isServer } from 'utils';
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(-2),
        borderRadius: 0,
    },
}))
export default () => {
    const classes = useStyle();
    console.log(process.env.NEXT_PUBLIC_GITALK_CLIENT_ID)
    return (
        <Container maxWidth="lg">
            <Card className={classes.root}>
                <CardContent>
                    <MDXDocument />
                </CardContent>
            </Card>
            {!isServer() && <GitalkComponent
                options={{
                    clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID,
                    clientSecret: process.env.NEXT_PUBLIC_GITALK_CLIENT_SECRET,
                    repo: "CloudAurora/Blog",
                    owner: "CloudAurora",
                    admin: ["stkevintan"]
                }}
            />}
        </Container>
    )
}
