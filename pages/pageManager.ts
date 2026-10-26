import { Page } from "@playwright/test";
import QaCartSignUpPage from "./qaCartSignUpPage";
import TodoPage from "./todoPage";
import CreateTodoPage from "./createTodoPage";
import SauceDemoPage from './sauceDemo';

export default class PageManager {
    constructor(private readonly page: Page) { }

    qaCartSignUpPage() {
        return new QaCartSignUpPage(this.page)
    }
    
    todoPage() {
        return new TodoPage(this.page)
    }

    newTodoPage() {
        return new CreateTodoPage(this.page)
    }

    sauceDemoPage(){
        return new SauceDemoPage(this.page)
    }
}
