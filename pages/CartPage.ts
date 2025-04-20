import { Page } from '@playwright/test';


export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
  }

  async removeItem(itemName: string) {
    // Convert item name to lowercase and replace spaces with hyphens for the button ID format
    const formattedName = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.page.click(`[data-test="remove-${formattedName}"]`);
  }

  async continueShopping() {
    await this.page.click('[data-test="continue-shopping"]');
  }
}