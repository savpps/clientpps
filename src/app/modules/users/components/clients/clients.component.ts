import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../users.service';
import {UserModel} from "../../../../models/user.model";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
    clients: any[] = [];
    users: Array<UserModel> | undefined;
    user: any
    term:string;

    constructor(private userService: UsersService) {
    }

    ngOnInit(): void {
        this.listUserClient();
    }

    public listUserClient() {
        this.userService.listClient().subscribe(
            (users: Array<UserModel> | undefined) => {this.users = users;console.log(this.users);
            }
        );
    }

    public deleteUser(id : string ){
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
