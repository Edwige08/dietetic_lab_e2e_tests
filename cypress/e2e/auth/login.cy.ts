describe('Authentification', () => {
  beforeEach(() => {
    // Avant chaque test, visite la page de login
    cy.visit('/signin')
  })

  it('devrait afficher le formulaire de connexion', () => {
    cy.get('input[name="mail"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('button', 'Me connecter').should('be.visible')
  })

  it('devrait se connecter avec des identifiants valides', () => {
    const email = 'test@example.com'
    const password = '123ABCdef;:!'
    cy.createTestUser(email, password).then((response) => {
      console.log('Réponse API création utilisateur:', response)
    })
    cy.get('input[name="mail"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.contains('button', 'Me connecter').click()

    // Vérifie la redirection après login vers le profil
    cy.url().should('include', '/personnalProfile')
  })

  it('devrait afficher une erreur avec des identifiants invalides', () => {
    cy.get('input[name="mail"]').type('wrong@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.contains('button', 'Me connecter').click()

    // The app shows an inline message on failed login — check for common messages
    cy.contains('Email ou mot de passe incorrect').should('be.visible')
  })
})