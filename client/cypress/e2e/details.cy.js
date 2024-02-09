function login(email, password) {
  cy.get('[data-cypress="loginLink"]').click();
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit_button").click();
}

function clickFirstElementOnPage3() {
  cy.scrollTo("bottom");
  cy.contains(".pagination span", "3").click();
  cy.url().should("include", "page=3");
  cy.get(".card:first").click();
  cy.url().should("include", "details");
}

describe("Favorite should show after click", () => {
  it("Check details favorite click", () => {
    cy.visit("http://192.168.1.148:5173/");
    login("TestCypress@test.com", "Test1Test1");
    clickFirstElementOnPage3();

    cy.get("svg#favorite").click();
    cy.go(-1);
    cy.get(".card:first").find('div:contains("⭐️")').should("exist");
  });
});

describe("List item contains ⭐️ after favorite selected", () => {
  it("Check details favorite click", () => {
    cy.visit("http://192.168.1.148:5173/");
    login("TestCypress@test.com", "Test1Test1");
    clickFirstElementOnPage3();

    cy.get("#favorite").click();
    cy.get("#favorite").should("have.class", "favorite");
  });
});
