import * as React from 'react'
import { createStaticPropsFunc } from 'apollo/client'
import { ArchivesQuery, ArchivesDocument } from 'generated/graphql'
import {
    Container,
    Grid,
    makeStyles,
    Theme,
    createStyles,
    Typography,
    Paper,
} from '@material-ui/core'
import TimelineIcon from '@material-ui/icons/Timeline'
import { PostList } from 'components/post-list'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.text.secondary,
        },
        paper: {
            marginTop: theme.spacing(2),
        },
    })
)
interface Props {
    posts?: ArchivesQuery['posts']
}

export default function Archive({ posts }: Props) {
    const classes = useStyles()
    if (posts == null) return <div>error</div>

    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                    <TimelineIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography
                        // className={classes.title}
                        variant={'subtitle1'}
                        color="textSecondary"
                        gutterBottom
                    >
                        Archive
                    </Typography>
                </Grid>
            </Grid>
            <Paper elevation={2} className={classes.paper}>
                <PostList posts={posts} />
            </Paper>
        </Container>
    )
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<ArchivesQuery>({
            query: ArchivesDocument,
        })
        return { props: { posts: result.data?.posts } }
    }
)
