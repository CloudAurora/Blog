import { createMuiTheme } from '@material-ui/core'
import * as colors from '@material-ui/core/colors'

export const theme = createMuiTheme({
    palette: {
        primary: colors.indigo,
        secondary: colors.deepOrange,
    },
    overrides: {
        MuiAppBar: {},
    },
})
