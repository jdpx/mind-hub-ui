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
import CompletedPage from './features/session/SessionCompleted/CompletedPage'
import NotFoundPage from './features/notFound/NotFoundPage'

import './App.scss'
import TimemapPage from './features/timemap/TimemapPage'

function App() {
    const { isLoading } = useAuth0()

    if (isLoading) {
        return <div data-testid="mind-hub-loading">Loading</div>
    }

    return (
        <div className="mind-hub" data-testid="mind-hub">
            <Header />
            <ErrorBoundary fallback={<ErrorPage />}>
                <ProgressContextProvider>
                    <Switch>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/privacy-policy" exact component={PrivacyPolicyPage} />
                        <Route
                            path="/terms-and-conditions"
                            exact
                            component={TermsAndConditionsPage}
                        />
                        <Route path="/accessibility" exact component={AccessibilityPage} />
                        <PrivateRoute path="/dashboard" exact component={DashboardPage} />
                        <PrivateRoute path="/course/:id" exact component={CoursePage} />
                        <PrivateRoute
                            path="/course/:courseId/session/:id/completed"
                            exact
                            component={CompletedPage}
                        />
                        <PrivateRoute
                            exact
                            path="/course/:courseId/session/:id/(step)?/:stepId?"
                            component={SessionPage}
                        />

                        <Route path="/timemap" exact component={TimemapPage} />
                        <Route path="not-found" component={NotFoundPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </ProgressContextProvider>
            </ErrorBoundary>
            <Footer />
        </div>
    )
}

export default App
