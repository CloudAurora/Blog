import React from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { withApollo, createStaticPropsFunc } from '../apollo/client'

const SignOutMutation = gql`
    mutation SignOutMutation {
        signOut
    }
`

function SignOut() {
    const client = useApolloClient()
    const router = useRouter()
    const [signOut] = useMutation(SignOutMutation)

    React.useEffect(() => {
        signOut().then(() => {
            client.resetStore().then(() => {
                router.push('/signin')
            })
        })
    }, [signOut, router, client])

    return <p>Signing out...</p>
}

export default withApollo(SignOut)

export const getStaticProps = createStaticPropsFunc()
