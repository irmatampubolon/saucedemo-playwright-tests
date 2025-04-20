import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { testData } from './testData';

// Create a type that includes our page objects
type SauceDemoFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: { page: any; context: any; };
};

// Extend basic test fixtures with our custom fixtures
export const test = base.extend<SauceDemoFixtures>({
  // Define all page objects as fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  
  // Create a pre-authenticated context fixture to use in tests that need a logged-in user
  authenticatedPage: async ({ browser }, use) => {
    // Create a new browser context
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Login with standard user
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    
    // Use the authenticated page
    await use({ page, context });
    
    // Clean up after the test
    await context.close();
  },
});

// Re-export expect from the test framework
export { expect } from '@playwright/test';