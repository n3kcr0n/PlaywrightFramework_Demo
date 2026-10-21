import { test, expect } from '@playwright/test';
import PageManager from '../pages/pageManager';
import User from '../models/User';
import QaCartServices from '../api/qaCartServices';

test.describe('Todo Page Tests', () => {  
    test('Create Todo Test via UI', async ({ page }) => {
        const testUser = new User();
        const pm = new PageManager(page);
        await pm.qaCartSignUpPage().load();
        await pm.qaCartSignUpPage().signUp(
            testUser.getFirstName(), 
            testUser.getLastName(), 
            testUser.getEmail(), 
            testUser.getPassword());
        await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();
        await pm.todoPage().addTodo();
        await pm.newTodoPage().createTodo('My First Todo');
        await expect(pm.newTodoPage().getTodo('My First Todo')).toBeVisible();
    });

    test('Delete Todo Test via UI', async ({ page }) => {
        const testUser = new User();
        const pm = new PageManager(page);
        await pm.qaCartSignUpPage().load();
        await pm.qaCartSignUpPage().signUp(
            testUser.getFirstName(), 
            testUser.getLastName(), 
            testUser.getEmail(), 
            testUser.getPassword());
        await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();
        await pm.todoPage().addTodo();
        await pm.newTodoPage().createTodo('My First Todo');
        await expect(pm.newTodoPage().getTodo('My First Todo')).toBeVisible();
        await pm.newTodoPage().deleteTodo('My First Todo');
        await expect(pm.newTodoPage().getTodo('My First Todo')).not.toBeVisible();
    }); 

    test('Create Todo Test via API', async ({ page, request, context }) => {
        const testUser = new User();
        const pm = new PageManager(page);
        const responseStatus = await pm.qaCartSignUpPage().signUpUsingApi(testUser,request,context);
        expect(responseStatus).toBe(201);
        await pm.todoPage().load();
        await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();
        
        const statusCode = await pm.newTodoPage().createTodoViaApi(request, 'My First Todo via API', testUser);
        expect(statusCode).toBe(201);
        await pm.todoPage().load();
        await expect(pm.newTodoPage().getTodo('My First Todo via API')).toBeVisible();
    });


    test('Delete Todo Test via API', async ({ page, request, context }) => {
        const testUser = new User();
        const pm = new PageManager(page);
        const responseStatus = await pm.qaCartSignUpPage().signUpUsingApi(testUser,request,context);
        expect(responseStatus).toBe(201);
        await pm.todoPage().load();
        await expect(pm.todoPage().isWelcomeMessageVisible()).toBeVisible();

        const statusCode = await pm.newTodoPage().createTodoViaApi(request, 'My First Todo via API', testUser);
        expect(statusCode).toBe(201);
        await pm.todoPage().load();
        await expect(pm.newTodoPage().getTodo('My First Todo via API')).toBeVisible();

        const deleteStatusCode = await pm.newTodoPage().deleteTodoViaApi(request, testUser);
        expect(deleteStatusCode).toBe(200);
        await pm.todoPage().load();
        await expect(pm.newTodoPage().getTodo('My First Todo via API')).not.toBeVisible();
    });
})
