import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from '../../services/auth-user/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  phone : string | null;
  code:string | null;
  data = {};

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private url  : ActivatedRoute,private modalService:NgbModal) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.phone = this.url.snapshot.paramMap.get('phone');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }
// https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
  initForm() {
    this.forgotPasswordForm = this.fb.group({
      code_1: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      code_2: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      code_3: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      code_4: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
      code_5: [
        '',
        Validators.compose([
          Validators.required,
        ]),
      ],
    });
  }
  
  submit() {
   this.errorState = ErrorStates.NotSubmitted;
   this.code = `${this.f.code_1.value}${this.f.code_2.value}${this.f.code_3.value}${this.f.code_4.value}${this.f.code_5.value}`
   this.data = {"code" : this.code};
   return this.authService
     . sendCodevalidation(this.data)
     .subscribe( res => {
       console.log(res);
       this.errorState = ErrorStates.NoError ;
       setTimeout(
         ()=>{
           this.router.navigate(['/auth/login/']);
         },5000
       );
     },
     err => {
       this.errorState = ErrorStates.HasError ;
     }
     );
}
// openScrollableContent(longContent) {
//   this.modalService.open(longContent, { scrollable: true });
// }
}