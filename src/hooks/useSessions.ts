import { useLazyQuery } from '@apollo/client'
import { loader } from 'graphql.macro'

import { Session } from '../types/course'

const GET_COURSE_SESSIONS = loader('./queries/GET_COURSE_SESSIONS.gql')

interface GetSessionsByCourseIDData {
    sessionsByCourseID?: Session[]
}

const useSessions = () => {
    const useSessionsByCourseID = (courseID: string) => {
        const [getSessionsByCourseID, { loading, data, error }] = useLazyQuery<
            GetSessionsByCourseIDData
        >(GET_COURSE_SESSIONS, {
            variables: {
                id: courseID,
            },
        })

        return {
            getSessionsByCourseID,
            loading,
            sessions: data?.sessionsByCourseID || [],
            error,
        }
    }

    return { useSessionsByCourseID }
}

export default useSessions
