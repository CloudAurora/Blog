import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { SchemaLink } from 'apollo-link-schema'
import { HttpLink } from 'apollo-link-http'
import {
    ParsedUrlQuery,
    StrDict,
    GetStaticPropsWithApollo,
    StaticContext,
    ServerSideContext,
    GetServerPropsWithApollo,
    SchemaContext,
} from '../types'
import { serilization } from '../utils'
import { PrismaClient } from '@prisma/client'
import { GetStaticPaths } from 'next'
// import { GetStaticPaths } from 'next'

export type GetStaticPathsWithPrisma<P extends ParsedUrlQuery> = (
    prisma: PrismaClient
) => ReturnType<GetStaticPaths<P>>

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

export function createStaticPropsFunc<
    P extends StrDict = StrDict,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(func?: GetStaticPropsWithApollo<P, Q>) {
    return async (context: StaticContext<P, Q>) => {
        if (!func) return { props: {} }
        const apolloClient = initApolloClient()
        const query = apolloClient.query.bind(apolloClient)
        const mutate = apolloClient.mutate.bind(apolloClient)
        apolloClient.query = async (options: any) =>
            serilization(await query(options))
        apolloClient.mutate = async (options: any) =>
            serilization(await mutate(options))
        const { props, unstable_revalidate } = await func(context, apolloClient)
        const apolloState = serilization(apolloClient.cache.extract())
        return {
            props: {
                ...props,
                apolloState,
            },
            unstable_revalidate,
        }
    }
}

export function createServerSidePropsFunc<
    P extends StrDict = StrDict,
    Q extends ParsedUrlQuery = ParsedUrlQuery
>(func: GetServerPropsWithApollo<P, Q>) {
    return async (context: ServerSideContext<P, Q>) => {
        if (!func) return { props: {} }
        const apolloClient = initApolloClient({
            res: context.res,
            req: context.req,
        })
        const query = apolloClient.query.bind(apolloClient)
        const mutate = apolloClient.mutate.bind(apolloClient)
        apolloClient.query = async (options: any) =>
            serilization(await query(options))
        apolloClient.mutate = async (options: any) =>
            serilization(await mutate(options))
        const { props } = await func(context, apolloClient)
        if (context.res?.finished) {
            return props
        }
        const apolloState = serilization(apolloClient.cache.extract())
        return {
            props: {
                ...props,
                apolloState,
            },
        }
    }
}

export function createStaticPathsFunc<P extends StrDict = StrDict>(
    func: GetStaticPathsWithPrisma<P>
) {
    return () => {
        // need this if condition to let node resolve the dependence
        // or webpack will take control the `require` statement, and throw an error: child_process not found.
        if (typeof window === 'undefined') {
            const prisma = require('../prisma/client')()
            return func(prisma)
        }
        throw new Error('window should be undefined')
    }
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(
    ctx: Record<string, any> = {},
    initialState: NormalizedCacheObject = {}
) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (typeof window === 'undefined') {
        ctx.prisma = require('../prisma/client')()
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
        const { schema } = require('./schema')
        return new SchemaLink({ schema, context: ctx })
    } else {
        return new HttpLink({
            uri: '/api/graphql',
            credentials: 'same-origin',
        })
    }
}
