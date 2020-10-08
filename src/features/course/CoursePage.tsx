import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import Page from '../../components/Page/Page'
import { Course } from '../../types/course'
import CourseInformation from './CourseInformation'
import BackButton from '../../components/BackButton/BackButton'

const COURSE_QUERY = loader('./GET_COURSE.gql')

interface Params {
    id: string
}

interface CourseData {
    course: Course
}

export default function CoursePage() {
    const { id } = useParams<Params>()

    const { loading, data } = useQuery<CourseData>(COURSE_QUERY, {
        variables: {
            id,
        },
    })

    return (
        <div className="course-page" data-testid="course-page">
            <Page>
                <BackButton to="/dashboard" text="Home" />
                {loading ? <div>Loading</div> : data && <CourseInformation course={data.course} />}
            </Page>
        </div>
    )
}
