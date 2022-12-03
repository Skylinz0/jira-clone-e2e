import { faker } from '@faker-js/faker';

class marilyWorkshop {
    constructor() {
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.issueType = '[data-testid="select:type"]';
        this.submitButton = 'button[type="submit"]';
        this.errorTitle = '.sc-caSCKo';
        this.textSummary = '#form-field-20';
        this.bugtextSummary = '#form-field-32';
        this.issueBacklog = '[data-testid="board-list:backlog';
        this.iconTask = '[data-testid="icon:task"]';
        this.editBug = '[data-testid="select-option:Bug"]';
        this.editReporter = '[data-testid="select:reporterId"]';
        this.reporterRick = '[data-testid="select-option:Pickle Rick"]';
        this.editPriority = '[data-testid="select:priority"]';
        this.editHighest = '[data-testid="select-option:Highest"]';
        this.iconBug = '[data-testid="icon:bug"]';
        this.title = faker.word.adjective();

    }
    getIssueDetailsModal() {
        return cy.get(this.issueDetailsModal);

    }

    selectType() {
        cy.get(this.editType).should('have.text','Task');
        cy.get(this.submitButton).click();      

    }

    errorMessage() {
        cy.get(this.errorTitle).should('have.css','box-shadow').should('contain','none','rgb(225, 60, 60)');

        cy.contains('This field is required').should('not.exist'); 
    }

    selectSummary() {
        cy.get(this.editType).should('have.text','Task');
       
        cy.get(this.textSummary).type(this.title);
        cy.get(this.submitButton).click();   
               
    }

    successfullyCreated() {
        cy.get(this.issueModal).should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist');  
    }

    

    makeBug() {
        cy.get(this.issueType).click('bottomRight');
        cy.get(this.iconBug).should('be.visible');
        cy.get(this.editBug).trigger('mouseover').trigger('click');
        cy.get(this.bugtextSummary).type(this.title);      

    }

    selectReporter() {
        cy.get(this.editReporter).click('bottomRight');
        cy.get(this.reporterRick).click();
        cy.get(this.editReporter).should('have.text', 'Pickle Rick');
    }

    selectPriority() {
        cy.get(this.editPriority).click('bottomRight');
        cy.get(this.editHighest).click(); 
        cy.get(this.editPriority).should('have.text', 'Highest');
        
        cy.get(this.submitButton).click(); 
    }   

    

}
export default new marilyWorkshop();
