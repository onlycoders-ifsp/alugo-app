import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {

  Produtos: eProduto[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  mensagemSucessoProduto: string = null;
  public page: number = 0;
  public size: number = 5;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private auth: AuthService,
    private portalService: PortalService
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
    this.getListaProdutosUsuario()
    if(localStorage.getItem("produtoInputadoSucesso")){
      this.mensagemSucessoProduto = localStorage.getItem("produtoInputadoSucesso");
      localStorage.removeItem("produtoInputadoSucesso");
    }


  }

  getListaProdutosUsuario(){
    this.portalService.getProdutosUsuarioLogado(this.page,this.size).subscribe(resposta => {
      this.Produtos = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];
      errorResponse => {
        console.log(errorResponse)
      }
    });
    this.portalService.getProdutosUsuarioLogado(this.page,this.size)
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
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
  verMeuProduto(idProduto: string){
    localStorage.setItem("idProdutoMudanca", idProduto)
    this.router.navigate(['cliente/perfil/produto']);
  }
  novoProduto(){
    localStorage.removeItem("idProdutoMudanca")
    this.router.navigate(['cliente/perfil/produto']);
  }
  voltaHome(){
    this.router.navigate(['']);
  }

}
