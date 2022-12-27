import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { PieceModel } from 'src/app/models/piece.model';
import { PieceRequest } from '../requests/piece-request';
import { PieceService } from '../services/piece.service';

@Component({
    selector: 'app-piece',
    templateUrl: './piece.component.html',
    styleUrls: ['./piece.component.scss']
})
export class PieceComponent implements OnInit {

    pieces: PieceModel[] = [];
    isUpdate: boolean = false;
    pieceForm: FormGroup;
    id: string;

    constructor(private service: PieceService, private fb: FormBuilder, private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.getPieces();
        this.initForm();
    }

    get f() {
        return this.pieceForm.controls;
    }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        console.log(this.isUpdate)
    }

    private getPieces() {
        this.service.listPiece().pipe(first())
            .subscribe(value => {
                if (Array.isArray(value)) {
                    this.pieces = value;
                }
            });
    }

    savePiece() {
        let request: PieceRequest = this.pieceForm.value;
        this.id = this.pieceForm.value.id
        if (this.isUpdate) {
            this.service.updatePiece(request, this.id).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.pieceForm.reset();
                        this.modalService.dismissAll();
                        this.getPieces();
                    }
                });
        } else {
            this.service.storePiece(request).pipe(first())
                .subscribe((data) => {
                    if (data) {
                        this.pieceForm.reset();
                        this.modalService.dismissAll();
                        this.getPieces();
                    }
                });

        }
        this.isUpdate = false;
    }

    editData(id: string, content: any) {
        this.isUpdate = true;
        this.service.showPiece(id)
            .pipe(first())
            .subscribe((data) => {
                if (data) {
                    this.open(content);
                    this.pieceForm.patchValue(data);
            
                }
            });
        console.log(this.isUpdate);
    }

    private initForm() {
        this.pieceForm = this.fb.group({
            name: ['', Validators.compose([Validators.required,]),],
            isActive: [true,Validators.compose([Validators.required])],
            id: [""],
        });
    }
    
    deleteData(id: string) {
        this.service.deletePiece(id)
            .pipe(first())
            .subscribe(
                data => {
                    if (data) {
                        this.getPieces();
                    }
                }
            )
    }
}
