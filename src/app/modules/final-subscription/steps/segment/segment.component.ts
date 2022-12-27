import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICreateAccount } from 'src/app/modules/wizards/create-account.helper';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
})
export class SegmentComponent implements OnInit {
  @Input('updateParentModel3') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;
  segmentForm: FormGroup;
  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.segmentForm = this.fb.group({
      color: ['', [Validators.required]],
      name: [
      '',
        [Validators.required],
      ],
      amount: ['', [Validators.required]],
      repaymentAmount: ['',[Validators.required]],
      productId: [
        '',
        [Validators.required],
      ],
      period: [
        '',
        [Validators.required],
      ],
    });  const formChangesSubscr = this.segmentForm.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.checkForm());
    });
    this.unsubscribe.push(formChangesSubscr);
  }

    checkForm() {
      return !(
        this.segmentForm.get('businessName')?.hasError('required') ||
        this.segmentForm.get('businessDescriptor')?.hasError('required') ||
        this.segmentForm.get('businessType')?.hasError('required') ||
        this.segmentForm.get('businessEmail')?.hasError('required') ||
        this.segmentForm.get('businessEmail')?.hasError('email')
      );
    }
}
