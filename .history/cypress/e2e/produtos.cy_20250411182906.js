/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {
    
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste')
    });
    
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
                "nome": "Teclado Logitech MX Vertical",
                "preco": 220,
                "descricao": "Teclado",
                "quantidade": 20
            },
            headers: { authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzQ0MTQzMDUwLCJleHAiOjE3NDQxNDM2NTB9.ML3dL_BASlW4F0NUew26uNF4YeahLhqL3A9ALjNkaJo' }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});