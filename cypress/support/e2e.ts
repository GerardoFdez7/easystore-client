// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
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

// Global configuration for all E2E tests
Cypress.on('uncaught:exception', (err, _runnable) => {
  // returning false here prevents Cypress from failing the test
  // for uncaught exceptions in the application
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Hydration mismatch')) {
    return false;
  }
  return false;
});

// Custom viewport sizes for responsive testing
Cypress.Commands.add('setViewport', (size: 'mobile' | 'tablet' | 'desktop') => {
  const sizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1280, height: 720 },
  };
  cy.viewport(sizes[size].width, sizes[size].height);
});

// Wait for page to be fully loaded
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  // Wait a bit for any loading states to complete
  cy.wait(500);
});

// Custom assertion for checking if element is in viewport
Cypress.Commands.add('isInViewport', (selector: string) => {
  cy.get(selector).should('be.visible');
  cy.get(selector).should('not.have.class', 'hidden');
});
