import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/login');
  await page.getByLabel('Email').fill('bb@gmail.com');
  await page.getByLabel('Password').fill('789321-+Lk');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:5173/lists/activities');
});

test('forgot_pw', async ({ page }) => {
  await page.goto('http://localhost:5173/auth/login');
  await page.getByRole('button', { name: 'Forgot Password?' }).click();
  await page.waitForURL('http://localhost:5173/auth/forgot_password');
  await page.getByLabel('Enter your email').fill('mmn@gmail.com');
  await page.getByRole('button', { name: 'Send Request' }).click();
  await page.waitForURL('http://localhost:5173/auth/forgot_password?/forgot');
  page.getByText('Wrong credential.').getAttribute;
});
