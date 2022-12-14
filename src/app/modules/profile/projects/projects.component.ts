import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IconUserModel } from '../../../_metronic/partials';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService, UserType } from '../../auth/services/auth-user/auth.service';
import { UsersService } from './../../users/users.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { UserRequest } from './../../users/requests/user.request';
import { ProfileRequest } from '../../users/requests/profile.request';
import { LayoutScrollTopComponent } from '../../../_metronic/partials/layout/extras/scroll-top/scroll-top.component';
import { ProfileService } from '../../users/modules/profile.service';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
})

export class ProjectsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  user : UserType;
  myForm : FormGroup;
  private unsubscribe: Subscription[] = [];

  userRequest = new UserRequest();
  profileRequest = new ProfileRequest();
  id: any;

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  constructor(private fb : FormBuilder, private cdr: ChangeDetectorRef, private profileService: ProfileService,private authService : AuthService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.user = authService.currentUserValue;
    this.id = this.user?.profile.id;

    // this.myForm.setValue({'genre' : this.user?.profile.genre});
  }

  ngOnInit(): void {
    this.initForm();
  }



  // convenience getter for easy access to form fields
  get f() {
    return this.myForm.controls;
  }

  initForm(){
    this.myForm = this.fb.group(
     {
      lastName : [
        this.user?.profile.lastName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)

        ])     
      ],
      firstName : [
        this.user?.profile.firstName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      genre : [
        this.user?.profile?.genre,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],    
      profession : [
        this.user?.profile.profession,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      birthday : [
        this.user?.profile.birthday,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      email : [
        this.user?.email,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      phone : [
        this.user?.phone,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      country : [
        this.user?.profile.country,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      region : [
        this.user?.profile.region,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      town : [
        this.user?.profile.town,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ]
     }
    );
  }


  saveSettings() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
      this.cdr.detectChanges();
      //Application des modifications

      {
        //profile requets
        this.profileRequest.firstName  = this.f.firstName.value ;
        this.profileRequest.genre  = this.f.genre.value ;
        this.profileRequest.lastName = this.f.lastName.value;
        this.profileRequest.birthday = this.f.birthday.value;
        this.profileRequest.profession = this.f.profession.value;
        this.profileRequest.country = this.f.country.value;
        this.profileRequest.region = this.f.region.value;
        this.profileRequest.town = this.f.town.value;
        this.profileRequest.user_id = this.user?.id;

        //user reequest
        this.userRequest.email = this.f.email.value;
        this.userRequest.phone = this.f.phone.value;
        this.userRequest.profile = this.profileRequest;
      }

      this.profileService.updateProfile(this.profileRequest,this.id).subscribe(response => {
                  this.successNotification();
            });

    }, 1500);

  }
  

  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('R??ussi!', 'Modification appliqu?? avec succ??s!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Vous ??tes s??r?',
      text: 'Ce processus est irr??versible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, vas y.',
      cancelButtonText: 'Non, laisse-moi r??fl??chir',
    }).then((result) => {
      if (result.value) {
        Swal.fire('OK!', 'Votre message.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annul??', 'Message.)', 'error');
      }
    });
  }



  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }



}
