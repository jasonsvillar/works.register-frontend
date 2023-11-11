import { User } from "src/app/user/interfaces/user";
import { Service } from "./service";

export interface UserService {
    id?: number,
    userDTO: User,
    serviceDTO: Service
}