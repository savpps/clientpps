import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PieceModel } from 'src/app/models/piece.model';
import { HttpService } from 'src/app/_fake/http.service';
import { ListPieceResponse } from '../models/list-piece-response';
import { PieceRequest } from '../requests/piece-request';

@Injectable({
  providedIn: 'root'
})
export class PieceFakeService extends HttpService{

  constructor(private httpClient: HttpClient) {
    super();
}

list(): Observable<any> {
    return this.httpClient.get<ListPieceResponse[]>(`${this.baseUrl}/typePiece/all`, {
        headers: this.getAuthHeader(),
    });
}

save(request: PieceRequest): Observable<any> {
    return this.httpClient.post<ListPieceResponse>(`${this.baseUrl}/typePiece/store`, request, {
        headers: this.getAuthHeader(),
    });
}
show(id: string): Observable<any> {
  return this.httpClient.get<PieceModel>(`${this.baseUrl}/typePiece/show/${id}`, {
      headers: this.getAuthHeader(),
  });
}
delete(id: string): Observable<any> {
  return this.httpClient.delete<ListPieceResponse>(`${this.baseUrl}/typePiece/delete/${id}`, {
      headers: this.getAuthHeader()
  });
}

update(request: PieceRequest, id: string): Observable<any> {
  return this.httpClient.put<PieceModel>(`${this.baseUrl}/typePiece/update/${id}`, request, {
      headers: this.getAuthHeader(),
  });
}
}
