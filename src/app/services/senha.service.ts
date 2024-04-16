import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  id:number = 0;
  senhaRecente: string = "";
  senhasChamadas: string[] = []; 
  senhasNaoChamadas: string[] = [];
  senhasExamesAtendidas: string[] =[];
  todasSenhas:object[] = []
  Senha: any;
  // senhasChamadas: string[] = 



  
  constructor() { }

  // Função para gerar uma senha com base no tipo (SP, SG, SE)
  gerarSenha(tipo: string) {
  
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);
    const senha = `${year}${month}${day}-${tipo}${hour}${minute}${second}`
    const atendida:boolean = false
    let novaSenha:Senha = new Senha(this.id++, tipo,senha, atendida)
    this.todasSenhas.push(novaSenha)
    console.log(this.todasSenhas)
    return senha;
  }



  // Função para adicionar uma senha não chamada ao array
  adicionarSenhaNaoChamada(tipo: string) {
    const senha = this.gerarSenha(tipo);
    this.senhasNaoChamadas.push(senha);
  }

  // Função para chamar a próxima senha
  chamarProximaSenha() {
    if (this.senhasNaoChamadas.length === 0) {
      console.log("Não há mais senhas disponíveis.");
      return;
    }
    const senha = this.senhasNaoChamadas.shift()!;
    this.senhasChamadas.push(senha);
    this.senhaRecente = senha
  
  }

  // Função para obter as últimas senhas chamadas
  obterUltimasSenhasChamadas() {
    
    return this.senhasChamadas.slice(-5);
  }

  

  }
  
 export class Senha{

public id:number = 0;
public categoria:string = "";
public nome:string = ""
public atendida:boolean = false;
constructor(id:number, categoria:string, nome:string, atendida:boolean){
  this.id= id;
  this.categoria = categoria;
  this.nome = nome;
  this.atendida = atendida;
  }
}
