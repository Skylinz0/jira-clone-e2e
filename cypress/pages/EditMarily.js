import { faker } from '@faker-js/faker';

class EditMarily {
    constructor() {
        this.issueDetailsModal = '[data-testid="modal:issue-details"]';
        this.modalConfirm = '[data-testid="modal:confirm"]';
        this.editType = '[data-testid="select:type"]';
        this.storyType = '[data-testid="select-option:Story"]';
        this.editStatus = '[data-testid="select:status"]';
        this.statusDone = '[data-testid="select-option:Done"]';
        this.editAssignees = '[data-testid="select:assignees"]';
        this.assigneeLord = '[data-testid="select-option:Lord Gaben"]';
        this.assigneeYoda = '[data-testid="select-option:Baby Yoda"]';
        this.editReporter = '[data-testid="select:reporter"]';
        this.reporterRick = '[data-testid="select-option:Pickle Rick"]';
        this.editPriority = '[data-testid="select:priority"]';
        this.proiorityMedium = '[data-testid="select-option:Medium"]';
        this.textSummary = 'textarea[placeholder="Short summary"]';      
        this.editDescription = '.ql-editor';
        this.trashIcon = '[data-testid="icon:trash"]';
        this.title = faker.word.adjective();
        this.description = faker.hacker.phrase();          
        
       

    } 

    getIssueDetailsModal() {
        return cy.get(this.issueDetailsModal);

    }

    

    selectType() { 
        cy.get(this.editType).click('bottomRight');
        cy.get(this.storyType)
        .trigger('mouseover')
        .trigger('click');
        cy.get(this.editType).should('contain', 'Story');

    }

    selectStatus() {
        cy.get(this.editStatus).click('bottomRight');
        cy.get(this.statusDone).click();
        cy.get(this.editStatus).should('have.text', 'Done');

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

    formUpdate() {
        this.getIssueDetailsModal().within(() => {        
            this.selectType();
            this.selectStatus();
            this.selectAssignees();
            this.selectReporter();
            this.selectPriority();
        }); 

    
    }

    changeTitle() {
        cy.get(this.textSummary).clear().type(this.title).blur();
    }

    changeDescription() {
        cy.get('.ql-snow').click().should('not.exist');
        cy.get(this.editDescription).clear().type(this.description);
        cy.contains('button', 'Save')
        .click()
        .should('not.exist');        

    }
    
    descriptionText() {
        cy.get(this.textSummary).should('have.text',this.title);

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

    validatesDeleteSuccessful() {
              
       this.deleteIssue();
       this.deleteConfirm();
            
    }

    




}

export default new EditMarily();