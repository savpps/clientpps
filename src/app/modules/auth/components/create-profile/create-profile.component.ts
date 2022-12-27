import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-user/auth.service';
import { UserModel } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}
@Component({
  selector: 'app-registration',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  registrationForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        godFatherReferralCode: [
          '',
          Validators.compose([
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ]),
        ],
        email: [
          'qwe@qwe.qwe',
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(3),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        confirm_password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        agree: [false, Validators.compose([Validators.required])],
      },
      
    );
  }

  // open(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
  // }



  submit() {
    this.hasError = false;
    this.errorState = ErrorStates.NotSubmitted
    // const result: {
    //   [key: string]: string;
    // } = {};
    // Object.keys(this.f).forEach((key) => {
    //   result[key] = this.f[key].value;
    //   if(key ==='phone'){
    //     result['phone'] = this.f.phone.value.e164Number 
    //   }
    // });
    const result = {
      "godFatherReferralCode": this.f.godFatherReferralCode.value,
      "phone": this.f.phone.value.e164Number,
      "email": this.f.email.value,
      "password": this.f.password.value,
      "confirm_password": this.f.confirm_password.value,
      "agree": this.f.agree.value
    };
    const newUser = new UserModel();
    newUser.setUser(result);
    const registrationSubscr = this.authService
      .registration(newUser)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          console.log(user)
          this.errorState = ErrorStates.NoError;
          setTimeout(() => {
              this.router.navigate(['/auth/verify-code/', this.f.phone.value.e164Number]);
            }, 5000);
          // this.authService.sendTelephone({"phone":this.f.phone.value.e164Number}).subscribe((res) => {
          //   console.log(res);
          //   this.errorState = ErrorStates.NoError;
          //   setTimeout(
          //     () => {
          //       this.router.navigate(['/auth/verify-code/',this.f.phone.value.e164Number]);
          //     },5000);
          // },
          //   err => {
          //     return this.errorState = ErrorStates.HasError;
          //   });
        } else {
          this.hasError = true;
        }
      },
        err => {
          return this.errorState = ErrorStates.HasError;
        });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
