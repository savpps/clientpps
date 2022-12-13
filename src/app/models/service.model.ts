import {SegmentModel} from "./segment.model";

export interface ServiceModel {
    id: string;
    name: string;
    amount: number;
    serviceType: string;
    segment: SegmentModel;
}