import {ResponseModel} from "./response.model";
import {UserAuthModel} from "./user_auth.model";

export class UserListResponseModel extends ResponseModel{
    data:   UserAuthModel[];

    setUserListResponseModel(response: UserListResponseModel): void {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}
