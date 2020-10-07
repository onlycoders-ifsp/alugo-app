import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { eResponseProdutos } from 'src/app/entidades/eResponseProdutos';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-detalhe-produto',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.css']
})
export class DetalheProdutoComponent implements OnInit {
  private id_produto: string;
  private id_usuario: string;

  responseProduto: eResponseProdutos = new eResponseProdutos();
  constructor(
    private portalService : PortalService
  ) { }

  ngOnInit(): void {

    this.id_produto = window.sessionStorage.getItem('idProduto');
    window.sessionStorage.removeItem('IdProduto')
    this.id_produto = window.sessionStorage.getItem('idUsuario');
    window.sessionStorage.removeItem('idUsuario')

    console.log("idproduto = " + this.id_produto);
    this.portalService
      .getProdutoById(this.id_produto, this.id_usuario)
      .subscribe( 
        response => {
          this.responseProduto = response
          console.log(this.responseProduto)
        },
        errorResponse => {
          console.log(errorResponse)
        });
  }

}
