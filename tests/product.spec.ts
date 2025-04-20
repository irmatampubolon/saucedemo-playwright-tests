import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Filter products by name (A-Z)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Apply filter by Name (A to Z)
  await productsPage.filterBy('Name (A to Z)');

  const productNames = await page.locator('.inventory_item_name').allTextContents();
  
  // Check if the products are sorted correctly
  const sortedProductNames = [...productNames].sort();
  expect(productNames).toEqual(sortedProductNames);
});

test('Filter products by price (low to high)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Apply filter by Price (low to high)
  await productsPage.filterBy('Price (low to high)');

  const productPrices = await page.locator('.inventory_item_price').allTextContents();

  // Check if the products are sorted by price
  const sortedPrices = [...productPrices].sort((a, b) => parseFloat(a) - parseFloat(b));
  expect(productPrices).toEqual(sortedPrices);
});

test('Filter products by price (high to low)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Apply filter by Price (high to low)
  await productsPage.filterBy('Price (high to low)');

  const productPrices = await page.locator('.inventory_item_price').allTextContents();

  // Check if the products are sorted by price in descending order
  const sortedPrices = [...productPrices].sort((a, b) => parseFloat(b) - parseFloat(a));
  expect(productPrices).toEqual(sortedPrices);
});

test('Filter products by name (Z-A)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Apply filter by Name (Z to A)
  await productsPage.filterBy('Name (Z to A)');

  const productNames = await page.locator('.inventory_item_name').allTextContents();
  
  // Check if the products are sorted correctly in reverse order
  const sortedProductNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedProductNames);
});

test('View product details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Click on product name to view details
  const productName = 'Sauce Labs Backpack';
  await page.locator('.inventory_item_name').getByText(productName).click();
  
  // Check if we are on the details page
  await expect(page.locator('.inventory_details_name')).toContainText(productName);
  await expect(page.locator('.inventory_details_desc')).toBeVisible();
  await expect(page.locator('.inventory_details_price')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
});

test('Back to products from details page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Click on product name to view details
  await page.locator('.inventory_item_name').first().click();
  
  // Click back button
  await page.locator('[data-test="back-to-products"]').click();
  
  // Verify we are back on products page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toContainText('Products');
});

test('Add to cart from product details page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Click on product name to view details
  await page.locator('.inventory_item_name').first().click();
  
  // Add to cart from details page
  await page.locator('data-test="add-to-cart"').click();
  
  // Verify item added to cart
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible();
  expect(await cartBadge.textContent()).toBe('1');
});
