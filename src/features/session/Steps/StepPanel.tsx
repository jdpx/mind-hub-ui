import React, { useEffect } from 'react'
import { Audio, Question, Video } from '../../../constants/steps'

import useProgress from '../../../hooks/useProgress'
import { Step as StepType } from '../../../types/course'
import AudioStep from './AudioStep'
import QuestionStep from './QuestionStep'
import VideoStep from './VideoStep'

import './Step.scss'

interface Props {
    step?: StepType
    handleNoteSave: (value: string) => void
}

export default function StepPanel(props: Props) {
    const { startStep } = useProgress()
    const { step } = props

    useEffect(() => {
        if (!step || !!step.progress) {
            return
        }
        const { id } = step

        startStep(id)
    }, [step, startStep])

    if (!step) {
        return <></>
    }

    const { type } = step
    let Component: React.ReactNode

    switch (type) {
        case Question:
            Component = <QuestionStep step={step} {...props} />
            break
        case Video:
            Component = <VideoStep step={step} {...props} />
            break
        case Audio:
            Component = <AudioStep step={step} {...props} />
            break

        default:
            Component = <></>
            break
    }

    return <div className="step">{Component}</div>
}
