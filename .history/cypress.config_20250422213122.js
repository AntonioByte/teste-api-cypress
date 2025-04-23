const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    reporter: 'mochawesome',
    reporterOptions: {
      
      configFile: 'reporter-config.json',
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});
