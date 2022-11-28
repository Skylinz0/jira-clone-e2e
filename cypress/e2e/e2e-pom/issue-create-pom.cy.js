import IssueModal from "../../pages/IssueModal";

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.wait('@currentUserApiRequest')
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });

    const issueDetails = {
      title: "TEST_TITLE",
      type: "Bug",
      description: "TEST_DESCRIPTION",
      assignee: "Lord Gaben",
    };

    const expectedAmountOfIssues = '5';
  
    it('Should create an issue and validate it successfully', () => {
        IssueModal.createIssue(issueDetails);
        IssueModal.issueIsCreated(expectedAmountOfIssues, issueDetails);
    });
  });
  