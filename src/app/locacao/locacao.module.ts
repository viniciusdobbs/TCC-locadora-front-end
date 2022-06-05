import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { LocacaoRoutingModule } from './locacao-routing.module';
import { LocacaoComponent } from './locacao/locacao.component';


@NgModule({
  declarations: [
    LocacaoComponent
  ],
  imports: [
    CommonModule,
    LocacaoRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LocacaoModule { }
