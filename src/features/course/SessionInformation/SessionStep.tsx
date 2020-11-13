import React from 'react'
import classNames from 'classnames'

import Checkbox from '../../../components/Checkbox/Checkbox'
import { Step } from '../../../types/course'

interface Props {
    step: Step
}

export default function SessionStep({ step }: Props) {
    const { id, title, progress } = step

    const stepClass = classNames('course-session-step', {
        completed: !!progress?.dateCompleted,
    })

    return (
        <div key={id} className={stepClass} data-testid={`session-step-${step.id}`}>
            <div className="course-session-step-title">{title}</div>
            <Checkbox checked={!!progress?.dateCompleted} />
        </div>
    )
}
