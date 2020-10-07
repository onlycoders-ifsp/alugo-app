import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { eCurrentUsuario } from 'src/app/entidades/eCurrentUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css']
})
export class PortalLayoutComponent implements OnInit {

  isLogado: boolean = false;

  currentUser: eCurrentUsuario;
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private auth: AuthService
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

  logaUsuario(){
    this.currentUser.isLogado = true;
    this.currentUser.cep = '09551-000'
    this.currentUser.cpf = '123.456.789-0'
    this.currentUser.data_nascimento = new Date();
    this.currentUser.email = 'dilan.lima@gmail.com'
    this.currentUser.id = 1;
    this.currentUser.login = 'dilanlima'
    this.currentUser.logradouro = 'rua cunha'
    this.currentUser.nome = 'Dilósvky'
    this.currentUser.numero = '321'
    window.sessionStorage.setItem('hasUsuario', 'true');
    // this.currentUser.perfil = enumPerfil.Cliente;
    // console.log(this.currentUser.perfil);
  }

}
