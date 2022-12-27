import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaysPieceRoutingModule } from './pays-piece-routing.module';
import { PaysPieceComponent } from './pays-piece.component';
import { PaysComponent } from './pays/pays.component';
import { PieceComponent } from './piece/piece.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { DropdownMenusModule, WidgetsModule, CardsModule } from 'src/app/_metronic/partials';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    PaysPieceComponent,
    PaysComponent,
    PieceComponent
  ],
  imports: [
    CommonModule,
    PaysPieceRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    NgbModule,
    InlineSVGModule,
    DropdownMenusModule,
    WidgetsModule,
    CardsModule,
    Ng2SearchPipeModule,
  ]
})
export class PaysPieceModule { }
