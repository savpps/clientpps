import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SegmentListComponent} from "./components/segment-list/segment-list.component";
import { SegmentComponent } from './components/segment/segment.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import {ServiceSegmentComponent} from './service-segment.component';
import {ProductComponent} from "./components/product/product.component";

const routes: Routes = [
  {
    path: '',
    component: ServiceSegmentComponent,
    children: [
      {
        path: 'segments',
        component: SegmentListComponent,
      },
      {
        path: 'segment/:id',
        component: SegmentComponent,
      },
      {
        path: 'services',
        component: ServiceListComponent,
      },
      {
        path: 'products',
        component: ProductComponent,
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: '**', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSegmentRoutingModule { }
