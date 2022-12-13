import {SegmentModel} from "./segment.model";

export interface ProductModel {
    id: string;
    name: string;
    segments: SegmentModel[];
}