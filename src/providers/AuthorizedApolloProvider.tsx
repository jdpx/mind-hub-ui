import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { setContext } from '@apollo/client/link/context'
import { v4 as uuidv4 } from 'uuid'

// https://dev.to/martinrojas/apollo-client-graphql-and-auth0-a-complete-implementation-19oc

const correlationIdHeader = 'x-correlation-id'

interface Props {
    children: React.ReactNode
}
const apiUrl = process.env.REACT_APP_API_URL || ''

const httpLink = new HttpLink({ uri: apiUrl })
// const httpLink = new HttpLink({ uri: 'https://api.dev.mind.jdpx.co.uk/v1/query' })

const correlationIDLink = setContext(async (arg, { headers }) => {
    return {
        headers: {
            ...headers,
            [correlationIdHeader]: uuidv4(),
        },
    }
})

const AuthorizedApolloProvider = ({ children }: Props) => {
    const { getAccessTokenSilently } = useAuth0()

    const authenticationLink = setContext(async (arg, { headers }) => {
        const token = await getAccessTokenSilently({
            audience: `https://api.dev.mind.jdpx.co.uk`,
        })

        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${token}`,
            },
        }
    })

    const client = new ApolloClient({
        link: from([authenticationLink, correlationIDLink, httpLink]),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
