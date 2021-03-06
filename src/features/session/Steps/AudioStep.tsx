import React from 'react'
import ReactPlayer from 'react-player'

import Section from '../../../components/Section/Section'
import { Step } from '../../../types/step'

import './AudioStep.scss'

interface Props {
    step: Step
    onNoteSave: (value: string) => void
}

export default function AudioStep({ step }: Props) {
    const { id, audioUrl, description } = step

    return (
        <div>
            <div className="audio-step" data-testid={`audio-step-description-${id}`}>
                {description}
            </div>
            <Section>
                <div className="audio-step" data-testid={`audio-step-${id}`}>
                    <ReactPlayer url={audioUrl} controls height="55px" />
                </div>
            </Section>
        </div>
    )
}
