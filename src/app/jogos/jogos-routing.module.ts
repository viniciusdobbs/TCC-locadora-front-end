import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JogoFormComponent } from './jogo-form/jogo-form.component';
import { JogosComponent } from './jogos/jogos.component';

const routes: Routes = [
  { path:'', component: JogosComponent },
  { path:'adicionar', component: JogoFormComponent },
  { path:'editar/:id', component: JogoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JogosRoutingModule { }
