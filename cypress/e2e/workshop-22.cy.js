import ThisModal from "../pages/ThisModal";
describe('Issue is create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.wait('@currentUserApiRequest')
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });



  it(' Delete recently created issue ', () => {
    ThisModal.createIssue();
    ThisModal.issueIsCreated();
    ThisModal.deleteIssue();    
    ThisModal.deleteConfirm();
  });

  it('Issue is not deleted and it is still displayed on the board', () => {
    ThisModal.createIssue();
    ThisModal.issueIsCreated();
    ThisModal.selectCancel();

  });








});



