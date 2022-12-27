import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaysModel } from 'src/app/models/pays.model';
import { HttpService } from 'src/app/_fake/http.service';
import { ListPaysResponse } from '../models/list-pays-response';
import { PaysRequest } from '../requests/pays.request';

@Injectable({
  providedIn: 'root'
})
export class PaysFakeService extends HttpService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  list(): Observable<any> {
    return this.httpClient.get<ListPaysResponse[]>(`${this.baseUrl}/country/all`, {});
  }

  show(id: string): Observable<any> {
    return this.httpClient.get<PaysModel>(`${this.baseUrl}/country/show/${id}`, {
      headers: this.getAuthHeader(),
    });
  }

  update(id: string): Observable<any> {
    return this.httpClient.put<PaysModel>(`${this.baseUrl}/country/update/${id}`, {
      headers: this.getAuthHeader(),
    });
  }

}
