import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import Page from '../../components/Page/Page'
import Courses from './Courses/Courses'

export default function DashboardPage() {
    const { user } = useAuth0()
    const { name } = user

    return (
        <div className="dashboard-page" data-testid="dashboard-page">
            <Page>
                <h1 data-testid="dashboard-header">Welcome {name}</h1>
                <Courses />
            </Page>
        </div>
    )
}
