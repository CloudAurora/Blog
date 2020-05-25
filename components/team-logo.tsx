import React from 'react'
import { Card, makeStyles, CardMedia, CardActionArea, CardContent } from '@material-ui/core'

const useStyles = makeStyles({
    media: {
        width: 300,
        height: 300,
    },
})

export const TeamLogo = (props: any) => {
    const classes = useStyles()
    return (
        <Card elevation={0} {...props}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={
                        'https://avatars2.githubusercontent.com/u/22012452?s=300&v=4'
                    }
                    title="Cloud Aurora Logo"
                />
            </CardActionArea>
            <CardContent />
        </Card>
    )
}
