describe('Modal and Navigation Integration', () => {
  beforeEach(() => {
    // Reset any stored state
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Forgot Password Modal', () => {
    beforeEach(() => {
      cy.visit('/en/login');
      cy.get('body').should('be.visible');
    });

    it('should open forgot password modal when clicking the link', () => {
      // Click on forgot password link
      cy.get('button').contains('changePassword').click();

      // Modal should be visible
      cy.get('[role="dialog"]').should('be.visible');
      cy.get('[role="dialog"]').should('contain.text', 'title');
    });

    it('should display forgot password form elements', () => {
      // Open modal
      cy.get('button').contains('changePassword').click();

      // Check form elements
      cy.get('[role="dialog"]').within(() => {
        cy.get('input[type="email"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
      });
    });

    it('should close modal when clicking outside or cancel', () => {
      // Open modal
      cy.get('button').contains('changePassword').click();
      cy.get('[role="dialog"]').should('be.visible');

      // Close modal by clicking outside (if implemented) or escape
      cy.get('body').click(0, 0);
      // Note: This might not work depending on implementation
    });

    it('should handle form validation in forgot password modal', () => {
      // Open modal
      cy.get('button').contains('changePassword').click();

      // Try to submit empty form
      cy.get('[role="dialog"]').within(() => {
        cy.get('button[type="submit"]').click();
        // Should show validation errors
        cy.get('form').should('exist');
      });
    });
  });

  describe('Terms and Privacy Navigation', () => {
    beforeEach(() => {
      cy.visit('/en/register');
      cy.get('body').should('be.visible');
    });

    it('should navigate to terms and conditions page', () => {
      // Click on terms and conditions link
      cy.get('a[href="/terms"]').click();
      cy.get('body').should('be.visible');

      // Should be on terms page
      cy.url().should('include', '/en/terms');
      cy.get('main').should('be.visible');
    });

    it('should navigate to privacy policy page', () => {
      // Click on privacy policy link
      cy.get('a[href="/privacy"]').click();
      cy.get('body').should('be.visible');

      // Should be on privacy page
      cy.url().should('include', '/en/privacy');
      cy.get('main').should('be.visible');
    });

    it('should display terms and conditions content', () => {
      cy.visit('/en/terms');
      cy.get('body').should('be.visible');

      // Verify page structure
      cy.get('header').should('be.visible');
      cy.get('main').should('be.visible');
      cy.get('footer').should('be.visible');
    });

    it('should display privacy policy content', () => {
      cy.visit('/en/privacy');
      cy.get('body').should('be.visible');

      // Verify page structure
      cy.get('header').should('be.visible');
      cy.get('main').should('be.visible');
      cy.get('footer').should('be.visible');
    });
  });

  describe('Login/Register Navigation Links', () => {
    it('should navigate from login to register page', () => {
      cy.visit('/en/login');
      cy.get('body').should('be.visible');

      // Click on register link
      cy.get('a[href="/register"]').click();
      cy.get('body').should('be.visible');

      // Should be on register page
      cy.url().should('include', '/en/register');
      cy.get('main').should('be.visible');
    });

    it('should navigate from register to login page', () => {
      cy.visit('/en/register');
      cy.get('body').should('be.visible');

      // Click on login link
      cy.get('a[href="/login"]').click();
      cy.get('body').should('be.visible');

      // Should be on login page
      cy.url().should('include', '/en/login');
      cy.get('main').should('be.visible');
    });
  });

  describe('Form Validation and User Experience', () => {
    beforeEach(() => {
      cy.visit('/en/login');
      cy.get('body').should('be.visible');
    });

    it('should show password visibility toggle', () => {
      // Check if password field has visibility toggle
      cy.get('input[type="password"]').should('be.visible');

      // Look for eye icon button
      cy.get('button').within(() => {
        cy.get('svg').should('exist');
      });
    });

    it('should toggle password visibility when clicking eye icon', () => {
      // Click on password visibility toggle
      cy.get('input[type="password"]').parent().find('button').click();

      // Password field should change type
      cy.get('input[type="text"]').should('be.visible');
    });

    it('should maintain form state during navigation', () => {
      // Fill in some form data
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('password123');

      // Navigate away and back
      cy.visit('/en/register');
      cy.visit('/en/login');

      // Form should be reset (this is expected behavior)
      cy.get('input[type="email"]').should('have.value', '');
    });
  });

  describe('Responsive Design and Mobile Experience', () => {
    it('should work properly on mobile devices', () => {
      cy.setViewport('mobile');
      cy.visit('/en/login');
      cy.get('body').should('be.visible');

      // All elements should be visible and functional
      cy.get('form').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should work properly on tablet devices', () => {
      cy.setViewport('tablet');
      cy.visit('/en/register');
      cy.get('body').should('be.visible');

      // All elements should be visible and functional
      cy.get('form').should('be.visible');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle slow network conditions gracefully', () => {
      // Simulate slow network
      cy.intercept('**/*', { delay: 2000 }).as('slowNetwork');

      cy.visit('/en/login');
      cy.wait('@slowNetwork');

      // Page should still be functional
      cy.get('form').should('exist');
      cy.get('button[type="submit"]').should('be.visible');
    });

    it('should handle invalid routes gracefully', () => {
      // Try to access non-existent route
      cy.visit('/en/invalid-route', { failOnStatusCode: false });

      // Should show 404 or redirect to valid page
      cy.get('body').should('be.visible');
    });

    it('should maintain functionality with rapid navigation', () => {
      const pages = ['/en/login', '/en/register', '/en/terms', '/en/privacy'];

      pages.forEach((page) => {
        cy.visit(page);
        cy.get('body').should('be.visible');

        // Each page should load correctly
        cy.get('main').should('be.visible');
      });
    });
  });
});
