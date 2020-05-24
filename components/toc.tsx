import React from 'react'
import { PostQuery } from 'generated/graphql'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    makeStyles,
    createStyles,
    Theme,
    Typography,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
    post: NonNullable<PostQuery['post']>
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    })
)

export const Toc = ({ post }: Props) => {
    const [expanded, setExpanded] = React.useState<string | false>(false)
    const classes = useStyles()

    // const tocs = mdToc(post.content ?? '').json
    // console.log(tocs)

    const handleChange = (panel: string) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <ExpansionPanel
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>
                    Table of Content
                </Typography>
                <Typography className={classes.secondaryHeading}>
                    {post.title}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <List dense>
                    {/* {tocs.map((toc) => (
                        <ListItem button key={toc.slug}>
                            <ListItemText primary={toc.content} />
                        </ListItem>
                    ))} */}
                </List>
                {/* <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                    feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography> */}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
