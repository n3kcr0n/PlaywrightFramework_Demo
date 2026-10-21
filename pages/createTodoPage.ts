import { APIRequestContext, Locator, Page } from "@playwright/test";
import { step } from "../utils/testStepDecorator";
import QaCartServices from "../api/qaCartServices";
import User from "../models/User";

export default class CreateTodoPage {
    private readonly createTodoUrl: string = '/todo/new';
    constructor(readonly page: Page) {} 

    @step
    async load(): Promise<void> {
        await this.page.goto(this.createTodoUrl); 
    }

    @step
    async createTodo(title: string): Promise<void> {
        await this.page.getByTestId('new-todo').fill(title);
        await this.page.locator("button[data-testid='submit-newTask']").click();
    }

    getTodo(title: string): Locator {
        const todos = this.page.getByTestId('todo-item');
        return todos.filter({ hasText: title });
    }

    @step
    deleteTodo(title: string): void {
        const todos = this.page.getByTestId('todo-item');
        const todoToDelete = todos.filter({ hasText: title });
        todoToDelete.locator("button[data-testid='delete']").click();
    }

    @step
    async createTodoViaApi(request:APIRequestContext, title:string, user:User):Promise<number> {
        const qacartServices = new QaCartServices();
        return await qacartServices.createTodoAPI(request, title, user);
    }

    @step
    async deleteTodoViaApi(request:APIRequestContext, user:User):Promise<number> {
        const qacartServices = new QaCartServices();
        return await qacartServices.deleteTodoAPI(request, user.getTodoID(), user);
    }
}