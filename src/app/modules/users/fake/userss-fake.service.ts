import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/services/auth-user/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UserRequest} from "../requests/user.request";

const API_BASE_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root'
})
export class UserFakeService {

    token: string | undefined = this.authService.getAuthFromLocalStorage()?.access_token;

    constructor(private httpService: HttpClient, private authService: AuthService) {
    }

    getListUser(): Observable<any> {
        return this.httpService.get<any>(`${API_BASE_URL}/list/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }

        });
    }

    storeUser(request: UserRequest): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }

        return this.httpService.post(`${API_BASE_URL}/create/user`, request, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    getUser(id: string): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/show/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    showUser(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }

        return this.httpService.get(`${API_BASE_URL}/show/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    updateUser(request: UserRequest, id: string): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }

        return this.httpService.put(`${API_BASE_URL}/update/user/${id}`, request, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        }); 
    }

    deleteUser(id: string): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.delete(`${API_BASE_URL}/delete/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    accept(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/accept/${id}/account`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    reject(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/reject/${id}/account`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    locked(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/locked/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    unlocked(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/unlocked/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    disabled(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/disabled/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    enabled(id: string | null): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        if (id == null) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get(`${API_BASE_URL}/enabled/user/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    listUser(): Observable<any> {
        if (!this.token) {
            throw new Error("Method not implemented.");
        }
        return this.httpService.get<any>(`${API_BASE_URL}/list/users`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${this.token}`
            }

        });
    }
}
