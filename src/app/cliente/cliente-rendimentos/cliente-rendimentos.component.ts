import { Component, OnInit } from '@angular/core';
import { eExtrato } from 'src/app/entidades/eExtratoLocador';
import { eResumoExtrato } from 'src/app/entidades/eResumoExtrato';
import { AluguelService } from 'src/app/Services/AluguelService';

@Component({
  selector: 'app-cliente-rendimentos',
  templateUrl: './cliente-rendimentos.component.html',
  styleUrls: ['./cliente-rendimentos.component.css']
})
export class ClienteRendimentosComponent implements OnInit {

  public extrato: eExtrato[] = []; 
  public extratoResumo: eResumoExtrato = new eResumoExtrato();

  public page: number = 0;
  public size: number = 20;
  public pages:number;
  public totalAlugueis:number = 0;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;
  public decimal:number = 0;
  
  constructor(private aluguelService: AluguelService) { }

  ngOnInit(): void {
    this.getExtradoUsuario();
    this.getResumoExtradoUsuario();
  }


  getExtradoUsuario(){
    this.aluguelService.getExtrato().subscribe(
      response => {
        this.extrato = response['content'];
        this.pages = response['totalPages'];
        this.firstPage = response['first'];
        this.lastPage = response['last'];
        this.total = response['totalElements'];

        console.log(this.extrato)
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

  getResumoExtradoUsuario(){
    this.aluguelService.getResumoExtrato().subscribe(
      response => {
        this.extratoResumo = response;
        //this.extratoResumo.total = (Math.round(this.extratoResumo.total * 100) / 100).toFixed(2);
        let int = this.extratoResumo.valor_a_receber;
        //this.decimal = (this.extratoResumo.valor_a_receber % 1).toFixed(4).substring(2)
        console.log((Math.round(this.extratoResumo.total * 100) / 100).toFixed(2))
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

  sacar(){
    
  }

}
