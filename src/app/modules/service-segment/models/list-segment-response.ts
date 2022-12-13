import {ResponseModel} from "../../auth/models/response.model";
import {Segment} from "./segment";

export class ListSegmentResponse extends ResponseModel{
    data: Segment[];

    setListSegmentResponse(response: ListSegmentResponse) {
        this.data = response.data
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}
