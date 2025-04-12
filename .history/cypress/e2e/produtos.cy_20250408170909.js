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
              },
            headers: {authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzQ0MTQyNDYzLCJleHAiOjE3NDQxNDMwNjN9.rKCj8g6B0LtayS0fOMaqRJz5lqE-YY49ghrr25OuYrMeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzQ0MTQyMzg1LCJleHAiOjE3NDQxNDI5ODV9.TJ_oM4Ba3Tx7NNtqhteX8ryvyr1yheA35vO-FnxzlLE'}
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});