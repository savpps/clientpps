import {Injectable} from '@angular/core';
import {SegmentFakeService} from "../fake/segment-fake.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {SegmentRequest} from "../requests/segment-request";
import {SegmentModel} from "../../../models/segment.model";
import {ResponseModel} from "../../../models/response.model";

@Injectable({
    providedIn: 'root'
})
export class SegmentsService {


    constructor(private segmentHttpService: SegmentFakeService) {
    }

    list(): Observable<SegmentModel[] | undefined> {
        return this.segmentHttpService.list().pipe(
            map((response: ResponseModel<SegmentModel[]>) => {
                return response.data;
            }),
            catchError((err) => {
                console.log(err);
                return of(undefined);
            }),
        );
    }

    store(request: SegmentRequest): Observable<SegmentModel | undefined> {
        return this.segmentHttpService.store(request).pipe(
            map((response: ResponseModel<SegmentModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.log(err);
                return of(undefined);
            }),
        );
    }

    addServiceSegment(data: Map<string, any>): Observable<SegmentModel | undefined> {
        return this.segmentHttpService.addService(data).pipe(
            map((response: ResponseModel<SegmentModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.log(err)
                return of(undefined);
            }),
        );
    }

    update(request: SegmentRequest, id: string): Observable<SegmentModel | undefined> {
        return this.segmentHttpService.update(request, id).pipe(
            map((response: ResponseModel<SegmentModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.log(err)
                return of(undefined);
            }),
        );
    }

    show(id: string): Observable<SegmentModel | undefined> {
        return this.segmentHttpService.show(id).pipe(
            map((response: ResponseModel<SegmentModel>) => {
                return response.data;
            }),
            catchError((err) => {
                console.log(err);
                return of(undefined);
            }),
        );
    }

    delete(id: string) {
        return this.segmentHttpService.delete(id).pipe(
            map((response: ResponseModel<any>) => {
                return response;
            }),
            catchError((err) => {
                console.log(err);
                return of(undefined);
            }),
        )
    }
}
