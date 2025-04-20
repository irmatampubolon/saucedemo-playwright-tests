import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('invalid_user', 'invalid_pass');
  await expect(page.locator('.error-message-container')).toBeVisible();
});

test('Login with empty username field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', 'secret_sauce');
  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Epic sadface: Username is required');
});

test('Login with empty password field', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', '');
  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Epic sadface: Password is required');
});

test('Login with both fields empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('', '');
  await expect(loginPage.errorMessage).toBeVisible();
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Epic sadface: Username is required');
});
