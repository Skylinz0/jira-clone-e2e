
import marilyWorkshop from "../pages/marilyWorkshop";

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET', '**/currentUser').as('currentUserApiRequest')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.wait('@currentUserApiRequest')
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });




  // Task nr 1

  it('Create new Issue and validate that system gives error message', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').should('have.text', 'Task')
      cy.get('button[type="submit"]').click();

    });
    marilyWorkshop.errorMessage();
    
  });



  //Task nr 2

  it.only('Create new issue and fill and mandatory fields only', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {        
      cy.get('[data-testid="select:type"]').should('have.text', 'Task')
      cy.get('[data-testid="icon:task"]').should('be.visible');   
      cy.get('[data-testid="form-field:title"]').type(marilyWorkshop.title);
      cy.get('button[type="submit"]').click();
    });
    marilyWorkshop.successfullyCreated();

  });

  // Task nr 3

  it.only('Create issue with type, priority, reporter and fill mandatory filed', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      marilyWorkshop.makeBug();
      chooseReporter("Pickle Rick");
      choosePriority("Highest");

    });

    cy.get('button[type="submit"]').click();

  });

  function chooseReporter(repoterName) {
    cy.get('[data-testid="select:reporterId"]').click('bottomRight');
    cy.get('[data-testid="select-option:' + repoterName + '\"]').click();
    cy.get('[data-testid="select:reporterId"]').should('have.text', repoterName);
  }

  function choosePriority(priorityStatus) {
    cy.get('[data-testid="select:priority"]').click('bottomRight');
    cy.get('[data-testid="select-option:' + priorityStatus + '\"]').click();
    cy.get('[data-testid="select:priority"]').should('have.text', priorityStatus);

  }

    

 


});