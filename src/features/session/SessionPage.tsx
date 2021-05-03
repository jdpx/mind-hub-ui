import React, { useEffect } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'

import Page from '../../components/Page/Page'
import BackButton from '../../components/BackButton/BackButton'
import Session from './Session'
import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import useSessions from '../../hooks/useSessions'
import useProgress from '../../hooks/useProgress'
import Loading from '../../components/Loading/Loading'
import { Session as SessionType } from '../../types/session'

interface Params {
    id: string
    courseId: string
    stepId?: string
}

export default function SessionPage() {
    const { push, replace } = useHistory()
    const { id, courseId } = useParams<Params>()
    let { stepId } = useParams<Params>()
    const { completeStep } = useProgress()

    const { useGetByID } = useSessions()
    const { get, loading, session, error } = useGetByID(id)

    useEffect(() => {
        get()
    }, [get])

    if (!stepId && session) {
        const firstStepId = getSessionFirstStepId(session)

        if (firstStepId) {
            stepId = firstStepId

            replace(`/course/${courseId}/session/${id}/step/${firstStepId}`)
        }
    }

    const onSessionCompleted = () => {
        push(`/course/${courseId}/session/${id}/completed`)
    }

    const redirectToStep = (nextStep: string) => {
        push(`/course/${courseId}/session/${id}/step/${nextStep}`)
    }

    const redirectToNotFound = () => {
        return <Redirect to="/not-found" />
    }

    return (
        <Page name="session">
            {loading ? (
                <Loading />
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
                        redirectToNotFound={redirectToNotFound}
                    />
                </>
            ) : (
                <Redirect to="/not-found" />
            )}
        </Page>
    )
}

const getSessionFirstStepId = (session: SessionType): string => {
    return session.steps && session.steps.length > 0 ? session.steps[0].id : ''
}
