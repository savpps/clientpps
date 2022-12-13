import {ResponseModel} from "../../auth/models/response.model";
import { Service } from "./service";

export class ServiceResponse extends ResponseModel {
    data: Service;

    setSegmentResponse(response: ServiceResponse) {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}