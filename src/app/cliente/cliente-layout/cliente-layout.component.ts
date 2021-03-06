import { Component, OnInit } from '@angular/core';
import { eObjetoUsuario } from 'src/app/entidades/eObjetoUsuario';
import { eProduto } from 'src/app/entidades/eProduto';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';
import { PortalService } from 'src/app/Services/PortalService';

@Component({
  selector: 'app-cliente-layout',
  templateUrl: 'cliente-layout.component.html',
  styleUrls: ['cliente-layout.component.css']
})
export class ClienteLayoutComponent implements OnInit {


  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  currentUsuario: eUsuario;
  listProdutos: eProduto[] = [];
  public page: number = 0;
  public size: number = 5;
  public total: number;


  constructor( 
    private idiService: idiomaService,
    private auth: AuthService,
    private portalService: PortalService
    ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas(),
    this.currentUsuario = new eUsuario();
    this.getInfUserLogado();
  }

  ngOnInit(): void { 
    if (!this.auth.isAutenticado()){
      this.auth.encerraSessao();
    }
    this.getQtdeProdutosUserLogado();
  }

  getInfUserLogado(){
    this.auth.getCurrentUserLogado().subscribe(resposta => {
      this.currentUsuario = resposta;
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }

  getQtdeProdutosUserLogado(){
    this.portalService.getProdutosUsuarioLogado(this.page,this.size).subscribe(resposta => {
      this.listProdutos = resposta['content'];
      this.total = resposta['totalElements'];
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }


  logout(){
    this.auth.encerraSessao();
  }
  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
