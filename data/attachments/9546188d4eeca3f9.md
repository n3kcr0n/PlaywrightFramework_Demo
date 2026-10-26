# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: swagE2e.spec.ts >> E2E Tests >> E2E Test
- Location: tests/swagE2e.spec.ts:16:9

# Error details

```
Error: expect(received).toBeTruthy()

Received: undefined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - banner [ref=e5]:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - button "Open Menu" [ref=e8] [cursor=pointer]
          - img "Open Menu" [ref=e9]
        - generic [ref=e10]: Swag Labs
        - button "Cart, 1 items" [ref=e13]:
          - generic [ref=e14]: "1"
      - generic [ref=e15]: Your Cart
    - main [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - generic [ref=e20]: QTY
          - generic [ref=e21]: Description
          - generic [ref=e22]:
            - generic [ref=e23]: "1"
            - generic [ref=e24]:
              - button "View details for Sauce Labs Onesie" [ref=e25] [cursor=pointer]:
                - generic [ref=e26]: Sauce Labs Onesie
              - generic [ref=e27]: Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.
              - generic [ref=e28]:
                - generic [ref=e29]: $7.99
                - button "Remove" [ref=e30] [cursor=pointer]
        - generic [ref=e31]:
          - button "Continue Shopping" [ref=e32] [cursor=pointer]
          - button "Checkout" [ref=e33] [cursor=pointer]
  - contentinfo [ref=e34]:
    - list [ref=e35]:
      - listitem [ref=e36]:
        - link "X" [ref=e37] [cursor=pointer]:
          - /url: https://x.com/saucelabs
      - listitem [ref=e38]:
        - link "Facebook" [ref=e39] [cursor=pointer]:
          - /url: https://www.facebook.com/saucelabs
      - listitem [ref=e40]:
        - link "LinkedIn" [ref=e41] [cursor=pointer]:
          - /url: https://www.linkedin.com/company/sauce-labs/
    - generic [ref=e42]: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import PageManager from '../pages/pageManager';
  3  | import { getDecryptedEnv } from '../configurations/credentials';
  4  | 
  5  | test.beforeEach('Login Valid User', async ({ page }) =>{
  6  |     const pm = new PageManager(page);
  7  |     await pm.sauceDemoPage().loadLoginPage()
  8  |     await pm.sauceDemoPage().login(
  9  |         getDecryptedEnv('SAUCEDEMO_USER'),
  10 |         getDecryptedEnv('SAUCEDEMO_PASSWORD')
  11 |     );
  12 |     expect(await pm.sauceDemoPage().isLoginSuccessful()).toBeVisible();
  13 | })
  14 | 
  15 | test.describe('E2E Tests', () => {
  16 |     test('E2E Test', async({page})=>{
  17 |         const product = 'Sauce Labs Onesie';
  18 |         const pm = new PageManager(page);
  19 |         await pm.sauceDemoPage().addToCart(product)
  20 |         const cartContent =  await pm.sauceDemoPage().getCartIconContent();
  21 |         expect(cartContent).toEqual('1')
  22 | 
  23 |         await pm.sauceDemoPage().clickCart();
> 24 |         expect(await page.waitForURL(await pm.sauceDemoPage().getCartPath())).toBeTruthy();
     |                                                                               ^ Error: expect(received).toBeTruthy()
  25 |         expect(await pm.sauceDemoPage().verifyCartItem(product)).toBeTruthy();
  26 | 
  27 |         await pm.sauceDemoPage().clickCheckoutBtn();
  28 |         expect(await page.waitForURL(await pm.sauceDemoPage().getCheckoutPath()))
  29 | 
  30 |         await pm.sauceDemoPage().fillCheckoutForm('John','Doe','54321');
  31 |         expect(await page.waitForURL(await pm.sauceDemoPage().getCheckoutOverviewPath())).toBeTruthy();
  32 |         expect(await pm.sauceDemoPage().verifyCartItem(product)).toBeTruthy();
  33 | 
  34 |         await pm.sauceDemoPage().finishCheckOut();
  35 |         await expect(pm.sauceDemoPage().completeCheckoutHeader).toBeVisible();
  36 |         await expect((pm.sauceDemoPage().completeCheckoutMessage)).toContainText('Thank you for your order!');
  37 |         
  38 |     })
  39 | })
```