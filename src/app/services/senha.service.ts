import { Injectable } from '@angular/core';
import { Iticket }from './ticket'
@Injectable({
  providedIn: 'root'
})
export class SenhaService {
 
  senhaRecente: string = "";
  senhasChamadas: Senha[] = []; 
  senhasNaoChamadas: Senha[] = [];
  
  senhasGerais: Senha[] = []
  senhasExames: Senha[] = []
  senhasPrioridades: Senha[] = []

  
  Senha: any;
  senhasGeraisAtendidas: Senha[] = []
  senhasExamesAtendidas: Senha[] = []
  senhasPrioridadesAtedidas: Senha[] = []

  constructor() { }

  // Função para gerar uma senha com base no tipo (SP, SG, SE)
  gerarNomeDeSenha(tipo: string):string {
  
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    const nomeSenha = `${day}${month}${year}-${tipo}${hour}${minute}${second}`
    const atendida:boolean = false
   
    return nomeSenha;

  }
  ordenarSenhas() {
    // Ordenar as senhas não chamadas pela categoria e pela data de emissão
    this.senhasNaoChamadas.sort((a, b) => {
        // Comparar a categoria das senhas
        if (a.categoria !== b.categoria) {
            return a.categoria.localeCompare(b.categoria);
        }

        // Se as categorias forem iguais, comparar as datas de emissão das senhas
        return a.dataEmissao.getTime() - b.dataEmissao.getTime();
    });
}

  adicionarSenhaNaoChamada(categoria: string) {
    let nomeSenha:string = this.gerarNomeDeSenha(categoria);
    let dataEmissao:Date = new Date()
    let senha = new Senha(nomeSenha,categoria,dataEmissao)
    this.senhasNaoChamadas.push(senha);
    if (categoria == "SG") {
      this.senhasGerais.push(new Senha(nomeSenha, categoria, dataEmissao));
      console.log(this.senhasGerais);
  }
  if (categoria == "SP") {
      this.senhasPrioridades.push(new Senha(nomeSenha, categoria, dataEmissao));
      console.log(this.senhasPrioridades);
  }
  if (categoria == "SE") {
      this.senhasExames.push(new Senha(nomeSenha, categoria, dataEmissao));
      console.log(this.senhasExames);
  }
  }

  
  chamarProximaSenha() {
    if (this.senhasNaoChamadas.length === 0) {
      console.log("Não há mais senhas disponíveis.");
      return;
    }
    
    let senha:Senha = this.senhasNaoChamadas.shift()!;
    this.senhasChamadas.push(senha);
    this.senhaRecente = senha.nome
  
  }

  obterUltimasSenhasChamadas() {
    let SenhasChamadasObjeto= this.senhasChamadas.slice(-5);
    let SenhasChamadasString:string[] = SenhasChamadasObjeto.map((elemento)=>{return elemento.nome})
    SenhasChamadasString.reverse()
    return SenhasChamadasString
  }


  }
  
 export class Senha implements Iticket{

nome: string = "";
categoria:string = "";
atendido:boolean = false
dataEmissao:Date
constructor(nome: string, categoria:string, dataEmissao:Date){
    this.nome = nome
    this.categoria = categoria
    this.dataEmissao = dataEmissao
  }


}
