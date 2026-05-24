// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', () => {
  test('View cart contents', async ({ page }) => {
    // Navigate to the inventory page and add a product
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Open the cart page
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);

    // Verify the selected product is visible in the cart
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });
});
