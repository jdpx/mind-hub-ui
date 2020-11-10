import React from 'react'
import { Link } from 'react-router-dom'
import MindLogo from '../../components/logo/MindLogo'

import './Footer.scss'

export default function Footer() {
    return (
        <div className="footer">
            <MindLogo />
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-header">Legal Information</div>
                    <ul>
                        <li>
                            <Link to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/terms-and-conditions">Terms and conditions</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    <div className="footer-header">Accessibility</div>
                    <ul>
                        <li>
                            <Link to="/accessibility">Accessibility</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-section">
                    © 2020 Mind We&apos;re a registered charity in England (no. 219830) and a
                    registered company (no. 424348) in England and Wales.
                    <br />
                    Build No.: {process.env.REACT_APP_BUILD_NUMBER}
                </div>
            </div>
        </div>
    )
}
