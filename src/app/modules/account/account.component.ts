import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService, UserType } from '../auth/services/auth-user/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  user: UserType;
  
  constructor(private authService : AuthService) {
    this.user = authService.currentUserValue;
    console.log('this.user')
    console.log(this.user)
  }

  ngOnInit(): void {}
}
