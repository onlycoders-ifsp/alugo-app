import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { eCurrentUsuario } from 'src/app/entidades/eCurrentUsuario';

@Component({
  selector: 'app-portal-layout',
  templateUrl: './portal-layout.component.html',
  styleUrls: ['./portal-layout.component.css']
})
export class PortalLayoutComponent implements OnInit {

  isLogado: boolean = false;

  currentUser: eCurrentUsuario;

  constructor(
    private router: Router
  ) {
    this.currentUser = new eCurrentUsuario();
   }

  ngOnInit(): void {
    if(!this.currentUser.isLogado){
      this.currentUser.isLogado = false;
    }
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
    // this.currentUser.perfil = enumPerfil.Cliente;
     this.router.navigate(['/cliente/perfil/dados']);
    // console.log(this.currentUser.perfil);
  }

}
