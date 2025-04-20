import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', zipCode);
  }

  async clickContinue() {
    await this.page.click('[data-test="continue"]');
  }

  async clickFinish() {
    await this.page.click('[data-test="finish"]');
  }

  // Complete checkout method for positive cases
  async completeCheckout(firstName: string, lastName: string, zipCode: string) {
    await this.fillCheckoutInfo(firstName, lastName, zipCode);
    await this.clickContinue();
    await this.clickFinish();
  }

}