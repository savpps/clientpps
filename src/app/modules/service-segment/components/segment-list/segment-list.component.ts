import {Component, OnInit} from '@angular/core';
import {SegmentsService} from "../../services/segments.service";
import {Segment} from "../../models/segment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SegmentRequest} from "../../requests/segment-request";
import {first} from "rxjs/operators";
import {ServiceService} from '../../services/service.service';
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../../../models/product.model";
import {ServiceModel} from "../../../../models/service.model";
import {SegmentModel} from "../../../../models/segment.model";

@Component({
    selector: 'app-segment-list',
    templateUrl: './segment-list.component.html',
    styleUrls: ['./segment-list.component.scss']
})
export class SegmentListComponent implements OnInit {

    segmentForm: FormGroup;
    segments: SegmentModel[];
    data: any;
    segment: Segment;
    services: ServiceModel[];
    isUpdate: Boolean = false;
    segmentServices: ServiceModel[];
    id: string;
    products: ProductModel[] = [];
    private request: SegmentRequest = new SegmentRequest();

    constructor(private serviceService: ServiceService, private productService: ProductService, private fb: FormBuilder, private segmentService: SegmentsService, private modalService: NgbModal) {
    }

    get f() {
        return this.segmentForm.controls;
    }

    getSegmentList() {
        this.segmentService.list().pipe(first())
            .subscribe((data) => {
                if (Array.isArray(data)) {
                    this.segments = data;
                }
            });
    }

    getServiceList() {
        this.serviceService.listService().pipe(first())
            .subscribe((data) => {
                if (Array.isArray(data)) {
                    this.services = data;
                }
            });
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    initForm() {
        this.segmentForm = this.fb.group({
            name: ['', Validators.compose([Validators.required,]),],
            amount: ['', Validators.compose([Validators.required,]),],
            color: ['', Validators.compose([Validators.required,]),],
            id: [],
            repaymentAmount:['',Validators.compose([Validators.required,])],
            period:['',Validators.compose([Validators.required,])],
            productId: ["", Validators.compose([Validators.required,]),],
            service: ['', Validators.compose([Validators.required])
            ],
        });
    }

    saveData() {
        this.request = this.segmentForm.value;
        this.id = this.segmentForm.value.id
        if (this.isUpdate) {
            this.segmentService.update(this.request, this.id).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.segmentForm.reset();
                        this.modalService.dismissAll();
                        this.getSegmentList();
                    }
                });

        } else {
            this.segmentService.store(this.request).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.segmentForm.reset();
                        this.modalService.dismissAll();
                        this.getSegmentList();
                    }
                });
        }
        this.isUpdate = false;
    }


    editData(id: string, content: any) {
        this.isUpdate = true;
        this.segmentService.show(id)
            .pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.open(content);
                    this.segmentForm.patchValue(data)
                    this.segmentForm.patchValue({'productId': data.product.id})
                }
            });
    }

    addService(id: string, add: any) {
        this.isUpdate = true;
        this.segmentService.show(id).pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.open(add);
                    this.segmentServices = data.services;
                    this.id = data.id;
                    this.segmentForm.patchValue({
                            'name': data.name,
                            'id': data.id,
                        }
                    );
                }
            });
    }

    serviceSegment() {
        this.data = {
            "segment_id": this.f.id.value,
            "service_id": this.f.service.value
        }

        this.segmentService.addServiceSegment(this.data)
            .subscribe((data) => {
                if (data) {
                    this.segmentForm.reset();
                    this.modalService.dismissAll();
                    this.getSegmentList();
                }
            });

    }

    deleteData(id: string) {
        this.segmentService.delete(id)
            .pipe(first())
            .subscribe(
                data => {
                    if (data) {
                        this.getSegmentList();
                    }
                }
            )
    }
    ngOnInit(): void {
        this.initForm();
        this.getSegmentList();
        this.getServiceList();
        this.getProducts();
    }

    getColor(segment: Segment) {
        return segment.color;
    }

    private getProducts() {
        this.productService.listProduct().pipe(first())
            .subscribe((value) => {
                if (Array.isArray(value)) {
                    this.products = value;
                }
            });
    }
}
