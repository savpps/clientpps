import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProfileModel } from 'src/app/models/profil.model';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.scss']
})
export class InfosComponent implements OnInit {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  private unsubscribe: Subscription[] = [];
  profile: ProfileModel | undefined;
  id: string | null | undefined;

  data : any;
  infosForm : FormGroup;

  constructor(private cdr: ChangeDetectorRef,private fb: FormBuilder,private url: ActivatedRoute, private userService: UsersService) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);
  }

  ngOnInit(): void {
    this.data;
    this.id = this.url.parent?.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            let idUser: string | null = this.id;
            this.data = this.getUser(idUser);
        }

    this.initForm();


  }

  initForm() {    
    this.infosForm = new FormGroup({
    genre : new FormControl(),
    first_name : new FormControl(),
    pseudo : new FormControl(),
    last_name : new FormControl(),
    birthday : new FormControl(),
    profession : new FormControl(),
    country : new FormControl(),
    town : new FormControl(),
    email : new FormControl(),
    phone : new FormControl(),
  });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  getUser(id: string | null) {
    this.userService.getUserClient(id).subscribe(response => {this.profile = response?.profile; 
      this.patch(response);
    });
  }

  patch(response : any){
    this.infosForm.patchValue({
      'pseudo':response?.username,
      'genre':response?.profile.genre,
      'first_name':response?.profile.firstName,
      'last_name':response?.profile.lastName,
      'birthday':response?.profile.birthday,
      'profession':response?.profile.profession,
      'country':response?.profile.country,
      'town':response?.profile.town,
      'phone':response?.phone,
      'email':response?.email,
    })
  }

}
