import ThisModal from "../pages/ThisModal";
describe('Issue is create', () => {
  beforeEach(() => {
    cy.visit('/');
    ThisModal.createNewModal();
    ThisModal.createIssue();
    ThisModal.issueIsCreated();
  });



  it(' Delete recently created issue ', () => { 
    ThisModal.deleteIssue();    
    ThisModal.deleteConfirm();
  });

  it('Issue is not deleted and it is still displayed on the board', () => {   
    ThisModal.selectCancel();

  });

  






});



