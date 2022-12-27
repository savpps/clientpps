
import { AttachmentModel } from "src/app/models/attachment.model";
import { ResponseModel } from "./response.model";
import { UserAuthModel } from "./user_auth.model";

export class AttachmentResponseModel extends ResponseModel{
    data:   AttachmentModel

    setUserResponse(response: AttachmentResponseModel): void {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}