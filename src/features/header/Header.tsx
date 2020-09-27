import React from 'react'

import Logo from '../../components/logo/Logo'
import Navigation from './Navigation/Navigation'

import './Header.scss'

export default function Header() {
    return (
        <div className="header">
            <Logo />
            <Navigation />
        </div>
    )
}
