import React from 'react'
import ReactPlayer from 'react-player'

import Notes from '../../../components/Notes/Notes'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/course'

import './VideoStep.scss'

interface Props {
    step?: Step
    handleNoteSave: (value: string) => void
}

export default function VideoStep({ step, handleNoteSave }: Props) {
    if (!step) {
        return <></>
    }

    const { id, videoUrl, description, note } = step

    return (
        <div className="step">
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
                handleSave={handleNoteSave}
                className="course-notes"
                testid={`step-${id}-notes`}
            />
        </div>
    )
}
