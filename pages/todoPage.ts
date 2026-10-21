import { Locator, Page } from "@playwright/test";
import { step } from "../utils/testStepDecorator";


export default class TodoPage {
    private readonly todoUrl: string = '/todo';
    constructor(readonly page: Page) {}

    @step
    async load(): Promise<void> {
        await this.page.goto(this.todoUrl); 
    }

    @step
    async addTodo():Promise<void> {
        await this.page.getByTestId('add').click();
    }

    isWelcomeMessageVisible(): Locator {
        return this.page.getByTestId('welcome')
    }
}