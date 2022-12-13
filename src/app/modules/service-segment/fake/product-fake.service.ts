import {Injectable} from '@angular/core';
import {HttpService} from "../../../_fake/http.service";
import {Observable} from "rxjs";
import {ProductModel} from "../../../models/product.model";
import {HttpClient} from "@angular/common/http";
import {ResponseModel} from "../../../models/response.model";
import {ProductRequest} from "../requests/product.request";

@Injectable({
    providedIn: 'root'
})
export class ProductFakeService extends HttpService {

    constructor(private httpClient: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpClient.get<ResponseModel<ProductModel[]>>(`${this.baseUrl}/products`, {
            headers: this.getAuthHeader(),
        });
    }

    save(request: ProductRequest): Observable<any> {
        return this.httpClient.post<ResponseModel<ProductModel>>(`${this.baseUrl}/products`, request, {
            headers: this.getAuthHeader(),
        });
    }

    show(id: string): Observable<any> {
        return this.httpClient.get<ResponseModel<ProductModel>>(`${this.baseUrl}/products/${id}`, {
            headers: this.getAuthHeader(),
        });
    }

    update(request: ProductRequest, id: string): Observable<any> {
        return this.httpClient.put<ResponseModel<ProductModel>>(`${this.baseUrl}/products/${id}`, request, {
            headers: this.getAuthHeader(),
        });
    }
}
