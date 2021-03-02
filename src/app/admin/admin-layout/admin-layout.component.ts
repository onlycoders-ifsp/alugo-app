import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';
import * as $ from 'jquery';
import { AuthService } from 'src/app/Services/auth.service';
import { eUsuario } from 'src/app/entidades/eUsuario';

@Component({
  selector: 'app-admin-layout',
  templateUrl: 'admin-layout.component.html',
  styleUrls: ['admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  currentUsuario: eUsuario;
  
  constructor(
    private router: Router,
    private idiService: idiomaService,
    private auth: AuthService
  ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
    this.getInfUserLogado();

  }

  getInfUserLogado(){
    this.auth.getCurrentUserLogado().subscribe(resposta => {
      this.currentUsuario = resposta;
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }

  // clickMudaIdioma() {
  //   this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  // }

  // listaUsuarios(){
  //   this.router.navigate(['/usuarios/lista']);
  // }

  // novoUsuario(){
  //   this.router.navigate(['/usuarios/cad']);
  // }

}
