import { Component } from '@angular/core';
import { AuthService, UserType } from '../../auth/services/auth-user/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
})
export class OverviewComponent {
  user: UserType;
  constructor(private authService : AuthService) {
    this.user = authService.currentUserValue;

  }

}
