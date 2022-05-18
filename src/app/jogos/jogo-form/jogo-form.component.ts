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
  salvar = false;
  editar = false;

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

  ngOnInit(): void {
      this.onOperacao();
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

  private onSuccess() {
    this.snackBar.open('Jogo salvo com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar jogo.', '', { duration: 3000 });
    console.log("erro");
  }

  onEdit(){
    this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Jogo salvo')
    });
    console.log(this.route.snapshot.url[1].path)
  }

  onOperacao(){
    if(this.route.snapshot.url[0].path == "editar"){
      this.editar = true;
    }
    else if (this.route.snapshot.url[0].path == "adicionar"){
      this.salvar = true;
    }
  }
}
