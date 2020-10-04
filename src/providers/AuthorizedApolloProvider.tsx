import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
// import { ApolloLink } from 'apollo-link'
// import { ApolloProvider } from 'react-apollo'
// import { BatchHttpLink } from 'apollo-link-batch-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { onError } from 'apollo-link-error'
// import { RetryLink } from 'apollo-link-retry'
// import { setContext } from 'apollo-link-context'

// https://dev.to/martinrojas/apollo-client-graphql-and-auth0-a-complete-implementation-19oc

interface Props {
    children: React.ReactNode
}

const AuthorizedApolloProvider = ({ children }: Props) => {
    // const { getAccessTokenSilently } = useAuth0()
    // const authMiddleware = setContext(async (_, { headers, ...context }) => {
    //     const token = await getAccessTokenSilently()

    //     return {
    //         headers: {
    //             ...headers,
    //             ...(token ? { Authorization: `Bearer ${token}` } : {}),
    //         },
    //         ...context,
    //     }
    // })

    const client = new ApolloClient({
        uri: 'https://api.dev.mind.jdpx.co.uk/v1/query',
        // uri: 'https://local.mind.jdpx.co.uk:4000/graphql',
        cache: new InMemoryCache(),
        connectToDevTools: true,
    })

    // const client = new ApolloClient({
    //     link: ApolloLink.from([
    //         onError(({ graphQLErrors, networkError }) => {
    //             if (graphQLErrors) {
    //                 graphQLErrors.forEach(({ message, locations, path }) =>
    //                     console.error(
    //                         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //                     ),
    //                 )
    //             }
    //             if (networkError) {
    //                 console.error(`[Network error]:`, networkError)
    //             }
    //         }),
    //         authMiddleware,
    //         // new RetryLink(),
    //         // new BatchHttpLink({
    //         //     uri: 'https://local.mind.jdpx.co.uk:443/graphql',
    //         // }),
    //     ]),
    //     // cache: new InMemoryCache(),
    // })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
