import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  Produtos: eProduto[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private portalService: PortalService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    this.getListaProdutosUsuario()


  }

  getListaProdutosUsuario(){
    this.portalService.getProdutosUsuarioLogado().subscribe(resposta => {
      this.Produtos = resposta;
      console.log(this.Produtos)
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.portalService.getProdutosUsuarioLogado()
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
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
    this.router.navigate(['cliente/perfil/produto']);
  }
  voltaHome(){
    this.router.navigate(['']);
  }

}
