import React, { useEffect } from 'react'
import { Audio, Question, Video } from '../../../constants/steps'

import { Step as StepType } from '../../../types/step'
import AudioStep from './AudioStep'
import QuestionStep from './QuestionStep'
import VideoStep from './VideoStep'

import './Step.scss'

interface Props {
    step?: StepType
    markStepAsStarted: (id: string) => void
    onNoteSave: (value: string) => void
}

export default function CurrentStep({ step, markStepAsStarted, onNoteSave }: Props) {
    useEffect(() => {
        if (!step || !!step.progress) {
            return
        }
        const { id } = step

        markStepAsStarted(id)
    }, [step, markStepAsStarted])

    if (!step) {
        return <></>
    }

    const { type } = step
    let Component: React.ReactNode

    switch (type) {
        case Question:
            Component = <QuestionStep step={step} onNoteSave={onNoteSave} />
            break
        case Video:
            Component = <VideoStep step={step} onNoteSave={onNoteSave} />
            break
        case Audio:
            Component = <AudioStep step={step} onNoteSave={onNoteSave} />
            break

        default:
            Component = <></>
            break
    }

    return <div className="step">{Component}</div>
}
