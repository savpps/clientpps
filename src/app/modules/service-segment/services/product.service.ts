import {Injectable} from '@angular/core';
import {ProductFakeService} from "../fake/product-fake.service";
import {Observable, of} from "rxjs";
import {ProductModel} from "../../../models/product.model";
import {catchError, map} from "rxjs/operators";
import {ProductRequest} from "../requests/product.request";
import {ResponseModel} from "../../../models/response.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private fakeService: ProductFakeService) {
    }

    listProduct(): Observable<ProductModel[] | undefined> {
        return this.fakeService.list().pipe(
            map(value => {
                return value.data;
            }),
            catchError(err => {
                console.error("err", err);
                return of(undefined);
            }),
        );
    }

    storeProduct(request: ProductRequest): Observable<ProductModel | undefined> {
        return this.fakeService.save(request).pipe(
            map(value => {
                return value.data;
            }),
            catchError(err => {
                console.error("err", err);
                return of(undefined);
            }),
        );
    }

    showProduct(id: string): Observable<ProductModel | undefined> {
        return this.fakeService.show(id).pipe(
            map((value: ResponseModel<ProductModel>) => {
                return value.data;
            }),
            catchError((err) => {
                console.log(err);
                return of(undefined);
            }),
        );
    }

    updateProduct(request: ProductRequest, id: string): Observable<ProductModel | undefined> {
        return this.fakeService.update(request, id).pipe(
            map((value: ResponseModel<ProductModel>) => {
                return value.data;
            }),
            catchError(err => {
                console.error("err", err);
                return of(undefined);
            }),
        );
    }
}
