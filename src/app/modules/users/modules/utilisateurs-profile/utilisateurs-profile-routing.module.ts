import { UtilisateursProfileComponent } from './utilisateurs-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ParametresComponent } from './parametres/parametres.component';

const routes: Routes = [
  {
      path: '',
      component: UtilisateursProfileComponent,
      children: [
          {
            path: 'details',
            component: OverviewComponent,
          },
          {
            path: 'parametres',
            component: ParametresComponent,
          },
          { path: '', redirectTo: 'details', pathMatch: 'full' },
          { path: '**', redirectTo: '', pathMatch: 'full' },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateursProfileRoutingModule { }
