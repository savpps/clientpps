import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PieceModel } from 'src/app/models/piece.model';
import { PieceFakeService } from '../fake/piece-fake.service';
import { PieceRequest } from '../requests/piece-request';

@Injectable({
  providedIn: 'root'
})
export class PieceService {

  constructor(private fakeService: PieceFakeService) {
  }

  listPiece(): Observable<PieceModel[] | undefined> {
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

  storePiece(request: PieceRequest): Observable<PieceModel | undefined> {
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

  showPiece(id: string): Observable<PieceModel | undefined> {
    return this.fakeService.show(id).pipe(
        map((value) => {
            return value.data;
        }),
        catchError((err) => {
            console.log(err);
            return of(undefined);
        }),
    );
}

  updatePiece(request: PieceRequest, id: string): Observable<PieceModel | undefined> {
    return this.fakeService.update(request, id).pipe(
        map((value) => {
            return value.data;
        }),
        catchError(err => {
            console.error("err", err);
            return of(undefined);
        }),
    );
}
deletePiece(id: string): Observable<any> {
    return this.fakeService.delete(id).pipe(
        map((response) => {
            return response;
        }),
        catchError((err) => {
            console.error(err);
            return of(undefined);
        }),
    )
}
}
