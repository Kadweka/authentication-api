import { SignInResponse } from "./dto/auth-signinresponse.dto";

export interface userJwtResponse{
    user:SignInResponse;
    accessToken:string
}