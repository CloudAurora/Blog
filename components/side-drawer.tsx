import * as React from 'react'
import {
    Drawer,
    makeStyles,
    Theme,
    createStyles,
    IconButton,
    useTheme,
    Divider,
    Hidden,
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import clsx from 'clsx'
import { SideMenu } from './side-menu'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            maxWidth: '100vw',
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
    })
)

interface Props {
    open: boolean
    setOpen: (open: boolean) => void
}
export function SideDrawer({ open, setOpen, ...rest }: Props) {
    const classes = useStyles()
    const theme = useTheme()
    const handleDrawerClose = React.useCallback(() => {
        setOpen(false)
    }, [setOpen])

    const DrawerInner = React.useMemo(
        () => [
            <div className={classes.toolbar} key={1}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </div>,
            <Divider key={2} />,
            <SideMenu key={3} inDrawer onClick={() => setOpen(false)} />,
        ],
        [handleDrawerClose, theme.direction, classes.toolbar]
    )
    return (
        <>
            <Hidden smDown lgUp>
                <Drawer
                    {...rest}
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    {DrawerInner}
                </Drawer>
            </Hidden>
            <Hidden mdUp>
                <Drawer
                    {...rest}
                    open={open}
                    className={classes.drawer}
                    classes={{ paper: classes.drawer }}
                    onClose={handleDrawerClose}
                    variant="temporary"
                >
                    {DrawerInner}
                </Drawer>
            </Hidden>
        </>
    )
}
