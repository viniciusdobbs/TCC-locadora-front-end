import { Jogos } from './../../jogos/model/jogos';
import { Clientes } from './../../clientes/model/clientes';

export interface Locacao {
  idLocacao: String;
  valor: number;
  dia: number;
  cliente: Clientes;
  jogo: Jogos;
  dataDevolucao: Date;
  dataLocacao: Date;
}
