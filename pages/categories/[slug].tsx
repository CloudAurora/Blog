import React from 'react'
import {
    CategoryQuery,
    CategoryQueryVariables,
    CategoryDocument,
} from 'generated/graphql'
import { createStaticPropsFunc, createStaticPathsFunc } from 'apollo/client'
import {
    Container,
    Typography,
    makeStyles,
    Theme,
    createStyles,
    Paper,
    Grid,
} from '@material-ui/core'
import FolderOutlinedIcon from '@material-ui/icons/FolderOpenOutlined'
import { PostList } from 'components/post-list'
import { useMdContainer } from 'styles/container'
import { Helmet } from 'react-helmet'

interface Props {
    category?: CategoryQuery['category']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(3),
        },
        icon: {
            color: theme.palette.text.secondary,
        },
    })
)

export default ({ category }: Props) => {
    const classes = useStyles()
    const classes2 = useMdContainer()
    if (category == null) {
        return <div>error</div>
    }
    return (
        <Container maxWidth="lg" className={classes2.container}>
            <Helmet>
                <title>{category.name} - Category - Code Aurora</title>
            </Helmet>
            <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                    <FolderOutlinedIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography
                        // className={classes.title}
                        variant={'subtitle1'}
                        color="textSecondary"
                        gutterBottom
                    >
                        Category
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h5" component="h2" gutterBottom>
                {category.name} ({category.posts.length})
            </Typography>
            <Paper elevation={2} className={classes.paper}>
                <PostList posts={category.posts} />
            </Paper>
        </Container>
    )
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (context, client) => {
        const slug = context.params?.slug
        if (typeof slug !== 'string') return { props: {} }
        const result = await client.query<
            CategoryQuery,
            CategoryQueryVariables
        >({
            query: CategoryDocument,
            variables: { slug },
        })
        return { props: { category: result.data.category } }
    }
)

export const getStaticPaths = createStaticPathsFunc<{ slug: string }>(
    async (prisma) => {
        const result = await prisma.category.findMany({
            select: { slug: true },
        })
        return {
            paths: result.map(({ slug }) => ({ params: { slug } })),
            fallback: false,
        }
    }
)
