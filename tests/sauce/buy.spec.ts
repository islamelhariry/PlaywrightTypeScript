import { test, expect } from '@playwright/test';

test('do login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Products')).toBeVisible();
});