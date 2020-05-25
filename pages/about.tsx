import MDXDocument from 'mdx/about.mdx'
import { Card, CardContent, Container } from '@material-ui/core'

export default () => (
    <Container maxWidth="lg">
        <Card>
            <CardContent>
                <MDXDocument />
            </CardContent>
        </Card>
    </Container>
)
