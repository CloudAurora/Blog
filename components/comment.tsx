import React from 'react'
import { isServer } from 'utils'
import GitalkComponent from 'gitalk/dist/gitalk-component'
import { makeStyles } from '@material-ui/core'

interface IProps {
    id: string
}
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0, 4),
    },
}))
export function Comment({ id }: IProps) {
    const classes = useStyles()
    return isServer() ? null : (
        <div className={classes.root}>
            <GitalkComponent
                options={{
                    clientID: process.env.NEXT_PUBLIC_GITALK_CLIENT_ID,
                    clientSecret: process.env.NEXT_PUBLIC_GITALK_CLIENT_SECRET,
                    repo: 'Blog',
                    owner: 'CloudAurora',
                    admin: ['stkevintan', 'CloudAurora'],
                    id: id.substr(0, 50),
                    title: id,
                }}
            />
        </div>
    )
}
