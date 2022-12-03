
 import marilyWorkshop from "../pages/marilyWorkshop";

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('GET','**/currentUser').as('currentUserApiRequest')
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.wait('@currentUserApiRequest')
      cy.visit(url + '/settings?modal-issue-create=true');
    });
  });

 


    // Task nr 1

    it('Create new Issue and validate that system gives error message', () => {
        cy.get('[data-testid="modal:issue-create"]').within(() => {
            cy.get('[data-testid="select:type"]').should('have.text','Task')
            cy.get('button[type="submit"]').click();                   
            
        }); 
        cy.get('.sc-caSCKo').should('have.css','box-shadow').should('contain','none','rgb(225, 60, 60)');

        cy.contains('This field is required').should('not.exist'); 
                     
               
    });

    

    //Task nr 2

    it('Create new issue and fill and mandatory fields only', () => {
      cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get('[data-testid="select:type"]').should('have.text','Task')
        cy.get('[data-testid="icon:task"]').should('be.visible');
        cy.get('#form-field-20').type(marilyWorkshop.title);
        cy.get('button[type="submit"]').click();     
      }); 
      cy.get('[data-testid="modal:issue-create"]').should('not.exist');
      cy.contains('Issue has been successfully created.').should('not.exist');

      
      
    });  

    // Task nr 3

    it('Create issue with type, priority, reporter and fill mandatory filed', () => {
      cy.get('[data-testid="modal:issue-create"]').within(() => {
        cy.get('[data-testid="select:type"]').click('bottomRight');
        cy.get('[data-testid="icon:bug"]').should('be.visible');  
        cy.get('[data-testid="select-option:Bug"]')
          .trigger('mouseover')
          .trigger('click');
        
        cy.get('#form-field-32').type(marilyWorkshop.title);  

        cy.get('[data-testid="select:reporterId"]').click('bottomRight');
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
        cy.get('[data-testid="select:reporterId"]').should('have.text', 'Pickle Rick');

        cy.get('[data-testid="select:priority"]').click('bottomRight');
        cy.get('[data-testid="select-option:Highest"]').click(); 
        cy.get('[data-testid="select:priority"]').should('have.text', 'Highest');        
         
      

      });

      cy.get('button[type="submit"]').click(); 
      
    });




    
});