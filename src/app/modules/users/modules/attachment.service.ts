import { Injectable } from '@angular/core';
import { catchError, map, of, Subscription } from 'rxjs';
import { AttachmentResponseModel } from '../../auth/models/attachment_response.model';
import { AttachmentFakeService } from '../fake/attachment-fake.service';
import { AttachmentRequest } from '../requests/attachment.request';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  
  private unsubscribe: Subscription[] = [];

  constructor(private attachmentHttpService: AttachmentFakeService) { }

  storeAttachment(request: FormData) {
    return this.attachmentHttpService.store(request).pipe(
      map((response: AttachmentResponseModel) => {
        return response.data
      }),
      catchError(() => {
        return of(undefined);
      }),
    )

  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
}

}
