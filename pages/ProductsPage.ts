import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../fixtures/testData';

export class ProductsPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly backToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productPrices = page.locator('.inventory_item_price');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = this.cartLink.locator('.shopping_cart_badge');
    this.backToProductsButton = page.locator('[data-test="back-to-products"]');
  }

  async filterBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async sortByNameAZ() {
    await this.filterBy(testData.sortOptions.nameAZ);
  }

  async sortByNameZA() {
    await this.filterBy(testData.sortOptions.nameZA);
  }

  async sortByPriceLowHigh() {
    await this.filterBy(testData.sortOptions.priceLowHigh);
  }

  async sortByPriceHighLow() {
    await this.filterBy(testData.sortOptions.priceHighLow);
  }

  async addToCart(productName: string) {
    // First try to find the product in the inventory
    const product = this.page.locator('.inventory_item', { hasText: productName });
    
    if (await product.count() > 0) {
      // If on inventory page, click the Add to Cart button for this product
      await product.locator('[data-test^="add-to-cart"]').click();
    } else {
      // If not found, click on product name to go to details page
      await this.page.click(`text=${productName}`);
      await this.page.locator('[data-test^="add-to-cart"]').click();
    }
  }

  async addMultipleToCart(productNames: string[]) {
    for (const productName of productNames) {
      await this.addToCart(productName);
      // If on product details page, go back to products
      if (await this.backToProductsButton.isVisible()) {
        await this.backToProductsButton.click();
      }
    }
  }

  async addRandomProductsToCart(count: number) {
    const allProductNames = await this.productNames.allTextContents();
    const randomProducts: string[] = [];
    
    // Select random products
    while (randomProducts.length < count && randomProducts.length < allProductNames.length) {
      const randomIndex = Math.floor(Math.random() * allProductNames.length);
      const productName = allProductNames[randomIndex];
      
      if (!randomProducts.includes(productName)) {
        randomProducts.push(productName);
      }
    }
    
    // Add selected products to cart
    await this.addMultipleToCart(randomProducts);
    return randomProducts;
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartCount(): Promise<number> {
    try {
      await this.cartBadge.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
      const text = await this.cartBadge.textContent();
      return text ? parseInt(text) : 0;
    } catch (error) {
      // If cart badge doesn't exist, return 0
      return 0;
    }
  }

  async verifyCartCount(expectedCount: number) {
    if (expectedCount === 0) {
      // If count is 0, badge should not be visible
      await expect(this.cartBadge).toHaveCount(0);
    } else {
      // Otherwise verify the badge shows correct count
      await expect(this.cartBadge).toBeVisible();
      const count = await this.getCartCount();
      expect(count).toBe(expectedCount);
    }
  }

  async getAllProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(text => parseFloat(text.replace('$', '')));
  }

  async verifyProductsSortedByNameAZ() {
    const productNames = await this.getAllProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  }

  async verifyProductsSortedByNameZA() {
    const productNames = await this.getAllProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  }

  async verifyProductsSortedByPriceLowHigh() {
    const productPrices = await this.getAllProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  }

  async verifyProductsSortedByPriceHighLow() {
    const productPrices = await this.getAllProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  }
}

