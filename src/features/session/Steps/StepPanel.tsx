import React, { useEffect } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel'
import Loading from '../../../components/Loading/Loading'
import useNotes from '../../../hooks/useNotes'
import useProgress from '../../../hooks/useProgress'
import useSteps from '../../../hooks/useSteps'

import CurrentStep from './CurrentStep'

interface Params {
    courseId: string
    sessionId: string
    stepId: string
}

export default function StepPanel() {
    const { stepId } = useParams<Params>()

    const { useGetByID } = useSteps()
    const { get, loading, step, error } = useGetByID(stepId)

    useEffect(() => {
        get()
    }, [get])

    const { startStep } = useProgress()
    const { updateStepNote } = useNotes()

    const onNoteSave = (value: string) => {
        updateStepNote(stepId, value)
    }

    return (
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorPanel />
            ) : step ? (
                <CurrentStep step={step} onNoteSave={onNoteSave} markStepAsStarted={startStep} />
            ) : (
                <Redirect to="/not-found" />
            )}
        </div>
    )
}
