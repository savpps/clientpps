import { InfosComponent } from './infos/infos.component';
import { FacturesComponent } from './factures/factures.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./profile.component";
import {OverviewComponent} from "./overview/overview.component";
import {ProjectsComponent} from "./projects/projects.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {DocumentsComponent} from "./documents/documents.component";
import {ConnectionsComponent} from "./connections/connections.component";

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
              path: 'overview',
              component: OverviewComponent,
            },
            {
              path: 'projects',
              component: ProjectsComponent,
            },
            {
              path: 'factures',
              component: FacturesComponent,
            },
            {
              path: 'informations',
              component: InfosComponent,
            },
            {
              path: 'campaigns',
              component: CampaignsComponent,
            },
            {
              path: 'documents',
              component: DocumentsComponent,
            },
            {
              path: 'connections',
              component: ConnectionsComponent,
            },
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: '**', redirectTo: 'overview', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {
}
