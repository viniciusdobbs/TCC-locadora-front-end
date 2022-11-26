import { JogosService } from 'src/app/jogos/services/jogos.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogos } from '../model/jogos';

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
    private route: ActivatedRoute,
    private jogosService: JogosService
  ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      genero: [null, Validators.required],
      console: [null, Validators.required],
      preco: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.onOperacao();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.service.save(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => console.info('Jogo salvo')
      });
    }
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

  onEdit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => console.info('Jogo salvo')
      });
      console.log(this.route.snapshot.url[1].path)
    }
  }

  onOperacao() {
    if (this.route.snapshot.url[0].path == "editar") {
      this.editar = true;
      this.jogosService.loadByID(this.route.snapshot.url[1].path).subscribe(
        (data) => {
          this.form.patchValue({
            nome: data.nome,
            genero: this.genero(data.genero),
            console: this.console(data.console),
            preco: data.preco
          })
        }
      );
    }
    else if (this.route.snapshot.url[0].path == "adicionar") {
      this.salvar = true;
    }
  }

  genero(genero: any) {
    if(genero == 'ACAO'){ return '0'}
    if(genero == 'AVENTURA'){ return '1'}
    if(genero == 'RPG'){ return '2'}
    if(genero == 'SIMULACAO'){ return '3'}
    if(genero == 'PUZZLE'){ return '4'}
    if(genero == 'ESPORTE'){ return '5'}
    if(genero == 'ESTRATEGIA'){ return '6'}
    return -1;
  }

  console(console: any) {
    if(console == 'PS4'){ return '0'}
    if(console == 'XBOX'){ return '1'}
    if(console == 'XBOX'){ return '2'}
    if(console == 'PC'){ return '3'}
    return -1;
  }
}
