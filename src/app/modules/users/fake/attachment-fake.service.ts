import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_fake/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from "../../auth/services/auth-user/auth.service";
import { AttachmentRequest } from '../requests/attachment.request';

const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})


export class AttachmentFakeService extends HttpService {

  token: string | undefined = this.authService.getAuthFromLocalStorage()?.access_token;

  constructor(private htppClient: HttpClient, private authService: AuthService) {
    super()
  }

  store(request:FormData): Observable<any> {
    if (!this.token) {
      throw new Error("Method not implemented.");
    }
    return this.htppClient.post(`${API_BASE_URL}/save/attachment`, request,
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${this.token}`
        }
      });
  }
}
