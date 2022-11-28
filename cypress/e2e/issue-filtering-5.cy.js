/**
 * Workshop #16
 * We are locating issues here based on one enter ('multiple assignees')
 * Think and create a loop using "forEach", which would allow us to test multiple enters without creating a new instance of test for that
 * Use object with multiple rows for solving this task.
 *
 * Expected result:
 * 1. You will have object with multiple entries
 * 2. You are running test X amount of times without creating new instance of test (using "it")
 */

describe('Issue filtering', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should filter issues by title', () => {
    getSearchInput().debounced('type', 'multiple assignee');
    cy.get('[data-testid="list-issue"]').should('have.length', '1');
  });

  const dataForSearch = [
    {
      issueName: 'multiple assignees',
      expectedAmountOfIssues: '1',
    },
    {
      issueName: 'you can',
      expectedAmountOfIssues: '2',
    },
    {
      issueName: 'an issue',
      expectedAmountOfIssues: '3',
    }
  ];

  // Task #1 for..of

  for (let issue of dataForSearch) {
    it(`Should filter issues by title: ${issue.issueName}`, () => {
      getSearchInput().debounced('type', issue.issueName);
      cy.get('[data-testid="list-issue"]').should('have.length',issue.expectedAmountOfIssues);
    });
  };

  // Task #2 forEach

  it(`Should filter issues by title: `, () => {
    dataForSearch.forEach(issue => {
      getSearchInput().clear().debounced('type', issue.issueName);
      cy.get('[data-testid="list-issue"]').should('have.length', issue.expectedAmountOfIssues);
    });
  });

  /**
   * New tests can be created here for practice
   * 1. Filter by avatar
   * 2. Filter by "Only My Issues" button
   * 3. Filter by "Recently Updated" button
   */

  function getSearchInput() {
  return cy.get('[data-testid="board-filters"]').find('input');
}
});
