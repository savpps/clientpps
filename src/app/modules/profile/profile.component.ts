import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService, UserType } from '../auth/services/auth-user/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user: UserType;
  constructor(private authService : AuthService) {
    this.user = authService.currentUserValue;

  }

//   getUser(id: string | null) {
//     this.userService.getUserClient(id).subscribe(response => this.user = response);
// }

getPercentage(): number {
  let total = 20;
  if (this.user?.profile != null) {
      total += 20;
  }
  if (this.user?.attachment != null) {
      total += 20;
  }
  if (this.user?.segment != null) {
      total += 20;
  }
  if (this.user?.payement != null) {
      total += 20;
  }
  return total;
}

// enableUser(id: string | null) {
//     this.userService.enabledUser(id).subscribe(response => {
//         this.getUser(id);
//     })
// }

// disabledUser(id: string | null) {
//     this.userService.disabledUser(id).subscribe(response => {
//         this.getUser(id);
//     })
// }

// lockedUser(id: string | null) {
//     this.userService.lockedUser(id).subscribe(response => {
//         this.getUser(id);
//     })
// }

// unlockedUser(id: string | null) {
//     this.userService.unlockedUser(id).subscribe(response => {
//         this.getUser(id);
//     })
// }

// validUser(id: string | null) {
//     this.userService.acceptUser(id).subscribe(response => {
//         this.getUser(id);
//         console.log(this.user?.status);
//     })
// }

// rejectUser(id: string | null) {
//     this.userService.rejectUser(id).subscribe(response => {
//         this.getUser(id);
//         console.log(this.user?.status);
//     })
// }

  ngOnInit(): void {}
  
}
