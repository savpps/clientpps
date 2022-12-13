import { Component, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserType, AuthService } from '../../auth/services/auth-user/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];

  user : UserType;
  myForm : FormGroup;

  constructor(private fb : FormBuilder, private cdr: ChangeDetectorRef,private authService : AuthService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.user = authService.currentUserValue;
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
      nui : [
        this.user?.profile.lastName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50)

        ])     
      ],
      type : [
        this.user?.profile.firstName,
        Validators.compose([
          Validators.required,
          Validators.maxLength(50),
        ])
      ],
      npj : [
        this.user?.profile.genre,
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
    }, 1500);
  }

}
