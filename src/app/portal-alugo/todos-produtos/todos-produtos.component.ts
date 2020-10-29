import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';
import { produtoService } from 'src/app/Services/produtoService';

@Component({
  selector: 'app-todos-produtos',
  templateUrl: './todos-produtos.component.html',
  styleUrls: ['./todos-produtos.component.css']
})
export class TodosProdutosComponent implements OnInit {

  produtos: eProduto[] = [];
  currentProduto: eProduto;

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  
  constructor(
    private router: Router,
    private portalService: PortalService,
    private idiService: idiomaService,
    private produtoS: produtoService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
    this.currentProduto = new eProduto();
    if (localStorage.getItem("txtPesquisaProduto")) {
      this.produtoS.getProdutosByPesquisa(localStorage.getItem("txtPesquisaProduto")).subscribe(response => {
        this.produtos = response;
        localStorage.removeItem("txtPesquisaProduto");
      }, errorResponse => {
        console.log(errorResponse);
      })
    } else {
      this.portalService.getProdutos().subscribe(resposta => {
        this.produtos = resposta;
        console.log(this.produtos)
      },
        errorResponse => {
          console.log(errorResponse)
        });
    }
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  verProdutoDeslogado(itemSelecionado: eProduto){
    console.log(itemSelecionado.id_produto)
    window.sessionStorage.setItem('idProduto', itemSelecionado.id_produto)
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
