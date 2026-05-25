import { defineConfig, devices } from '@playwright/test';

// Shared context settings for all mobile projects
const mobileContextSettings = {
  colorScheme: 'dark' as const,
  geolocation: { longitude: -6.68005, latitude: 53.401108 },
  locale: 'en-GB',
  permissions: ['geolocation', 'notifications'],
  timezoneId: 'Europe/Dublin',
};

const mobileTestConfig = {
  testMatch: '**/sauce/**.spec.ts',
  testIgnore: '**/sauce/seed.spec.ts',
};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Look for test files in the "tests" directory, relative to this configuration file. */
  testDir: 'tests',
  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Each test is given 30 seconds. */
  timeout: 30000,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  
  /* Uncomment and set these paths only if global setup/teardown files exist. */
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
  

  projects: [
  // ── Setup projects ──────────────────────────────────────────
  {
    name: 'mobile-setup',
    testMatch: '**/sauce/login.setup.ts',
  },

  // ── Test projects ───────────────────────────────────────────
  {
    name: 'Android Chrome',
    ...mobileTestConfig,
    use: {
      ...devices['Pixel 5'],
      ...mobileContextSettings,
      storageState: '.auth/user.json',
    },
    dependencies: ['mobile-setup'],
  },
  {
    name: 'iPhone Safari',
    ...mobileTestConfig,
    use: {
      ...devices['iPhone 12'],
      ...mobileContextSettings,
      storageState: '.auth/user.json',
    },
    dependencies: ['mobile-setup'],
  },
],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
