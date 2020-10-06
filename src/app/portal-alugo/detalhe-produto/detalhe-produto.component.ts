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

  responseProduto: eResponseProdutos = new eResponseProdutos();
  constructor(
    private portalService : PortalService
  ) { }

  ngOnInit(): void {
    console.log(window.sessionStorage.getItem('idProduto'));
    console.log(window.sessionStorage.getItem('idUsuario'))

    this.portalService
      .getProdutoById(window.sessionStorage.getItem('idProduto'), window.sessionStorage.getItem('idUsuario'))
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
