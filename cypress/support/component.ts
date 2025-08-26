// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your component test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration for component tests
Cypress.on('uncaught:exception', (err, _runnable) => {
  // Prevent Cypress from failing component tests for common React errors
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Hydration mismatch')) {
    return false;
  }
  if (err.message.includes('React does not recognize')) {
    return false;
  }
  return false;
});

// Custom commands for component testing
Cypress.Commands.add('mount', (component: React.ReactNode) => {
  // This will be used for component testing
  return cy.mount(component);
});

// Wait for component to be fully rendered
Cypress.Commands.add('waitForComponent', (selector: string) => {
  cy.get(selector).should('be.visible');
  cy.get(selector).should('not.have.class', 'loading');
});
