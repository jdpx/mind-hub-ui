import { loader } from 'graphql.macro'
import { useMutation, useLazyQuery } from '@apollo/client'
import { Timemap } from '../types/timemap'

const UPDATE_TIMEMAP_MUTATION = loader('./queries/UPDATE_TIMEMAP.gql')
const GET_TIMEMAP_QUERY = loader('./queries/GET_TIMEMAP.gql')

interface TimemapResponse {
    timemap?: Timemap
}

const useTimemap = () => {
    const [saveTimemap] = useMutation(UPDATE_TIMEMAP_MUTATION)

    const updateTimemap = (map: string) => {
        saveTimemap({ variables: { map } })
    }

    const getTimemap = () => {
        const [get, { loading, data, error, called }] = useLazyQuery<TimemapResponse>(
            GET_TIMEMAP_QUERY,
        )

        return {
            get,
            loading: loading || !called,
            map: data?.timemap,
            error,
        }
    }

    return {
        updateTimemap,
        getTimemap,
    }
}

export default useTimemap
