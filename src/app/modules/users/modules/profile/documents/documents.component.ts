import {Component, OnInit} from '@angular/core';
import {AttachmentModel} from "../../../../../models/attachment.model";
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../../users.service";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
})
export class DocumentsComponent implements OnInit {

    attachment: AttachmentModel | undefined;
    id: string | null | undefined;

    constructor(private url: ActivatedRoute, private userService: UsersService) {
    }

    ngOnInit(): void {
        this.id = this.url.parent?.snapshot.paramMap.get('id');
        if (this.id != undefined) {
            let idUser: string | null = this.id;
            this.getAttachment(idUser);
        }
    }

    getAttachment(id: string | null) {
        this.userService.getUserClient(id).subscribe(response => this.attachment = response?.attachment);
    }

}
