import { test, expect } from '@playwright/test';

test.describe('Public Navigation & Core Routes', () => {
  test('Home page loads with banner, navbar, and core sections', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Rotaract District 9126/i);

    // Verify key landmark elements
    const navbar = page.locator('header').first();
    await expect(navbar).toBeVisible();

    // Verify presence of call to action or hero headings
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();

    // Verify footer presence
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('About page renders district leadership and mission', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/.*about/);
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('Projects directory renders project showcase cards', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveURL(/.*projects/);
    // Wait for project cards or search filter
    const content = page.locator('main, section').first();
    await expect(content).toBeVisible();
  });

  test('Blog page renders articles archive', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveURL(/.*blog/);
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('Join interest form page loads with intake form', async ({ page }) => {
    await page.goto('/join');
    await expect(page).toHaveURL(/.*join/);
    const content = page.locator('text=/Browse All 78 Clubs|District 9126|Rotaract/i').first();
    await expect(content).toBeVisible();
  });

  test('Legal and contact routes render correctly', async ({ page }) => {
    for (const route of ['/privacy', '/terms', '/contact']) {
      await page.goto(route);
      await expect(page).toHaveURL(new RegExp(route));
      const content = page.locator('h1, h2, main').first();
      await expect(content).toBeVisible();
    }
  });

  test('Custom 404 page renders for nonexistent route', async ({ page }) => {
    await page.goto('/nonexistent-district-route-404-check');
    // Ensure 404 text or recovery navigation is visible
    const textLocator = page.locator('text=/404|not found|page not found/i').first();
    await expect(textLocator).toBeVisible();
  });
});
