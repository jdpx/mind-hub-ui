import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
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

    const [getCourse, { loading, data }] = useLazyQuery<CourseData>(COURSE_QUERY, {
        variables: {
            id,
        },
    })

    useEffect(() => {
        getCourse()
    }, [getCourse])

    return (
        <Page name="course">
            <BackButton to="/dashboard" text="Home" />
            {loading ? <div>Loading</div> : data && <CourseInformation course={data.course} />}
        </Page>
    )
}
