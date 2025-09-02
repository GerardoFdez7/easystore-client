import React from 'react';
import ButtonLoadable from '@atoms/shared/ButtonLoadable';

describe('ButtonLoadable Component', () => {
  beforeEach(() => {
    cy.mount(<ButtonLoadable>Click me</ButtonLoadable>);
  });

  it('should render button with children text', () => {
    cy.get('button').should('contain.text', 'Click me');
  });

  it('should show loading state when isLoading is true', () => {
    cy.mount(<ButtonLoadable isLoading={true}>Loading...</ButtonLoadable>);

    // Should show loader (CartLoader component)
    cy.get('button').should('contain.text', 'Loading...');

    // Should show loading text if provided
    cy.mount(
      <ButtonLoadable isLoading={true} loadingText="Processing...">
        Original Text
      </ButtonLoadable>,
    );
    cy.get('button').should('contain.text', 'Processing...');
  });

  it('should be disabled when loading', () => {
    cy.mount(<ButtonLoadable isLoading={true}>Loading...</ButtonLoadable>);
    cy.get('button').should('be.disabled');
  });

  it('should be disabled when disabled prop is true', () => {
    cy.mount(<ButtonLoadable disabled={true}>Disabled</ButtonLoadable>);
    cy.get('button').should('be.disabled');
  });

  it('should handle click events when not loading', () => {
    const onClickSpy = cy.spy().as('onClickSpy');

    cy.mount(<ButtonLoadable onClick={onClickSpy}>Clickable</ButtonLoadable>);

    cy.get('button').click();
    cy.get('@onClickSpy').should('have.been.calledOnce');
  });

  it('should not handle click events when loading', () => {
    const onClickSpy = cy.spy().as('onClickSpy');

    cy.mount(
      <ButtonLoadable isLoading={true} onClick={onClickSpy}>
        Loading...
      </ButtonLoadable>,
    );

    cy.get('button').click();
    cy.get('@onClickSpy').should('not.have.been.called');
  });

  it('should apply custom loader size', () => {
    cy.mount(
      <ButtonLoadable isLoading={true} loaderSize={20}>
        Loading...
      </ButtonLoadable>,
    );

    // The loader should be visible with custom size
    cy.get('button').should('be.visible');
  });

  it('should maintain button variants and sizes', () => {
    // Test different variants
    cy.mount(
      <ButtonLoadable variant="destructive" size="lg">
        Destructive Button
      </ButtonLoadable>,
    );

    cy.get('button').should('contain.text', 'Destructive Button');
  });

  it('should handle all button props correctly', () => {
    cy.mount(
      <ButtonLoadable
        type="submit"
        className="custom-class"
        data-testid="submit-button"
      >
        Submit
      </ButtonLoadable>,
    );

    cy.get('button').should('have.attr', 'type', 'submit');
    cy.get('button').should('have.class', 'custom-class');
    cy.get('button').should('have.attr', 'data-testid', 'submit-button');
  });
});
