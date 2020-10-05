import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { eProduto } from 'src/app/entidades/eProduto';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: eProduto[] = [];

  constructor(
    private router : Router,
    private portalService: PortalService,
    ) { }

  ngOnInit(): void {
    this.portalService.getProdutos().subscribe(resposta => {
      this.produtos = resposta;
      console.log(this.produtos)},
      errorResponse => {
        console.log(errorResponse)
      });
    
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

