import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { JogoFormComponent } from './jogo-form/jogo-form.component';
import { JogosRoutingModule } from './jogos-routing.module';
import { JogosComponent } from './jogos/jogos.component';

@NgModule({
  declarations: [
    JogosComponent,
    JogoFormComponent
  ],
  imports: [
    CommonModule,
    JogosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class JogosModule { }
