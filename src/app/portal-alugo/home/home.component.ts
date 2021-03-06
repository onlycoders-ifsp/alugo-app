import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { PortalService } from 'src/app/Services/PortalService';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificacaoService } from 'src/app/Services/notificacaoService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: eProduto[] = [];
  currentProduto: eProduto;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  idiomaSelecionado: string;
  public page: number = 0;
  public size: number = 4;

  constructor(
    private router : Router,
    private portalService: PortalService,
    private idiService: idiomaService,
    private AuthService: AuthService,
    private notificacaoService: NotificacaoService
    ) {   
      this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
      }

  ngOnInit(): void {  
    if (!this.AuthService.isAutenticado()){
      this.AuthService.removeToken();
    }
    this.portalService.getProdutos(this.page,this.size).subscribe(resposta => {
      this.produtos = resposta['content'];},
      errorResponse => {
        console.log(errorResponse)
      });

    
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  exibeDetalhesModal(itemSelecionado : eProduto){
    this.currentProduto = itemSelecionado;
  }


  verProdutoDeslogado(itemSelecionado : eProduto){
    window.sessionStorage.setItem('idUsuario', itemSelecionado.id_usuario);
    window.sessionStorage.setItem('idProduto', itemSelecionado.id_produto);
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

