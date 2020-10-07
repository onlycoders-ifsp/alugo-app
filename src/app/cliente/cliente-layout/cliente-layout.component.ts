import { Component, OnInit } from '@angular/core';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-layout',
  templateUrl: 'cliente-layout.component.html',
  styleUrls: ['cliente-layout.component.css']
})
export class ClienteLayoutComponent implements OnInit {

  Produtos: eProduto[] = [];
  produto1: eProduto;
  produto2: eProduto;
  produto3: eProduto;

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;



  constructor( private idiService: idiomaService, ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void { 
    this.Produtos.push(this.produto1);
    this.Produtos.push(this.produto2);
    this.Produtos.push(this.produto3);
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
