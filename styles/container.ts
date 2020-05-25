import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useMdContainer = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            [theme.breakpoints.down('md')]: {
                paddingLeft: '0 !important',
                paddingRight: '0 !important',
            },
        },
    })
)