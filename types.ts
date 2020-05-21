import { GetServerSideProps, GetStaticProps } from 'next'
import ApolloClient from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import SchemaLink from 'apollo-link-schema'
import { Sequelize } from 'sequelize'

export type Config = {
    common: {
        timeFormatter: string
        siteName: string
    }
    server: {
        jwt: {
            secret: string
        },
        repo: {
            url: string
        }
    }
}

// Client

export type ServerRuntimeConfig = Config['server']
export type PublicRuntimeConfig = Omit<Config, 'server'>

export type SchemaContext =
    | SchemaLink.ResolverContextFunction
    | Record<string, any>

export type ParsedUrlQuery = Record<string, string | string[] | undefined>
export type StrDict<T = any> = Record<string, T>

export type ServerSideContext<P, Q extends ParsedUrlQuery> = Parameters<
    GetServerSideProps<P, Q>
>[0]

export type StaticContext<P, Q extends ParsedUrlQuery> = Parameters<
    GetStaticProps<P, Q>
>[0]

export type GetServerPropsWithApollo<P, Q extends ParsedUrlQuery> = (
    context: ServerSideContext<P, Q>,
    client: ApolloClient<NormalizedCacheObject>
) => ReturnType<GetServerSideProps<P, Q>>

export type GetStaticPropsWIthApollo<P, Q extends ParsedUrlQuery> = (
    context: StaticContext<P, Q>,
    client: ApolloClient<NormalizedCacheObject>
) => ReturnType<GetStaticProps<P, Q>>

//Server
export interface ServerContext {
    db: Sequelize
}

export interface CommonListOptions {
    offset?: number
    limit?: number
}
