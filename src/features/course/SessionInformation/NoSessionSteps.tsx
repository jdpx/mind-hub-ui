import React from 'react'

export default function NoSessionSteps() {
    return (
        <div className={'course-session-step no-steps'} data-testid={`no-steps`}>
            <div className="course-session-step-title">No steps available</div>
        </div>
    )
}
