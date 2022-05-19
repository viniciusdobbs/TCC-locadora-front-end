import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Funcionarios } from './../model/funcionarios';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private readonly API = '/api/funcionarios';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Funcionarios[]>(this.API).
    pipe(
      first(),
      tap(funcionarios => console.log(funcionarios))
    );
  }

  save(record: Funcionarios) {
    return this.httpClient.post<Funcionarios>(this.API, record).pipe(first());
  }


  loadByID(id: string) {
    return this.httpClient.get<Funcionarios>(`${this.API}/${id}`).pipe(first());
  }

  update(funcionarios: Funcionarios, id: Funcionarios["idPessoa"]) {
    return this.httpClient.put(`${this.API}/${id}`, funcionarios).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`, {responseType: 'text'}).pipe(first());
    console.log(id);
  }
}
