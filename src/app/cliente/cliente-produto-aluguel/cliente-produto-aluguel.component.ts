import { Component, OnInit } from '@angular/core';
import { eAluguelDetalhe } from 'src/app/entidades/eAluguelDetalhe';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { errorRequestService } from 'src/app/Services/errorRequestService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service'

@Component({
  selector: 'app-cliente-produto-aluguel',
  templateUrl: './cliente-produto-aluguel.component.html',
  styleUrls: ['./cliente-produto-aluguel.component.css']
})
export class ClienteProdutoAluguelComponent implements OnInit {

  alugueisProduto: eAluguelDetalhe[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  public page: number = 0;
  public size: number = 5;
  public pages:number;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;

  constructor(
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService,
    public errorRequest: errorRequestService
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
      this.AuthService.encerraSessao();
    }
    this.getListaAlugueisProduto();
  }

  getListaAlugueisProduto(){
    this.aluguelService.getListAluguelProduto(localStorage.getItem("idProduto")).subscribe(resposta => {
      this.alugueisProduto = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];
      errorResponse => {
        console.log(errorResponse);
      }
    });
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
