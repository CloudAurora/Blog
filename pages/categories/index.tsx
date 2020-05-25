import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FolderOpenIcon from '@material-ui/icons/Folder'
import { Container, Grid } from '@material-ui/core'
import { createStaticPropsFunc } from 'apollo/client'
import { CategoriesQuery, CategoriesDocument } from 'generated/graphql'
import { CategoryPanel } from 'components/category-panel'
import { useMdContainer } from 'styles/container'

interface Props {
    categories?: CategoriesQuery['categories']
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            color: theme.palette.text.secondary,
        },
    })
)

export default function Categories({ categories }: Props) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState<number | false>(false)
    const classes2 = useMdContainer()
    if (categories == null) {
        return <div>error</div>
    }

    return (
        <Container maxWidth="lg" className={classes2.container}>
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
                            setExpanded(expanded && category.id)
                        }}
                    />
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
