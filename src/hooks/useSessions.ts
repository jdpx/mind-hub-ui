import { useLazyQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import { Session } from '../types/session'

const SESSION_QUERY = loader('./queries/GET_SESSION.gql')
const GET_COURSE_SESSIONS = loader('./queries/GET_COURSE_SESSIONS.gql')

interface GetByIDResponse {
    session?: Session
}

interface GetByCourseIDResponse {
    sessionsByCourseID?: Session[]
}

const useSessions = () => {
    const useGetByID = (id: string) => {
        const [get, { loading, data, called, error }] = useLazyQuery<GetByIDResponse>(
            SESSION_QUERY,
            {
                variables: {
                    id,
                },
            },
        )

        return {
            get,
            loading: loading || !called,
            session: data?.session,
            error,
        }
    }
    const useGetByCourseID = (courseID: string) => {
        const [get, { loading, data, called, error }] = useLazyQuery<GetByCourseIDResponse>(
            GET_COURSE_SESSIONS,
            {
                variables: {
                    id: courseID,
                },
            },
        )

        return {
            get,
            loading: loading || !called,
            sessions: data?.sessionsByCourseID || [],
            error,
        }
    }

    return { useGetByID, useGetByCourseID }
}

export default useSessions
