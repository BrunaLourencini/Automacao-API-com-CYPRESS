const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      apiUrl: 'http://localhost:3333'
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
      // implement node event listeners here
    },
  },
});
