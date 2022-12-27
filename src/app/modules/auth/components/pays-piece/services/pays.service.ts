import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PaysModel } from 'src/app/models/pays.model';
import { PaysFakeService } from '../fake/pays-fake.service';
import { PaysRequest } from '../requests/pays.request';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  constructor(private fakeService: PaysFakeService) {
  }

  listPays(): Observable<PaysModel[] | undefined> {
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

  showPays(id: string): Observable<PaysModel | undefined> {
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
  updatePays(id: string): Observable<PaysModel | undefined> {
    return this.fakeService.update(id).pipe(
        map((value) => {
            return value.data;
        }),
        catchError(err => {
            console.error("err", err);
            return of(undefined);
        }),
    );
}

}
