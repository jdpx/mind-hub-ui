import { loader } from 'graphql.macro'
import { useLazyQuery } from '@apollo/client'

import { Course } from '../types/course'

const GET_COURSES_QUERY = loader('./queries/GET_COURSES.gql')
const GET_COURSE_BY_ID_QUERY = loader('./queries/GET_COURSE_BY_ID.gql')

interface AllCoursesResponse {
    courses: Course[]
}

interface GetByIDResponse {
    course?: Course
}

const useCourse = () => {
    const useGetAll = () => {
        const [get, { loading, data, error, called }] = useLazyQuery<AllCoursesResponse>(
            GET_COURSES_QUERY,
        )

        return {
            get,
            loading: loading || !called,
            courses: data?.courses || [],
            error,
        }
    }

    const useGetByID = (id: string) => {
        const [get, { loading, data, error, called }] = useLazyQuery<GetByIDResponse>(
            GET_COURSE_BY_ID_QUERY,
            {
                variables: {
                    id,
                },
            },
        )

        return {
            get,
            loading: loading || !called,
            course: data?.course,
            error,
        }
    }

    return {
        useGetAll,
        useGetByID,
    }
}

export default useCourse
