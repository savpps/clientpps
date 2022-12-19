import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../profile/profile.service';
import { AuthService, UserType } from '../auth/services/auth-user/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  private unsubscribe: Subscription[] = [];
  myForm : FormGroup;
  user : UserType;


  constructor(private modalService: NgbModal,
    private fb : FormBuilder, private cdr: ChangeDetectorRef,
    private profileService: ProfileService,private authService : AuthService) {}

    ngOnInit(): void {
      this.initForm();
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
      ]
     });
    }
    saveChange(event: any){
      this.modalService.dismissAll();
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
