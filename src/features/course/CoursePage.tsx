import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import Page from '../../components/Page/Page'
import { Course } from '../../types/course'

const COURSES_QUERY = loader('./GET_COURSE.gql')

interface Params {
    id: string
}

interface CourseData {
    course: Course
}

export default function CoursePage() {
    const { id } = useParams<Params>()

    const { loading, data } = useQuery<CourseData>(COURSES_QUERY, {
        variables: {
            id,
        },
    })

    return (
        <div className="course-page" data-testid="course-page">
            <Page>
                <h1 data-testid="dashboard-header">Welcome {id}</h1>
                {loading ? <div>Loading</div> : data && <div>{data.course.title}</div>}
            </Page>
        </div>
    )
}
