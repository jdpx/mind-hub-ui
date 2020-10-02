import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

import DashboardPage from './features/dashboard/DashboardPage'
import Header from './features/header/Header'
import Homepage from './features/home/Homepage'

import './App.scss'

function App() {
    const { isLoading } = useAuth0()

    if (isLoading) {
        return <div data-testid="mind-hub-loading">Loading</div>
    }

    return (
        <div className="mind-hub" data-testid="mind-hub">
            <Header />
            <Switch>
                <Route path="/" exact component={Homepage} />
                <PrivateRoute path="/dashboard" exact component={DashboardPage} />
            </Switch>
        </div>
    )
}

export default App
