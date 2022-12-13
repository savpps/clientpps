import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../users.service";
import {ProfileModel} from "../../../../../models/profil.model";

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

    profile: ProfileModel | undefined;
    id: string | null | undefined;

    constructor(private url: ActivatedRoute, private userService: UsersService) {}

    ngOnInit(): void {
        this.id = this.url.parent?.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            let idUser: string | null = this.id;
            this.getUser(idUser);
        }
    }

    getUser(id: string | null) {
        this.userService.getUserClient(id).subscribe(response => this.profile = response?.profile);
    }
}
