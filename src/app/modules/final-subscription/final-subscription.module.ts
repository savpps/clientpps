import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FinalSubscriptionRoutingModule } from './final-subscription-routing.module';
import { FinalSubscriptionComponent } from './final-subscription.component';
import { StepFlowComponent } from './step-flow/step-flow.component';
import { ProfileComponent } from './steps/profile/profile.component';
import { AttachmentComponent } from './steps/attachment/attachment.component';
import { SegmentComponent } from './steps/segment/segment.component';
import { EndComponent } from './steps/end/end.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    FinalSubscriptionComponent,
    StepFlowComponent,
    ProfileComponent,
    AttachmentComponent,
    SegmentComponent,
    EndComponent
  ],
  imports: [
    CommonModule,
    FinalSubscriptionRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class FinalSubscriptionModule { }
