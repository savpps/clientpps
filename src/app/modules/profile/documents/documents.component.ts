import { Component, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserType, AuthService } from '../../auth/services/auth-user/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../users/modules/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
})
export class DocumentsComponent {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  private unsubscribe: Subscription[] = [];

  avatar: any = './assets/media/avatars/300-5.jpg';
  user : UserType;
  myForm : FormGroup;

  constructor(private modalService: NgbModal,
              private fb : FormBuilder, private cdr: ChangeDetectorRef,
              private profileService: ProfileService,private authService : AuthService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

    this.user = authService.currentUserValue;
  }

  changeImg(event: any){
    this.avatar = event.target.value;
    console.log(this.avatar);
  }

  saveChange(event: any){
    this.modalService.dismissAll();
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }
  
  tinyAlert() {
    Swal.fire('Hey there!');
  }
  successNotification() {
    Swal.fire('Réussi!', 'Modification appliqué avec succès!', 'success');
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Vous êtes sûr?',
      text: 'Ce processus est irréversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, vas y.',
      cancelButtonText: 'Non, laisse-moi réfléchir',
    }).then((result) => {
      if (result.value) {
        Swal.fire('OK!', 'Votre message.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Annulé', 'Message.)', 'error');
      }
    });
  }

}
