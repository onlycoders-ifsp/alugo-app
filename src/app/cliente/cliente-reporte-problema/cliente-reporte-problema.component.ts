import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { eTipoProblema } from 'src/app/entidades/eTipoProblema';
import { AluguelService } from 'src/app/Services/AluguelService';

@Component({
  selector: 'app-cliente-reporte-problema',
  templateUrl: './cliente-reporte-problema.component.html',
  styleUrls: ['./cliente-reporte-problema.component.css']
})
export class ClienteReporteProblemaComponent implements OnInit {

  
  tiposProblema: eTipoProblema[] = [];

  htmlAluguel: SafeHtml;

  constructor(private aluguelService: AluguelService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("aluguelSession")){
      this.htmlAluguel = this.sanitizer.bypassSecurityTrustHtml(sessionStorage.getItem("aluguelSession"));
    }
    this.getListaTipoProblemas();
  }

  loadAluguel(){

  }
  
  getListaTipoProblemas(){
    this.aluguelService.getTipoProblemas().subscribe(resposta => {
      this.tiposProblema = resposta;
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }

}
