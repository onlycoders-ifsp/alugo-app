import { Component, OnInit } from '@angular/core';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-credenciais',
  templateUrl: './cliente-credenciais.component.html',
  styleUrls: ['./cliente-credenciais.component.css']
})
export class ClienteCredenciaisComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  
  constructor(
    private idiService: idiomaService,
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
