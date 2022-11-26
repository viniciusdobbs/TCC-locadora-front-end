import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      rg: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      endereco: [null, Validators.required],
      salarioFunc: [null, Validators.required]
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
        complete: () => console.info('Funcionário salvo')
      });
    }
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

  onEdit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => console.info('Funcionário salvo')
      });
      console.log(this.route.snapshot.url[1].path)
    }
  }

  onOperacao() {
    if (this.route.snapshot.url[0].path == "editar") {
      this.editar = true;
      this.service.loadByID(this.route.snapshot.url[1].path).subscribe(
        (data) => {
          this.form.patchValue({
            nome: data.nome,
            cpf: data.cpf,
            rg: data.rg,
            email: data.email,
            endereco: data.endereco,
            salarioFunc: data.salarioFunc
          })
        }
      );
    }
    else if (this.route.snapshot.url[0].path == "adicionar") {
      this.salvar = true;
    }
  }
}
