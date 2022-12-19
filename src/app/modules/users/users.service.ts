import {Injectable, OnDestroy} from '@angular/core';
import {UserFakeService} from "./fake/user-fake.service";
import {UserRequest} from './requests/user.request';
import {catchError, map} from 'rxjs/operators';
import {UserResponse} from './responses/user-response';
import {Observable, of, Subscription} from 'rxjs';
import {ResponseModel} from "../auth/models/response.model";
import {UserModel} from "../../models/user.model"; 


@Injectable({
    providedIn: 'root'
})
export class UsersService implements OnDestroy {
    private unsubscribe: Subscription[] = [];

    constructor(private userHttpService: UserFakeService) {
    }

    allUsers() {
        return this.userHttpService.getListUser();
    }

    singleUser(id: string) {
        return this.userHttpService.getUser(id)
            .pipe(
                map((response: UserResponse) => {
                    return response.data;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )

    }


    createUser(request: UserRequest) {
        return this.userHttpService.storeUser(request)
            .pipe(
                map((response: UserResponse) => {
                    return response.data;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )

    }

    updateUser(request: UserRequest, id: string) {
        return this.userHttpService.updateUser(request, id)
            .pipe(
                map((response: UserResponse) => {
                    return response.data;
                }),
        )

    }

    deleteUser(id: string) {
        return this.userHttpService.deleteUser(id)
            .pipe(
                map((response: any) => {
                    return response.data;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    acceptUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.accept(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    rejectUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.reject(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    lockedUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.locked(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    unlockedUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.unlocked(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    disabledUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.disabled(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    enabledUser(id: string | null): Observable<ResponseModel | undefined> {
        return this.userHttpService.enabled(id)
            .pipe(
                map((response: ResponseModel) => {
                    return response;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )
    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    listClient(): Observable<Array<UserModel> | undefined> {
        return this.userHttpService.listUser().pipe(
            map((response: ResponseModel) => {
                let users: Array<UserModel> = response.data;
                return users.filter(user => user.roles[0].name == "ROLE_USER");
            }),
            catchError(() => {
                return of(undefined);
            }),
        );
    }
    
    listAdmin(): Observable<Array<UserModel> | undefined> {
        return this.userHttpService.listUser().pipe(
            map((response: ResponseModel) => {
                let users: Array<UserModel> = response.data;
                return users.filter(user => (user.roles[0].name ==  "ROLE_ADMIN") || (user.roles[0].name ==  "ROLE_PARTNER") );
            }),
            catchError(() => {
                return of(undefined);
            }),
        );
    }
    

    getUserClient(id: string | null): Observable<UserModel | undefined> {
        return this.userHttpService.showUser(id).pipe(
            map((response: ResponseModel) => {
                let user: UserModel = response.data;
                return user;
            }),
            catchError(() => {
                return of(undefined);
            }),
        );
    }
}
