import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'

import { Session as SessionType } from '../../types/course'
import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import Session from './Session'

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

    const { loading, data } = useQuery<SessionData>(SESSION_QUERY, {
        variables: {
            id,
        },
    })

    return (
        <div className="session-page" data-testid="session-page">
            <Page>
                {loading ? (
                    <div>Loading</div>
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
        </div>
    )
}
