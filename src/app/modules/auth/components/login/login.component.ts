import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
// import { AuthService } from '../../services/auth.service';
import { AuthService } from "../../services/auth-user/auth.service";
import { ActivatedRoute, Router } from '@angular/router';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';


const enum AUTH_TYPE{
  PHONE = 'phone',
  EMAIL = 'email',
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;
  authType: string = 'phone';


  defaultAuth: any = {
    email: 'admin@demo.com',
    password: 'demo',
  };
  loginForm: FormGroup;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

    this.initForm();

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
      this.isPhone()
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
      this.loginForm = this.fb.group({ 
        email: [
          this.defaultAuth.email,
          Validators.compose([
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
          ]),
        ],
        phone: [],
        password: [
          this.defaultAuth.password,
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15),
          ]),
        ],
        
      });
    
  } 

  // submit() {
  //   this.hasError = false;
  //   const loginSubscr = this.authService
  //     .login(this.f.email.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe((user: UserModel | undefined) => {
  //       if (user) {
  //         this.router.navigate([this.returnUrl]);
  //       } else {
  //         this.hasError = true;
  //       }
  //     });
  //   this.unsubscribe.push(loginSubscr);
  // }

  submit() {
    this.hasError = false;
  
    if (this.authType==AUTH_TYPE.EMAIL) {
      
      const phoneLoginSubscr = this.authService
      .loginByEmail(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe((user) => {
        if (user && user?.profile==null){ 
          console.log(user);
          this.router.navigate(['/inscription/profile']);
        }
        else if(user && user?.attachment == null){
          this.router.navigate(['/inscription/attachment']);
        }
        
        else if(user && user?.segment == null){
          this.router.navigate(['/inscription/segment']);
        }
        
        else if(user && (user?.profile && user.attachment && user?.segment) != null){
          this.router.navigate([this.returnUrl]);
        }
         else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(phoneLoginSubscr);
    }
        else
    {
      console.log('phone actived');

      const phoneLoginSubscr = this.authService
      .loginByPhone(this.f.phone.value.e164Number, this.f.password.value)
      .pipe(first())
      .subscribe((user) => {
        if (user && user?.profile==null){ 
          console.log(user);
          this.router.navigate(['/inscription/profile']);
        }
        else if(user && user?.attachment == null){
          this.router.navigate(['/inscription/attachment']);
        }
        
        else if(user && user?.segment == null){
          this.router.navigate(['/inscription/segment']);
        }
        
        else if(user && (user?.profile && user.attachment && user?.segment) != null){
          this.router.navigate([this.returnUrl]);
        }
         else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(phoneLoginSubscr);
    }
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


  isPhone(){
    this.authType = AUTH_TYPE.PHONE;
    console.log(this.authType)
  }
  isEmail(){
    this.authType = AUTH_TYPE.EMAIL;
    console.log(this.authType)
  }
}
