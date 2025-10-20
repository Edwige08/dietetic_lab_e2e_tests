describe('Calcul de l\'IMC', () => {
    beforeEach(() => {
        cy.visit('/imc')
    })

    it('devrait calculer l\'IMC correctement', () => {
        cy.get('input[name="weight"]').type('70')
        cy.get('input[name="height"]').type('175')
        cy.contains('button', 'Calculer').click()

        cy.contains('🎯 Résultats').should('be.visible')
        cy.contains('Pour un poids de 70 kg et une taille de ').should('be.visible')
    })

    it('devrait afficher une erreur pour des valeurs nulles', () => {
        cy.get('input[name="weight"]').type('0')
        cy.get('input[name="height"]').type('0')
        cy.contains('button', 'Calculer').click()

        cy.contains('Vous devez rentrer un poids et une taille').should('be.visible')
    })
})