import React from 'react'
import {
    List,
    makeStyles,
    Theme,
    createStyles,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Grid,
    Divider,
    Collapse,
    Typography,
    CircularProgress,
    useTheme,
    IconButton,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import FolderIcon from '@material-ui/icons/Folder'
import PersonIcon from '@material-ui/icons/Person'
import StyleIcon from '@material-ui/icons/Style'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import TimelineIcon from '@material-ui/icons/Timeline'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useRecentPostsLazyQuery, RecentPostsQuery } from 'generated/graphql'
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
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        drawer2: {
            maxWidth: '100vw',
        },
        drawerPanel: {
            maxWidth: '80vw',
        },
    })
)

interface Props {
    inDrawer?: boolean
    onClick?: () => void
}
export const SideMenu = ({ inDrawer, onClick }: Props) => {
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
                    onClick={() => onClick?.()}
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
                {inDrawer ? (
                    <RecnetPostsInDrawer
                        open={open}
                        loading={loading}
                        posts={data?.posts}
                        handleClick={handleClick}
                        onClick={onClick}
                    />
                ) : (
                    <RecentPosts
                        open={open}
                        loading={loading}
                        posts={data?.posts}
                        handleClick={handleClick}
                    />
                )}
            </Grid>
        </Grid>
    )
}

interface RProps {
    open: boolean
    loading: boolean
    posts?: RecentPostsQuery['posts']
    handleClick: () => void
    onClick?: () => void
}

const RecentPosts = ({ open, loading, posts, handleClick }: RProps) => {
    const classes = useStyles()
    return (
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
                        <CircularProgress size={'1em'} color="secondary" />
                    ) : open ? (
                        <ExpandLess />
                    ) : (
                        <ExpandMore />
                    )}
                </Typography>
            </ListItem>
            <Collapse in={!loading && open} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                    {posts?.map((post, index) => (
                        <ListItem
                            button
                            key={post.slug}
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
    )
}

const RecnetPostsInDrawer = ({
    open,
    loading,
    posts,
    handleClick,
    onClick,
}: RProps) => {
    const classes = useStyles()
    const theme = useTheme()
    console.log(open)
    return (
        <>
            <Drawer
                anchor={'left'}
                open={open || loading}
                onClose={handleClick}
                className={classes.drawer2}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleClick}>
                        {theme.direction === 'rtl' ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List
                    onClick={() => {
                        handleClick()
                        onClick?.()
                    }}
                    className={classes.drawerPanel}
                >
                    {posts?.map((post, index) => (
                        <ListItem
                            button
                            key={post.slug}
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
            </Drawer>
            <List>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <FiberNewIcon />
                    </ListItemIcon>
                    <ListItemText>Recent Posts</ListItemText>
                </ListItem>
            </List>
        </>
    )
}
