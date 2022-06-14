import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { ValorDialogComponent } from './../../shared/components/error-dialog/valor-dialog/valor-dialog.component';
import { LocacaoService } from './../services/locacao.service';

@Component({
  selector: 'app-devolucao-form',
  templateUrl: './devolucao-form.component.html',
  styleUrls: ['./devolucao-form.component.scss']
})
export class DevolucaoFormComponent implements OnInit {

  selected: Date | null | undefined;
  form: FormGroup;
  responseModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: LocacaoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.form = this.formBuilder.group({
      dataDevolucao: [new Date()],
    });
   }

  ngOnInit(): void {
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(data: string) {
    //this.snackBar.open('Devolução salva com sucesso!', '', { duration: 3000 });
    this.onModal(data);
  }

  private onError() {
    this.snackBar.open('Erro ao salvar devolução.', '', { duration: 3000 });
    console.log("erro");
  }

  onModal(msg: string) {
    this.dialog.open(ValorDialogComponent, {
      data: msg
    });
  }

  onEdit(){
    let newDate: moment.Moment = moment.utc(this.form.value.dataDevolucao).local();
    //this.form.value.dataDevolucao = newDate.format("YYYY-MM-DDTHH:mm:ss")
    this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
      next: (data) => this.onSuccess(data),
      error: () => this.onError(),
      complete: () => console.info('Devolução salva')
    });
    console.log(this.route.snapshot.url[1].path)
  }

}
