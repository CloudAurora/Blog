import { makeStyles, Theme, createStyles } from '@material-ui/core'

const gutter = 3
export const useWaterfallStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            columns: `${theme.spacing(55)}px`,
            columnGap: 0,
            margin: -theme.spacing(gutter / 2),
            width: `calc(100% + ${theme.spacing(gutter)}px)`,
            [theme.breakpoints.down('sm')]: {
                columns: '100vw 1',
            },
        },
        item: {
            padding: theme.spacing(gutter / 2),
            pageBreakInside: 'avoid',
            breakInside: 'avoid-column',
        },
    })
)
