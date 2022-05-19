import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioFormComponent } from './funcionario-form/funcionario-form.component';
import { FuncionariosComponent } from './funcionarios/funcionarios.component';

const routes: Routes = [
  { path:'', component: FuncionariosComponent },
  { path:'adicionar', component: FuncionarioFormComponent },
  { path:'editar/:id', component: FuncionarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
