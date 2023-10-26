import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { JogoFormComponent } from './jogo-form/jogo-form.component';
import { JogosRoutingModule } from './jogos-routing.module';
import { JogosComponent } from './jogos/jogos.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

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
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class JogosModule { }
