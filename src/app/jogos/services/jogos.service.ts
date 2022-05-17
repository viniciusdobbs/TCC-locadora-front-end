import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap } from 'rxjs';
import { Jogos } from './../model/jogos';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  private readonly API = '/api/jogos';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Jogos[]>(this.API).
    pipe(
      first(),
      tap(jogos => console.log(jogos))
    );
  }

  save(record: Jogos) {
    return this.httpClient.post<Jogos>(this.API, record).pipe(first());
  }

  loadByID(id: string) {
    return this.httpClient.get<Jogos>(`${this.API}/${id}`).pipe(first());
  }

  private update(jogo: Jogos) {
    return this.httpClient.put(`${this.API}/${jogo.idJogo}`, jogo).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`, {responseType: 'text'}).pipe(first());
    console.log(id);
  }

}
