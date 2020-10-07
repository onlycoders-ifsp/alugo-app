import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-realiza-aluguel',
  templateUrl: './realiza-aluguel.component.html',
  styleUrls: ['./realiza-aluguel.component.css']
})
export class RealizaAluguelComponent implements OnInit {

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

}
