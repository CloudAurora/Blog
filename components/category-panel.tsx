import * as React from 'react'
import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Chip,
    makeStyles,
    Theme,
    createStyles,
    ExpansionPanelDetails,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton,
} from '@material-ui/core'
import { ItemType } from 'types'
import { CategoriesQuery, useCategoryPostsLazyQuery } from 'generated/graphql'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Loading } from './loading'
import { MyLink } from './my-link'
import LinkIcon from '@material-ui/icons/Link'
import moment from 'moment'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            // flexGrow: 1,
            flexShrink: 0,
        },
        secondaryHeading: {
            color: theme.palette.text.secondary,
            marginLeft: theme.spacing(2),
        },
        space: {
            flexGrow: 1,
            flexShrink: 1,
        },
        link: {
            marginLeft: theme.spacing(2),
        },
        icon: {
            color: theme.palette.text.secondary,
        },
        detail: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        list: {
            width: '100%',
        },
    })
)

interface Props {
    category: NonNullable<ItemType<CategoriesQuery['categories']>>
    expanded: boolean
    setExpanded: (expanded: boolean) => void
}
export const CategoryPanel = ({ category, expanded, ...rest }: Props) => {
    const classes = useStyles()

    const [query, { data, loading, error }] = useCategoryPostsLazyQuery({
        variables: { id: category.id },
    })
    React.useEffect(() => {
        if (expanded && !loading && !data && !error) {
            query()
        }
    }, [data, loading, error, expanded, query])

    return (
        <ExpansionPanel
            TransitionProps={{ unmountOnExit: true }}
            key={category.id}
            expanded={expanded}
            onChange={() => rest.setExpanded(!expanded)}
        >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="category-content"
                id="category-header"
            >
                <Typography className={classes.heading}>
                    {category.name}
                </Typography>
                <Chip
                    className={classes.secondaryHeading}
                    size="small"
                    label={category.postCount}
                />
                <div className={classes.space} />
                <div onClick={(e) => e.stopPropagation()}>
                    <IconButton
                        size="small"
                        className={classes.link}
                        component={MyLink}
                        href="/categories/[slug]"
                        as={`/categories/${category.slug}`}
                    >
                        <LinkIcon />
                    </IconButton>
                </div>
            </ExpansionPanelSummary>
            <Divider light />
            <ExpansionPanelDetails className={classes.detail}>
                {loading ? (
                    <Loading />
                ) : (
                    <List className={classes.list} dense>
                        {data?.category?.posts.map((post) => (
                            <ListItem
                                button
                                key={post.id}
                                href="/posts/[slug]"
                                as={`/posts/${post.slug}`}
                                component={MyLink}
                            >
                                <ListItemText
                                    primary={post.title}
                                    secondary={moment(
                                        post.updatedAt
                                    ).calendar()}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                {/* <Typography>
                Nulla facilisi. Phasellus sollicitudin nulla et
                quam mattis feugiat. Aliquam eget maximus est,
                id dignissim quam.
            </Typography> */}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}
