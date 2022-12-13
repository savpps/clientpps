import {Injectable} from '@angular/core';
import {ServiceFakeService} from "../fake/service-fake.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {ServiceRequest} from '../requests/service-request';
import {ResponseModel} from "../../../models/response.model";
import {ServiceModel} from "../../../models/service.model";

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    constructor(private serviceHttpService: ServiceFakeService,) {
    }

    listService(): Observable<ServiceModel[] | undefined> {
        return this.serviceHttpService.list().pipe(
            map((response: ResponseModel<ServiceModel[]>) => {
                return response.data;
            }),
            catchError(err => {
                console.log(err);
                return of(undefined);
            })
        );
    }

    storeService(request: ServiceRequest): Observable<ServiceModel | undefined> {
        return this.serviceHttpService.store(request).pipe(
            map((response: ResponseModel<ServiceModel>) => {
                return response.data
            }),
            catchError((err) => {
                console.log(err)
                return of(undefined)
            })
        )
    }

    updateService(request: ServiceRequest, id: string): Observable<ServiceModel | undefined> {
        return this.serviceHttpService.update(request, id).pipe(
            map((response: ResponseModel<ServiceModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.error(err);
                return of(undefined);
            }),
        );
    }

    showService(id: string): Observable<ServiceModel | undefined> {
        return this.serviceHttpService.show(id).pipe(
            map((response: ResponseModel<ServiceModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.error(err);
                return of(undefined);
            }),
        );
    }

    deleteService(id: string): Observable<any> {
        return this.serviceHttpService.delete(id).pipe(
            map((response: ResponseModel<any>) => {
                return response;
            }),
            catchError((err) => {
                console.error(err);
                return of(undefined);
            }),
        )
    }


}
