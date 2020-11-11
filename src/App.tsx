import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import DashboardPage from './features/dashboard/DashboardPage'
import Header from './features/header/Header'
import Homepage from './features/home/Homepage'
import CoursePage from './features/course/CoursePage'
import SessionPage from './features/session/SessionPage'
import { ErrorBoundary } from '@sentry/react'
import ErrorPage from './features/errors/ErrorPage'
import ProgressContextProvider from './context/progressContext'
import Footer from './features/footer/Footer'

import PrivacyPolicyPage from './features/legal/PrivacyPolicyPage'
import TermsAndConditionsPage from './features/legal/TermsAndConditionsPage'
import AccessibilityPage from './features/legal/AccessibilityPage'

import './App.scss'
import CompletedPage from './features/session/SessionCompleted/CompletedPage'

function App() {
    const { isLoading } = useAuth0()

    if (isLoading) {
        return <div data-testid="mind-hub-loading">Loading</div>
    }

    return (
        <div className="mind-hub" data-testid="mind-hub">
            <Header />
            <ErrorBoundary fallback={<ErrorPage />}>
                <Switch>
                    <Route path="/" exact component={Homepage} />
                    <Route path="/privacy-policy" exact component={PrivacyPolicyPage} />
                    <Route path="/terms-and-conditions" exact component={TermsAndConditionsPage} />
                    <Route path="/accessibility" exact component={AccessibilityPage} />
                    <ProgressContextProvider>
                        <PrivateRoute path="/dashboard" exact component={DashboardPage} />
                        <PrivateRoute path="/course/:id" exact component={CoursePage} />
                        <PrivateRoute
                            exact
                            path="/course/:courseId/session/:id"
                            component={SessionPage}
                        />
                        <PrivateRoute
                            path="/course/:courseId/session/:id/completed"
                            exact
                            component={CompletedPage}
                        />
                        {/* <PrivateRoute
                            // path="/course/:courseId/session/:id/(step)?/:stepId?"
                            path={[
                                '/course/:courseId/session/:id',
                                // '/course/:courseId/session/:id/step/:stepId?',
                            ]}
                            component={SessionPage}
                        /> */}
                    </ProgressContextProvider>
                </Switch>
            </ErrorBoundary>
            <Footer />
        </div>
    )
}

export default App
