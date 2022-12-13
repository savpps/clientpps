import {Service} from "../models/service";

export class SegmentRequest {
    name: string;
    amount: Number;
    color: string;
    productId: string;
    service?: Service;

    setService(segment: SegmentRequest) {
        this.name = segment.name;
        this.amount = segment.amount;
        this.color = segment.color;
        this.service = segment.service;
        this.productId = segment.productId;
    }
}
