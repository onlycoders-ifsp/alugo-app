import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eCategorias } from 'src/app/entidades/eCategorias';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';
import { produtoService } from 'src/app/Services/produtoService';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-todos-produtos',
  templateUrl: './todos-produtos.component.html',
  styleUrls: ['./todos-produtos.component.css']
})
export class TodosProdutosComponent implements OnInit {
  @Input() someInput: string;


  produtos: eProduto[] = [];
  categorias: eCategorias[] = [];
  currentProduto: eProduto;

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  txtPesquisaproduto: string;
  semProduto: boolean = false;
  public page: number = 0;
  public size: number = 20;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;
  
  constructor(
    private router: Router,
    private portalService: PortalService,
    private produtoService: produtoService,
    private idiService: idiomaService,
    private produtoS: produtoService,
    private auth: AuthService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
  }

  setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.ngOnInit();

  }

  ngOnInit(): void {
    if (!this.auth.isAutenticado()){
      this.auth.removeToken();
    }

    this.getListaCategorias();
    this.currentProduto = new eProduto();
    
    if (localStorage.getItem("txtPesquisaProduto")) {
      this.txtPesquisaproduto = localStorage.getItem("txtPesquisaProduto");
      this.produtoS.getProdutosByPesquisa(localStorage.getItem("txtPesquisaProduto"),this.page,this.size).subscribe(response => {
        this.produtos = response['content'];
        this.pages = response['totalPages'];
        this.firstPage = response['first'];
        this.lastPage = response['last'];
        this.total = response['totalElements'];
        if(this.total == 0){
          this.semProduto = true;
        }else{
          this.semProduto = false;
        }
        localStorage.removeItem("txtPesquisaProduto");
      }, errorResponse => {
        console.log(errorResponse);
      })
    } else {
      this.portalService.getProdutos(this.page,this.size).subscribe(resposta => {
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

  getListaCategorias(){
    this.produtoService.getCategorias().subscribe(resposta => {
      console.log(resposta)
      this.categorias = resposta;
      errorResponse => {
        console.log(errorResponse);
      }
    });
  }

  ngOnChanges(){
    this.currentProduto = new eProduto();
    if (localStorage.getItem("txtPesquisaProduto")) {
      this.txtPesquisaproduto = localStorage.getItem("txtPesquisaProduto");
      this.produtoS.getProdutosByPesquisa(localStorage.getItem("txtPesquisaProduto"),this.page,this.size).subscribe(response => {
        this.produtos = response['content'];
        this.pages = response['totalPages'];
        this.firstPage = response['first'];
        this.lastPage = response['last'];
        this.total = response['totalElements'];
        if(this.total == 0){
          this.semProduto = true;
        }else{
          this.semProduto = false;
        }
        localStorage.removeItem("txtPesquisaProduto");
      }, errorResponse => {
        console.log(errorResponse);
      })
    } else {
      this.portalService.getProdutos(this.page,this.size).subscribe(resposta => {
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

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  verProdutoDeslogado(itemSelecionado: eProduto){
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
