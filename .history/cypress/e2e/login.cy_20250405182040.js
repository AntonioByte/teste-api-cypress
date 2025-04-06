
describe('Login - Testes da API ServeRest', () => {
    it('Realizar login', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
             }
        })
});
});