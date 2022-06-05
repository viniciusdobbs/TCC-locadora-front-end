import { Funcionarios } from './../../funcionarios/model/funcionarios';
import { Jogos } from './../../jogos/model/jogos';
import { Clientes } from './../../clientes/model/clientes';

export interface Locacao {
  valor: number;
  dia: number;
  cliente: Clientes;
  funcionario: Funcionarios
  jogo: Jogos;
}
