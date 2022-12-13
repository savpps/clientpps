import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../users.service';
import {UserModel} from "../../../../models/user.model";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  clients: any[] = [];
  users: Array<UserModel> | undefined;
  user: any

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
      this.listUserAdmins();
  }

  public listUserAdmins() {
      this.userService.listAdmin().subscribe(
          (users: Array<UserModel> | undefined) => {this.users = users;console.log(this.users);
          },
          
      );
  }

  public deleteUser(id : string ){
    console.log("deleting");
    
    this.userService.deleteUser(id).subscribe(
        res => {console.log("deleting"+res);
        },
        err=>{console.log("error"+err);
        })
}

  // getuser(id: any) {
  //     this.user = id;
  //     console.log(this.user);
  // }

}
