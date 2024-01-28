import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/sign-up');
});

test.describe('sign up', () => {
  test('should fill sign up form', async ({ page }) => {
    expect(await page.isVisible('text=Sign Up')).toBeTruthy();

    const firstName = page.getByTestId('first-name');
    await firstName.fill('John');

    const lastName = page.getByTestId('last-name');
    await lastName.fill('Doe');

    const email = page.getByTestId('email');
    await email.fill('a@a.com');

    const submit = page.getByTestId('submit-button');

    expect(await submit.isEnabled()).toBeTruthy();
  });

  test.skip('accessible forms pass axe', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
