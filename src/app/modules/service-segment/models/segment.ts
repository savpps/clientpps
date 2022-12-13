import {Service} from "./service";
import {ProductModel} from "../../../models/product.model";

export class Segment {
    id: string;
    segment: any;
    services: Array<Service>;
    product: ProductModel;

    setSegment(segment: Segment) {
        this.id = segment.id;
        this.segment = segment.segment;
        this.services = segment.services;
        this.product = segment.product;
    }
}
