import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocacaoComponent } from './locacao/locacao.component';

const routes: Routes = [
  { path:'', component: LocacaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
