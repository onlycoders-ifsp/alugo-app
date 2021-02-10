import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eAluguel } from 'src/app/entidades/eAluguel';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';

declare function pagar(): any;

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
    private router: Router,
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService,
    public dialog: MatDialog
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }
   
   openDialog(aluguelSelecionado:eAluguel) {
    this.dialog.open(DialogElementsExampleDialog,{
      data:{
        Nome:aluguelSelecionado.locador.nome,
        Telefone:aluguelSelecionado.locador.celular,
        Email:aluguelSelecionado.locador.email
      }
    });
  }

  openDialogDetalhesStatus(aluguelSelecionado:eAluguel) {
    this.dialog.open(DialogStatusAluguel,{
      data:{
        NomeCara:aluguelSelecionado.locador.nome,
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
    this.getListaAlugueisLocatario();
  }


  getListaAlugueisLocatario(){
    this.aluguelService.getListAluguelLocatario(this.page,this.size).subscribe(resposta => {
      console.log(this.alugueisLocatario.length)
      if(this.alugueisLocatario.length!=0){
        for (let item of resposta['content']) {
          this.alugueisLocatario.push(item);
        }
      }else{
        this.alugueisLocatario = resposta['content'];
      }
      // this.alugueisLocatario = resposta['content'];
      this.pages = resposta['totalPages'];
      this.firstPage = resposta['first'];
      this.lastPage = resposta['last'];
      this.total = resposta['totalElements'];
      console.log(this.alugueisLocatario);
      errorResponse => {
        console.log(errorResponse)
      }
    });
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  verLocaisDesteAluguel(Aluguel: eAluguel){
    localStorage.setItem("idAluguel", Aluguel.id_aluguel)
    localStorage.setItem("inicioAluguel", Aluguel.data_inicio)
    localStorage.setItem("fimAluguel", Aluguel.data_fim)
    this.router.navigate(['cliente/perfil/local-entrega']);
  }

  avaliacao(Aluguel: eAluguel){
    localStorage.setItem("idAluguel", Aluguel.id_aluguel)
    this.router.navigate(['cliente/perfil/avaliacao-locatario']);
  }

}




@Component({
  selector: 'infos-Locador',
  templateUrl: 'InfosLocador.html',
})
export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data) {}
}

@Component({
  selector: 'status-aluguel',
  templateUrl: 'statusAluguel.html',
  styleUrls: ['./aluguel-locatario.component.css'],
})
export class DialogStatusAluguel {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data) {}
}
