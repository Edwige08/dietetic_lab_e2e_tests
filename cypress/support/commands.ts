declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<void>
    createTestUser(email: string, password: string): Chainable<Cypress.Response<any>>
  }
}

// Exemple : commande pour se connecter
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/signin')
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  // On the deployed site the inputs are rendered with name attributes
  cy.get('input[name="mail"]').type(email)
  cy.get('input[name="password"]').type(password)
  // Click the submit button by its visible text
  cy.contains('button', 'Me connecter').click()
  // After successful login the app redirects to /personnalProfile
  cy.url().should('include', '/personnalProfile')
})

// Commande pour créer un utilisateur de test via l'API publique
// Retourne la réponse de cy.request pour pouvoir logger dans le test
Cypress.Commands.add('createTestUser', (email: string, password: string) => {
  // Construct a full payload matching SignUpForm
  const payload = {
    firstname: 'Test',
    lastname: 'User',
    gender: 'other',
    mail: email,
    password: password,
    is_dietetician: false,
  }

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/v1/auth/register/`,
    body: payload,
    failOnStatusCode: false // ignore si déjà créé
  })
})