import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { NextPage } from 'next'
import { SchemaLink } from 'apollo-link-schema';
import { HttpLink } from 'apollo-link-http';

type SchemaContext = SchemaLink.ResolverContextFunction | Record<string, any>;
let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null

interface Config {
  ssr?: boolean
}



interface ApolloPageBaseProps {
  apolloClient?: ApolloClient<NormalizedCacheObject> | null;
  apolloState?: NormalizedCacheObject;
}

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo<PageProps>
  (PageComponent: NextPage<PageProps>, { ssr = true }: Config = {}) {
  type ApolloPageProps = ApolloPageBaseProps & PageProps
  const WithApollo: NextPage<ApolloPageProps> = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(undefined, apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps as any} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = initApolloClient({
        res: ctx.res,
        req: ctx.req,
      });

      (ctx as any).apollClient = apolloClient;

      // Run wrapped getInitialProps methods
      let props = {} as any;
      if (PageComponent.getInitialProps) {
        props = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return props
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...props,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind()
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract()

      return {
        ...props,
        apolloState,
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
function initApolloClient(ctx: SchemaContext = {}, initialState: NormalizedCacheObject = {}) {
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

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(ctx: SchemaContext = {}, initialState: NormalizedCacheObject = {}) {
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
    const schema = require('./schema');
    return new SchemaLink({ schema, context: ctx })
  } else {
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    })
  }
}
