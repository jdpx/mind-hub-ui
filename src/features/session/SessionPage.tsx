import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'

import { Session as SessionType } from '../../types/course'
import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import Session from './Session'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'

const SESSION_QUERY = loader('./GET_SESSION.gql')

interface Params {
    id: string
    courseId: string
}

interface SessionData {
    session: SessionType
}

export default function SessionPage() {
    const { id, courseId } = useParams<Params>()

    const [getSession, { loading, data, error }] = useLazyQuery<SessionData>(SESSION_QUERY, {
        variables: {
            id,
        },
    })

    useEffect(() => {
        getSession()
    }, [getSession])

    return (
        <Page name="session">
            {loading ? (
                <div>Loading</div>
            ) : error ? (
                <ErrorPanel />
            ) : (
                data && (
                    <>
                        <BackButton
                            to={`/course/${courseId}`}
                            text={`Back To ${data.session.course?.title}`}
                        />
                        <Session session={data.session} />
                    </>
                )
            )}
        </Page>
    )
}
