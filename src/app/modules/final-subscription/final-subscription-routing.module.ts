import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalSubscriptionComponent } from './final-subscription.component';
import { StepFlowComponent } from './step-flow/step-flow.component';
import { AttachmentComponent } from './steps/attachment/attachment.component';
import { ProfileComponent } from './steps/profile/profile.component';
import { SegmentComponent } from './steps/segment/segment.component';

const routes: Routes = [
  {
    path:'',
    component:FinalSubscriptionComponent,
    children:[
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'attachment',
        component:AttachmentComponent
      },
      {
        path:'segment',
        component:SegmentComponent
      },
    ]
  },
  // { path: '', redirectTo: 'profile', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinalSubscriptionRoutingModule { }
