import React from 'react'
import { Audio, Question as QuestionType, Video } from '../../constants/steps'
import { Step as StepType } from '../../types/course'
import AudioStep from './types/AudioStep'
import QuestionStep from './types/QuestionStep'
import VideoStep from './types/VideoStep'

interface Props {
    step?: StepType
    handleNoteSave: (value: string) => void
}

export default function CurrentStep(props: Props) {
    if (!props.step) {
        return <></>
    }

    const { type } = props.step

    switch (type) {
        case QuestionType:
            return <QuestionStep {...props} />
        case Video:
            return <VideoStep {...props} />
        case Audio:
            return <AudioStep {...props} />

        default:
            return <></>
    }
}
