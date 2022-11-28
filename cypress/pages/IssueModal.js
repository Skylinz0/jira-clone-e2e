class IssueModal {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTypeStory = '[data-testid="select-option:Story"]';
        this.title = 'input[name="title"]';
        this.issueDescription = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.assigneeLordGaben = '[data-testid="select-option:Lord Gaben"]';
        this.submitButton = 'button[type="submit"]';
        this.issueBacklog = '[data-testid="board-list:backlog';
        this.issueList = '[data-testid="list-issue"]';
        this.iconStory = '[data-testid="icon:story"]';
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
        cy.get(this.title).type('TEST_TITLE');
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

    boardBacklog() {
        cy.get(this.issueBacklog).should('be.visible').and('have.length', '1').within(() => {
        cy.get(this.issueList)
          .should('have.length', '5')
          .first()
          .find('p')
          .should('have.class', 'sc-kfGgVZ')
          .contains(title); 
        cy.get(this.assigneeLordGaben).should('be.visible');
        cy.get(this.iconStory).should('be.visible');     
   
        });
    }
}

export default new IssueModal();