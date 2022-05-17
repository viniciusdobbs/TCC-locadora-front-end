import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JogosService } from './../services/jogos.service';

@Component({
  selector: 'app-jogo-form',
  templateUrl: './jogo-form.component.html',
  styleUrls: ['./jogo-form.component.scss']
})
export class JogoFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: JogosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nome: [null],
      genero: [null],
      console: [null]
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Jogo salvo')
    });
  }

  onCancel() {
    this.location.back();
  }

  ngOnInit(): void {
  }

  private onSuccess() {
    this.snackBar.open('Jogo salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar jogo.', '', { duration: 3000 });
    console.log("erro");
  }

  onAdicionar(){}

  onEdit(){
    console.log(this.route.snapshot.url[1].path)
  }

}
