
describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it.only('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
        .trigger('mouseover')
        .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');


     
    });
  
    
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  it('Should delete an issue successfully', () => {
    getIssueDetailsModal()
      .find(`button ${'[data-testid="icon:trash"]'}`)
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete issue')
      .click();
    cy.get('[data-testid="modal:confirm"]')
      .should('not.exist');

    cy.contains('This is an issue of type: Task.').should('not.exist');

  });

  //Task #2 

  it('Regex task', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:reporter"]').invoke('text').should('match', /^[A-Za-z]*$/);
    });

  });

  //Task #3

  it('Task Array.length Array.push', () => {
    getIssueDetailsModal();

    const priorityList = ['Lowest', 'Low', 'Medium', 'High']
    let newLenght = priorityList.push('Highest')

    cy.log(newLenght);
    cy.log(priorityList);


  });

  const numberPriorities = 5;

  //Task #4 Another solution
  it(`Check, that priority fields has ${numberPriorities} values`, () => {
    let priorities = [];

    //add already chosen priority to the list
    cy.get('[data-testid="select:priority"]').invoke('text').then((extractedPriority) => {
      priorities.push(extractedPriority);
    })

    //click to open priority dropdown - options
    cy.get('[data-testid="select:priority"]').click();

    //get number of options from the page
    cy.get('[data-select-option-value]').then(($options) => {
      const itemCount = Cypress.$($options).length;
    });
  });








    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
  });

