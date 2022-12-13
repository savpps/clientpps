import { ProfileFakeService } from './../fake/profile-fake.service';
import { ResponseModel } from './../../auth/models/response.model';
import {Injectable, OnDestroy} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Observable, of, Subscription} from 'rxjs';
import { ProfileRequest } from '../requests/profile.request';
import { ProfileResponseModel } from '../../auth/models/profile_response.model';


@Injectable({
    providedIn: 'root'
})
export class ProfileService implements OnDestroy {
    private unsubscribe: Subscription[] = [];

    constructor(private profileHttpService: ProfileFakeService) {
    }



    singleProfile(id: string) {
        return this.profileHttpService.getProfile(id)
            .pipe(
                map((response) => {
                    return response.data;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )

    }


    createProfile(request: ProfileRequest) {
        return this.profileHttpService.storeProfile(request)
            .pipe(
                map((response: ProfileResponseModel) => {
                    return response.data;
                }),
                catchError(() => {
                    return of(undefined);
                }),
            )

    }

    updateProfile(request: ProfileRequest, id: string) {
        return this.profileHttpService.updateProfile(request, id)
            .pipe(
                map((response: ProfileResponseModel) => {
                    return response.data;
                }),
            )

    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }


}
