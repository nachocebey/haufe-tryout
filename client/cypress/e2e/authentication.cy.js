function signUp(name, email, password) {
  cy.get("#name").type(name);
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit_button").click();
}

function logIn(email, password) {
  cy.get('[data-cypress="loginLink"]').click();
  cy.url().should("include", "/login");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit_button").click();
}

function logOut() {
  cy.get(".links__container").click();
  cy.get(".auth__container").should("exist");
}

describe("Authentication spec", () => {
  beforeEach(() => {
    cy.visit("http://192.168.1.148:5173/");
  });

  it("Sign Up", () => {
    signUp("Test Cypress 1", "TestCypress@test.com", "Test1Test1");

    cy.url().then((url) => {
      if (url.includes("/list")) {
        cy.get(".profile").should("exist");
      } else {
        cy.get(".submit__error").contains("The user already exists");
      }
    });
  });

  it("Log In", () => {
    logIn("TestCypress@test.com", "Test1Test1");
    cy.url().should("include", "/list");
  });

  it("Log Out", () => {
    logOut();
  });
});
