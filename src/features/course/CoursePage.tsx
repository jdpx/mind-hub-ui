import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import Page from '../../components/Page/Page'
import CourseInformation from './CourseInformation'
import BackButton from '../../components/BackButton/BackButton'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import useCourse from '../../hooks/useCourse'

interface Params {
    id: string
}

export default function CoursePage() {
    const { id } = useParams<Params>()

    const { useGetByID } = useCourse()
    const { get, loading, course, error } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    return (
        <Page name="course">
            {loading ? (
                <div>Loading</div>
            ) : error ? (
                <ErrorPanel />
            ) : course ? (
                <>
                    <BackButton to="/dashboard" text="Home" />
                    <CourseInformation course={course} />
                </>
            ) : (
                <Redirect to="/not-found" />
            )}
        </Page>
    )
}
