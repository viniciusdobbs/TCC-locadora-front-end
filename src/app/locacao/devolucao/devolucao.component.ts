import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Clientes } from 'src/app/clientes/model/clientes';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Locacao } from '../model/locacao';
import { LocacaoService } from '../services/locacao.service';

@Component({
  selector: 'app-devolucao',
  templateUrl: './devolucao.component.html',
  styleUrls: ['./devolucao.component.scss']
})
export class DevolucaoComponent implements OnInit {

  locacao$: Observable<Locacao[]>;
  clientes$: Observable<Clientes[]>;
  displayedColumns = ['cliente', 'jogo', 'funcionario', 'dataLocacao', 'dataDevolucao','valorDia','valorFinal', 'actions'];
  form: FormGroup;
  selectedValue: any;
  locacao: any;

  constructor(
    private service: LocacaoService,
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.locacao$ = this.service.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar locação');
          return of([])
        })
      );

    this.clientes$ = this.clientesService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar clientes');
          return of([])
        })
      );

    this.form = this.formBuilder.group({
      cliente: [null],
    });
  }

  ngOnInit(): void {
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onCancel() {
    this.location.back();
  }

  onEdit(id: string) {
    this.router.navigate(['locacao/devolver', id]);
  }

  getClientePorNome() {
    console.log(this.form.value);
    console.log(this.locacao);
    const locacao = this.locacao$;
    return locacao;
  }

}
