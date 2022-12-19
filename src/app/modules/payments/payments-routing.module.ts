import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsModule } from './payments.module';
import { MediumPaymentsComponent } from './medium-payments/medium-payments.component';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
	{
	  path: '',
	  component: PaymentsComponent,
	  children: [
		{
		  path: 'medium',
		  component: MediumPaymentsComponent,
		},
		{ path: '', redirectTo: 'medium', pathMatch: 'full' },
		{ path: '**', redirectTo: 'medium', pathMatch: 'full' },
	  ],
	},
  ];
  
  @NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
  })

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
