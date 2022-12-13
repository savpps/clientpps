import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../../models/product.model";
import {ProductService} from "../../services/product.service";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductRequest} from "../../requests/product.request";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    products: ProductModel[] = [];
    isUpdate: Boolean = false;
    productForm: FormGroup;
    id: string;

    constructor(private service: ProductService, private fb: FormBuilder, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.getProducts();
        this.initForm();
    }

    get f() {
        return this.productForm.controls;
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }

    private getProducts() {
        this.service.listProduct().pipe(first())
            .subscribe(value => {
                if (Array.isArray(value)) {
                    this.products = value;
                }
            });
    }

    saveProduct() {
        let request: ProductRequest = this.productForm.value;
        this.id = this.productForm.value.id
        if (this.isUpdate) {
            this.service.updateProduct(request, this.id).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.productForm.reset();
                        this.modalService.dismissAll();
                        this.getProducts();
                    }
                });
        } else {
            this.service.storeProduct(request).pipe(first())
                .subscribe((data) => {
                        if (data) {
                            this.productForm.reset();
                            this.modalService.dismissAll();
                            this.getProducts();
                        }
                    }
                );
        }
        this.isUpdate = false;
    }

    private initForm() {
        this.productForm = this.fb.group({
            name: ['', Validators.compose([Validators.required,]),],
            id: [""],
        });
    }

    editData(id: string, content: any) {
        this.isUpdate = true;
        this.service.showProduct(id)
            .pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.open(content);
                    this.productForm.patchValue(data);
                }
            });
    }
}
