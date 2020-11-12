import React from 'react'
import classNames from 'classnames'
import useCollapse from 'react-collapsed'

import { Session } from '../../../types/course'
import SessionStep from './SessionStep'
import UpArrow from '../../../components/Arrows/UpArrow'
import DownArrow from '../../../components/Arrows/DownArrow'
import NoSessionSteps from './NoSessionSteps'

interface Props {
    courseID: string
    session: Session
    alternate?: boolean
    testid?: string
}

export default function SessionInformation({ session, alternate, testid }: Props) {
    const { title, steps } = session

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

    const sessionClass = classNames('course-session', {
        alternate: alternate,
        expanded: isExpanded,
    })

    return (
        <>
            <div {...getToggleProps()} className={sessionClass} data-testid={testid}>
                <div className="course-session-title">{title}</div>
                {isExpanded ? <UpArrow height={14} /> : <DownArrow height={14} />}
            </div>
            <div {...getCollapseProps()}>
                {isExpanded &&
                    (steps && steps.length > 0 ? (
                        <div className="course-session-steps" data-testid="course-session-steps">
                            {steps.map((step) => (
                                <SessionStep key={step.id} step={step} />
                            ))}
                        </div>
                    ) : (
                        <div className="course-session-steps" data-testid="course-session-steps">
                            <NoSessionSteps />
                        </div>
                    ))}
            </div>
        </>
    )
}
