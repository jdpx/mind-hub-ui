/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// module.exports = (on, config) => {

import { join } from 'path'

export default (on) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config

    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
            launchOptions.extensions.push(join(__dirname, '/ignore-x-frame-headers'))

            launchOptions.args.push(
                '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure,SameSiteDefaultChecksMethodRigorously',
            )
        }

        return launchOptions
    })
}
