import React from 'react'
import ActionButton from '../../../components/ActionButton/ActionButton'
import Section from '../../../components/Section/Section'
import { Step } from '../../../types/step'

import './QuestionStep.scss'

interface Props {
    step: Step
    onNoteSave: (value: string) => void
}

export default function QuestionStep({ step }: Props) {
    const { id, question } = step

    return (
        <Section>
            <div className="question-step" data-testid={`question-step-${id}`}>
                <div>{question}</div>
                <div className="question-step-answers">
                    <ActionButton text="Yes" />
                    <ActionButton text="No" />
                </div>
                <div className="question-step-explaination">Explain Why</div>
            </div>
        </Section>
    )
}
