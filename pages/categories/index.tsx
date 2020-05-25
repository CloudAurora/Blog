import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import FolderOpenIcon from '@material-ui/icons/Folder'
import {
    Container,
    Grid,
    Chip,
    List,
    ListItem,
    ListItemText,
} from '@material-ui/core'
import { createStaticPropsFunc } from 'apollo/client'
import { CategoriesQuery, CategoriesDocument } from 'generated/graphql'
import { MyLink } from 'components/my-link'
import { CategoryPanel } from 'components/category-panel'

interface Props {
    categories?: CategoriesQuery['categories']
}

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
        icon: {
            color: theme.palette.text.secondary,
        },
    })
)

export default function Categories({ categories }: Props) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState<number | false>(false)

    const handleChange = (panel: number) => (
        event: React.ChangeEvent<{}>,
        isExpanded: boolean
    ) => {
        setExpanded(isExpanded ? panel : false)
    }

    if (categories == null) {
        return <div>error</div>
    }

    console.log('@@',expanded)
    return (
        <Container maxWidth="lg">
            <Grid container spacing={1} alignItems={'center'}>
                <Grid item>
                    <FolderOpenIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography
                        // className={classes.title}
                        variant={'subtitle1'}
                        color="textSecondary"
                        gutterBottom
                    >
                        Categories
                    </Typography>
                </Grid>
            </Grid>
            {categories.map((category) => {
                return (
                    <CategoryPanel
                        key={category.id}
                        category={category}
                        expanded={expanded === category.id}
                        setExpanded={(expanded) => {
                            if (expanded) {
                                console.log(expanded, category.id)
                                setExpanded(category.id)
                            } else {
                                setExpanded(false)
                            }
                        }}
                    />
                    // <ExpansionPanel
                    //     key={category.id}
                    //     expanded={expanded === category.id}
                    //     onChange={handleChange(category.id)}
                    // >
                    //     <ExpansionPanelSummary
                    //         expandIcon={<ExpandMoreIcon />}
                    //         aria-controls="category-content"
                    //         id="category-header"
                    //     >
                    //         <Typography className={classes.heading}>
                    //             {category.name}
                    //         </Typography>
                    //         <Chip
                    //             className={classes.secondaryHeading}
                    //             size="small"
                    //             label={category.postCount}
                    //         />
                    //     </ExpansionPanelSummary>
                    //     <ExpansionPanelDetails>
                    //         <List dense>
                    //             {categories.map((category) => (
                    //                 <ListItem button key={category.id}>
                    //                     <ListItemText
                    //                         primary={category.name}
                    //                         secondary={category.slug}
                    //                     />
                    //                 </ListItem>
                    //             ))}
                    //         </List>
                    //         {/* <Typography>
                    //             Nulla facilisi. Phasellus sollicitudin nulla et
                    //             quam mattis feugiat. Aliquam eget maximus est,
                    //             id dignissim quam.
                    //         </Typography> */}
                    //     </ExpansionPanelDetails>
                    // </ExpansionPanel>
                )
            })}
        </Container>
    )
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<CategoriesQuery>({
            query: CategoriesDocument,
        })
        return { props: { categories: result.data?.categories } }
    }
)
