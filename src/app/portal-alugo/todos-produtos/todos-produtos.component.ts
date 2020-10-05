import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos-produtos',
  templateUrl: './todos-produtos.component.html',
  styleUrls: ['./todos-produtos.component.css']
})
export class TodosProdutosComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
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
