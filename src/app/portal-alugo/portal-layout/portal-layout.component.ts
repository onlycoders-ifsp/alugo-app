import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';
import { eCurrentUsuario } from 'src/app/entidades/eCurrentUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css']
})
export class PortalLayoutComponent implements OnInit {

  isLogado: boolean = false;

  currentUser: eCurrentUsuario;
  currentIdioma: string;
  currentBandeira: string;

  idiomas: iIdioma[] = [
    {id: 1, name: 'pt-br', bandeira: 'BR.png', displayNome: "Portuguese"},
    {id: 2, name: 'en-us', bandeira: 'US.png', displayNome: "English"},
    {id: 3, name: 'chi-zho', bandeira: 'CN.png', displayNome: "Chinese"},
  ];

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
    this.currentUser = new eCurrentUsuario();
    translate.setDefaultLang('pt-br');
    this.currentBandeira = 'BR.png'
   }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('usuario') == "true"){
      this.currentUser.isLogado = true;
    }else{
      this.currentUser.isLogado = false;
    }
  }

  setNewIdioma(){
    this.translate.use(this.currentIdioma);
    this.idiomas.forEach(element => {
      if(element.name == this.currentIdioma){
        this.currentBandeira = element.bandeira;
      }
    });
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
