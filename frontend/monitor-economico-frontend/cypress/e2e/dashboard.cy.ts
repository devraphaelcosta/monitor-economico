describe('Dashboard Econômico', () => {
  it('deve exibir o painel e os principais indicadores', () => {
    cy.visit('http://localhost:4200');

    // Valida o título principal da página
cy.get('h1')
  .should('be.visible')
  .and('contain.text', 'sdsddsse de Monitoramento Econômico');


    // Valida os indicadores principais
    cy.contains('SELIC').should('be.visible');
    cy.contains('IPCA').should('be.visible');
    cy.contains('CÂMBIO').should('be.visible');
    cy.contains('PIB').should('be.visible');
  });
});