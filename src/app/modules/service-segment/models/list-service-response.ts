import {ResponseModel} from "../../auth/models/response.model";
import {Service} from "./service";

export class ListServiceResponse extends ResponseModel {

    data: Service[];

    setListServiceResponse(response: ListServiceResponse) {
        this.data = response.data
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}
