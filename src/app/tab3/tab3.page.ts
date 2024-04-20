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

}


