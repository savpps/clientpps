import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormsModule, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth-user/auth.service';
import Swal from 'sweetalert2';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}
@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.scss']
})
export class ConfirmCodeComponent implements OnInit {
  codeConfirmForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;
  phone : string | null;
  data = {};

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router,private url  : ActivatedRoute) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm(); 
    this.phone = this.url.snapshot.paramMap.get('phone');
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.codeConfirmForm.controls;
  }

  initForm() {
    this.codeConfirmForm = this.fb.group({
      code: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
     
    });
  }

  submit() {
    this.errorState = ErrorStates.NotSubmitted;
    this.data = {
    "code" : this.f.code.value,
    "phone": this.phone };
    console.log(this.data);
     return this.authService
       .sendCodevalidation(this.data)
       .subscribe( res => {
        console.log(res);
         this.errorState = ErrorStates.NoError ; 
          this.alertWithSuccess();
          this.router.navigate(['users/admins/']);
       },
       err => {
         this.errorState = ErrorStates.HasError ;
       }
       );
 }
 
 alertWithSuccess(){
  Swal.fire('Réussi', 'Activation éffectuer avec succès!', 'success');
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
