const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

let baseUrl="https://demoqa.com/";

module.exports = defineConfig({
  "reporter": "@shelex/cypress-allure-plugin/reporter",
  "allure": {
    "resultsDir": "allure-results",
    "disableWebdriverStepsReporting": true,
    "disableWebdriverScreenshotsReporting": true,
    "allureTestOps": {
      "enabled": true,
     // "url": "https://allure.contrust.team/",
     // "projectId": process.env.PROJECT_ID,
     // "token": "glpat-nNUcenB9FfRyKepsHxw1"
    }
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  env: {    
    hideXHR: true
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    defaultCommandTimeout: 15000,
    baseUrl,
    trashAssetsBeforeRuns: true,
    experimentalInteractiveRunEvents: true,
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 10,
    video: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
  },
});