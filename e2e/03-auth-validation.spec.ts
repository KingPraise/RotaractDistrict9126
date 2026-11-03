import { test, expect } from '@playwright/test';

test.describe('Authentication & Form Validation Flows', () => {
  test('Login page renders authentication inputs and handles empty validation', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/.*login/);

    // Assert presence of email and password fields
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Trigger validation with empty inputs
    await submitBtn.click();
    const errorMsg = page.locator('text=/Please fill in all fields|required/i').first();
    await expect(errorMsg).toBeVisible();
  });

  test('Registration page renders input fields and validates password match', async ({ page }) => {
    await page.goto('/register');
    await expect(page).toHaveURL(/.*register/);

    const firstNameInput = page.locator('input[placeholder="Tunde"]');
    const lastNameInput = page.locator('input[placeholder="Asante"]');
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[placeholder="Min. 8 characters"]');
    const confirmInput = page.locator('input[placeholder="Repeat password"]');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(firstNameInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    await firstNameInput.fill('John');
    await lastNameInput.fill('Doe');
    await emailInput.fill('testuser@example.com');
    await passwordInput.fill('Password123');
    await confirmInput.fill('MismatchPassword456');

    await submitBtn.click();
    const errorMsg = page.locator('text=/Passwords do not match|do not match/i').first();
    await expect(errorMsg).toBeVisible();
  });

  test('Forgot password page validates empty email input', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page).toHaveURL(/.*forgot/);

    const emailInput = page.locator('input[type="email"]');
    const submitBtn = page.locator('button[type="submit"]');

    await expect(emailInput).toBeVisible();
    await expect(submitBtn).toBeVisible();

    // Submit without filling email
    await submitBtn.click();
    const errorMsg = page.locator('text=/Please enter your email|required|valid email/i').first();
    await expect(errorMsg).toBeVisible();
  });
});
