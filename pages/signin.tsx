import React from 'react'
import Link from 'next/link'
import { withApollo, createStaticPropsFunc } from '../apollo/client'
import gql from 'graphql-tag'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import Field from '../components/field'
import { getErrorMessage } from '../lib/form'
import { useRouter } from 'next/router'
import { DocumentNode } from 'graphql'

const SignInMutation: DocumentNode = gql`
    mutation SignInMutation($email: String!, $password: String!) {
        signIn(input: { email: $email, password: $password }) {
            user {
                id
                email
            }
        }
    }
`

function SignIn() {
    const client = useApolloClient()
    const [signIn] = useMutation<{
        signIn: { user: { id: string; email: string } }
    }>(SignInMutation)
    const [errorMsg, setErrorMsg] = React.useState()
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const emailElement = event.currentTarget.elements.namedItem(
            'email'
        ) as HTMLInputElement
        const passwordElement = event.currentTarget.elements.namedItem(
            'password'
        ) as HTMLInputElement

        try {
            await client.resetStore()
            const { data } = await signIn({
                variables: {
                    email: emailElement.value,
                    password: passwordElement.value,
                },
            })
            if (data?.signIn.user) {
                await router.push('/')
            }
        } catch (error) {
            setErrorMsg(getErrorMessage(error))
        }
    }

    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                {errorMsg && <p>{errorMsg}</p>}
                <Field
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    label="Email"
                />
                <Field
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    label="Password"
                />
                <button type="submit">Sign in</button> or{' '}
                <Link href="signup">
                    <a>Sign up</a>
                </Link>
            </form>
        </>
    )
}

export default withApollo(SignIn)

export const getStaticProps = createStaticPropsFunc()
