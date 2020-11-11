import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Session } from '../../../types/course'
import LeftArrow from '../../../components/generic/LeftArrow'
import SessionStep from './SessionStep'

interface Props {
    courseID: string
    session: Session
    alternate?: boolean
    testid?: string
}

export default function SessionInformation({ courseID, session, alternate, testid }: Props) {
    const { id, title, steps } = session

    const sessionClass = classNames('course-session', {
        alternate: alternate,
    })

    return (
        <>
            <Link
                to={{ pathname: `/course/${courseID}/session/${id}` }}
                className={sessionClass}
                data-testid={testid}
            >
                <div className="course-session-title">{title}</div>
                <LeftArrow height={18} />
            </Link>
            {steps && (
                <div className="course-session-steps" data-testid="course-session-steps">
                    {steps.map((step) => (
                        <SessionStep key={step.id} step={step} />
                    ))}
                </div>
            )}
        </>
    )
}
