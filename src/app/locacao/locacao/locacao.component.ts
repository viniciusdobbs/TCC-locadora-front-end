import { Locacao } from './../model/locacao';
import { LocacaoService } from './../services/locacao.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Clientes } from 'src/app/clientes/model/clientes';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Funcionarios } from 'src/app/funcionarios/model/funcionarios';
import { FuncionariosService } from 'src/app/funcionarios/services/funcionarios.service';
import { Jogos } from 'src/app/jogos/model/jogos';
import { JogosService } from 'src/app/jogos/services/jogos.service';

import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.scss']
})
export class LocacaoComponent implements OnInit {

  jogos$: Observable<Jogos[]>;
  clientes$: Observable<Clientes[]>;
  funcionarios$: Observable<Funcionarios[]>;
  locacao$: Observable<Locacao[]>;
  form: UntypedFormGroup;
  displayedColumns = ['nome', 'cpf', 'rg', 'email', 'endereco', 'telefoneCliente', 'actions'];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: LocacaoService,
    private jogosService: JogosService,
    private clientesService: ClientesService,
    public funcionariosService: FuncionariosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
  ) {
    this.jogos$ = this.jogosService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar jogos');
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

    this.funcionarios$ = this.funcionariosService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar funcionários');
          return of([])
        })
      );

    this.form = this.formBuilder.group({
      jogo: [null, Validators.required],
      cliente: [null, Validators.required],
      funcionario: [null, Validators.required],
      valor: [null],
      dia: [null],
    });

    this.locacao$ = this.service.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar locação');
          return of([])
        })
      );
  }

  ngOnInit(): void {
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: (data) => this.onErrorSubmit(data),
        complete: () => console.info('Locação salvo')
      });
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  private onSuccess() {
    this.snackBar.open('Locação salvo com sucesso!', '', { duration: 3000 });
    this.router.navigate(['/locacao/devolucao']);
  }

  private onErrorSubmit(data: any) {
    if (data.status == 406) {
      this.snackBar.open(data.error, '', { duration: 3000 });
    }
    else {
      this.snackBar.open('Erro ao salvar locação.', '', { duration: 3000 });
    }
    console.log("erro");
    console.log(data);
  }

}
