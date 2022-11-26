import { faker } from '@faker-js/faker';

class IssueEditMarily {
    constructor() {
        this.issueDetailsModal = '[data-testid="modal:issue-details"]';
        this.modalConfirm = '[data-testid="modal:confirm"]';
        this.editIssueType = '[data-testid="select:type"]';
        this.issueType = '[data-testid="select-option:Story"]';
        this.issueStatus = '[data-testid="select:status"]';
        this.StatusDone = '[data-testid="select-option:Done"]';
        this.editAssignees = '[data-testid="select:assignees"]';
        this.assigneeLord = '[data-testid="select-option:Lord Gaben"]';
        this.assigneeYoda = '[data-testid="select-option:Baby Yoda"]';
        this.editReporter = '[data-testid="select:reporter"]';
        this.reporterRick = '[data-testid="select-option:Pickle Rick"]';
        this.editPriority = '[data-testid="select:priority"]';
        this.proiorityMedium = '[data-testid="select-option:Medium"]';
        this.issueSummary = 'textarea[placeholder="Short summary"]';      
        this.editIssueDescription = '.ql-editor';
        this.trashIcon = '[data-testid="icon:trash"]';
        this.title = faker.word.adjective();
        this.description = faker.hacker.phrase();          
        
       

    } 

    getIssueDetailsModal() {
        return cy.get(this.issueDetailsModal);

    }

    

    selectIssueTypes() { 
        cy.get(this.editIssueType).click('bottomRight');
        cy.get(this.issueType)
        .trigger('mouseover')
        .trigger('click');
        cy.get(this.editIssueType).should('contain', 'Story');

    }

    selectIssueStatus() {
        cy.get(this.issueStatus).click('bottomRight');
        cy.get(this.StatusDone).click();
        cy.get(this.issueStatus).should('have.text', 'Done');

    }

    selectAssignees() {
        cy.get(this.editAssignees).click('bottomRight');
        cy.get(this.assigneeLord).click();
        cy.get(this.editAssignees).click('bottomRight');
        cy.get(this.assigneeYoda).click();
        cy.get(this.editAssignees).should('contain','Baby Yoda').should('contain','Lord Gaben');


    }
    selectReporter() {
        cy.get(this.editReporter).click('bottomRight');
        cy.get(this.reporterRick).click();
        cy.get(this.editReporter).should('have.text', 'Pickle Rick');
    }

    selectPriority() {
        cy.get(this.editPriority).click('bottomRight');
        cy.get(this.proiorityMedium).click();
        cy.get(this.editPriority).should('have.text', 'Medium');

    }

    issueUpdate() {
        this.getIssueDetailsModal().within(() => {        
            this.selectIssueTypes();
            this.selectIssueStatus();
            this.selectAssignees();
            this.selectReporter();
            this.selectPriority();
        }); 

    
    }

    changeTitle() {
        cy.get(this.issueSummary).clear().type(this.title).blur();
    }

    changeDescription() {
        cy.get('.ql-snow').click().should('not.exist');
        cy.get(this.editIssueDescription).clear().type(this.description);
        cy.contains('button', 'Save')
        .click()
        .should('not.exist');        

    }
    
    descriptionText() {
        cy.get(this.issueSummary).should('have.text',this.title);

    }

    edittextDescription() {
        cy.get('.ql-snow').should('have.text',this.description);
    }

    updateDescriptionTitle() {
        this.getIssueDetailsModal().within(() => {        
            this.changeTitle();
            this.changeDescription();
            this.descriptionText(); 
            this.edittextDescription();
        }); 
        
    
    }

    deleteIssue() {
      cy.get(`button ${this.trashIcon}`)
      .click();

    }
    
    deleteConfirm() {
      cy.get(this.modalConfirm).contains('button', 'Delete issue').click();
      cy.get(this.modalConfirm).should('not.exist');  
      cy.contains('This is an issue of type: Task.').should('not.exist');  

    } 

    issueDeleteSuccessful() {
              
       this.deleteIssue();
       this.deleteConfirm();
            
    }

    




}

export default new IssueEditMarily();