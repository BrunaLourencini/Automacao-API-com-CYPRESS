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

Cypress.Commands.add('createTask', (tasksName = '') => {
  cy.visit('/')
  cy.get('input[placeholder="Add a new Task"]').as('inputTask')
  if (tasksName !== '') {
    cy.get('@inputTask').type(tasksName)
  }
  cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
  cy.get('@inputTask').invoke('prop', 'validationMessage')
    .should((text) => {
      expect(targetMessage).to.eq(text)
    })
})

Cypress.Commands.add('removeTaskByName', (tasksName) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/helper/tasks',
    method: 'DELETE',
    body: { name: tasksName }
  }).then(response => {
    expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('postTask', (tasksName) => {
  cy.request({
    url: Cypress.env('apiUrl') + '/tasks',
    method: 'POST',
    body: tasksName
  }).then(response => {
    expect(response.status).to.eq(201)
  })
})