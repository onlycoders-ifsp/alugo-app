import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-admin-layout',
  templateUrl: 'admin-layout.component.html',
  styleUrls: ['admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  
  constructor(
    private router: Router,
    private idiService: idiomaService,
  ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  listaUsuarios(){
    this.router.navigate(['/usuarios/lista']);
  }

  novoUsuario(){
    this.router.navigate(['/usuarios/cad']);
  }

}
