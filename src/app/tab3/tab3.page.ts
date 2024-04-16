import { Senha } from './../services/senha.service';
import { SenhaService } from 'src/app/services/senha.service';
import { Component } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public SenhaService:SenhaService) {}

contarSenhasEmitidas(){
  const contador = this.SenhaService.senhasNaoChamadas.length + this.SenhaService.senhasChamadas.length;
  return contador;
}
contarSenhasAtendidas(): number {
  return this.SenhaService.senhasChamadas.length;
}



contadorSG: number = 0;
contadorSP: number = 0;
contadorSE: number = 0;



ngOnInit() {
  this.contarSenhaTipo();
}

contarSenhaTipo() {
  this.SenhaService.todasSenhas.forEach(element => {
    const categoria = (element as any).categoria;

    if (categoria === "SG") {
      this.contadorSG++;
    } else if (categoria === "SP") {
      this.contadorSP++;
    } else if (categoria === "SE") {
      this.contadorSE++;
    }
  });
}

}