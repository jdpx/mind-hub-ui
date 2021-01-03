import { loader } from 'graphql.macro'
import { useLazyQuery } from '@apollo/client'

import { Step } from '../types/course'

const GET_STEP_BY_ID_QUERY = loader('./queries/GET_STEP_BY_ID.gql')

interface GetByIDResponse {
    step?: Step
}

const useSteps = () => {
    const useGetByID = (id: string) => {
        const [get, { loading, data, error, called }] = useLazyQuery<GetByIDResponse>(
            GET_STEP_BY_ID_QUERY,
            {
                variables: {
                    id,
                },
            },
        )

        return {
            get,
            loading: loading || !called,
            step: data?.step,
            error,
        }
    }

    return {
        useGetByID,
    }
}

export default useSteps
