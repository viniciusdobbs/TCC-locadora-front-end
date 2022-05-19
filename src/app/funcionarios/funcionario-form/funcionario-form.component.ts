import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from './../services/funcionarios.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {

  form: FormGroup;
  salvar = false;
  editar = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: FuncionariosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nome: [null],
      cpf: [null],
      rg: [null],
      email: [null],
      endereco: [null],
      salarioFunc: [null]
    });
  }

  ngOnInit(): void {
    this.onOperacao();
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Funcionário salvo')
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Funcionário salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar funcionário.', '', { duration: 5000 });
    console.log("erro");
  }

  onEdit(){
    this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
      complete: () => console.info('Funcionário salvo')
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
