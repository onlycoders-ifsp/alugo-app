import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  Produtos: eProduto[] = [];
  produto1: eProduto;
  produto2: eProduto;
  produto3: eProduto;

  constructor(
    private router: Router
  ) {
    this.produto1 = new eProduto();
    this.produto2 = new eProduto();
    this.produto3 = new eProduto();
   }

  ngOnInit(): void {
    this.produto1.id_produto = "1";
    this.produto1.nome = 'Fuzil de assalto';
    this.produto1.ganhos = 28;
    this.produto1.qtd_alugueis = 7;
    this.produto1.valorAluguel = 10;

    this.produto2.id_produto = "2";
    this.produto2.nome = 'Banheira';
    this.produto2.ganhos = 10;
    this.produto2.qtd_alugueis = 3;
    this.produto2.valorAluguel = 1967;

    this.produto3.id_produto = "3";
    this.produto3.nome = 'Mochila';
    this.produto3.ganhos = 5;
    this.produto3.qtd_alugueis = 1;
    this.produto3.valorAluguel = 123;

    this.Produtos.push(this.produto1);
    this.Produtos.push(this.produto2);
    this.Produtos.push(this.produto3);
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
