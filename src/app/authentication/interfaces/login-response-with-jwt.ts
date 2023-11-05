import { LoginResponse } from "./login-response";

export interface LoginResponseWithJwt extends LoginResponse {
    jwt: string
}
