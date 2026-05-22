import { test, expect } from '@playwright/test';
import path from 'path';

export const AUTH_FILE = path.join(__dirname, '../../.auth/user.json');

test.describe('Sauce Login Setup', () => {

  test('do login then store token', async ({ page }) => {
    // Navigate to the site
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Fill in credentials and log in
    await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'login' }).click();

    // Wait for login to complete
    await expect(page.getByText('Products')).toBeVisible();

    // Save the authenticated state to a file
    await page.context().storageState({ path: AUTH_FILE });
  });

});