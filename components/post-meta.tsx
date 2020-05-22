import React from 'react'
import { PostsQuery } from 'generated/graphql'
import { ItemType } from 'types'
import {
    Typography,
    Grid,
    Avatar,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import UpdateIcon from '@material-ui/icons/Update'
import moment from 'moment'

interface PostMetaProps {
    author: ItemType<PostsQuery['posts']>['author']
    createdAt: Date
    updatedAt: Date
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
            // color: theme.palette.text.secondary,
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
    })
)

export const PostMeta = ({ author, createdAt, updatedAt }: PostMetaProps) => {
    const name = author?.name ?? 'Team'
    const classes = useStyles()
    return (
        <Grid
            container
            justify="flex-start"
            spacing={3}
            alignItems="center"
            className={classes.root}
        >
            <Grid item className={classes.item}>
                <Avatar
                    className={classes.avatar}
                    alt={name}
                    src="https://avatars0.githubusercontent.com/u/5887203"
                />
                <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.itemContent}
                >
                    {name}
                </Typography>
            </Grid>
            <Grid item style={{ flex: '1 1 auto' }}></Grid>

            <Grid item className={classes.item}>
                <CreateIcon className={classes.icon} />
                <Typography variant="body2" className={classes.itemLabel}>
                    Created at:
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.itemContent}
                >
                    {moment(createdAt).calendar()}
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <UpdateIcon className={classes.icon} />
                <Typography variant="body2" className={classes.itemLabel}>
                    Updated at:
                </Typography>
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
