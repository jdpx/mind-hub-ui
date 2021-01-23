import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import Page from '../../../components/Page/Page'
import ActionButton from '../../../components/ActionButton/ActionButton'
import { Left } from '../../../constants/buttons'
import Loading from '../../../components/Loading/Loading'
import useSessions from '../../../hooks/useSessions'

import congratulationsImage from '../../../assets/congratulations-cake.svg'

import './CompletedPage.scss'

interface Params {
    id: string
    courseId: string
}

export default function CompletedPage() {
    const { id, courseId } = useParams<Params>()
    const history = useHistory()

    const { useGetByID } = useSessions()

    const { get, loading, session } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    const handleDoneClick = () => {
        history.push(`/course/${courseId}`)
    }

    return (
        <Page name="session-completed">
            {loading ? (
                <Loading />
            ) : (
                session && (
                    <>
                        <div className="content" data-testid="session-completed-content">
                            <div className="completed-text">
                                <h1 data-testid="session-completed-header">All Done!</h1>
                                <div data-testid="session-title">Thats it for {session.title}</div>
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
    )
}
