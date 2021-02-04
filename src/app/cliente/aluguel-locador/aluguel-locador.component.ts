import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eAluguel } from 'src/app/entidades/eAluguel';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { errorRequestService } from 'src/app/Services/errorRequestService';
import { idiomaService } from 'src/app/Services/idiomaService';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service'

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
  public total: number = 0;
  
  constructor(
    private router: Router,
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService,
    public errorRequest: errorRequestService,
    public dialog: MatDialog
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }
   
   openDialog(aluguelSelecionado:eAluguel) {
    this.dialog.open(DialogElementsExampleDialog,{
      data:{
        Nome:aluguelSelecionado.locatario.nome,
        Telefone:aluguelSelecionado.locatario.celular,
        Email:aluguelSelecionado.locatario.email
      }
    });
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
        console.log(errorResponse);
      }
    });
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  confirmarLocaisDesteAluguel(idAluguel: string){
    localStorage.setItem("idAluguel", idAluguel)
    this.router.navigate(['cliente/perfil/visualizacao-local-entrega']);
  }

}


@Component({
  selector: 'infos-Locatario',
  templateUrl: 'InfosLocatario.html',
})
export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data) {}
}