import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "./components/clients/clients.component";
import {UsersComponent} from "./users.component";
import {AdminComponent} from "./components/admin/admin.component";
import {StoreUserComponent} from "./components/store-user/store-user.component";
import {ShowUserComponent} from "./components/show-user/show-user.component";
import { NewUserComponent } from './components/new-user/new-user.component';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'admins',
        component: AdminComponent,
      },
      {
        path: 'new/user',
        component: StoreUserComponent,
      },
      {
        path : 'new-user',
        component: NewUserComponent
      },
      {
        path: 'show-user',
        component: ShowUserComponent,
      },
      {
        path: 'confirm-code/:phone',
        component: ConfirmCodeComponent,
      },
      {
        path: ':id/profile',
        loadChildren: () =>
            import('./modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: ':id/profile-utilisateurs',
        loadChildren: () =>
            import('./modules/utilisateurs-profile/utilisateurs-profile.module').then((m) => m.UtilisateursProfileModule),
      },
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      { path: '**', redirectTo: 'clients', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouterModule { }
