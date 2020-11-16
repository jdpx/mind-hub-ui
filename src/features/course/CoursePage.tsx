import { useLazyQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import Page from '../../components/Page/Page'
import { Course } from '../../types/course'
import CourseInformation from './CourseInformation'
import BackButton from '../../components/BackButton/BackButton'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'

const COURSE_QUERY = loader('./GET_COURSE.gql')

interface Params {
    id: string
}

interface CourseData {
    course?: Course
}

export default function CoursePage() {
    const { id } = useParams<Params>()

    const [getCourse, { loading, data, error }] = useLazyQuery<CourseData>(COURSE_QUERY, {
        variables: {
            id,
        },
    })

    useEffect(() => {
        getCourse()
    }, [getCourse])

    return (
        <Page name="course">
            {loading ? (
                <div>Loading</div>
            ) : error ? (
                <ErrorPanel />
            ) : (
                data &&
                (data.course ? (
                    <>
                        <BackButton to="/dashboard" text="Home" />
                        <CourseInformation course={data.course} />
                    </>
                ) : (
                    <Redirect to="/not-found" />
                ))
            )}
        </Page>
    )
}
