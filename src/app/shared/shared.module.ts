import { ValorDialogComponent } from './components/error-dialog/valor-dialog/valor-dialog.component';
import { OrderByPipe } from 'src/app/shared/pipe/order-by.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { LocalDateTimePipe } from './pipe/local-date-time.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ValorDialogComponent,
    OrderByPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports:[
    ErrorDialogComponent,
    ValorDialogComponent,
    OrderByPipe
  ]
})
export class SharedModule { }
