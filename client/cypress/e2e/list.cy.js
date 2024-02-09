function login(email, password) {
  cy.get('[data-cypress="loginLink"]').click();
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit_button").click();
}

function clickPaginationAndVerify(pageNumber) {
  cy.scrollTo("bottom");
  cy.contains(".pagination span", pageNumber.toString()).click();
  cy.url().should("include", `page=${pageNumber}`);
}

describe("Details list spec", () => {
  beforeEach(() => {
    cy.visit("http://192.168.1.148:5173/");
    login("TestCypress@test.com", "Test1Test1");
  });

  it("Check pagination", () => {
    clickPaginationAndVerify(3);
    cy.get(".card").should("exist");
  });

  it("Check details navigation", () => {
    clickPaginationAndVerify(3);
    cy.get(".card:first").click();
    cy.url().should("include", "details");
  });
});
