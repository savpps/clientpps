import { Component, Input, OnInit } from '@angular/core';
import { AuthService, UserType } from '../../../../../modules/auth/services/auth-user/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  user : UserType;


  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'svg-icon-1';

  constructor(private authService : AuthService) {
    this.user = authService.currentUserValue;

  }

  ngOnInit(): void {}
}
