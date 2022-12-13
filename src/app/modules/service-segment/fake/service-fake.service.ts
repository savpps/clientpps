import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services/auth-user/auth.service";
import {ServiceRequest} from "../requests/service-request";
import {HttpService} from "../../../_fake/http.service";
import {ResponseModel} from "../../../models/response.model";
import {ServiceModel} from "../../../models/service.model";

@Injectable({
    providedIn: 'root'
})
export class ServiceFakeService extends HttpService {

    constructor(private httpService: HttpClient, private authService: AuthService) {
        super();
    }

    list(): Observable<any> {
        return this.httpService.get<ResponseModel<ServiceModel[]>>(`${this.baseUrl}/list/service`, {
            headers: this.getAuthHeader()
        });
    }

    store(request: ServiceRequest): Observable<any> {
        return this.httpService.post<ResponseModel<ServiceModel>>(`${this.baseUrl}/store/service`, request, {
            headers: this.getAuthHeader()
        });
    }

    show(id: string): Observable<any> {
        return this.httpService.get<ResponseModel<ServiceModel>>(`${this.baseUrl}/show/service/${id}`, {
            headers: this.getAuthHeader()
        });
    }

    update(request: ServiceRequest, id: string): Observable<any> {
        return this.httpService.put<ResponseModel<ServiceModel>>(`${this.baseUrl}/update/service/${id}`, request, {
            headers: this.getAuthHeader()
        });
    }

    delete(id: string): Observable<any> {
        return this.httpService.delete<ResponseModel<any>>(`${this.baseUrl}/delete/service/${id}`, {
            headers: this.getAuthHeader()
        });
    }
}
