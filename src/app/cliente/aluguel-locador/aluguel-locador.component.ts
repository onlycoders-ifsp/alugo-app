import { Component, OnInit } from '@angular/core';
import { eAluguel } from 'src/app/entidades/eAluguel';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-aluguel-locador',
  templateUrl: './aluguel-locador.component.html',
  styleUrls: ['./aluguel-locador.component.css']
})
export class AluguelLocadorComponent implements OnInit {

  alugueisLocador: eAluguel[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  
  constructor(
    private idiService: idiomaService,
    private aluguelService: AluguelService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    this.getListaAlugueisLocador();
  }


  getListaAlugueisLocador(){
    this.aluguelService.getListAluguelLocador().subscribe(resposta => {
      this.alugueisLocador = resposta;
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
