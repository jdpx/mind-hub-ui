import React, { useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import useCourse from '../../hooks/useCourse'
import CourseContainer from './CourseContainer'
import Loading from '../../components/Loading/Loading'

interface Params {
    id: string
}

export default function CoursePage() {
    const { push } = useHistory()
    const { id } = useParams<Params>()

    const { useGetByID } = useCourse()
    const { get, loading, course, error } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    const redirectToSession = (sessionID: string) => {
        push(`/course/${id}/session/${sessionID}`)
    }

    console.log('id:' + id)

    return (
        <Page name="course">
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPanel />
            ) : course ? (
                <>
                    <BackButton to="/dashboard" text="Home" />
                    <CourseContainer course={course} redirectToSession={redirectToSession} />
                </>
            ) : (
                <div>fooo</div>
                // <Redirect to="/not-found" />
            )}
        </Page>
    )
}
