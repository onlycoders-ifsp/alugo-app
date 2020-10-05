import { Component, OnInit } from '@angular/core';
import { eProduto } from 'src/app/entidades/eProduto';

@Component({
  selector: 'app-cliente-layout',
  templateUrl: 'cliente-layout.component.html',
  styleUrls: ['cliente-layout.component.css']
})
export class ClienteLayoutComponent implements OnInit {

  Produtos: eProduto[] = [];
  produto1: eProduto;
  produto2: eProduto;
  produto3: eProduto;


  constructor(  ) { }

  ngOnInit(): void { 
    this.Produtos.push(this.produto1);
    this.Produtos.push(this.produto2);
    this.Produtos.push(this.produto3);
  }

}
