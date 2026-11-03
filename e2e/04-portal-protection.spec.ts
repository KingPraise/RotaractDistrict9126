import { test, expect } from '@playwright/test';

test.describe('Portal Route Protection & RBAC Guards', () => {
  test('Unauthenticated user navigating to /portal/dashboard redirects to /login', async ({ page }) => {
    // Clear any local storage session before navigation
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Navigate to protected member dashboard
    await page.goto('/portal/dashboard');

    // Should redirect to /login with redirect query param
    await page.waitForURL(/.*login.*redirect=%2Fportal%2Fdashboard|.*login/i);
    await expect(page).toHaveURL(/.*login/i);

    // Verify login form is visible
    const loginHeader = page.locator('text=/Member Portal|Sign In|Welcome Back/i').first();
    await expect(loginHeader).toBeVisible();
  });

  test('Unauthenticated user navigating to /portal/executive redirects to /login', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Navigate to protected executive portal
    await page.goto('/portal/executive');

    // Should redirect to /login
    await page.waitForURL(/.*login.*redirect=%2Fportal%2Fexecutive|.*login/i);
    await expect(page).toHaveURL(/.*login/i);
  });

  test('Non-admin user cannot access executive portal', async ({ page }) => {
    // Set a regular member session in localStorage
    await page.goto('/');
    await page.evaluate(() => {
      const regularMember = {
        uid: 'test-regular-member-001',
        email: 'member@rotaract9126.org',
        firstName: 'Active',
        lastName: 'Member',
        displayName: 'Active Member',
        role: 'member',
        duesStatus: 'cleared',
      };
      localStorage.setItem('district_9126_current_user', JSON.stringify(regularMember));
    });

    // Try navigating to executive HQ
    await page.goto('/portal/executive');

    // Should redirect away to login with unauthorized error
    await page.waitForURL(/.*login\?error=unauthorized|.*login/i);
    await expect(page).toHaveURL(/.*login/i);
  });
});
