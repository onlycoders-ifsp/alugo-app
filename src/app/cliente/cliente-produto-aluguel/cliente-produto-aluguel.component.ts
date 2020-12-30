import { Component, OnInit } from '@angular/core';
import { eAluguel } from 'src/app/entidades/eAluguel';
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

  alugueisProduto: eAluguel[] = [];

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;

  constructor(
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService,
    public errorRequest: errorRequestService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    if (!this.AuthService.isAutenticado()){
      this.AuthService.encerraSessao();
    }
    this.getListaAlugueisProduto();
  }

  getListaAlugueisProduto(){
    this.aluguelService.getListAluguelProduto(localStorage.getItem("idProduto")).subscribe(resposta => {
      this.alugueisProduto = resposta;
      errorResponse => {
        console.log(errorResponse);
      }
    });
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
