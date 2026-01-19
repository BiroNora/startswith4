import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('aa@gmail.com');
  await page.getByLabel('Email').press('Tab');
  await page.getByLabel('Password').fill('12');
  await page.getByLabel('Password').press('Tab');
  await page.getByRole('button', { name: 'Login' }).press('Enter');
  await page.getByRole('link', { name: '☞ Program hozzáadása' }).click();
  await page.getByPlaceholder('Activity').fill('Blablabla');
  await page.getByLabel('Activity Date').fill('2023-12-26T10:00');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('link', { name: '2023-12-26 ☙ Blablabla ❧ 🏠' }).click();
  await page.getByRole('link', { name: '✘ 2023-12-26 ☙ Blablabla' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
});
