import { test, expect } from '@playwright/test';
import PageManager from '../pages/pageManager';
import User from '../models/User';

test.describe('Register User Test', () => {
  test('Register User Test', async ({ page }) => {
    const testUser = new User();
    const pm = new PageManager(page);
    await pm.qaCartSignUpPage().load();
    await pm.qaCartSignUpPage().signUp(
      testUser.getFirstName(), 
      testUser.getLastName(), 
      testUser.getEmail(), 
      testUser.getPassword());
    await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();
  });

  test('Register User Test using API', async ({ page, request, context }) => {
    const testUser = new User();
    const pm = new PageManager(page);
    await pm.qaCartSignUpPage().signUpUsingApi(testUser,request,context);
    await pm.todoPage().load();
    await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();
  })
})



