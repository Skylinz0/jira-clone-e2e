
class ModalBacklog {
    constructor() {
        this.editBacklog = '[data-testid="board-list:backlog"]';
        this.iconClose = '[data-testid="icon:close"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.iconStopwatch = '[data-testid="icon:stopwatch"]';
        this.title = 'input[name="title"]';


    }
    getIssueModal() {
        return cy.get(this.issueModal);
    }



    checkTrackingTime() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.contains("Time spent (hours)").next().get('div:nth-child(2)').should('contain', '');
        cy.get('[data-testid="modal:tracking"]').contains("Done").click();


    }

    selectEstimation() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();          
        cy.contains("Original Estimate (hours)").next().get("div>input[placeholder='Number']").click();
        cy.get("div>input[placeholder='Number']").clear().type('10').click();
        cy.get(`button ${this.iconClose}`).click();
    }

    estimationSuccessful() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.contains("Original Estimate (hours)").next().get("div>input[placeholder='Number']").should('be.visible');

    }



    selectUpdate() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.contains("Original Estimate (hours)").next().get("div>input[placeholder='Number']").click();
        cy.get("div>input[placeholder='Number']").clear().type('20');
        cy.get(`button ${this.iconClose}`).click();
    }

    completedHours2() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get('[data-testid="icon:stopwatch"]').click();       
        cy.contains("Time spent (hours)").next().get('div:nth-child(2)').invoke('val', '20');
        cy.get('[data-testid="modal:tracking"]').contains("Done").click();

    }


    selectRemove() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.contains("Original Estimate (hours)").next().get("div>input[placeholder='Number']").clear();
        cy.get(`button ${this.iconClose}`).click();
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get("div>input[placeholder='Number']").clear().focused().click();
        cy.get(`button ${this.iconClose}`).click();

    }

    removeEstimation() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.contains("Time spent (hours)").next().get('[placeholder="Number"]').should('have.value','');
        cy.get('[data-testid="modal:tracking"]').contains("Done").click();
    }

    selectLogTime() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.contains("Time spent (hours)").get('div:nth-child(2)').should('contain','2');
        cy.contains("Time remaining (hours)").get('div:nth-child(1)').should('contain','5');;   
        cy.get('[data-testid="modal:tracking"]').contains("Done").click();
        cy.contains('“No Time Logged”').should('not.exist');
    }

    removeLogTime() {
        cy.get(this.editBacklog).should('contain', 'This issue for this workshop').click();
        cy.get('[data-testid="icon:stopwatch"]').click();
        cy.get('[data-testid="modal:tracking"]').should('be.visible');
        cy.contains("Time spent (hours)").get('div:nth-child(2)').should('contain','');
        cy.contains("Time remaining (hours)").get('div:nth-child(1)').should('contain','');;   
        cy.get('[data-testid="modal:tracking"]').contains("Done").click();




    }




}
export default new ModalBacklog();