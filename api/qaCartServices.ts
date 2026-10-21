import { APIRequestContext, BrowserContext } from "@playwright/test";
import { getEnv } from "../configurations/testConfigurations";
import User from "../models/User";

export default class QaCartServices {
    private readonly registrationPath = '/api/v1/users/register'
    private readonly createTodoPath = '/api/v1/tasks'

    constructor(){}

    async registerTestUserApi(request: APIRequestContext, context: BrowserContext,user: User) {
        const response = await request.post(getEnv('QACART_URL')+ this.registrationPath, {
            data: {
                firstName: user.getFirstName(),
                lastName: user.getLastName(),
                email: user.getEmail(),
                password: user.getPassword()
            }
        })

        const responseBody = await response.json();
        user.setAccessToken(responseBody.access_token)
        user.setUserID(responseBody.userID)
        //Set a new cookies(accesToken, userName, userID) from the response 
        await context?.addCookies([
            {
                name: 'access_token',
                value: responseBody.access_token,
                url: getEnv('QACART_URL')
            },
            {
                name: 'firstName',
                value: responseBody.firstName,
                url: getEnv('QACART_URL')
            },
            {
                name: 'userID',
                value: responseBody.userID,
                url: getEnv('QACART_URL')
            }
        ])
        return response
    }

    async createTodoAPI(request: APIRequestContext, title: string, user: User): Promise<number> {
        const response = await request.post(getEnv('QACART_URL') + this.createTodoPath, {
            data: {
                isCompleted: false,
                item: title,
            },
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
            }
        });
        const responseBody: unknown = await response.json();
        const createdTodo = findCreatedTodo(responseBody, title);

        if (!createdTodo) {
            throw new Error(`Create-todo API response (HTTP ${response.status()}) did not include a task titled "${title}" with an ID.`);
        }

        user.setTodoID(createdTodo._id);
        return response.status();
    }

    async deleteTodoAPI(request: APIRequestContext, todoID: string, user: User): Promise<number> {
        const response = await request.delete(getEnv('QACART_URL') + this.createTodoPath + `/${todoID}`, {
            headers: {
                Authorization: `Bearer ${user.getAccessToken()}`,
            }
        });
        return response.status();
    }
    
}

interface TodoTask {
    _id: string;
    item: string;
}

function isTodoTask(value: unknown): value is TodoTask {
    return typeof value === "object"
        && value !== null
        && "_id" in value
        && typeof value._id === "string"
        && "item" in value
        && typeof value.item === "string";
}

function findCreatedTodo(responseBody: unknown, title: string): TodoTask | undefined {
    if (isTodoTask(responseBody)) {
        return responseBody.item === title ? responseBody : undefined;
    }

    if (typeof responseBody !== "object" || responseBody === null) {
        return undefined;
    }

    if ("task" in responseBody && isTodoTask(responseBody.task)) {
        return responseBody.task.item === title ? responseBody.task : undefined;
    }

    if ("tasks" in responseBody && Array.isArray(responseBody.tasks)) {
        return responseBody.tasks.find(
            (task: unknown): task is TodoTask => isTodoTask(task) && task.item === title
        );
    }

    return undefined;
}
