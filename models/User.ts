import { faker } from '@faker-js/faker';

export default class User{

    constructor(
        private firstName:string = faker.person.firstName(),
        private lastName:string = faker.person.lastName(),
        private email:string = faker.internet.email(),
        private password:string = faker.internet.password(),
        private accessToken:string = '',
        private userID:string = '',
        private todoID:string = '',
    ){}

    getFirstName():string{
        return this.firstName;
    }

    getLastName():string{
        return this.lastName;
    }   

    getEmail():string{
        return this.email;
    }

    getPassword():string{
        return this.password;
    }

    setAccessToken(token:string):void{
        this.accessToken = token;
    }

    setUserID(id:string):void{
        this.userID = id;
    }

    getAccessToken():string{
        return this.accessToken;
    }

    getUserID():string{ 
        return this.userID;
    }

    getTodoID():string{
        return this.todoID;
    }

    setTodoID(id:string):void{
        this.todoID = id;
    }
}