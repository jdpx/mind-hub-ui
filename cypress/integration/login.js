import { apiRoutes } from '../support/urls'

describe('authentication', () => {
    beforeEach(() => {
        apiRoutes()
    })

    it('should successfully log into our app and load the Dashboard', () => {
        cy.login().then(() => {
            cy.location('pathname').should('eq', '/dashboard')

            cy.contains('Welcome Test Account')
        })
    })
})
