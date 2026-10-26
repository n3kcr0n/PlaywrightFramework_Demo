import { Locator, Page } from "@playwright/test";
import { step } from "../utils/testStepDecorator";
import { getEnv } from "../configurations/testConfigurations";


export default class SauceDemoPage {
    private readonly inventoryPath: string =  getEnv('SAUCEDEMO_URL')+'/inventory.html';
    private readonly cartPath: string = getEnv('SAUCEDEMO_URL')+'/cart.html';
    private readonly checkoutPath: string = getEnv('SAUCEDEMO_URL')+'/checkout-step-one.html';
    private readonly checkoutOverviewPath:string =  getEnv('SAUCEDEMO_URL')+'/checkout-step-two.html';
    readonly completeCheckoutHeader: Locator;
    readonly completeCheckoutMessage: Locator;
    constructor(readonly page: Page) {
        this.completeCheckoutHeader = this.page.locator('[data-test="title"]');
        this.completeCheckoutMessage = this.page.locator('[data-test="checkout-complete-container"]');
    }
    
    @step
    async getInventoryPath(): Promise<string> {
        return this.inventoryPath;
    }

    @step
    async getCartPath(): Promise<string> {
        return this.cartPath;
    }

    @step
    async getCheckoutPath(): Promise<string> {
        return this.checkoutPath;
    }

    @step
    async getCheckoutOverviewPath(): Promise<string> {
        return this.checkoutOverviewPath;
    }

    @step
    async loadLoginPage(): Promise<void> {
        await this.page.goto(getEnv('SAUCEDEMO_URL'));
    }

    @step
    async login(user:string, pw:string ): Promise<void> {
        const loginForm = this.page.locator('form[aria-label="Login"]');
        await loginForm.getByPlaceholder('Username').fill(user);
        await loginForm.getByPlaceholder('Password').fill(pw);
        await loginForm.locator('#login-button').click();
        await this.page.waitForURL(await this.getInventoryPath())
    }

    @step
    async isLoginSuccessful(): Promise<Locator> {
        return this.page.getByText('Products');
    }

    @step
    async addToCart(product: string){
        await this.page.locator('.inventory_item')
        .filter({hasText:product})
        .getByRole('button',{name: 'Add to cart'}).click();
    }

    @step
    async getCartIconContent(): Promise<string>{
        return (await this.page.locator('[data-test="shopping-cart-badge"]').textContent()) ?? '';
    }

    @step
    async clickCart(){
        const header = this.page.locator('[id="header_container"]')
        await header.locator('[data-test="shopping-cart-link"]').click();
    }

    @step
    async verifyCartItem(itemName:string): Promise<boolean> {
        const itemVisbility = await this.page.locator('[class="cart_item"]',{hasText: itemName}).isVisible();
        return itemVisbility;
    }

    @step
    async clickCheckoutBtn(){
        await this.page.getByRole('button',{name: 'Checkout' }).click();
    }


    @step
    async fillCheckoutForm(name:string,lastName:string,postal:string){
        await this.page.getByPlaceholder('First Name').fill(name);
        await this.page.getByPlaceholder('Last Name').fill(lastName);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(postal);
        await this.page.locator('[data-test="continue"]').click();
    }

    @step
    async finishCheckOut(){
        await this.page.getByRole('button',{name: 'Finish'}).click();
    }
}