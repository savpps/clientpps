import {SegmentModel} from "./segment.model";
import {ServiceModel} from "./service.model";

export class PaymentSegmentModel {
    id: string;
    segment: SegmentModel;
    services: Array<ServiceModel>
}
