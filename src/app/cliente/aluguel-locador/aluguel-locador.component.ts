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
  public page: number = 0;
  public size: number = 10;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number;
  
  constructor(
    private idiService: idiomaService,
    private aluguelService: AluguelService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

   setPage(i,event:any){
    event.preventDefault();
    this.page = i;
    this.ngOnInit();

  }
  ngOnInit(): void {
    this.getListaAlugueisLocador();
  }


  getListaAlugueisLocador(){
    this.aluguelService.getListAluguelLocador(this.page,this.size).subscribe(resposta => {
      this.alugueisLocador = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
