import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test.skip('seed, skip this test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Fill in credentials and log in
    await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'login' }).click();

    // Wait for login to complete
    await expect(page.getByText('Products')).toBeVisible();
  });
});
