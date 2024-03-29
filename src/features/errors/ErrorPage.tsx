import React from 'react'

import ErrorPanel from '../../components/ErrorPanel/ErrorPanel'
import Page from '../../components/Page/Page'

import './ErrorPage.scss'

export default function ErrorPage() {
    return (
        <Page name="error">
            <div className="panel">
                <ErrorPanel height={300} />
            </div>
        </Page>
    )
}
