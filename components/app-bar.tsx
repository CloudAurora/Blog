import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import BathtubIcon from '@material-ui/icons/Bathtub'
import { createStyles, fade, Theme, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import { Button, Hidden } from '@material-ui/core'
import { MyLink } from './my-link'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import GitHubIcon from '@material-ui/icons/GitHub'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 0,
            flexShrink: 0,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            alignSelf: 'stretch',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        titleButton: {
            color: 'inherit',
            fontSize: 'inherit',
            height: '100%',
            paddingLeft: theme.spacing(1.2),
            paddingRight: theme.spacing(1.2),
            textTransform: 'capitalize',
        },
        titleIcon: {
            fontSize: '1.2em',
            marginRight: '1em',
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(25),
                '&:focus': {
                    width: theme.spacing(30),
                },
            },
        },
    })
)
interface Props {
    toggleDrawer: () => void
    open: boolean
}
export default function SearchAppBar({ toggleDrawer, open }: Props) {
    const classes = useStyles()

    const router = useRouter()
    const handleSearch = (keyword: string = '') => {
        router.push({ pathname: '/', query: { keyword } })
    }
    return (
        <div className={classes.root}>
            <AppBar
                position="relative"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Hidden lgUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Button
                            href="/"
                            component={MyLink}
                            className={classes.titleButton}
                        >
                            <BathtubIcon className={classes.titleIcon} />
                            Cloud Aurora
                        </Button>
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    handleSearch(
                                        (e.target as HTMLInputElement).value
                                    )
                                }
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div>
                        <IconButton
                            href="https://github.com/CloudAurora"
                            color="inherit"
                        >
                            <GitHubIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}
