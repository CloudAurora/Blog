import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FolderOpenIcon from '@material-ui/icons/Folder'
import { Container, Grid, Chip } from '@material-ui/core'
import { createStaticPropsFunc } from 'apollo/client'
import { TagsQuery, TagsDocument } from 'generated/graphql'
import { MyLink } from 'components/my-link'
import { useMdContainer } from 'styles/container'
import { Helmet } from 'react-helmet'

interface Props {
    tags?: TagsQuery['tags']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.text.secondary,
        },
    })
)

export default function Tags({ tags }: Props) {
    const classes = useStyles()
    const classes2 = useMdContainer()

    if (tags == null) {
        return <div>error</div>
    }

    return (
        <Container maxWidth="lg" className={classes2.container}>
            <Helmet>
                <title>Tags - Code Aurora</title>
            </Helmet>
            <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                    <FolderOpenIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography
                        variant={'subtitle1'}
                        color="textSecondary"
                        gutterBottom
                    >
                        Tags
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} wrap={'wrap'}>
                {tags.map((category) => {
                    return (
                        <Grid item key={category.id}>
                            <Chip
                                key={category.id}
                                // color='secondary'
                                size="small"
                                href={'/tags/[slug]'}
                                as={`/tags/${category.slug}`}
                                label={category.name}
                                component={MyLink}
                                clickable
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<TagsQuery>({
            query: TagsDocument,
        })
        return { props: { tags: result.data?.tags } }
    }
)
