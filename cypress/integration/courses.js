import { apiRoutes } from '../support/urls'

describe('courses', () => {
    beforeEach(() => {
        apiRoutes()
    })

    it('it should allow the user to navigate through courses and their sessions', () => {
        cy.login().then(() => {
            cy.wait('@getQuery')
            cy.get('[data-testid^="available-courses-"]').first().click()

            cy.wait('@getQuery')
            cy.get('.course-sessions a').first().click()

            cy.wait('@getQuery')
            cy.get('[data-testid="session-next-btn"]').click()

            cy.get('[data-testid="back-button"]').click()
            cy.get('[data-testid="back-button"]').click()

            cy.location('pathname').should('eq', '/dashboard')
            cy.contains('Welcome Test Account')
        })
    })
})
