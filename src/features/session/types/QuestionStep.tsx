import React from 'react'
import ActionButton from '../../../components/ActionButton/ActionButton'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/course'

import './QuestionStep.scss'

interface Props {
    step?: Step
    handleNoteSave: (value: string) => void
}

export default function QuestionStep({ step }: Props) {
    if (!step) {
        return <></>
    }

    const { id, question } = step

    return (
        <div className="step">
            <Section>
                <div className="step question-step" data-testid={`question-step-${id}`}>
                    <div>{question}</div>
                    <div className="question-step-answers">
                        <ActionButton text="Yes" />
                        <ActionButton text="No" />
                    </div>
                    <div className="question-step-explaination">Explain Why</div>
                </div>
            </Section>
        </div>
    )
}
