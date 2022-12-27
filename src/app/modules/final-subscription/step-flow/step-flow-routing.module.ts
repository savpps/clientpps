import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachmentComponent } from '../steps/attachment/attachment.component';
import { ProfileComponent } from '../steps/profile/profile.component';
import { SegmentComponent } from '../steps/segment/segment.component';
import { StepFlowComponent } from './step-flow.component';

const routes: Routes = [
  {
    path:'',
    component:StepFlowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepFlowRoutingModule { }
