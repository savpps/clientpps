import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ProfileModel } from 'src/app/models/profil.model';

import { AuthService, UserType } from 'src/app/modules/auth';
import { ProfileService } from 'src/app/modules/users/modules/profile.service';
import { ProfileRequest } from 'src/app/modules/users/requests/profile.request';
import { UserRequest } from '../../requests/user.request';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  profileRequest = new ProfileRequest();
  profileForm: FormGroup;
  private unsubscribe: Subscription[] = [];
  isProfile = this.router.url.includes('profile');
  isAttachment = this.router.url.includes('attachment')
  isSegment = this.router.url.includes('segment')
  user: UserType | undefined
  id: any
  phone:any
  userRequest= new UserRequest()
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

  }

  ngOnInit(): void {
    this.initForm()
    this.user = this.authService.currentUserValue;
    this.id = this.user?.id
    this.phone = this.user?.phone
  }
  get f() {
    return this.profileForm.controls;
  }
  initForm() {
    this.profileForm = this.fb.group(
      {
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50)

          ])
        ],
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        genre: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        profession: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        birthday: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        phone: [
          `${this.phone}`
        ],
        country: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        region: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ],
        town: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
          ])
        ]
      }
    );
  }


storeProfile() {
  this.isLoading$.next(true);
  setTimeout(() => {
    this.isLoading$.next(false);
    // this.cdr.detectChanges();
  {
    this.profileRequest.firstName = this.f.firstName.value;
    this.profileRequest.genre = this.f.genre.value;
    this.profileRequest.lastName = this.f.lastName.value;
    this.profileRequest.birthday = this.f.birthday.value;
    this.profileRequest.profession = this.f.profession.value;
    this.profileRequest.country = this.f.country.value;
    this.profileRequest.region = this.f.region.value;
    this.profileRequest.town = this.f.town.value;
    this.profileRequest.user_id = this.user?.id;
    this.profileRequest.phone = this.user?.phone
   
  }
  
  return this.profileService.createProfile(this.profileRequest).subscribe((data) =>{
    if(data){
      this.router.navigate(['/inscription/attachment'])
    }
  })
  },1000)
}


// checkForm() {
//   return !(
//     this.profileForm.get('gender')?.hasError('required') ||
//     this.profileForm.get('lastName')?.hasError('required') ||
//     this.profileForm.get('firstName')?.hasError('required') ||
//     this.profileForm.get('birthday')?.hasError('required') ||
//     this.profileForm.get('profession')?.hasError('required') ||
//     this.profileForm.get('country')?.hasError('required') ||
//     this.profileForm.get('town')?.hasError('required') ||
//     this.profileForm.get('region')?.hasError('required')
//   );
// }
ngOnDestroy() {
  this.unsubscribe.forEach((sb) => sb.unsubscribe());
}

}
