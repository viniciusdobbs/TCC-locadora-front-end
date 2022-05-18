import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClientesComponent } from './clientes/clientes.component';

const routes: Routes = [
  { path:'', component: ClientesComponent },
  { path:'adicionar', component: ClienteFormComponent },
  { path:'editar/:id', component: ClienteFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
