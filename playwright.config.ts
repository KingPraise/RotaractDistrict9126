import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E configuration for Rotaract District 9126
 * Configured for Desktop Chrome/Edge and Mobile Safari (iPhone 13 profile)
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'Desktop Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 13'],
        browserName: 'chromium',
        channel: 'msedge',
      },
    },
  ],
  webServer: {
    command: 'npx next start -p 3100',
    port: 3100,
    reuseExistingServer: true,
    timeout: 60000,
  },
});
