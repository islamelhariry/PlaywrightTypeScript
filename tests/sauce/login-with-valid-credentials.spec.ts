// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', () => {
  test('Login with valid credentials', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);

    // Fill in credentials and log in
    await page.getByRole('textbox', { name: 'username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'login' }).click();

    // Verify the inventory page is displayed
    await expect(page.getByText('Products')).toBeVisible();
  });
});
