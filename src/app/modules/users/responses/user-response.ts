import { ResponseModel } from "../../auth/models/response.model";
import { User } from "../models/user.model";

export class UserResponse extends ResponseModel {
    data : User;

    setUserResponse(response : UserResponse){
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode
    }
}