import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Filter products by name (A-Z)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Apply filter by Name (A-Z)
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
