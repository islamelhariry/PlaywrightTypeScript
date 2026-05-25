// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', { annotation: {type: 'Authorization' }}, () => {
  test('Add a product to the cart', async ({ page }) => {
    // Navigate to the inventory page
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    // Add the first product to the cart
    await page.locator('#add-to-cart-sauce-labs-backpack').click();

    // Verify the cart badge count increments
    const cartLink = page.locator('a.shopping_cart_link');
    await expect(cartLink).toHaveText('1');
  });
});
