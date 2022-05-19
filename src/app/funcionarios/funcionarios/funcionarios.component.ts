import { FuncionariosService } from './../services/funcionarios.service';
import { Funcionarios } from './../model/funcionarios';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.scss']
})
export class FuncionariosComponent implements OnInit {

  funcionarios$: Observable<Funcionarios[]>;
  displayedColumns = ['nome', 'cpf', 'rg', 'email', 'endereco', 'salarioFunc', 'actions'];

  constructor(
    public funcionariosService: FuncionariosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.funcionarios$ = this.funcionariosService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar clientes');
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

  onAdd(){
    this.router.navigate(['adicionar'], {relativeTo: this.route});
  }

  onEdit(id: string){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onRemove(id: string){
    this.funcionariosService.remove(id).subscribe({
      next: () => this.onSuccessDelete(),
      error: () => this.onErrorDelete(),
      complete: () => console.info('Funcionario deletado')
    });
  }

  private onSuccessDelete() {
    this.snackBar.open('Funcionario deletado com sucesso!', '', { duration: 3000 });
    this.reloadCurrentRoute();
  }

  private onErrorDelete() {
    this.snackBar.open('Erro ao deletar funcionario.', '', { duration: 3000 });
    console.log("erro");
  }

  reloadCurrentRoute() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['funcionarios']);
  }
}
