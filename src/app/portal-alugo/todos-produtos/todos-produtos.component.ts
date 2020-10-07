import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { eResponseProdutos } from 'src/app/entidades/eResponseProdutos';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-todos-produtos',
  templateUrl: './todos-produtos.component.html',
  styleUrls: ['./todos-produtos.component.css']
})
export class TodosProdutosComponent implements OnInit {

  produtos: eResponseProdutos[] = [];
  currentProduto: eProduto;
  
  constructor(
    private router: Router,
    private portalService: PortalService,
  ) { }

  ngOnInit(): void {
    this.currentProduto = new eProduto();
    this.portalService.getProdutos().subscribe(resposta => {
      this.produtos = resposta;
      console.log(this.produtos)},
      errorResponse => {
        console.log(errorResponse)
      });
  }


  verProdutoDeslogado(itemSelecionado: eResponseProdutos){
    console.log(itemSelecionado.produto.id_produto)
    window.sessionStorage.setItem('idProduto', itemSelecionado.produto.id_produto)
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
