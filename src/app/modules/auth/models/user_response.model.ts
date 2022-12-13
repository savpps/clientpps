import { ResponseModel } from "./response.model";
import { UserAuthModel } from "./user_auth.model";

export class UserResponseModel extends ResponseModel{
    data:   UserAuthModel;

    setUserResponse(response: UserResponseModel): void {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}