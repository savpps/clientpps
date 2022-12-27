import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { PaysModel } from 'src/app/models/pays.model';
import { PaysRequest } from '../requests/pays.request';
import { PaysService } from '../services/pays.service';

@Component({
    selector: 'app-pays',
    templateUrl: './pays.component.html',
    styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {

    pays: PaysModel[] = [];
    paysOne: PaysModel;
    isUpdate: Boolean = false;
    paysForm: FormGroup;
    id: string;
    term: string;
    isAvailable: boolean;
    constructor(private service: PaysService, private fb: FormBuilder, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.getPays();
        //  this.initForm();
    }
    get f() {
        return this.paysForm.controls;
    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }

    private getPays() {
        this.service.listPays().pipe(first())
            .subscribe(value => {
                if (Array.isArray(value)) {
                    this.pays = value;
                }
            });
    }
    updatePays(id: string) {
        //let request: PaysRequest = this.paysForm.value;
        // .pipe(first())
        this.service.updatePays(id)
            .pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.getPays();
                }
            });
    }

    // editData(id: string, content: any) {
    //     this.isUpdate = true;
    //     this.service.showPays(id)
    //         .pipe(first())
    //         .subscribe((data) => {
    //             if (data) {
    //                 this.open(content);
    //                 this.paysForm.patchValue(data);
    //             }
    //         });
    // }

    // private initForm() {
    //     this.paysForm = this.fb.group({
    //         isAvailable: [''],
    //         id: [""],
    //     });
    // }

}
