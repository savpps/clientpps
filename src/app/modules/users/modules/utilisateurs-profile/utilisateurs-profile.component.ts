import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {UserModel} from "../../../../models/user.model";
@Component({
  selector: 'app-utilisateurs-profile',
  templateUrl: './utilisateurs-profile.component.html',
  styleUrls: ['./utilisateurs-profile.component.scss']
})
export class UtilisateursProfileComponent implements OnInit {
    user: any | undefined;;
    id: string | null;

    constructor(private router: Router, private url: ActivatedRoute, private userService: UsersService) {
    }

    ngOnInit(): void {
        this.id = this.url.snapshot.paramMap.get('id');
        this.getUser(this.id)
        this.user;
    }

    getUser(id: string | null) {
        this.userService.getUserClient(id).subscribe(response => {this.user = response;console.log(this.user);
        });
    }

    getPercentage(): number {
        let total = 50;
        if (this.user?.profile != null) {
            total += 50;
        }

        return total;
    }

    enabledUser(id: string | null) {
        this.userService.enabledUser(id).subscribe(response => {
            this.getUser(id);
        })
    }

    disabledUser(id: string | null) {
        this.userService.disabledUser(id).subscribe(response => {
            this.getUser(id);
        })
    }


}
