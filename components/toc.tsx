import React from 'react'
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core'

interface Props {
    toc: React.ReactNode
    style?: React.CSSProperties
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(2),
            borderLeft: `${theme.spacing(0.5)}px solid ${
                theme.palette.primary.main
            }`,
        },
        summary: {
            flexWrap: 'wrap',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            // fontWeight: 'bold',
            flexShrink: 0,
            marginRight: '1em',
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        toc: {
            '& ul': {
                margin: 0,
                listStyleType: 'none',
                paddingLeft: theme.spacing(2),
            },
            '& li': {
                padding: `${theme.spacing(0.5)}px 0`,
            },
            '& p': {
                margin: 0,
            },
            '& a': {
                outline: 'none',
                '-webkit-appearance': 'none',
                textDecoration: 'none',
                color: theme.palette.text.primary,
                '&:hover': {
                    textDecoration: 'none',
                    color: theme.palette.secondary.main,
                },
                '&.active': {
                    fontWeight: theme.typography.fontWeightBold,
                    color: theme.palette.secondary.main,
                },
            },
        },
    })
)

export const Toc = React.forwardRef<Props, any>(
    ({ style, toc }: Props, ref) => {
        const classes = useStyles()

        return (
            <div ref={ref as any} className={classes.root} style={style}>
                {<div className={classes.toc}>{toc}</div> ?? (
                    <Typography color="textSecondary" variant="body1">
                        No Content
                    </Typography>
                )}
            </div>
            // <ExpansionPanel
            //     ref={ref}
            //     style={style}
            //     className={classes.root}
            //     expanded={expanded}
            //     onChange={handleChange}
            // >
            //     <ExpansionPanelSummary
            //         expandIcon={<ExpandMoreIcon />}
            //         aria-controls="toc-content"
            //         id="toc-header"
            //         classes={{ content: classes.summary }}
            //     >
            //         <Typography noWrap className={classes.heading}>
            //             Table of Contents
            //         </Typography>
            //         <Typography noWrap className={classes.secondaryHeading}>
            //             {post.title}
            //         </Typography>
            //     </ExpansionPanelSummary>
            //     <Divider light />
            //     <ExpansionPanelDetails className={classes.toc}>

            //     </ExpansionPanelDetails>
            // </ExpansionPanel>
        )
    }
)
