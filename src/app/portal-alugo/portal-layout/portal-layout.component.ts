import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { eCurrentUsuario } from 'src/app/entidades/eCurrentUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';
import { produtoService } from 'src/app/Services/produtoService';
import { TodosProdutosComponent } from '../todos-produtos/todos-produtos.component';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css']
})
export class PortalLayoutComponent implements OnInit {


  currentUser: eCurrentUsuario;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  txtPesquisa: string = "";
  @ViewChild('TodosProdutosComponent') childComponent: TodosProdutosComponent
  

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private auth: AuthService,
    private produtoService: produtoService
  ) {
    this.currentUser = new eCurrentUsuario();
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas();
    
   }

  ngOnInit(): void {
    this.currentUser.isLogado = this.auth.isAutenticado();
    this.currentUser.nome = this.auth.getUsuarioAutenticado();
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  pesquisaProduto(){

    localStorage.setItem("txtPesquisaProduto", this.txtPesquisa)
    
    this.router.navigate(["/redirect"])
    this.refreshChild();
  }

  refreshChild() { 
    this.childComponent.ngOnInit(); 
  }
}
