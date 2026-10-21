
import { APIRequestContext, BrowserContext, Page } from '@playwright/test';
import { getEnv } from '../configurations/testConfigurations';
import { step } from '../utils/testStepDecorator';
import QaCartServices from '../api/qaCartServices';
import User from '../models/User';

export default class QaCartSignUpPage{
    private readonly signUpUrl:string = '/signup'
    constructor(readonly page:Page){
    }

    private randomInt(rand:number) {
        return Math.floor(Math.random() * rand) + 1
    }

    @step
    async load(){
        await this.page.goto(getEnv('QACART_URL')+this.signUpUrl);
        await this.page.getByText('Register to Application').waitFor({state: "visible"})
        await this.page.waitForLoadState('domcontentloaded')
    }
    
    @step
    async signUp(firstName: string , lastName:string , email:string, password:string){
        await this.page.getByTestId('first-name').fill(firstName)
        await this.page.getByTestId('last-name').fill(lastName)
        await this.page.getByTestId('email').fill(this.randomInt(9999)+email)
        await this.page.getByTestId('password').fill(password)
        await this.page.getByTestId('confirm-password').fill(password)
        await this.page.getByTestId('submit').click();
        //await this.page.context().storageState({ path: './AuthStorage/qaCartSession.json' });
    }

    @step
    async signUpUsingApi(user:User,request : APIRequestContext,context: BrowserContext): Promise<number> {
        const qacartServices = new QaCartServices();
        const response = await qacartServices.registerTestUserApi(request, context, user);
        const statusCode = response.status();
        return statusCode;
    }
}
