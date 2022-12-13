import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UsersService} from '../../../users.service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ProfileModel} from 'src/app/models/profil.model';
import {ProfileService} from '../../profile.service';
import Swal from 'sweetalert2';
import {UserRequest} from "../../../requests/user.request";
import {ProfileRequest} from "../../../requests/profile.request";


@Component({
    selector: 'app-parametres',
    templateUrl: './parametres.component.html',
    styleUrls: ['./parametres.component.scss']
})

export class ParametresComponent implements OnInit {
    isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoading: boolean;
    profile: ProfileModel | undefined;
    id: string | null | undefined;
    user_id: any;
    user = new UserRequest();
    profile_request: ProfileRequest;
    data: any;
    genre: any;
    profileForm: FormGroup;
    userForm: FormGroup;
    private unsubscribe: Subscription[] = [];

    constructor(private profileService: ProfileService, private fb: FormBuilder, private url: ActivatedRoute, private userService: UsersService,) {
        const loadingSubscr = this.isLoading$
            .asObservable()
            .subscribe((res) => (this.isLoading = res));
        this.unsubscribe.push(loadingSubscr);
    }

    get f() {
        return this.profileForm.controls;
    }

    ngOnInit(): void {
        this.id = this.url.parent?.snapshot.paramMap.get('id');
        this.user_id = this.id;
        if (this.id != undefined) {
            let idUser: string | null = this.id;
            this.getUser(idUser);
        }

        this.initForm();
    }

    initForm() {
        this.profileForm = new FormGroup({
            genre: new FormControl(''),
            firstName: new FormControl(),
            lastName: new FormControl(),
            validPersonalInfo: new FormControl(1),
            validPhoneNumber: new FormControl(1),
            user_id: new FormControl(),
            birthday: new FormControl(),
            profession: new FormControl(),
            country: new FormControl(),
            town: new FormControl(),
            phone: new FormControl(),
        });
        this.userForm = new FormGroup({
            email: new FormControl(),
            phone: new FormControl(),
            username: new FormControl(),
            referralCode: new FormControl(''),

        });

    }

    ngOnDestroy() {
        this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }

    getUser(id: string | null) {
        this.userService.getUserClient(id).subscribe(response => {
            this.profile = response?.profile;
            this.userForm.patchValue({
                'username': response?.username,
                'email': response?.email,
                'phone': response?.phone

            });

            if (response?.profile) {
                this.patch_profile(response);
                this.genre = response.profile.genre
            } else
                this.genre = 'Choisissez un genre';

        });
    }

    patch_profile(response: any) {
        this.profileForm.patchValue({
            'genre': response?.profile.genre,
            'firstName': response?.profile.firstName,
            'lastName': response?.profile.lastName,
            'birthday': response?.profile.birthday,
            'profession': response?.profile.profession,
            'country': response?.profile.country,
            'town': response?.profile.town,
        })
    }

    submit() {

        this.user = this.userForm.value;
        this.user.profile = this.profileForm.value;

        this.profile_request = this.profileForm.value;


        this.userService.updateUser(this.user, this.user_id).subscribe(
            res => {
                this.data = res;
                this.profile_request.user_id = this.user_id;
                this.profile_request.phone = res.phone;
                if (res.profile) {
                    this.profileService.updateProfile(this.profile_request, res.profile.id).subscribe(
                        res => {
                            this.alertWithSuccess();
                            return res;
                        }, err => {
                            return err;
                        });
                } else {
                    console.log(this.profile_request);

                    this.profileService.createProfile(this.profile_request).subscribe(
                        res => {
                            this.alertWithSuccess();
                            return res;

                        }, err => {
                            return err;
                        });
                }

                return;
            }, err => {
                return err;
            }
        );

    }

    alertWithSuccess() {
        Swal.fire('Réussi', 'Vous avez modifier votre profile avec succès!', 'success')
    }

    // confirmBox(){
    //   Swal.fire({
    //     title: 'Are you sure want to remove?',
    //     text: 'You will not be able to recover this file!',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, delete it!',
    //     cancelButtonText: 'No, keep it'
    //   }).then((result) => {
    //     if (result.value) {
    //       Swal.fire(
    //         'Deleted!',
    //         'Your imaginary file has been deleted.',
    //         'success'
    //       )
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       Swal.fire(
    //         'Cancelled',
    //         'Your imaginary file is safe :)',
    //         'error'
    //       )
    //     }
    //   })
    // }

}
