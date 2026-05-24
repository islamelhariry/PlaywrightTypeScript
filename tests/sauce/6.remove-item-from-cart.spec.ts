// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', { annotation: {type: 'Authorization' }}, () => {
  test('Remove item from cart', async ({ page }) => {
    // Add a product to the cart and navigate to the cart page
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart.html/);

    // Remove the selected product
    await page.locator('button#remove-sauce-labs-backpack').click();

    // Verify the cart is empty and the badge is cleared
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.locator('a.shopping_cart_link')).not.toHaveText('1');
  });
});
