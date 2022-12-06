

class ThisModal {
    constructor() {      
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTypeStory = '[data-testid="select-option:Story"]';
        this.title = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.assigneeLordGaben = '[data-testid="select-option:Lord Gaben"]';
        this.submitButton = 'button[type="submit"]';
        this.issueBacklog = '[data-testid="board-list:backlog"]';
        this.issueList = '[data-testid="list-issue"]';
        this.iconStory = '[data-testid="icon:story"]';
        this.trashIcon = '[data-testid="icon:trash"]';
        this.modalConfirm = '[data-testid="modal:confirm"]';
        this.iconClose = '[data-testid="icon:close"]';

    }

    getIssueModal() {
        return cy.get(this.issueModal);
    }

    selectIssueType() {
        cy.get(this.issueType).click('bottomRight');
        cy.get(this.issueTypeStory)
            .trigger('mouseover')
            .trigger('click');
    }

    editTitle() {
        cy.get(this.title).type('Delete this issue for this workshop');
    }
    
    editDescription() {
        cy.get(this.issueDescription).type('TEST_DESCRIPTION');
    }

    selectAssignee() {
        cy.get(this.assignee).click('bottomRight');
        cy.get(this.assigneeLordGaben).click();  
    }    

    createIssue(title, description) {
        this.getIssueModal().within(() => {
            this.selectIssueType();
            this.editTitle(title);
            this.editDescription(description);
            this.selectAssignee();
            cy.get(this.submitButton).click();
        });
    }

    issueIsCreated() {
        cy.get(this.issueModal).should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist');  
    }

    
    deleteIssue() {
        cy.get(this.issueBacklog).should('contain','Delete this issue for this workshop').click();
        cy.get(`button ${this.trashIcon}`)
        .click();
  
      }

    deleteConfirm() {
        cy.get(this.modalConfirm).contains('button', 'Delete issue').click();
        cy.get(this.modalConfirm).should('not.exist');  
        cy.contains(this.title).should('not.exist'); 
  
    } 

    selectCancel() {
        cy.get(this.issueBacklog).should('contain','Delete this issue for this workshop').click();
        cy.get(`button ${this.trashIcon}`).click();
        
        cy.get(this.modalConfirm).contains('button', 'Cancel').click();
        cy.get(`button ${this.iconClose}`)
        .click();
        
    }

        
    
    

    


}
export default new ThisModal();