/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {
    it('Listar produtos', () => {
        cy.request({
            method: 'get',
            url: 'http://localhost:3000/produtos'
        }).then((response) => {
            expect(response.body.produtos[1].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).equal.to.have.property('produtos')
            expect(response.duration).to.lessThan(20)
        })
    });
});