import { UserModel } from 'src/app/models/user.model';
import { AuthService, UserType } from './../../auth/services/auth-user/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

 user: any;

    
    constructor(private authService: AuthService,) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }




}
