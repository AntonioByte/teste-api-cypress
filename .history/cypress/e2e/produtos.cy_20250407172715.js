/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {
    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).then((response) => {
            expect(response.body.produtos[0].nome).to.equal('Logitech MX Vertical')
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.lessThan(20)
        })
    });

    it('Cadastrar produtos', () => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            body: {
                "nome": "Mouse Logitech MX Vertical",
                "preco": 220,
                "descricao": "Mouse",
                "quantidade": 20
              }
            
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});