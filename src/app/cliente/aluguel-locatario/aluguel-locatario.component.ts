import { Component, OnInit } from '@angular/core';
import { eAluguel } from 'src/app/entidades/eAluguel';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-aluguel-locatario',
  templateUrl: './aluguel-locatario.component.html',
  styleUrls: ['./aluguel-locatario.component.css']
})
export class AluguelLocatarioComponent implements OnInit {

  alugueisLocatario: eAluguel[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  public page: number = 0;
  public size: number = 10;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;
  
  constructor(
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService
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
      if (!this.AuthService.isAutenticado()){
      this.AuthService.encerrarSessao();
    }
    this.getListaAlugueisLocatario();
  }


  getListaAlugueisLocatario(){
    this.aluguelService.getListAluguelLocatario(this.page,this.size).subscribe(resposta => {
      this.alugueisLocatario = resposta['content'];
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
