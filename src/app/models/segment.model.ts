import {ServiceModel} from "./service.model";
import {ProductModel} from "./product.model";

export interface SegmentModel {
    id: string;
    name: string;
    amount: number;
    color: string;
    services: ServiceModel[];
    product: ProductModel;
}