import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  // Elég csak az útvonalat megadni
  await page.goto('/auth/login');
  await page.getByLabel('Email').fill('bb@gmail.com');
  await page.getByLabel('Password').fill('789321-+Lk');
  await page.getByRole('button', { name: 'Login' }).click();
  // Itt is elég az útvonal a waitForURL-nél
  await page.waitForURL('/lists/activities');
});

test('forgot_pw', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByRole('button', { name: 'Forgot Password?' }).click();
  await page.waitForURL('/auth/forgot_password');
  await page.getByLabel('Enter your email').fill('mmn@gmail.com');
  await page.getByRole('button', { name: 'Send Request' }).click();
  await page.waitForURL('/auth/forgot_password?/forgot');
  // Itt egy apró javítás: az expect használata biztosabb
  await expect(page.getByText('Wrong credential.')).toBeVisible();
});
