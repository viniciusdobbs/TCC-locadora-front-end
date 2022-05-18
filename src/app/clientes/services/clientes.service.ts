import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Clientes } from './../model/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = '/api/clientes';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Clientes[]>(this.API).
    pipe(
      first(),
      tap(clientes => console.log(clientes))
    );
  }

  save(record: Clientes) {
    return this.httpClient.post<Clientes>(this.API, record).pipe(first());
  }


  loadByID(id: string) {
    return this.httpClient.get<Clientes>(`${this.API}/${id}`).pipe(first());
  }

  update(cliente: Clientes, id: Clientes["idPessoa"]) {
    return this.httpClient.put(`${this.API}/${id}`, cliente).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`, {responseType: 'text'}).pipe(first());
    console.log(id);
  }

}
