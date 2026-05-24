// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', () => {
  test('Inventory page displays products', async ({ page }) => {
    // Navigate to the inventory page
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.getByText('Products')).toBeVisible();

    // Verify product list and Add to cart actions
    const firstProduct = page.locator('.inventory_item').first();
    await expect(firstProduct).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });
});
