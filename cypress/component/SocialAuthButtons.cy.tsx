import React from 'react';
import { SocialAuthButtons } from '../../app/[locale]/components/molecules/shared/SocialAuthButtons';

describe('SocialAuthButtons Component', () => {
  beforeEach(() => {
    // Mock next-intl using cy.intercept
    cy.intercept('GET', '**/messages/**', {
      statusCode: 200,
      body: {
        registerWithGoogle: 'Register with Google',
        registerWithFacebook: 'Register with Facebook',
      },
    });

    cy.mount(<SocialAuthButtons />);
  });

  it('should render both Google and Facebook auth buttons', () => {
    cy.get('button').should('have.length', 2);
    cy.get('button').first().should('contain.text', 'Register with Google');
    cy.get('button').last().should('contain.text', 'Register with Facebook');
  });

  it('should display correct social media icons', () => {
    // Check Google icon
    cy.get('button')
      .first()
      .find('img')
      .should('have.attr', 'src', '/icon_google.webp');
    cy.get('button')
      .first()
      .find('img')
      .should('have.attr', 'alt', 'Google icon');

    // Check Facebook icon
    cy.get('button')
      .last()
      .find('img')
      .should('have.attr', 'src', '/icon_facebook.webp');
    cy.get('button')
      .last()
      .find('img')
      .should('have.attr', 'alt', 'Facebook icon');
  });

  it('should apply correct styling classes', () => {
    cy.get('button').should('have.class', 'variant-social');
    cy.get('button').should('have.class', 'size-xl');
  });

  it('should handle Google authentication click', () => {
    // Stub window.alert to prevent it from showing during tests
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button').first().click();
    cy.get('@alertStub').should(
      'have.been.calledWith',
      'We are working really hard on this feature!',
    );
  });

  it('should handle Facebook authentication click', () => {
    // Stub window.alert to prevent it from showing during tests
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('button').last().click();
    cy.get('@alertStub').should(
      'have.been.calledWith',
      'We are working really hard on this feature!',
    );
  });

  it('should have correct button layout and spacing', () => {
    // Check container layout
    cy.get('div').first().should('have.class', 'flex');
    cy.get('div').first().should('have.class', 'w-full');
    cy.get('div').first().should('have.class', 'flex-col');
    cy.get('div').first().should('have.class', 'justify-center');
    cy.get('div').first().should('have.class', 'gap-4');
  });

  it('should be responsive on different screen sizes', () => {
    // Test mobile layout
    cy.viewport(375, 667);
    cy.get('div').first().should('have.class', 'flex-col');

    // Test tablet layout
    cy.viewport(768, 1024);
    cy.get('div').first().should('have.class', 'sm:flex-row');

    // Test desktop layout
    cy.viewport(1280, 720);
    cy.get('div').first().should('have.class', 'sm:flex-row');
  });

  it('should maintain button state after clicks', () => {
    // Buttons should remain enabled after clicks
    cy.get('button').first().click();
    cy.get('button').first().should('not.be.disabled');

    cy.get('button').last().click();
    cy.get('button').last().should('not.be.disabled');
  });
});
