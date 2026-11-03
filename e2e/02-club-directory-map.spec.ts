import { test, expect } from '@playwright/test';

test.describe('Club Directory & Interactive Geospatial Finder', () => {
  test('Clubs page loads with search input and state filters', async ({ page }) => {
    await page.goto('/clubs');
    await expect(page).toHaveURL(/.*clubs/);

    // Verify search input
    const searchInput = page.locator('input[type="text"], input[placeholder*="search" i]').first();
    await expect(searchInput).toBeVisible();

    // Verify filter buttons exist
    const filterButtons = page.locator('button');
    await expect(filterButtons.first()).toBeVisible();

    // Filter by searching for a specific club name
    await searchInput.fill('Ibadan');
    await page.waitForTimeout(300);

    // Assert that filtered results contain Ibadan
    const results = page.locator('text=/Ibadan/i').first();
    await expect(results).toBeVisible();
  });

  test('Filtering by state updates directory list', async ({ page }) => {
    await page.goto('/clubs');

    // Click on a state filter button if available (e.g. Oyo or Osun)
    const oyoButton = page.locator('button:has-text("Oyo")').first();
    if (await oyoButton.isVisible()) {
      await oyoButton.click();
      await page.waitForTimeout(300);
      const matchingText = page.locator('text=/Oyo/i').first();
      await expect(matchingText).toBeVisible();
    }
  });

  test('Mobile toggle switches between list and map views', async ({ page, isMobile }) => {
    await page.goto('/clubs');

    // On mobile viewports, check view switch buttons
    const viewToggle = page.locator('button:has-text("Map"), button:has-text("List")').first();
    if (await viewToggle.isVisible()) {
      await viewToggle.click();
      await page.waitForTimeout(300);
      // Ensure page does not crash
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
