import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { eProduto } from 'src/app/entidades/eProduto';
import { PortalService } from 'src/app/Services/PortalService';
import { TranslateService } from '@ngx-translate/core';
import { eResponseProdutos } from 'src/app/entidades/eResponseProdutos';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: eResponseProdutos[] = [];
  currentProduto: eProduto;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  idiomaSelecionado: string;


  constructor(
    private router : Router,
    private portalService: PortalService,
    private idiService: idiomaService,
    ) {   
      this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
      }

  ngOnInit(): void {
    this.currentProduto = new eProduto();
    this.portalService.getProdutos().subscribe(resposta => {
      this.produtos = resposta;
      console.log(this.produtos)},
      errorResponse => {
        console.log(errorResponse)
      });

    // let browserlang = this.translateService.getBrowserLang();
    // if (this.langs.indexOf(browserlang) > -1) {
    //   this.translateService.setDefaultLang(browserlang);
    // } else {
    //   this.translateService.setDefaultLang('pt-br');
    // }
    
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  exibeDetalhesModal(itemSelecionado : eResponseProdutos){
    this.currentProduto = itemSelecionado.produto;
    console.log(this.currentProduto)
  }


  verProdutoDeslogado(itemSelecionado : eResponseProdutos){
    window.sessionStorage.setItem('idUsuario', itemSelecionado.id_usuario);
    window.sessionStorage.setItem('idProduto', itemSelecionado.produto.id_produto);
    this.router.navigate(['/detalhe-produto']);
  }

  verListaProdutos(){
    this.router.navigate(['/list-all']);
  }
  VerPerfil(){
    this.router.navigate(['/cliente/perfil']);
  }
  verMeuProduto(){
    this.router.navigate(['/cliente/produto']);
  }
  voltaHome(){
    this.router.navigate(['']);
  }
}

