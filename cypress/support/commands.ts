/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'
import '@4tw/cypress-drag-drop'
import Ajv from 'ajv'

// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      confirmCaptcha(value?: string): Chainable<any>
      validateSchema(response:any, schema:JSON): Chainable<any>
    }
  }
}

Cypress.Commands.add('confirmCaptcha', function () {
  cy.get('iframe')
    .first()
    .then((recaptchaIframe) => {
      const body = recaptchaIframe.contents()
      cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').realHover().realClick()
    })
  cy.window().then(win => {
    return win.grecaptcha.execute('6LeJ_e8pAAAAAEeYCo9S2KcbcGkLfXz8SHuBadxK').then(token => {
      cy.get('input[name="g-recaptcha-response"]').invoke('val', token)
      cy.get('form').submit()
    })
  })
})

Cypress.Commands.add('validateSchema', (response, schema) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(response.body);
  expect(valid, ajv.errorsText(validate.errors)).to.be.true;
});
