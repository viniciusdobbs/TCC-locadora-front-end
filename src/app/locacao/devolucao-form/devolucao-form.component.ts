import { Location } from '@angular/common';
import { LocacaoService } from './../services/locacao.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-devolucao-form',
  templateUrl: './devolucao-form.component.html',
  styleUrls: ['./devolucao-form.component.scss']
})
export class DevolucaoFormComponent implements OnInit {

  selected: Date | null | undefined;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: LocacaoService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      dataDevolucao: [new Date()],
    });
   }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Devolução salva')
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Devolução salva com sucesso!', '', { duration: 3000 });
    // this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar devolução.', '', { duration: 3000 });
    console.log("erro");
  }

  onEdit(){
    let newDate: moment.Moment = moment.utc(this.form.value.dataDevolucao).local();
    this.form.value.dataDevolucao = newDate.format("YYYY-MM-DDTHH:mm:ss")
    this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Devolução salva')
    });
    console.log(this.route.snapshot.url[1].path)
  }

}
