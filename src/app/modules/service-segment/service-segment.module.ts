import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SegmentListComponent} from "./components/segment-list/segment-list.component";
import {ServiceSegmentComponent} from './service-segment.component';
import {ServiceSegmentRoutingModule} from "./service-segment-routing.module";
import {InlineSVGModule} from "ng-inline-svg";
import {CardsModule, DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {ServiceListComponent} from './components/service-list/service-list.component';
import {SegmentComponent} from './components/segment/segment.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
    declarations: [
        SegmentListComponent,
        ServiceListComponent,
        ServiceSegmentComponent,
        SegmentComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        ServiceSegmentRoutingModule,
        InlineSVGModule,
        DropdownMenusModule,
        WidgetsModule,
        CardsModule,
        HttpClientModule,
        NgbModule,

        ReactiveFormsModule
    ]
})
export class ServiceSegmentModule {
}
