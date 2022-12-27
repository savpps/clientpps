import { ProfileRequest } from './../requests/profile.request';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../../auth/services/auth-user/auth.service";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root'
})
export class ProfileFakeService {

    token: string | undefined = this.authService.getAuthFromLocalStorage()?.access_token;

    constructor(private httpService: HttpClient, private authService: AuthService) {
    }

    getProfile(id: string): Observable<any> {
        return this.httpService.get<any>(`${API_BASE_URL}/show/profile/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }

        });
    }

    storeProfile(request: ProfileRequest): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }

        return this.httpService.post(`${API_BASE_URL}/store/profile`, request, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }


    updateProfile(request: ProfileRequest, id: string): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }

        return this.httpService.put(`${API_BASE_URL}/update/profile/${id}`, request, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

}
