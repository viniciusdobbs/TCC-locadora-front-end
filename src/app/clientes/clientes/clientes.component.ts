import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Clientes } from '../model/clientes';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes$: Observable<Clientes[]>;
  displayedColumns = ['nome', 'cpf', 'rg', 'email', 'endereco', 'telefoneCliente', 'actions'];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.clientes$ = this.clientesService.list()
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
    this.clientesService.remove(id).subscribe({
      next: () => this.onSuccessDelete(),
      error: () => this.onErrorDelete(),
      complete: () => console.info('Cliente deletado')
    });
  }

  private onSuccessDelete() {
    this.snackBar.open('Cliente deletado com sucesso!', '', { duration: 3000 });
    this.reloadCurrentRoute();
  }

  private onErrorDelete() {
    this.snackBar.open('Erro ao deletar cliente.', '', { duration: 3000 });
    console.log("erro");
  }

  reloadCurrentRoute() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['clientes']);
  }
}
