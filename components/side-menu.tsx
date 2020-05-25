import React from 'react'
import {
    List,
    makeStyles,
    Theme,
    createStyles,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid,
    Divider,
    Collapse,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import FolderIcon from '@material-ui/icons/Folder'
import PersonIcon from '@material-ui/icons/Person'
import StyleIcon from '@material-ui/icons/Style'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import TimelineIcon from '@material-ui/icons/Timeline'
import { useRecentPostsLazyQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import { MyLink } from './my-link'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiGrid-item': {
                width: '100%',
            },
        },
        nav: {
            paddingTop: 0,
        },
        toggle: {
            lineHeight: 1,
        },
    })
)

export const SideMenu = () => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const [query, { data, loading, error }] = useRecentPostsLazyQuery({
        variables: { limit: 10 },
        // fetchPolicy: 'network-only',
    })
    const { route } = useRouter()

    const handleClick = () => {
        if (!data && !loading && !error && !open) {
            query()
        }
        setOpen(!open)
    }

    return (
        <Grid
            container
            className={classes.root}
            direction="column"
            alignItems="stretch"
            spacing={3}
        >
            <Grid item>
                <List
                    component="nav"
                    className={classes.nav}
                    aria-label="navigation menu"
                >
                    <ListItem
                        button
                        selected={route === '/'}
                        href="/"
                        component={MyLink}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem
                        button
                        selected={route === '/archive'}
                        href="/archive"
                        component={MyLink}
                    >
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    <ListItem
                        button
                        selected={route === '/categories'}
                        href="/categories"
                        component={MyLink}
                    >
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                    </ListItem>
                    <ListItem
                        button
                        selected={route === '/tags'}
                        href="/tags"
                        component={MyLink}
                    >
                        <ListItemIcon>
                            <StyleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tags" />
                    </ListItem>
                    <ListItem
                        button
                        selected={route === '/about'}
                        href="/about"
                        component={MyLink}
                    >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItem>
                    {/* <ListItem button>
                <ListItemText inset primary="Eric Hoffman" />
            </ListItem> */}
                </List>
            </Grid>
            <Divider light />
            <Grid item>
                <List dense>
                    <ListItem button onClick={handleClick}>
                        <ListItemText secondary="Recent Posts" />
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="div"
                            className={classes.toggle}
                        >
                            {loading ? (
                                <CircularProgress
                                    size={'1em'}
                                    color="secondary"
                                />
                            ) : open ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </Typography>
                    </ListItem>
                    <Collapse
                        in={!loading && open}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List dense component="div" disablePadding>
                            {data?.posts.map((post, index) => (
                                <ListItem
                                    button
                                    key={post.id}
                                    component={MyLink}
                                    href="/posts/[slug]"
                                    as={`/posts/${post.slug}`}
                                >
                                    <ListItemText
                                        primaryTypographyProps={{
                                            noWrap: true,
                                        }}
                                        primary={`${index + 1}. ${post.title}${
                                            post.title
                                        }`}
                                    ></ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </Grid>
        </Grid>
    )
}
