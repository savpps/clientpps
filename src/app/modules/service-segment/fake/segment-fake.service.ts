import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SegmentRequest} from "../requests/segment-request";
import {HttpService} from "../../../_fake/http.service";
import {ResponseModel} from "../../../models/response.model";
import {SegmentModel} from "../../../models/segment.model";

@Injectable({
    providedIn: 'root'
})
export class SegmentFakeService extends HttpService {

    constructor(private httpService: HttpClient) {
        super();
    }

    list(): Observable<any> {
        return this.httpService.get<ResponseModel<SegmentModel[]>>(`${this.baseUrl}/list/segment`, {
            headers: this.getAuthHeader()
        });
    }

    store(request: SegmentRequest): Observable<any> {
        return this.httpService.post<ResponseModel<SegmentModel>>(`${this.baseUrl}/store/segment`, request, {
            headers: this.getAuthHeader()
        });
    }

    addService(data: any): Observable<any> {
        return this.httpService.post<ResponseModel<SegmentModel>>(`${this.baseUrl}/add/service`, data, {
            headers: this.getAuthHeader()
        });
    }

    show(id: string): Observable<any> {
        return this.httpService.get<ResponseModel<SegmentModel>>(`${this.baseUrl}/show/segment/${id}`, {
            headers: this.getAuthHeader()
        });
    }

    update(request: SegmentRequest, id: string): Observable<any> {
        return this.httpService.put<ResponseModel<SegmentModel>>(`${this.baseUrl}/update/segment/${id}`, request, {
            headers: this.getAuthHeader()
        });
    }

    delete(id: string): Observable<any> {
        return this.httpService.delete<ResponseModel<any>>(`${this.baseUrl}/delete/segment/${id}`, {
            headers: this.getAuthHeader()
        });
    }
}
