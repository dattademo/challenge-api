import { endpoints } from "../support/endpoints";
import { updateUser } from "../support/testData";
import { STATUS } from "../support/testData";

const TOKEN = Cypress.env("resolvedToken");

context("Get Users", () => {
  it("Get the first active user", () => {
    // Set the status to filter: ACTIVE or INACTIVE
    const STATUS_TO_FILTER = STATUS.ACTIVE;

    // Get the list of users with the specified status to avoid browsing the entire list
    cy.request(
      {
        method: "GET",
        url: endpoints.users,
        headers: {
          Authorization: TOKEN,
        },
        qs: {
          status: STATUS_TO_FILTER
        }
      }

    ).then((response) => {

      expect(response.status).to.eq(200);

      // Get the id of the first user from the list
      const userId = response.body.data.at(0)?.id;

      // If there is an active user, check its details
      // If there is no active user, throw an error
      if (userId) {
        cy.request(
          {
            method: "GET",
            url: `${endpoints.users}/${userId}`,
            headers: {
              Authorization: TOKEN,
            },
          }
        ).then((userResponse) => {

          // Check if the response status is 200 for the user details
          expect(userResponse.status).to.eq(200);

          // Check if the status of the user is the same as the one we filtered
          expect(userResponse.body.data.status).to.equal(STATUS_TO_FILTER);

        });
      } else {
        // Return an error if no active user is found
        throw new Error(`No active user found on current list with status "${STATUS_TO_FILTER}"`);
      }
    });
  });
});


context("Update Users", () => {
  let originalUserData;
  let userId;

  before(() => {
    cy.log("Get the first user from the list and keep the original data");
    cy.request({
      method: "GET",
      url: endpoints.users,
      headers: {
        Authorization: TOKEN,
      },
    }).then((response) => {

      // Get the first user from the list
      userId = response.body.data.at(0).id;

      // Keep the original data of the user to restore it later
      return cy.request({
        method: "GET",
        url: `/users/${userId}`,
        headers: {
          Authorization: TOKEN,
        },
      }).then((response) => {
        originalUserData = response.body.data;
      });
    });
  });

  it("Update: Name, Email and Status", () => {
    if (userId) {
      cy.request({
        method: "PATCH",
        url: `${endpoints.users}/${userId}`,
        headers: {
          Authorization: TOKEN,
        },
        body: updateUser,
      }).then((response) => {

        // Check if the response status is 200 for the user details
        expect(response.status).to.eq(200);
        // Check if the name of the user is the same as the one we filtered
        expect(response.body.data.name).to.equal(updateUser.name);
        // Check if the email of the user is the same as the one we filtered
        expect(response.body.data.email).to.equal(updateUser.email);
        // Check if the status of the user is the same as the one we filtered
        expect(response.body.data.status).to.equal(updateUser.status);
      });

    } else {
      // Return an error if no user is found
      throw new Error(`No user found on current list`);
    };

  });


  after(() => {
    cy.log("Restoring original user data");
    cy.request({
      method: "PATCH",
      url: `${endpoints.users}/${userId}`,
      headers: {
        Authorization: TOKEN,
      },
      body: {
        name: originalUserData.name,
        email: originalUserData.email,
        status: originalUserData.status
      }
    }).then((response) => {
      expect(response.status).to.eq(200);

    });

  });

});