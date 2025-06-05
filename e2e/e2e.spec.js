
import { test, expect } from '@playwright/test';
test.describe('User Management Flow', () => {
  const baseURL = 'http://localhost:5500';
  const testUser = {
    name: 'Test User',
    nickname: 'TU',
    age: '30',
    bio: 'This is a test user.',
  };
  test('Home page loads and shows "Create User" link', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    await expect(page).toHaveTitle(/Users/i); 
    await expect(page.getByRole('link', { name: /Create User/i })).toBeVisible();
  });
  test('Creates a new user', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    await page.click('text=Create User');
    await page.fill('#name', testUser.name);
    await page.fill('#nickname', testUser.nickname);
    await page.fill('#age', testUser.age);
    await page.fill('#bio', testUser.bio);
    await page.click('button:has-text("Save")');
    await expect(page).toHaveURL(`${baseURL}/`);
    await expect(page.locator('.user-list')).toContainText(testUser.name);
  });
  test('Navigates to profile page and sees user info', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    const userLink = page.locator(`a[href^="/user?id="]`, { hasText: testUser.name }).first();
    await userLink.click();
    await expect(page).toHaveURL(/\/user\?id=\d+/);
    await expect(page.locator('body')).toContainText(testUser.name);
    await expect(page.locator('body')).toContainText(testUser.nickname);
    await expect(page.locator('body')).toContainText(testUser.bio);
  });
  test('Edits user via the edit page', async ({ page }) => {
  await page.goto(`${baseURL}/`);
  
  const userItem = page.locator('.user-list li', { hasText: testUser.name }).first();
  
  const editLink = userItem.locator('a.edit-link');
  await editLink.click();
  
  await expect(page).toHaveURL(/\/edit\?id=\d+/);
 
  const updatedBio = 'Updated bio from test.';
  await page.fill('#bio', updatedBio);
  
  await page.click('button.save-button');
  
  await expect(page).toHaveURL(`${baseURL}/`);
  
  const updatedUserItem = page.locator('.user-list li', { hasText: testUser.name }).first();
  const profileLink = updatedUserItem.locator('a').first(); 
  await profileLink.click();
  await expect(page).toHaveURL(/\/user\?id=\d+/);
  
  await expect(page.locator('p', { hasText: 'Bio:' })).toContainText(updatedBio);
});
test('Deletes user from homepage', async ({ page }) => {
    await page.goto(`${baseURL}/`);
    
    const userItem = page.locator('.user-list li', { hasText: testUser.name }).first();
    const deleteButton = userItem.locator('button.delete-button');
    page.once('dialog', dialog => dialog.accept());
    await deleteButton.click();
    await expect(page.locator('.user-list')).not.toContainText(testUser.name);
  });
});

