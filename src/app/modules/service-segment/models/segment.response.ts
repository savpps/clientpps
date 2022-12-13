import {ResponseModel} from "../../auth/models/response.model";
import {Segment} from "./segment";

export class SegmentResponse extends ResponseModel {
    data: Segment;

    setSegmentResponse(response: SegmentResponse) {
        this.data = response.data;
        this.status = response.status;
        this.message = response.message;
        this.statusCode = response.statusCode;
    }
}