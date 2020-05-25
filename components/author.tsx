import React from 'react'
import { UserEntity } from 'types'
import {
    Avatar,
    Theme,
    makeStyles,
    createStyles,
    Typography,
} from '@material-ui/core'

interface Props {
    author: UserEntity
    className?: string
    style?: React.CSSProperties
    variant?: 'body1' | 'body2'
    color?:
        | 'initial'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'textPrimary'
        | 'textSecondary'
        | 'error'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        avatar: {
            flex: '0 0 auto',
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        name: {
            flex: '1 1 auto',
            marginLeft: theme.spacing(1),
        },
    })
)
export const Author = ({ author, variant, color, ...rest }: Props) => {
    const classes = useStyles()
    return (
        <div {...rest} className={classes.root}>
            <Avatar
                className={classes.avatar}
                alt={'user avatar'}
                src={`https://avatars2.githubusercontent.com/u/${author.githubId}?s=400&v=4`}
            />
            <Typography
                variant={variant ?? 'body2'}
                color={color ?? 'textSecondary'}
                className={classes.name}
            >
                {author.name}
            </Typography>
        </div>
    )
}
