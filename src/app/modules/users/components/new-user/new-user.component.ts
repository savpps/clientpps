import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { RoleModel } from 'src/app/modules/auth/models/role.model';
import { UserRequest } from '../../requests/user.request';
import { UsersService } from '../../users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
})
export class NewUserComponent implements OnInit {
  userForm: FormGroup;
    modal : boolean = false;
  confirmForm : FormGroup;
  hasError= false;
  message : string;
  isUpdate : boolean = false;
  userUpdate : any;
  roles : RoleModel[] = [];
  user : UserRequest;
  id : string;
  

  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  constructor(private fb: FormBuilder,private userService: UsersService,private router: Router,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  initForm() {
    this.isUpdate = false;
    this.userForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20), 
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ],
      password:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])
      ],
      confirm_password:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
        ])
      ],
      role_name:[
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
      godFatherReferralCode: [''],
      phone:[
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(18)
        ])
      ]


    });

    this.confirmForm = this.fb.group({
      code: [
        '',
        Validators.compose([
          Validators.maxLength(5),
          Validators.minLength(5),
          Validators.required
        ])

      ],
      phone:[]
    });

  }

  allRoles(){
    return 
  }

  submit() {  
    if(this.isUpdate){
      console.log("updating!");
      this.user = this.userForm.value;
      this.id = this.f.id.value;
      this.userService.updateUser(this.user,this.id).subscribe(
        res =>{
          console.log(res);
          return res;
        },err =>{
          this.hasError=true
          this.message = err.error.message;
        }
      )
    }
    else{
      this.user = this.userForm.value;
      console.log("creating",this.user);
      this.userService.createUser(this.user).subscribe(
        res =>{
          this.alertWithSuccess();
          this.modal = true;
          this.router.navigate(['users/confirm-code/',this.user.phone])
          return res;
        },err => {

          console.log(err.error.message)
          this.hasError=true
          this.message = err.error.message;

        }
      )
      
    }

  }

  editUser(id: string){
    this.isUpdate = true;
    this.userService.singleUser(id).subscribe(
      res =>{
        this.userUpdate = res;
      }, err =>{
        console.log("Erreur : "+err);
      }
    );
    this.userForm.patchValue({
      'username':this.userUpdate.username,
      'email':this.userUpdate.email,
      'role_name':this.userUpdate.role_name,
      'id': this.userUpdate.id
    });
  }

  open(add: any) {
    this.modalService.open(add, {ariaLabelledBy: 'modal-basic-title'});
  }

  openModal(phone :string, add:any){
    this.open(add);
    this.confirmForm.patchValue({
      'phone':phone
    })

  }


  alertWithSuccess(){
    Swal.fire('Réussi', "Vous venez d'ajouter un utilisateur!", 'success');
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
