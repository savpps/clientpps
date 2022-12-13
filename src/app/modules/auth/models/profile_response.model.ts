import { ProfileModel } from 'src/app/models/profil.model';
import { ResponseModel } from "./response.model";
import { UserAuthModel } from "./user_auth.model";

export class ProfileResponseModel extends ResponseModel{
    data:   ProfileModel;

    setUserResponse(response: ProfileResponseModel): void {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}