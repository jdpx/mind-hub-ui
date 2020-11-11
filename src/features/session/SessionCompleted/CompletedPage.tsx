import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'

import Page from '../../../components/Page/Page'
import { Session as SessionType } from '../../../types/course'
import ActionButton from '../../../components/ActionButton/ActionButton'
import { Left } from '../../../constants/buttons'

import congratulationsImage from '../../../assets/congratulations-cake.svg'

import './CompletedPage.scss'
import Loading from '../../../components/Loading/Loading'

const SESSION_QUERY = loader('../GET_SESSION.gql')

interface Params {
    id: string
    courseId: string
}

interface SessionData {
    session: SessionType
}

export default function CompletedPage() {
    const { id, courseId } = useParams<Params>()
    const history = useHistory()

    const [getSession, { loading, data }] = useLazyQuery<SessionData>(SESSION_QUERY, {
        variables: {
            id,
        },
    })

    useEffect(() => {
        getSession()
    }, [getSession])

    const handleDoneClick = () => {
        history.push(`/course/${courseId}`)
    }

    return (
        <div className="session-completed-page" data-testid="session-completed-page">
            <Page>
                {loading ? (
                    <Loading />
                ) : (
                    data && (
                        <>
                            <div className="content">
                                <div className="completed-text">
                                    <h1 data-testid="session-completed-header">All Done!</h1>
                                    Thats it for {data.session.title}
                                    <br />
                                    Use this time now to reflect on what you’ve learnt and in 2 days
                                    time, we will continue the course.
                                    <ActionButton
                                        text="Done"
                                        onClick={handleDoneClick}
                                        position={Left}
                                        testid="done-button"
                                    />
                                </div>
                                <div>
                                    <img
                                        src={congratulationsImage}
                                        alt="Congratulations on completing the course"
                                    />
                                </div>
                            </div>
                        </>
                    )
                )}
            </Page>
        </div>
    )
}
