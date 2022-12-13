import { RouterModule } from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './components/clients/clients.component';
import {UsersRouterModule} from "./users-router.module";
// import {InlineSVGModule} from "ng-inline-svg";
import {CardsModule, DropdownMenusModule, WidgetsModule} from "../../_metronic/partials";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersComponent} from './users.component';
import {AdminComponent} from './components/admin/admin.component';
import {StoreUserComponent} from './components/store-user/store-user.component';
import {ShowUserComponent} from './components/show-user/show-user.component';
import {NewUserComponent} from './components/new-user/new-user.component';
import {ConfirmCodeComponent} from './components/confirm-code/confirm-code.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
    declarations: [
        ClientsComponent,
        UsersComponent,
        AdminComponent,
        StoreUserComponent,
        ShowUserComponent,
        NewUserComponent,
        ConfirmCodeComponent,
    ],
    imports: [
        CommonModule,
        UsersRouterModule,
        // InlineSVGModule,
        DropdownMenusModule,
        WidgetsModule,
        CardsModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        // Ng2SearchPipeModule,

    ]
})
export class UsersModule {
}
