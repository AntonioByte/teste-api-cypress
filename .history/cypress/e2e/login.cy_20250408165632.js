/// <reference types="cypress" />
describe('Login - Testes da API ServeRest', () => {
    it('Realizar login', () => {
        cy.login("fulano@qa.com", "teste")
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            cy.log(response.body.authorization)
        })
    });
});