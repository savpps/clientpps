import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtModel } from "../../../models/jwt.model";
import { UserResponseModel } from "../../../models/user_response.model";
import { LoginRequest } from "../../../request/login.request";

const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: "root",
})
export class AuthFakeService {
  
  constructor(private http: HttpClient) {}

  loginByPhone(request: LoginRequest): Observable<any> {
    const notFoundError = new Error("Not Found");
    if (!request.phone || !request.password) {
      return of(notFoundError);
    }

    return this.http.post<JwtModel>(`${API_BASE_URL}/login`, request, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  loginByEmail(request: LoginRequest): Observable<any> {
    const notFoundError = new Error("Not Found");
    if (!request.phone || !request.password) {
      return of(notFoundError);
    }

    return this.http.post<JwtModel>(`${API_BASE_URL}/login`, request, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }
  
  getUserByToken(token: string): Observable<any> {
    if(!token) {
      throw new Error("Method not implemented.");
    }

    return this.http.post<UserResponseModel>(`${API_BASE_URL}/me`, {}, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${token}`
      },
    });
  }


  //ATTACHMENTS
  
  storeAttachment(request: LoginRequest): Observable<any> {
    const notFoundError = new Error("Not Found");
    if (!request.phone || !request.password) {
      return of(notFoundError);
    }

    return this.http.post<JwtModel>(`${API_BASE_URL}/login`, request, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }




  //RESET PASSWORD

  verifyTel(data: {}){
    return  this.http.post(`${API_BASE_URL}/send/code`,data,{headers:{"Content-type":"Application/json"}});
 }

 verifyCode(data: {}){
   return this.http.post(`${API_BASE_URL}/verify/code`,data,{headers:{"Content-Type":"Application/json"}});
 }

 verifierCode(data: {}){
   return this.http.post(`${API_BASE_URL}/activation/account`,data,{headers:{"Content-Type":"Application/json"}});
 }

 resetPassword(data :{}){
  return this.http.post(`${API_BASE_URL}/reset/password`,data,{headers:{"Content-Type":"Application/json"}});
   
 }

}
