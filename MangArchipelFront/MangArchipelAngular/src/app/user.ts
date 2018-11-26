import { Role } from './role';

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    postalCode: number;
    adress: string;
    mail: string;
    roles: Array<Role>;

    constructor(username?: string, password?: string, firstname?: string, lastname?: string, city?: string,
        postalCode?: number, adress?: string, mail?: string) {
        this.username = username;
        this.password = password;
        this.mail = mail;
        this.firstName = firstname;
        this.lastName = lastname;
        this.city = city;
        this.postalCode = postalCode;
    }
}
