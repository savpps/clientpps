import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {InlineSVGModule} from "ng-inline-svg";
import {CardsModule, DropdownMenusModule, WidgetsModule} from "../../../../_metronic/partials";
import {OverviewComponent} from "./overview/overview.component";
import {ProjectsComponent} from "./projects/projects.component";
import {DocumentsComponent} from "./documents/documents.component";
import {ConnectionsComponent} from "./connections/connections.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import { InfosComponent } from './infos/infos.component';
import { FacturesComponent } from './factures/factures.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ProfileComponent,
        OverviewComponent,
        ProjectsComponent,
        DocumentsComponent,
        ConnectionsComponent,
        CampaignsComponent,
        InfosComponent,
        FacturesComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        InlineSVGModule,
        DropdownMenusModule,
        WidgetsModule,
        CardsModule,
        ReactiveFormsModule
    ]
})
export class ProfileModule {
}
