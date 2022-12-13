import { UtilisateursProfileComponent } from './utilisateurs-profile.component';
import { RouterModule } from '@angular/router';
import { CardsModule } from './../../../../_metronic/partials/content/cards/cards.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from './../../../../_metronic/partials/content/widgets/widgets.module';
import { DropdownMenusModule } from './../../../../_metronic/partials/content/dropdown-menus/dropdown-menus.module';
// import { InlineSVGModule } from 'ng-inline-svg';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateursProfileRoutingModule } from './utilisateurs-profile-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { ParametresComponent } from './parametres/parametres.component';


@NgModule({
  declarations: [
    UtilisateursProfileComponent,
    OverviewComponent,
    ParametresComponent
  ],
  imports: [
    CommonModule,
    UtilisateursProfileRoutingModule,
    // InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
    ReactiveFormsModule,
    RouterModule,

  ]
})
export class UtilisateursProfileModule { }
