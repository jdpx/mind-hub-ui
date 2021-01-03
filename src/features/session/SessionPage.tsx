import React, { useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import Session from './Session'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import useSessions from '../../hooks/useSessions'
import useProgress from '../../hooks/useProgress'

interface Params {
    id: string
    courseId: string
    stepId?: string
}

export default function SessionPage() {
    const { push, replace } = useHistory()
    const { id, courseId, stepId } = useParams<Params>()
    const { completeStep } = useProgress()

    const { useGetByID } = useSessions()
    const { get, loading, session, error } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    if (!stepId && session) {
        const firstStepId = session.steps && session.steps.length > 0 ? session.steps[0].id : ''

        replace(`/course/${courseId}/session/${id}/step/${firstStepId}`)
        return <> </>
    }

    const onSessionCompleted = () => {
        push(`/course/${courseId}/session/${id}/completed`)
    }

    const redirectToStep = (nextStep: string) => {
        push(`/course/${courseId}/session/${id}/step/${nextStep}`)
    }

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
                    <Session
                        session={session}
                        currentStepId={stepId}
                        markStepComplete={completeStep}
                        redirectToStep={redirectToStep}
                        onSessionCompleted={onSessionCompleted}
                    />
                </>
            ) : (
                <Redirect to="/not-found" />
            )}
        </Page>
    )
}
