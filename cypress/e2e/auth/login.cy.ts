describe('Authentification', () => {
  beforeEach(() => {
    // Before each test, visit the signin page
    cy.visit('/signin')
  })

  it('devrait afficher le formulaire de connexion', () => {
    cy.get('input[name="mail"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('button', 'Me connecter').should('be.visible')
  })

  it('devrait afficher une erreur avec des identifiants invalides', () => {
    cy.get('input[name="mail"]').type('wrong@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.contains('button', 'Me connecter').click()

    cy.contains('Email ou mot de passe incorrect').should('be.visible')
  })

  it('devrait se connecter avec des identifiants valides, puis se déconnecter correctement', () => {
    // First, connect
    const email = 'test@example.com'
    const password = '123ABCdef;:!'
    cy.createTestUser(email, password).then((response) => {
      console.log('Réponse API création utilisateur:', response)
    })
    cy.get('input[name="mail"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.contains('button', 'Me connecter').click()

    // Verify it redirects to profile page
    cy.url().should('include', '/personnalProfile')

    // Click on the logout button
    cy.contains('button', 'Déconnexion').click()

    // Verify it redirects to the home page
    cy.url().should('eq', Cypress.config().baseUrl + '/')

    // Verify it no longer can access the content of the profile page
    cy.visit('/personnalProfile')
    cy.contains('pas connecté').should('be.visible')
  })
})