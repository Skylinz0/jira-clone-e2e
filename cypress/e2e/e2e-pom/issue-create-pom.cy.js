import IssueModal from "../../pages/IssueModal";

describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
      cy.url().should('eq', 'https://jira.ivorreic.com/').then((url) => {
        cy.wait('@currentUserApiRequest')
        cy.visit(url + '/settings?modal-issue-create=true');
      });
    });
  
    it('Should create an issue and validate it successfully', () => {
        IssueModal.createIssue('TITLE', 'DESCRIPTION');
    });
  });
  