/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {
    
    let token
    beforeEach(() => {
       cy.token('fulano@qa.com', 'teste').then(tkn => {token = tkn})
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
                "nome": "Teclado e mouse Logitech MX Vertical",
                "preco": 220,
                "descricao": "Teclado",
                "quantidade": 20
            },
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });
});