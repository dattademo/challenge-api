const { defineConfig } = require("cypress");
const { getBaseUrl } = require("./cypress/support/environments");
const { getToken } = require("./cypress/support/environments");


const environmentName = process.env.ENV || "dev";   // Default to "dev" if ENV is not set
const resolvedBaseUrl = getBaseUrl(environmentName);
const resolvedToken = getToken(environmentName);

module.exports = defineConfig({
  e2e: {

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
   
    baseUrl: resolvedBaseUrl,
   
    env: {
      environmentName,
      resolvedToken,
    }
  },
});
