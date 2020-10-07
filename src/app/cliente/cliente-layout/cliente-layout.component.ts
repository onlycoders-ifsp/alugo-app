import { Component, OnInit } from '@angular/core';
import { eObjetoUsuario } from 'src/app/entidades/eObjetoUsuario';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';

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



  constructor( 
    private idiService: idiomaService,
    private auth: AuthService 
    ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas(),
    this.currentUsuario = new eUsuario();
    this.auth.getUserByLogin().subscribe(resposta => {
      this.currentUsuario = resposta;
      console.log(this.currentUsuario);
      console.log(this.currentUsuario.nome);
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }

  ngOnInit(): void { 
    
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
