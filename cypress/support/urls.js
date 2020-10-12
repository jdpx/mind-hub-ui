export const apiRoutes = () => {
    cy.server()

    cy.route('POST', '**/query').as('getQuery')
}
