import { test, expect } from '@playwright/test';
import PageManager from '../pages/pageManager';
import { getDecryptedEnv } from '../configurations/credentials';

test.beforeEach('Login Valid User', async ({ page }) =>{
    const pm = new PageManager(page);
    await pm.sauceDemoPage().loadLoginPage()
    await pm.sauceDemoPage().login(
        getDecryptedEnv('SAUCEDEMO_USER'),
        getDecryptedEnv('SAUCEDEMO_PASSWORD')
    );
    expect(await pm.sauceDemoPage().isLoginSuccessful()).toBeVisible();
})

test.describe('E2E Tests', () => {
    test('E2E Test', async({page})=>{
        const product = 'Sauce Labs Onesie';
        const pm = new PageManager(page);
        await pm.sauceDemoPage().addToCart(product)
        const cartContent =  await pm.sauceDemoPage().getCartIconContent();
        expect(cartContent).toEqual('1')

        await pm.sauceDemoPage().clickCart();
        expect(page.waitForURL(await pm.sauceDemoPage().getCartPath()))
        expect(await pm.sauceDemoPage().verifyCartItem(product)).toBeTruthy();

        await pm.sauceDemoPage().clickCheckoutBtn();
        expect(page.waitForURL(await pm.sauceDemoPage().getCheckoutPath()))

        await pm.sauceDemoPage().fillCheckoutForm('John','Doe','54321');
        expect(page.waitForURL(await pm.sauceDemoPage().getCheckoutOverviewPath()));
        expect(await pm.sauceDemoPage().verifyCartItem(product)).toBeTruthy();

        await pm.sauceDemoPage().finishCheckOut();
        await expect(pm.sauceDemoPage().completeCheckoutHeader).toBeVisible();
        await expect((pm.sauceDemoPage().completeCheckoutMessage)).toContainText('Thank you for your order!');
        
    })
})