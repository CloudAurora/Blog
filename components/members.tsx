import React from 'react'
import {
    TableContainer,
    Table,
    TableRow,
    TableCell,
    Typography,
    Link,
    makeStyles,
    Theme,
    createStyles,
    IconButton,
    Collapse,
    Box,
    Grid,
    TableBody,
} from '@material-ui/core'
import { Author } from './author'
import members from '../generated/members.json'
import { ItemType } from 'types'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import WorkIcon from '@material-ui/icons/Work'
import GitHubIcon from '@material-ui/icons/GitHub'
import LocationOnIcon from '@material-ui/icons/LocationOn'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 'auto',
        },
    })
)
export const Members = () => {
    const classes = useStyles()
    return (
        <TableContainer className={classes.root}>
            <Table>
                <TableBody>
                    {members.map((member) => (
                        <Row key={member.id} member={member} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const useRowStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
        toggle: {
            width: 50,
        },
        content: {
            flexGrow: 1,
        },
        panel: {
            paddingBottom: 0,
            paddingTop: 0,
            // paddingLeft: theme.spacing(1),
            // paddingRight: theme.spacing(1),
        },
        panelIcon: {
            color: theme.palette.text.secondary,
            '& svg': {
                display: 'block',
            },
        },
    })
)

const Row = ({ member }: { member: ItemType<typeof members> }) => {
    const classes = useRowStyles()
    const [open, setOpen] = React.useState(false)
    const NULL = (
        <Typography variant="body2" color="textSecondary">
            NULL
        </Typography>
    )
    const rows = [
        <TableRow className={classes.root}>
            <TableCell component="th" scope="row">
                <Author
                    color="textPrimary"
                    author={{
                        githubId: member.id,
                        id: member.id,
                        name: member.name,
                    }}
                />
            </TableCell>
            <TableCell>{member.email ?? NULL}</TableCell>
            <TableCell>{member.company ?? NULL}</TableCell>
            <TableCell style={{ width: 320 }}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap
                    component="div"
                    style={{ width: 320 }}
                >
                    {member.blog ? (
                        <Link href={member.blog}>{member.blog}</Link>
                    ) : (
                        NULL
                    )}
                </Typography>
            </TableCell>
            <TableCell className={classes.toggle}>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>,
    ]
    rows.push(
        <TableRow>
            <TableCell className={classes.panel} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box marginTop={1} marginBottom={1}>
                        <SubRow
                            Icon={GitHubIcon}
                            content={
                                <Link href={member.url}>{member.url}</Link>
                            }
                        />
                        <SubRow
                            Icon={LocationOnIcon}
                            content={member.location}
                        />
                        <SubRow Icon={WorkIcon} content={member.bio} />
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )

    return rows as any
}

const SubRow = ({
    Icon,
    content,
}: {
    Icon: React.ComponentType<any>
    content?: React.ReactNode
}) => {
    const classes = useRowStyles()
    if (!content) return null
    return (
        <Grid container alignItems={'center'} spacing={2}>
            <Grid item>
                <Icon className={classes.panelIcon} />
            </Grid>
            <Grid item className={classes.content}>
                <Typography
                    variant="body2"
                    color={'textSecondary'}
                    component={'div'}
                >
                    {content}
                </Typography>
            </Grid>
        </Grid>
    )
}
