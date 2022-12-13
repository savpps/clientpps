import {Component, OnInit} from '@angular/core';
import {ServiceService} from "../../services/service.service";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ServiceRequest} from '../../requests/service-request';
import {ServiceModel} from "../../../../models/service.model";
import { Service } from '../../models/service';

@Component({
    selector: 'app-service-list',
    templateUrl: './service-list.component.html',
    styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

    services: ServiceModel[];
    service:Service;
    id: string;
    serviceForm: FormGroup;
    isUpdate: Boolean = false;
    request: ServiceRequest = new ServiceRequest();

    constructor(private fb: FormBuilder, private serviceService: ServiceService, private modalService: NgbModal) {
    }

    get f() {
        return this.serviceForm.controls;
    }

    ngOnInit(): void {
        this.initForm();
        this.getServiceList();
    }

    getServiceList() {
        return this.serviceService.listService().pipe(first())
            .subscribe(
                (data) => {
                    if (Array.isArray(data)) {
                        this.services = data;
                    }
                }
            );
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    initForm() {
        this.serviceForm = this.fb.group({
            name: ['', Validators.compose([Validators.required,]),],
            amount: ['', Validators.compose([Validators.required,]),],
            repaymentAmount: ['', Validators.compose([Validators.required,]),],
            serviceType: ['', Validators.compose([Validators.required,]),],
            id: [],
        });
    }

    saveData() {

        this.request = this.serviceForm.value;
        if (this.isUpdate) {
            this.serviceService.updateService(this.request, this.serviceForm.value.id)
                .subscribe((data) => {
                    if (data) {
                        this.serviceForm.reset();
                        this.modalService.dismissAll();
                        this.getServiceList();
                    }
                });
        } else {
            this.serviceService.storeService(this.request).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.serviceForm.reset();
                        this.modalService.dismissAll();
                        this.getServiceList();
                    }
                });
        }
        this.isUpdate = false;
    }

    editData(id: string, content: any) {
        this.isUpdate = true;
        this.serviceService.showService(id).pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.open(content);
                    this.serviceForm.patchValue(data);
                }
            });
    }

    deleteData(id: string) {
        this.serviceService.deleteService(id)
            .pipe(first())
            .subscribe(
                data => {
                    if (data) {
                        this.getServiceList();
                    }
                }
            )
    }

}
