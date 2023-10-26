import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  form: UntypedFormGroup;
  salvar = false;
  editar = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      nome: [null, Validators.required],
      cpf: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])]
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
        complete: () => console.info('Cliente salvo')
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Cliente salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar cliente.', '', { duration: 5000 });
    console.log("erro");
  }

  onEdit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.service.update(this.form.value, this.route.snapshot.url[1].path).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
        complete: () => console.info('Cliente salvo')
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
            email: data.email,
          })
        }
      );
    }
    else if (this.route.snapshot.url[0].path == "adicionar") {
      this.salvar = true;
    }
  }
}
