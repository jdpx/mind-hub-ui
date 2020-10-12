import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const sentryDSN = process.env.REACT_APP_SENTRY_DSN || ''
const releaseNumber = process.env.provREACT_APP_BUILD_NUMBER || ''

export function init() {
    if (process.env.NODE_ENV === 'development') {
        return
    }

    Sentry.init({
        dsn: sentryDSN,
        integrations: [new Integrations.BrowserTracing()],
        release: releaseNumber,
        tracesSampleRate: 1.0,
    })
}
