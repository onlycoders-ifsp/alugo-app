import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { eResponseProdutos } from 'src/app/entidades/eResponseProdutos';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {
  id_produto: string;
  id_usuario: string;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  produtoI: eProduto;
  

  responseProduto: eProduto;
  
  constructor(
    private portalService : PortalService,
    private idiService: idiomaService,
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas(),
    this.id_produto = window.sessionStorage.getItem('idProduto');
    console.log(this.id_produto);
    window.sessionStorage.removeItem('idUsuario'),

    this.portalService
    .getProdutoById(this.id_produto)
    .subscribe( 
      response => {
        this.responseProduto = response;
        console.log(this.responseProduto);
      },
      errorResponse => {
        console.log(errorResponse)
      });
    
   }

  ngOnInit(): void {
    
    
  }
  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
