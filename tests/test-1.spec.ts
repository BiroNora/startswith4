import { test, expect } from '@playwright/test';

test.skip('login', async ({ page }) => {
  // Mockoljuk a bejelentkezést
  await page.route('**/auth/login', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ type: 'redirect', location: '/lists/activities' })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('/auth/login');
  await page.getByLabel('Email').fill('bb@gmail.com');
  await page.getByLabel('Password').fill('789321-+Lk');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('/lists/activities');
});

test.skip('forgot_pw', async ({ page }) => {
  // Mockoljuk az elfelejtett jelszót
  await page.route('**/auth/forgot_password*', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          type: 'failure',
          status: 400,
          data: { message: 'Wrong credential.' }
        })
      });
    } else {
      await route.continue();
    }
  });

  await page.goto('/auth/login');
  await page.getByRole('button', { name: 'Forgot Password?' }).click();
  await page.waitForURL('/auth/forgot_password');
  await page.getByLabel('Enter your email').fill('mmn@gmail.com');
  await page.getByRole('button', { name: 'Send Request' }).click();

  // Megvárjuk a hibaüzenetet
  await expect(page.getByText('Wrong credential.')).toBeVisible();
});
