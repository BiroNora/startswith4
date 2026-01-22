import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aa@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Charts ▾' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'School/Event Table' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Confirm' }).click();
  await page1.getByText('Select School Region ALLBudapest Dél-Alföld Dél-Dunántúl Észak-Alföld Észak-').click();
  await page1.getByLabel('Select Event Semester').selectOption('SPRING');
  await page1.getByRole('button', { name: 'Confirm' }).click();
});
