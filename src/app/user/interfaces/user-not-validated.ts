import { UserNotValidatedId } from "./user-not-validated-id";

export interface UserNotValidated {
    userNotValidatedId: UserNotValidatedId,
    password: string,
    code: string
}