import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import Page from '../../components/Page/Page'
import AvailableCourses from './AvailableCourses/AvailableCourses'

export default function DashboardPage() {
    const { user } = useAuth0()
    const { name } = user

    useEffect(() => {
        document.title = `Dashboard`
    })

    return (
        <div className="dashboard-page" data-testid="dashboard-page">
            <Page>
                <h1 data-testid="dashboard-header">Welcome {name}</h1>
                <AvailableCourses />
            </Page>
        </div>
    )
}
