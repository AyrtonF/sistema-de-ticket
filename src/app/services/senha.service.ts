import { Injectable } from '@angular/core';
import { Iticket }from './Iticket'
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
  senhasPrioridadesAtendidas: Senha[] = []


  constructor() { }

  
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
   ordenarSenhas(senhasNaoChamadas:Senha[]) {
    senhasNaoChamadas.sort((a,b)=>{
      if (a.categoria !== b.categoria) { //Se forem de categorias diferentes
        const priority: { [key: string]: number } = { 'SP': 1, 'SE': 2, 'SG': 3 };
        let priorityComparison = priority[a.categoria] - priority[b.categoria];
        if (priorityComparison !== 0) {
          return priorityComparison;
        } else {
          
            return a.dataEmissao.getTime() - b.dataEmissao.getTime();
        }
      }
      return a.dataEmissao.getTime() - b.dataEmissao.getTime();
    
      })
   
 
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
    let verificador:boolean = false
    
    this.ordenarSenhas(this.senhasNaoChamadas)
   let senha:Senha = this.senhasNaoChamadas.shift()!;
   
   if (senha.categoria == "SG") {
    this.senhasGeraisAtendidas.push(new Senha(senha.nome, senha.categoria, senha.dataEmissao));
}
if (senha.categoria == "SP") {
    this.senhasPrioridadesAtendidas.push(new Senha(senha.nome, senha.categoria, senha.dataEmissao));
}
if (senha.categoria == "SE") {
    this.senhasExamesAtendidas.push(new Senha(senha.nome, senha.categoria, senha.dataEmissao));  
}
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
