import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

const sentryDSN = process.env.REACT_APP_SENTRY_DSN || ''

export function init() {
    if (process.env.NODE_ENV === 'development') {
        return
    }

    Sentry.init({
        dsn: sentryDSN,
        integrations: [new Integrations.BrowserTracing()],

        tracesSampleRate: 1.0,
    })
}
