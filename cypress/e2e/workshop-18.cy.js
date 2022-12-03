/**
 * Workshop 18 practical tasks:
 * 1. Make full page screenshot using chrome devTools
 * 2. For test 'Should create an issue and validate it successfully' in issue-create-2.cy.js
 * log as table all innerText values for '[data-testid="list-issue"]' (hint: user .then just after cy.get)
 * 3. get with JQuery first element with '[data-testid="list-issue"]' locator and its HTML
 * 4. get with JQuery all elements with '[data-testid="list-issue"]' locator
 * 5. More advanced JQuery topic - get all innerText values for all '[data-testid="list-issue"]' elements (hint: use .map and ...)
 */


 describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        cy.wait('@currentUserApiRequest')
        cy.visit(url + '/settings?modal-issue-create=true');
      });
    });

    it('Should create an issue and validate it successfully', () => {
        cy.get('[data-testid="modal:issue-create"]').within(() => {
          cy.get('[data-testid="select:type"]').click('bottomRight');
          cy.get('[data-testid="select-option:Story"]')
              .trigger('mouseover')
              .trigger('click');
    
          cy.get('input[name="title"]').type('TEST_TITLE');
          cy.get('.ql-editor').type('TEST_DESCRIPTION');
          cy.get('[data-testid="select:userIds"]').click('bottomRight');
          cy.get('[data-testid="select-option:Lord Gaben"]').click();
    
          cy.get('button[type="submit"]').click();
        });
    
        cy.get('[data-testid="modal:issue-create"]').should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist');
    
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]').then((elements)=>{
              const something = [...$$('[data-testid="list-issue"]')].map(element => element.innerText)
              console.table(`Something ${something}`)
            })
                .should('have.length', '5')
                .first()
                .find('p')
                .should('have.class', 'sc-kfGgVZ')
                .contains('TEST_TITLE');
            cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
        });
      
    });  