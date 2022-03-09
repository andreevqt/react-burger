Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const clear = Cypress.LocalStorage.clear;

Cypress.LocalStorage.clear = (keys, ls, rs) => {
  if (keys) {
    return clear.apply(this, arguments);
  }
};

context('burger-constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('stubbedIngredients');
    cy.intercept('POST', '**/login', { fixture: 'user.json', statusCode: 200 }).as('stubbedLogin');
    cy.intercept('POST', '**/orders', { fixture: 'order.json', statusCode: 200 }).as('stubbedOrder');
    cy.intercept('POST', '**/token', { fixture: 'refresh.json', statusCode: 200 }).as('stubbedRefresh');
  });

  it('should contain page title', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
  });

  it('should show modal on ingredient click', () => {
    // click on ingredient card
    cy.get('[data-test="ingredient-card"]')
      .first()
      .click();
    // modal contains title
    cy.get('[data-test="modal"]')
      .contains('Детали ингредиента');
  });

  it('should close modal on button click', () => {
    cy.get('[data-test="modal"] button')
      .click();
    cy.get('[data-test="modal"]')
      .should('not.exist');
  });

  it('should drop ingredient to ingredient dropzone', () => {
    cy.get('[data-test="ingredient-card"]')
      .contains('Соус Spicy-X')
      .as('ingredient');
    cy.get('@ingredient')
      .trigger('dragstart');
    cy.get('[data-test="ingredient-dropzone"]')
      .as('ingredient-dropzone')
      .trigger('drop', { force: true });
    cy.get('@ingredient')
      .trigger('dragend');
    cy.get('@ingredient-dropzone')
      .contains('Соус Spicy-X');
  });

  it('should drop bun to bun dropzone', () => {
    cy.get('[data-test="ingredient-card"]')
      .contains('Краторная булка N-200i')
      .as('bun');
    cy.get('@bun')
      .trigger('dragstart');
    cy.get('[data-test="bun-dropzone"]')
      .first()
      .as('bun-dropzone')
      .trigger('drop', { force: true });
    cy.get('@bun')
      .trigger('dragend');
    cy.get('@bun-dropzone')
      .contains('Краторная булка N-200i');
  });

  it('should redirect to login page if user isn\'t logged in', () => {
    cy.get('button')
      .contains('Оформить заказ')
      .click();
    cy.contains('Вход');
  });

  it('should login and then redirect to constructor page', () => {
    cy.get('input[name="email"]')
      .type('jdoe@yahoo.com');
    cy.get('input[name="password"]')
      .type('12345');
    cy.get('button[type="submit"]')
      .click();
    cy.contains('Соберите бургер');
  });

  it('should submit order correctly', () => {
    cy.get('button')
      .contains('Оформить заказ')
      .click();

    cy.wait(5000);

    cy.get('[data-test="modal"]')
      .contains('идентификатор заказа');
  });
});
