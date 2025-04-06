/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {
    it('Listar produtos', () => {
        cy.request({
            method: 'get',
            url: 'http://localhost:3000/produtos'
        }).then((response) => {
            expect(response.status).to.equal(200)
        })
    });
});