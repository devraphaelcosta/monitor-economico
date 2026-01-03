describe('Dashboard Econômico', () => {
  it('deve exibir os principais indicadores', () => {
    cy.visit('http://localhost:4200');

    cy.contains('SELIC').should('be.visible');
    cy.contains('IPCA').should('be.visible');
    cy.contains('CÂMBIO').should('be.visible');
    cy.contains('PIB').should('be.visible');
  });
});