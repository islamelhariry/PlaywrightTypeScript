# Sauce Demo App - Basic Operations Test Plan

## Overview
This test plan covers basic operations for the Sauce Demo web application at `https://www.saucedemo.com/`.
The focus is on critical user flows supported by the existing Playwright tests in `tests/sauce/`, including login, inventory interaction, cart operations, and checkout flow.

## Scope
- Login validation with standard user credentials
- Verification of the inventory page after login
- Adding and removing items from the shopping cart
- Cart page validation
- Checkout flow through information entry and order completion

## Out of Scope
- Sauce Labs remote execution configuration
- Mobile-specific views
- Performance and accessibility testing
- Advanced user accounts such as locked_out_user or problem_user

## Test Environment
- Browser projects: `sauce-chromium`, `sauce-firefox`, `sauce-webkit`
- Precondition: authenticated state created by `tests/sauce/login.setup.ts`
- Base URL: `https://www.saucedemo.com/`

## Test Cases

### 1. Login with valid credentials
- Navigate to `https://www.saucedemo.com/`
- Verify the page title contains `Swag Labs`
- Fill `username` with `standard_user`
- Fill `password` with `secret_sauce`
- Click the `login` button
- Verify the inventory page is visible by checking the `Products` header

### 2. Inventory page displays products
- Confirm page has loaded at `/inventory.html`
- Verify the `Products` title is visible
- Verify a list of product cards is displayed
- Verify `Add to cart` button(s) are present for product items

### 3. Add a product to the cart
- From the inventory page, click `Add to cart` for a sample product
- Verify the cart badge count increments
- Verify the cart icon/action is accessible

### 4. View cart contents
- Click the cart icon or cart link
- Verify the cart page displays the selected product(s)
- Confirm item name, description, quantity, and price are visible
- Verify `Checkout` button is present

### 5. Checkout information flow
- On the cart page, click `Checkout`
- Verify the checkout information page is visible
- Fill first name, last name, and postal code
- Continue to the next step
- Verify the overview page shows item summary and total price
- Finish checkout
- Verify the completion message is displayed

### 6. Remove item from cart
- On the inventory or cart page, click `Remove` for an added product
- Verify the cart badge count decrements or disappears
- Verify the item is removed from the cart list

### 7. Logout from the application
- Open the app menu
- Click `Logout`
- Verify the user is returned to the login page
- Confirm login fields are visible again

## Notes
- Existing `tests/sauce/login.setup.ts` saves authentication state to `.auth/user.json`, which is reused by browser projects.
- Existing `tests/sauce/seed.spec.ts` confirms the login flow and initial Products page load.
- `tests/sauce/buy.spec.ts` already demonstrates inventory page navigation and product visibility.
