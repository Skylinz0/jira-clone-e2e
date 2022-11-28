/**
 * Workshop #15
 * 1. Start creating classes for testable objects, such as "Issue"
 * 2. Move test actions into functions as we did on demo previously
 *    2.1 Update issue type, description etc.
 * 3. Use those functions in the spec file
 *
 * Expected result:
 * 1. New class with methods for updating title, description etc.
 * 2. Variables correctly stored
 *    Bonus: used random data generator library (faker.js)
 */

import EditMarily from "../pages/EditMarily";

/**
 * Workshop #16
 * Task #1
 * 1. Look for previously created method for validating information in the field (any field)
 *    1.1 One of them was: cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
 * 2. Define an object with expected information in the style: selector/it's value
 * 3. Update method to go over this object and assert information in the field using "for..of" loop
 *
 * Expected result:
 * 1. You will have defined object with at least priority, status and reporter selectors and their values
 * 2. Your method runs X amount of times and assert information in the field without code duplication
 *
 * Task #2
 * Most of the field in this file are using should('have.text') assertion, however, there are some which uses should('contain')
 * From the previous task expand the solution with "if" check which would allow us to assert using different should assertion but still keep all the code inside one loop without creating separated assertion
 *
 * Expected result:
 * 1. Previously created method will have more selectors included in the object (for example, assignees are added)
 */


 describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  }); 




  it.only('Should update type, status, assignees, reporter, priority successfully', () => {

    EditMarily.formUpdate();
   
    const dataContains  = [ 
      [EditMarily.editType,'Story'],
      [EditMarily.editAssignees, 'Baby Yoda'],
      [IssueEditMarily.editAssignees, 'Lord Gaben']
    ]

    const dataText =  [
      [EditMarily.editStatus, 'Done'],
      [EditMarily.editReporter, 'Pickle Rick'],
      [EditMarily.editPriority, 'Medium']
    ]
    
    //Task 1

    for(const [property, value] of dataContains) {
      cy.get(property).should('contain', value);
    }


    for(const [property, value] of dataText) {
      cy.get(property).should('have.text', value);
    }

    const dataTask2 = [
      [IssueEditMarily.editType, 'Story'],
      [IssueEditMarily.editAssignees, 'Baby Yoda'],
      [IssueEditMarily.editAssignees, 'Lord Gaben'],
      [IssueEditMarily.editStatus, 'Done'],
      [IssueEditMarily.editReporter, 'Pickle Rick'],
      [IssueEditMarily.editPriority, 'Medium']
     
    ]

    //Task #2 
    for (const [property, value] of dataTask2) {
      if (property === IssueEditMarily.editIssueType || property === IssueEditMarily.editAssignees)
        cy.get(property).should('contain', value);
      else cy.get(property).should('have.text', value);
    } 





  });

  it('Should update title, description successfully', () => {
    EditMarily.updateDescriptionTitle();

  });

  it('Should delete an issue successfully', () => {
    EditMarily.validatesDeleteSuccessful();

  });


  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
