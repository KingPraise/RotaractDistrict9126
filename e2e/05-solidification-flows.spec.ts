import { test, expect } from '@playwright/test';

test.describe('Solidified Platform Flows (Join Intake, Dues Checkout & Live Portals)', () => {
  test('Prospective member can submit interest form on /join and see confirmation', async ({ page }) => {
    await page.goto('/join?club=RAC%20Ibadan%20Ring%20Road');

    const form = page.getByTestId('join-interest-form');
    await expect(form).toBeVisible();

    await form.locator('input[placeholder="Full Name *"]').fill('Test Prospect Rotaractor');
    await form.locator('input[placeholder="Email Address *"]').fill('prospect.d9126@example.com');
    await form.locator('input[placeholder="Phone / WhatsApp *"]').fill('+2348031234567');
    await form.getByTestId('join-interest-submit').click();

    await expect(page.locator('role=status')).toContainText(/Thank you, Test Prospect Rotaractor/i);
  });

  test('Member can pay ₦7,500 District Dues on /portal/dashboard and status flips to Cleared', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('d9126_opening_scene_seen', 'true');
      const memberSession = {
        uid: 'usr-dues-test-001',
        email: 'duesmember@rotaract9126.org',
        firstName: 'Tolu',
        lastName: 'Ogunlana',
        displayName: 'Tolu Ogunlana',
        role: 'member',
        duesStatus: 'pending',
        clubId: 'rac-ibadan-ring-road',
        clubName: 'RAC Ibadan Ring Road',
      };
      localStorage.setItem('district_9126_current_user', JSON.stringify(memberSession));
    });

    await page.goto('/portal/dashboard');
    await page.getByRole('button', { name: /Dues & Payments/i }).first().click();

    const payBtn = page.getByTestId('pay-district-dues-btn');
    await expect(payBtn).toBeVisible();
    await expect(payBtn).toContainText('7,500');

    await payBtn.click();

    await expect(page.locator('role=status')).toContainText(/Payment verified/i);
    await expect(page.locator('text=2026/2027 District Dues Cleared')).toBeVisible();
  });

  test('President console renders dynamic club roster without hardcoded fake names', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('d9126_opening_scene_seen', 'true');
      localStorage.clear();
      const presidentSession = {
        uid: 'usr-pres-001',
        email: 'president@rotaract9126.org',
        firstName: 'Iyanuoluwa',
        lastName: 'Adaramoye',
        displayName: 'Iyanuoluwa Adaramoye',
        role: 'club_president',
        duesStatus: 'cleared',
        clubId: 'rac-ibadan-ring-road',
        clubName: 'RAC Ibadan Ring Road',
      };
      localStorage.setItem('district_9126_current_user', JSON.stringify(presidentSession));
    });

    await page.goto('/portal/president');
    await expect(page.locator('text=Iyanuoluwa Adaramoye').first()).toBeVisible();

    // Ensure old hardcoded fake names do not appear
    await expect(page.locator('text=Maryam Hassan')).toHaveCount(0);
    await expect(page.locator('text=Chukwuemeka Obi')).toHaveCount(0);
  });
});
