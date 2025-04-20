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
