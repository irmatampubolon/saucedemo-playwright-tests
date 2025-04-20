import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Complete checkout process', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.completeCheckout('John', 'Doe', '12345');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
});

test('Checkout with empty first name field', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  
  // Fill form with empty first name but valid other fields
  await checkoutPage.fillCheckoutInfo('', 'Doe', '12345');
  await checkoutPage.clickContinue();
  
  // Verify error message
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('First Name is required');
});

test('Checkout with empty last name field', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  
  // Fill form with empty last name but valid other fields
  await checkoutPage.fillCheckoutInfo('John', '', '12345');
  await checkoutPage.clickContinue();
  
  // Verify error message
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Last Name is required');
});

test('Checkout with empty postal code field', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  
  // Fill form with empty postal code but valid other fields
  await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
  await checkoutPage.clickContinue();
  
  // Verify error message
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Postal Code is required');
});

test('Checkout with all empty fields', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  
  // Fill form with all empty fields
  await checkoutPage.fillCheckoutInfo('', '', '');
  await checkoutPage.clickContinue();
  
  // Verify error message
  const errorMessage = page.locator('[data-test="error"]');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('First Name is required');
});