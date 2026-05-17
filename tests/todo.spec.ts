import { test, expect } from '@playwright/test';

test('add a todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
});