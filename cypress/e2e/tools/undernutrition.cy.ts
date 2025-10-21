describe('Evaluation dénutrition', () => {
    beforeEach(() => {
        cy.visit('/undernutrition')
    })

    it('devrait évaluer la dénutrition senior correctement', () => {
        cy.get('button[name="senior"]').click()
        cy.get('input[name="weight"]').type('70')
        cy.get('input[name="height"]').type('175')
        cy.get('input[name="previousWeight"]').type('90')
        cy.get('select[name="previousWeightDate"]').select('one-month')
        cy.get('input[name="albuminemia"]').type('29')
        cy.get('input[name="sarcopenia"]').check()
        cy.get('input[name="etiologicalFoodIntake"]').check()
        cy.contains('button', 'Calculer').click()

        cy.contains('🎯 Résultats').should('be.visible')
        cy.contains('En présence d\'au moins un critère phénotypique et un critère étiologique, le diagnostic de dénutrition est confirmé.').should('be.visible')
    })

    it('devrait afficher une erreur pour des valeurs nulles', () => {
        cy.get('button[name="senior"]').click() 
        cy.get('input[name="weight"]').type('0')
        cy.get('input[name="height"]').type('0')
        cy.get('input[name="previousWeight"]').type('0')
        cy.get('select[name="previousWeightDate"]').select('none')
        cy.get('input[name="albuminemia"]').type('0')
        cy.contains('button', 'Calculer').click()

        cy.contains('Merci de bien remplir les champs nécessaires').should('be.visible')
    })
})