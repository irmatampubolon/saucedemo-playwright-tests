import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async completeCheckout(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zipCode);
    await this.page.click('[data-test="continue"]');
    await this.page.click('[data-test="finish"]');
  }
}
