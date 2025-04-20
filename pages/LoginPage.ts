import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../fixtures/testData';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('.error-message-container');
  }

  async goto() {
    await this.page.goto(testData.urls.base);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAsStandardUser() {
    await this.login(testData.users.standard.username, testData.users.standard.password);
  }

  async loginAsUser(userType: 'standard' | 'locked' | 'problem' | 'performance') {
    const user = testData.users[userType];
    await this.login(user.username, user.password);
  }

  async getErrorMessage(): Promise<string | null> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return await this.errorMessage.textContent();
    } catch (error) {
      return null;
    }
  }

  async verifyAtLoginPage() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(testData.urls.inventory);
  }
}
