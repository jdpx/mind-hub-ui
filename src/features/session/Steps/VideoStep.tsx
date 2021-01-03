import React from 'react'
import ReactPlayer from 'react-player'

import Notes from '../../../components/Notes/Notes'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/step'

import './VideoStep.scss'

interface Props {
    step: Step
    onNoteSave: (value: string) => void
}

export default function VideoStep({ step, onNoteSave }: Props) {
    const { id, videoUrl, description, note } = step

    return (
        <>
            <div>
                <div className="video-step" data-testid={`video-step-description-${id}`}>
                    {description}
                </div>
                <Section>
                    <div className="video-step" data-testid={`video-step-${id}`}>
                        <ReactPlayer url={videoUrl} />
                    </div>
                </Section>
            </div>
            <Notes
                note={note}
                onNoteSave={onNoteSave}
                className="course-notes"
                testid={`step-${id}-notes`}
            />
        </>
    )
}
