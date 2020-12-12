import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'

import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import Session from './Session'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import useSessions from '../../hooks/useSessions'

interface Params {
    id: string
    courseId: string
}

export default function SessionPage() {
    const { id, courseId } = useParams<Params>()

    const { useGetByID } = useSessions()
    const { get, loading, session, error } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    return (
        <Page name="session">
            {loading ? (
                <div>Loading</div>
            ) : error ? (
                <ErrorPanel />
            ) : session ? (
                <>
                    <BackButton
                        to={`/course/${courseId}`}
                        text={`Back To ${session.course?.title}`}
                    />
                    <Session session={session} />
                </>
            ) : (
                <Redirect to="/not-found" />
            )}
        </Page>
    )
}
