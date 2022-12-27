import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaysPieceComponent } from './pays-piece.component';
import { PaysComponent } from './pays/pays.component';
import { PieceComponent } from './piece/piece.component';

const routes: Routes = [
  { 
    path: '', 
    component: PaysPieceComponent,
    children:[
      {path:'pays', component:PaysComponent},
      {path:'piece', component:PieceComponent},
    ]
  

  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaysPieceRoutingModule { }
