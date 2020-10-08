import React from 'react'
import ReactPlayer from 'react-player'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/course'

import './AudioStep.scss'

interface Props {
    step?: Step
}

export default function AudioStep({ step }: Props) {
    if (!step) {
        return <></>
    }

    const { id, audioUrl, description } = step

    return (
        <div className="step">
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
            <Section title="Notes">
                <div className="course-notes">
                    Culpa eu deserunt deserunt labore duis laboris tempor elit pariatur aliqua enim
                    amet officia. Ex irure ut pariatur duis ut. Culpa elit ullamco anim aute eu
                    eiusmod consectetur adipisicing laboris eiusmod commodo non nostrud. Incididunt
                    ullamco mollit officia culpa pariatur mollit aliquip. Non laborum veniam id enim
                    minim minim et incididunt amet. Esse elit ipsum reprehenderit magna sint irure
                    incididunt ut. Occaecat ut proident id quis quis do cillum voluptate
                    exercitation incididunt mollit et reprehenderit.
                </div>
            </Section>
        </div>
    )
}
