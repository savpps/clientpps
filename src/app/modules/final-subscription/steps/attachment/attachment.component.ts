import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, first, Subscription } from 'rxjs';
import { PieceModel } from 'src/app/models/piece.model';
import { AuthService, UserType } from 'src/app/modules/auth';
import { PieceService } from 'src/app/modules/auth/components/pays-piece/services/piece.service';
import { AttachmentService } from 'src/app/modules/users/modules/attachment.service';
import { AttachmentRequest } from 'src/app/modules/users/requests/attachment.request';
import { ICreateAccount } from 'src/app/modules/wizards/create-account.helper';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
})
export class AttachmentComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: boolean;
  hasError: boolean;
  attachmentRequest: FormData = new FormData();
  private unsubscribe: Subscription[] = [];
  isProfile = this.router.url.includes('profile');
  isAttachment = this.router.url.includes('attachment')
  isSegment = this.router.url.includes('segment')
  pieces: PieceModel[] = [];
  attachementForm: FormGroup
  user: UserType
  id: any

  constructor(
    private fb: FormBuilder,
    private attachementService: AttachmentService,
    private service: PieceService,
    private authService: AuthService,
    private router: Router) {
    const loadingSubscr = this.isLoading$
      .asObservable()
      .subscribe((res) => (this.isLoading = res));
    this.unsubscribe.push(loadingSubscr);

  }
  get f() {
    return this.attachementForm.controls
  }

  ngOnInit(): void {
    this.getPiece();
    this.initForm();
    console.log(this.getPiece());
  }

  initForm() {
    this.attachementForm = this.fb.group({
      typePieceNumber: ['',
        [Validators.required]
      ],
      pieceNumber: [
        '',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)],
      ],
      nui: ['',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)]],
      pieceVerso: ['', [Validators.required]],
      pieceRecto: [
        '',
        [Validators.required],
      ],
      avatar: [
        '',
        [Validators.required],
      ],
      signature: [
        '',
        [Validators.required],
      ],
    });

  }


  getPiece() {
    this.service.listPiece().pipe(first())
      .subscribe(value => {
        if (Array.isArray(value)) {
          this.pieces = value;
        }
      })
  }
  
  fileRecto(event:any){
    console.log(event)
    const file = event.target.files[0];
    this.attachementForm.patchValue({
      pieceRecto:file
    })
  }
  fileSignature(event:any){
    console.log(event)
    const file = event.target.files[0];
    this.attachementForm.patchValue({
      signature:file
    })
  }
  fileAvatar(event:any){
    console.log(event)
    const file = event.target.files[0];
    this.attachementForm.patchValue({
      pieceAvatar:file
    })
  }



  fileVerso(event:any){
    console.log(event)
    const file = event.target.files[0];
    this.attachementForm.patchValue({
      pieceVerso:file
    })
  }

  storeAttachment() {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);

     this.attachmentRequest.append('nui', this.attachementForm.get('nui')?.value)
     this.attachmentRequest.append('typePieceNumber', this.attachementForm.get('typePieceNumber')?.value)
     this.attachmentRequest.append('pieceNumber', this.attachementForm.get('pieceNumber')?.value)
     this.attachmentRequest.append('avatar', new Blob([JSON.stringify(this.attachementForm.get('avatar')?.value)],{type: 'application/json'}))
     this.attachmentRequest.append('pieceRecto', new Blob([JSON.stringify(this.attachementForm.get('pieceRecto')?.value)],{type: 'application/json'}))
     this.attachmentRequest.append('pieceVerso', new Blob([JSON.stringify(this.attachementForm.get('pieceVerso')?.value)],{type: 'application/json'}))
     this.attachmentRequest.append('signature', new Blob([JSON.stringify(this.attachementForm.get('signature')?.value)],{type: 'application/json'}))

      return this.attachementService.storeAttachment(this.attachmentRequest).subscribe((data) => {
        if (data) {
          this.router.navigate(['/inscription/segment'])
        }
      })

    }, 1000)
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }


}