// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import React from 'react';
import 'cypress';

declare module 'cypress' {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.getByTestId('submit-button')
     */
    getByTestId(testId: string): Chainable;

    /**
     * Custom command to wait for a specific element to be visible and clickable.
     * @example cy.waitForElement('[data-testid="submit-button"]')
     */
    waitForElement(selector: string): Chainable;

    /**
     * Custom command to login with test credentials.
     * @example cy.login()
     */
    login(): Chainable;

    /**
     * Custom command to navigate to a specific route.
     * @example cy.navigateTo('/dashboard')
     */
    navigateTo(route: string): Chainable;

    /**
     * Custom command to check if element has specific text content.
     * @example cy.shouldHaveText('[data-testid="title"]', 'Expected Text')
     */
    shouldHaveText(selector: string, text: string): Chainable;

    /**
     * Custom command to set viewport size for responsive testing.
     * @example cy.setViewport('mobile')
     */
    setViewport(size: 'mobile' | 'tablet' | 'desktop'): Chainable;

    /**
     * Custom command to mount React components for testing.
     * @example cy.mount(<MyComponent />)
     */
    mount(component: React.ReactNode): Chainable;
  }
}

// Custom command to select elements by data-testid
Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Custom command to wait for element to be ready
Cypress.Commands.add('waitForElement', (selector: string) => {
  return cy.get(selector).should('be.visible').should('not.be.disabled');
});

// Custom command for login (placeholder for now)
Cypress.Commands.add('login', () => {
  // This will be implemented based on your auth system
  cy.visit('/en/login');
  // Add login logic here when auth is implemented
});

// Custom command for navigation
Cypress.Commands.add('navigateTo', (route: string) => {
  // Ensure route starts with locale if not already present
  const fullRoute = route.startsWith('/en/') ? route : `/en${route}`;
  cy.visit(fullRoute);
  // Wait for page to be ready
  cy.get('body').should('be.visible');
});

// Custom command to check text content
Cypress.Commands.add('shouldHaveText', (selector: string, text: string) => {
  return cy.get(selector).should('contain.text', text);
});

export {};
