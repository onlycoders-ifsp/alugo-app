import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-perfil',
  templateUrl: './cliente-perfil.component.html',
  styleUrls: ['./cliente-perfil.component.css']
})
export class ClientePerfilComponent implements OnInit {

  
idiomas: iIdioma[];
currentBandeira: string;
currentIdioma: string;

  constructor(private idiService: idiomaService,) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }
}
