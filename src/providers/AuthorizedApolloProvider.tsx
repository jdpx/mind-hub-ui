import React from 'react'
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { setContext } from '@apollo/client/link/context'
import fetch from 'cross-fetch'

// https://dev.to/martinrojas/apollo-client-graphql-and-auth0-a-complete-implementation-19oc

interface Props {
    children: React.ReactNode
}
const apiUrl = process.env.REACT_APP_API_URL || ''

const httpLink = new HttpLink({ uri: apiUrl, fetch })
// const httpLink = new HttpLink({ uri: 'https://api.dev.mind.jdpx.co.uk/v1/query' })

const AuthorizedApolloProvider = ({ children }: Props) => {
    const { getAccessTokenSilently } = useAuth0()

    const authenticationLink = setContext(async (arg, { headers }) => {
        try {
            console.log('starting')
            const token = await getAccessTokenSilently({
                audience: `https://api.dev.mind.jdpx.co.uk`,
            })

            console.log('token', token)
            return {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                },
            }
        } catch (error) {
            console.log('error: ', error)
        }
    })

    const client = new ApolloClient({
        link: from([authenticationLink, httpLink]),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AuthorizedApolloProvider
