describe("Dashboard Table E2E Tests", () => {
  let postsData;
  beforeEach(() => {
    cy.visit("/data");

    cy.fixture("posts.json").then(function (value) {
      postsData = value;
    });

    cy.viewport(1920, 1080);

    cy.intercept("GET", `${Cypress.env("apiUrl")}/posts*`, function (req) {
      const limit = Number(req.query.limit) || 10;
      const skip = Number(req.query.skip) || 0;

      const sliced = postsData.slice(skip, skip + limit);

      req.reply({
        statusCode: 200,
        body: {
          posts: sliced,
          total: postsData.length,
          limit,
          skip,
        },
      });
    }).as("getPosts");
  });

  it("displays all post titles by search", function () {
    const searchText = "His mother had always taught him";

    cy.get('input[placeholder="Search..."]').type(searchText);

    cy.contains('[data-cy="title"]', searchText).should("be.visible");
  });
  it("displays all post titles by tag", function () {
    const searchText = "The grand ballroom";

    cy.get('[data-cy="tag-select"]').click({ force: true });
    cy.wait(1000);

    cy.get('[role="option"]').contains("grandeur").click();
    cy.get('[data-cy="title"]').should("contain.text", searchText);
  });
});
