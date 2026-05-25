// spec: specs/sauce-app-basic-operations.testplan.md
import { test, expect } from '@playwright/test';

test.describe('Sauce Demo App - Basic Operations', { annotation: {type: 'Authorization' }}, () => {
  test('Checkout information flow', async ({ page }) => {
    // Add a product to the cart and go to checkout
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('a.shopping_cart_link').click();
    await page.locator('button#checkout').click();

    // Fill checkout information and continue
    await page.locator('input#first-name').fill('Test');
    await page.locator('input#last-name').fill('User');
    await page.locator('input#postal-code').fill('90210');
    await page.locator('input#continue').click();

    // Verify overview page and complete the order
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();

    // Confirm order completion message
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
