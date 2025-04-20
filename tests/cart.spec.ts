import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test('Add product to cart and checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.goToCart();
  await cartPage.checkout();
  // Add more checkout validation logic here
});

test('Add a product to cart and check cart counter', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Navigate to the login page and login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Wait for the cart link to be visible (even if there's no badge)
  const cartLink = page.locator('.shopping_cart_link');
  await expect(cartLink).toBeVisible({ timeout: 5000 });

  // At this point, cart count should be 0, so the badge might not be visible
  const cartBadge = cartLink.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveCount(0); // Make sure the badge is not present initially

  // Add a product to the cart
  await productsPage.addToCart('Sauce Labs Backpack');

  // Now, wait for the cart badge to be visible and check the count
  const updatedCartBadge = page.locator('.shopping_cart_badge');
  await expect(updatedCartBadge).toBeVisible({ timeout: 5000 });

  // Get the updated cart count and assert it's now 1
  const updatedCartCountText = await updatedCartBadge.textContent();
  const updatedCartCount = updatedCartCountText ? parseInt(updatedCartCountText) : 0;

  // Assert that the cart count is updated correctly
  expect(updatedCartCount).toBe(1);
});

test('Add multiple products to cart and check cart counter', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // Navigate to the login page and login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  // Wait for the cart link to be visible
  const cartLink = page.locator('.shopping_cart_link');
  await expect(cartLink).toBeVisible({ timeout: 5000 });

  // Array of product names to add to the cart
  const productsToAdd = [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
  ];

  // Add each product to the cart and verify the cart count dynamically
  for (let i = 0; i < productsToAdd.length; i++) {
    // Add the product to the cart
    await productsPage.addToCart(productsToAdd[i]);

    // Wait for the cart badge to be visible
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible({ timeout: 5000 });

    // Get the updated cart count
    const updatedCartCountText = await cartBadge.textContent();
    const updatedCartCount = updatedCartCountText ? parseInt(updatedCartCountText) : 0;

    // Verify that the cart count matches the expected count
    expect(updatedCartCount).toBe(i + 1);
  }
});

test('Remove item from cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login and add product to cart
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  
  // Verify item was added to cart
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible({ timeout: 5000 });
  expect(await cartBadge.textContent()).toBe('1');
  
  // Go to cart page
  await productsPage.goToCart();
  
  // Verify item is in cart
  await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  
  // Remove item from cart
  await cartPage.removeItem('Sauce Labs Backpack');
  
  // Verify item was removed and cart is empty
  await expect(page.locator('.inventory_item_name')).toHaveCount(0);
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

test('Continue shopping from cart page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login and add product to cart
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.addToCart('Sauce Labs Backpack');
  
  // Go to cart
  await productsPage.goToCart();
  
  // Click continue shopping
  await cartPage.continueShopping();
  
  // Verify we're back at the products page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toContainText('Products');
});

test('Add multiple items to cart and remove one', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  
  // Add multiple items
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.addToCart('Sauce Labs Bike Light');
  
  // Verify cart count
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toBeVisible({ timeout: 5000 });
  expect(await cartBadge.textContent()).toBe('2');
  
  // Go to cart
  await productsPage.goToCart();
  
  // Remove one item
  await cartPage.removeItem('Sauce Labs Backpack');
  
  // Verify count updated and correct item remains
  await expect(cartBadge).toBeVisible({ timeout: 5000 });
  expect(await cartBadge.textContent()).toBe('1');
  await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Bike Light');
  await expect(page.locator('.inventory_item_name')).not.toContainText('Sauce Labs Backpack');
});