import { Component, OnInit } from '@angular/core';
import { eProduto } from 'src/app/entidades/eProduto';
import { AdminService } from 'src/app/Services/AdminService';
import { PortalService } from 'src/app/Services/PortalService';
import { produtoService } from 'src/app/Services/produtoService';

@Component({
  selector: 'app-admin-gerencia-produtos',
  templateUrl: './admin-gerencia-produtos.component.html',
  styleUrls: ['./admin-gerencia-produtos.component.css']
})
export class AdminGerenciaProdutosComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private produtosService: produtoService,
    private portalService: PortalService
  ) { }

  produtos: eProduto[] = [];
  semProduto: boolean = false;
  public page: number = 0;
  public size: number = 21;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;

  ngOnInit(): void {

    this.adminService.getProdutosNaoPublicados(this.page,this.size).subscribe(resposta => {
      this.produtos = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];
  },
  errorResponse => {
    console.log(errorResponse)
  });
    
  }

}
