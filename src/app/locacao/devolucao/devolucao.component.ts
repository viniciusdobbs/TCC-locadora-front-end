import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
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
  displayedColumns = ['cliente', 'jogo', 'funcionario','dataLocacao', 'dataDevolucao', 'actions'];

  constructor(
    private service: LocacaoService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
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

  onCancel() {
    this.location.back();
  }

  onEdit(id: string){
    this.router.navigate(['locacao/devolver', id]);
  }
}
