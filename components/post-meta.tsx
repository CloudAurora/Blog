import React from 'react'
import { PostsQuery } from 'generated/graphql'
import { ItemType, PostEntity } from 'types'
import {
    Typography,
    Grid,
    Avatar,
    makeStyles,
    createStyles,
    Theme,
    Link,
} from '@material-ui/core'
// import CreateIcon from '@material-ui/icons/Create'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import moment from 'moment'
import { MyLink } from './my-link'

interface PostMetaProps {
    author: ItemType<PostsQuery['posts']>['author']
    categories: PostEntity[]
    // createdAt: Date
    updatedAt: Date
    isDetail?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(0),
        },
        item: {
            display: 'inline-flex',
            alignItems: 'center',
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
        },
        itemContent: {
            marginLeft: theme.spacing(1),
            flex: '1 1 auto',
        },
        itemLabel: {
            marginLeft: theme.spacing(1),
            color: theme.palette.text.secondary,
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        icon: {
            fontSize: '18px',
            color: theme.palette.text.secondary,
        },
        category: {
            marginLeft: theme.spacing(1),
        },
    })
)

export const PostMeta = ({
    author,
    // createdAt,
    categories,
    updatedAt,
    isDetail,
}: PostMetaProps) => {
    const name = author?.name ?? 'Team'
    const classes = useStyles()
    return (
        <Grid
            container
            justify={isDetail ? 'center' : 'flex-start'}
            spacing={3}
            alignItems="center"
            className={classes.root}
        >
            <Grid item className={classes.item}>
                <Avatar
                    className={classes.avatar}
                    alt={name}
                    src="https://avatars2.githubusercontent.com/u/22012452?s=400&u=36dbdcc91cf11ff31870530d5a5bb566cf6bc798&v=4"
                />
                <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.itemContent}
                >
                    {name}
                </Typography>
            </Grid>
            {!isDetail && <Grid item style={{ flex: '1 1 auto' }}></Grid>}

            <Grid item className={classes.item}>
                <FolderOpenIcon className={classes.icon} />
                {/* <Typography variant="body2" className={classes.itemLabel}>
                    Created at:
                </Typography> */}
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.itemContent}
                >
                    {categories.map((c) => (
                        <Link
                            key={c.id}
                            href="/categories/[slug]"
                            as={`/categories/${c.slug}`}
                            color="inherit"
                            className={classes.category}
                            component={MyLink}
                        >
                            {c.name}
                        </Link>
                    ))}
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <CalendarTodayIcon className={classes.icon} />
                {/* <Typography variant="body2" className={classes.itemLabel}>
                    Updated at:
                </Typography> */}
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.itemContent}
                >
                    {moment(updatedAt).calendar()}
                </Typography>
            </Grid>
        </Grid>
    )
}
