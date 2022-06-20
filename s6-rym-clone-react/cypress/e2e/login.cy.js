describe('login ', () => {
  it('enters login info', () => {

    const username = 'test123';
    const password = 'test123';

    cy.intercept('https://localhost:7000/api/auth/login', (req) => {
      req.reply({
        username: 'test123'
      }); }).as('backendAPI');

    cy.visit('/login');
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(`${password}{enter}`);
    cy.get('button[name=loginButton]').click();


    cy.url().should('include', '/user/test123')
  })
})
