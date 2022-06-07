import { DevolucaoFormComponent } from './devolucao-form/devolucao-form.component';
import { DevolucaoComponent } from './devolucao/devolucao.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocacaoComponent } from './locacao/locacao.component';

const routes: Routes = [
  { path:'adicionar', component: LocacaoComponent },
  { path:'devolucao', component: DevolucaoComponent },
  { path:'devolver/:id', component: DevolucaoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocacaoRoutingModule { }
