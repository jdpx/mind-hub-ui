import React from 'react'
import ReactPlayer from 'react-player'

import Notes from '../../../components/Notes/Notes'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/course'

import './AudioStep.scss'

interface Props {
    step: Step
    handleNoteSave: (value: string) => void
}

export default function AudioStep({ step, handleNoteSave }: Props) {
    const { id, audioUrl, description, note } = step

    return (
        <>
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
            <Notes
                note={note}
                handleSave={handleNoteSave}
                className="course-notes"
                testid={`step-${id}-notes`}
            />
        </>
    )
}
