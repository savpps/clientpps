import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { MediumPaymentsComponent } from './medium-payments/medium-payments.component';


@NgModule({
  declarations: [
    MediumPaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
