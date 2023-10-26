import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Jogos } from './../model/jogos';
import { JogosService } from './../services/jogos.service';

@Component({
  selector: 'app-jogos',
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.scss']
})
export class JogosComponent implements OnInit {

  jogos$: Observable<Jogos[]>;
  displayedColumns = ['nome', 'genero', 'console','preco','quantidade', 'actions'];

  constructor(
    private jogosService: JogosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.jogos$ = this.jogosService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar jogos');
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
    this.jogosService.remove(id).subscribe({
      next: () => this.onSuccessDelete(),
      error: () => this.onErrorDelete(),
      complete: () => console.info('Jogo deletado')
    });
  }

  private onSuccessDelete() {
    this.snackBar.open('Jogo deletado com sucesso!', '', { duration: 3000 });
    this.reloadCurrentRoute();
  }

  private onErrorDelete() {
    this.snackBar.open('Erro ao deletar jogo.', '', { duration: 3000 });
    console.log("erro");
  }

  reloadCurrentRoute() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['jogos']);
  }
}
