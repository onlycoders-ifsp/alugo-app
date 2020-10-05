import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { eProduto } from 'src/app/entidades/eProduto';
import { PortalService } from 'src/app/Services/PortalService';
import { TranslateService } from '@ngx-translate/core';
import { eResponseProdutos } from 'src/app/entidades/eResponseProdutos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  langs = ['pt-br', 'en-us'];
  produtos: eResponseProdutos[] = [];
  currentProduto: eProduto;

  constructor(
    private router : Router,
    private portalService: PortalService,
    private translateService: TranslateService
    ) { }

  ngOnInit(): void {
    this.currentProduto = new eProduto();
    this.portalService.getProdutos().subscribe(resposta => {
      this.produtos = resposta;
      console.log(this.produtos)},
      errorResponse => {
        console.log(errorResponse)
      });

    let browserlang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserlang) > -1) {
      this.translateService.setDefaultLang(browserlang);
    } else {
      this.translateService.setDefaultLang('pt-br');
    }
    
  }

  exibeDetalhesModal(itemSelecionado : eResponseProdutos){
    console.log(itemSelecionado);
    console.log("retorno acima")
    this.currentProduto = itemSelecionado.produto;
    console.log(this.currentProduto)
  }

  public useLanguage(lang: string): void {
    this.translateService.setDefaultLang(lang);
  }


  verProdutoDeslogado(){
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

