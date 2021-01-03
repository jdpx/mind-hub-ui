import React from 'react'
import { Steps } from 'antd'
import { Step as StepType } from '../../types/step'

import './StepsProgress.scss'

import 'antd/dist/antd.css'

const { Step } = Steps

interface Props {
    steps: StepType[]
    currentIndex?: number
}

const customDot = () => <div className="steps-progress-dot" />

export default function StepsProgress({ steps, currentIndex }: Props) {
    return (
        <div className="steps-progress" data-testid="steps-progress">
            <Steps progressDot={customDot} current={currentIndex}>
                {steps.map((step) => (
                    <Step key={step.id} title={step.title} />
                ))}
            </Steps>
        </div>
    )
}
