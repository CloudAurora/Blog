import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { HttpLink } from 'apollo-link-http'
import {
    ParsedUrlQuery,
    StrDict,
    GetStaticPropsWIthApollo,
    StaticContext,
    ServerSideContext,
    GetServerPropsWithApollo,
    SchemaContext,
} from '../types'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null


export function withApollo<PageProps>(
    PageComponent: React.ComponentType<PageProps>
) {
    return (props: PageProps) => {
        const client = React.useMemo(
            () => initApolloClient(undefined, (props as any).apolloState),
            []
        )
        return (
            <ApolloProvider client={client}>
                <PageComponent {...props} />
            </ApolloProvider>
        )
    }
}

const defaultPropsFunc = () => Promise.reject({ props: {} })

export async function createStaticPropsFunc<
    P extends StrDict = StrDict,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(func: GetStaticPropsWIthApollo<P, Q> = defaultPropsFunc) {
    return async (context: StaticContext<P, Q>) => {
        const apolloClient = initApolloClient()
        const props = await func(context, apolloClient)
        const apolloState = apolloClient.cache.extract()
        return {
            ...props,
            apolloState,
        }
    }
}

export async function createServerSidePropsFunc<
    P extends StrDict = StrDict,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(func: GetServerPropsWithApollo<P, Q> = defaultPropsFunc) {
    return async (context: ServerSideContext<P, Q>) => {
        const apolloClient = initApolloClient({
            res: context.res,
            req: context.req,
        })
        const props = await func(context, apolloClient)
        if (context.res?.finished) {
            return props
        }
        const apolloState = apolloClient.cache.extract()
        return {
            ...props,
            apolloState,
        }
    }
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(
    ctx: SchemaContext = {},
    initialState: NormalizedCacheObject = {}
) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        return createApolloClient(ctx, initialState)
    }

    // Reuse client on the client-side
    if (!globalApolloClient) {
        globalApolloClient = createApolloClient(ctx, initialState)
    }

    return globalApolloClient
}

function createApolloClient(
    ctx: SchemaContext = {},
    initialState: NormalizedCacheObject = {}
) {
    const ssrMode = typeof window === 'undefined'
    const cache = new InMemoryCache().restore(initialState)

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        ssrMode,
        link: createIsomorphLink(ctx),
        cache,
    })
}

function createIsomorphLink(ctx: SchemaContext) {
    if (typeof window === 'undefined') {
        const schema = require('./schema')
        return new SchemaLink({ schema, context: ctx })
    } else {
        return new HttpLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        })
    }
}
