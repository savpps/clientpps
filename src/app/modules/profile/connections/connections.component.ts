import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService, UserType } from '../../auth/services/auth-user/auth.service';
import { ProfileService } from '../profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
})
export class ConnectionsComponent {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  private unsubscribe: Subscription[] = [];
  myForm : FormGroup;
  user : UserType;


  constructor(private modalService: NgbModal,
    private fb : FormBuilder, private cdr: ChangeDetectorRef,
    private profileService: ProfileService,private authService : AuthService) {
      this.user = authService.currentUserValue;
      console.log(this.user);
    }

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
