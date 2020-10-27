import React from 'react'

export default function NoAvailableSessions() {
    return (
        <div className={'course-session'} data-testid={'course-no-sessions'}>
            <div className="course-session-title">No Sessions Currently Available</div>
        </div>
    )
}
