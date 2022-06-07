import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Locacao } from '../model/locacao';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {

  private readonly API = '/api/locacao';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Locacao[]>(this.API).
    pipe(
      first(),
      tap(locacao => console.log(locacao))
    );
  }

  save(record: Locacao) {
    return this.httpClient.post<Locacao>(this.API, record).pipe(first());
  }

  update(locacao: Locacao, id: Locacao["idLocacao"]) {
    return this.httpClient.put(`${this.API}/${id}`, locacao).pipe(first());
  }
}
