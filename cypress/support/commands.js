import jwt_decode from 'jwt-decode'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    Cypress.log({
        name: 'loginViaAuth0',
    })

    const client_id = Cypress.env('auth_client_id')
    const scope = 'openid profile email'
    const options = {
        method: 'POST',
        url: Cypress.env('auth_url'),
        body: {
            grant_type: 'password',
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),
            audience: Cypress.env('auth_audience'),
            scope: scope,
            client_id: client_id,
            client_secret: Cypress.env('auth_client_secret'),
        },
    }
    cy.request(options).then(({ body }) => {
        // https://community.auth0.com/t/auth0-react-and-cypress/47855/2
        const { access_token, expires_in, id_token } = body
        const key = `@@auth0spajs@@::${client_id}::default::${scope}`
        const auth0Cache = {
            body: {
                client_id,
                access_token,
                id_token,
                scope,
                expires_in,
                decodedToken: {
                    user: jwt_decode(id_token),
                },
            },
            expiresAt: Math.floor(Date.now() / 1000) + expires_in,
        }
        window.localStorage.setItem(key, JSON.stringify(auth0Cache))
        window.localStorage.setItem('__cypress', JSON.stringify(auth0Cache))
    })
})
