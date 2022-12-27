import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtModel} from "../modules/auth/models/jwt.model";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private authLocalStorageToken = `${environment.USERDATA_KEY}`;

    protected baseUrl = `${environment.apiUrl}`;

    constructor() {
    }

    protected getAuthHeader(): HttpHeaders | { [p: string]: string | string[] } | undefined {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${this.getAuthFromLocalStorage()?.access_token}`
        };
    }

    public setAuthFromLocalStorage(auth: JwtModel): boolean {
        // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
        if (auth && auth.access_token) {
            localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
            return true;
        }
        return false;
    }

    public getAuthFromLocalStorage(): JwtModel | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }

            return JSON.parse(lsValue);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }


}
