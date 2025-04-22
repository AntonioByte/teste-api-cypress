/// <reference types="cypress" />

describe('Teste da funcionalidade produto', () => {

    let token
    let idProduto

    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });

    it('Listar produtos', () => {
        cy.request({
            method: 'GET',
            url: '/produtos'
        }).then((response) => {
            //expect(response.body.produtos[0].nome).to.equal(produto)
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('produtos')
            expect(response.duration).to.lessThan(20)
        })
    });

    it('Cadastrar produtos', () => {
        let nomeProduto = `Produto Novo ${Math.floor(Math.random() * 10000)}`
        cy.cadastrarProduto(token, nomeProduto, 220, "produto", 20)
            .then((response) => {
                expect(response.status).to.equal(201)
                expect(response.body.message).to.equal('Cadastro realizado com sucesso')
                idProduto = response.body._id
            })
    });

    it('Cadastrar produto existente', () => {
        cy.cadastrarProduto(token, "Logitech MX Vertical", 470, "Mouse", 381)
            .then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Já existe produto com esse nome')
            })
    });

    it('Editar produto', () => {
        cy.request({
            method: 'PUT',
            url: '/produtos/' + idProduto,
            headers: { authorization: token },
            body: {
                "nome": "Logitech MXO Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Registro alterado com sucesso")
        })
    });

    it('Buscar por produto', () => {
        cy.request({
            method: 'GET',
            url: '/produtos/' + idProduto
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.nome).to.equal('Logitech MXO Vertical')
        })
    });

    it('Excluir Produto', () => {
        cy.request({
            method: 'DELETE',
            url: '/produtos/' + idProduto,
            headers: { authorization: token }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal("Registro excluído com sucesso")
        })
    });

    it.only('Deletar produto previamente cadastrado', () => {
        let nomeProduto = `Produto Novo ${Math.floor(Math.random() * 10000)}`
        cy.cadastrarProduto(token, nomeProduto, 220, "produto", 20)
            .then((response) => {
                id = response.body._id
                cy.request({
                    method: 'DELETE',
                    url: `/produtos/${id}`,
                    headers: { authorization: token }
                }).then((response) => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
                })
            })

    });
});