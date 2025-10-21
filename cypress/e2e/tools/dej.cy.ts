describe('Calcul de la DEJ', () => {
    beforeEach(() => {
        cy.visit('/dej')
    })

    it('devrait calculer la DEJ correctement', () => {
        cy.get('button[name="m"]').click()
        cy.get('input[name="weight"]').type('70')
        cy.get('input[name="height"]').type('175')
        cy.get('input[name="age"]').type('30')
        cy.get('input[name="nap"]').type('2')
        cy.contains('button', 'Calculer').click()

        cy.contains('🎯 Résultats').should('be.visible')
        cy.contains('Pour un homme de 30 ans, mesurant ').should('be.visible')
    })

    it('devrait afficher une erreur pour des valeurs nulles', () => {
        cy.get('button[name="m"]').click()
        cy.get('input[name="weight"]').type('0')
        cy.get('input[name="height"]').type('0')
        cy.get('input[name="age"]').type('0')
        cy.get('input[name="nap"]').type('0')
        cy.contains('button', 'Calculer').click()

        cy.contains('Merci de bien remplir tous les champs').should('be.visible')
    })
})