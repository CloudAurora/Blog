import { withApollo, createStaticPropsFunc } from '../apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ViewerQuery = gql`
    query ViewerQuery {
        viewer {
            id
            email
        }
    }
`

interface Props {
    viewer: {
        id: string
        email: string
    }
}
const Index = (props: Props) => {
    const router = useRouter()
    const { viewer } = props

    if (viewer === null && typeof window !== 'undefined') {
        router.push('/signin')
    }

    if (viewer != null) {
        return (
            <div>
                You're signed in as {viewer.email} goto{' '}
                <Link href="/about">
                    <a>static</a>
                </Link>{' '}
                page. or{' '}
                <Link href="/signout">
                    <a>signout</a>
                </Link>
            </div>
        )
    }

    return <p>Loading...</p>
}

export const getStaticProps = createStaticPropsFunc<Props>(
    async (_context, client) => {
        const result = await client.query<Props>(ViewerQuery)
        return { props: { viewer: result.data.viewer } }
    }
)

export default withApollo(Index)
