import React from 'react'
import { Audio, Question as QuestionType, Video } from '../../constants/steps'
import { Step as StepType } from '../../types/course'
import AudioStep from './types/AudioStep'
import QuestionStep from './types/QuestionStep'
import VideoStep from './types/VideoStep'

interface Props {
    step?: StepType
}

export default function CurrentStep({ step }: Props) {
    if (!step) {
        return <></>
    }

    const { type } = step

    switch (type) {
        case QuestionType:
            return <QuestionStep step={step} />
        case Video:
            return <VideoStep step={step} />
        case Audio:
            return <AudioStep step={step} />

        default:
            return <></>
    }
}
