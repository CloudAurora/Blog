import React from 'react'
import {  PostEntity, UserEntity } from 'types'
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
import { Author } from './author'

interface PostMetaProps {
    author: UserEntity
    categories?: PostEntity[]
    // createdAt: Date
    updatedAt: Date
    isDetail?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
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
                <Author author={author} />
            </Grid>
            {!isDetail && !!categories && <Grid item style={{ flex: '1 1 auto' }}></Grid>}

            {!!categories && (
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
            )}

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
