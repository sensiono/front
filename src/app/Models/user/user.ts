import { Role } from "./role";

export class User {
    id?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    password?: string;
    registrationDate?: string;
    enabled?: boolean;
    imageName?: string;
    role?:Role;

}
