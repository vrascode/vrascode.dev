import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const edge = process.platform === 'win32' && existsSync('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe');
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3100', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], channel: process.env.PLAYWRIGHT_CHANNEL || (edge ? 'msedge' : undefined) } }],
  webServer: {
    command: `${process.platform === 'win32' ? 'npm.cmd' : 'npm'} run start -- --port 3100`,
    url: 'http://127.0.0.1:3100/en',
    reuseExistingServer: false,
    timeout: 90_000
  }
});
