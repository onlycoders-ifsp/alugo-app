import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { eAluguel } from 'src/app/entidades/eAluguel';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from 'src/app/Services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { eTipoProblema } from 'src/app/entidades/eTipoProblema';

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
  urlSafe: string;



  
  
  constructor(
    private router: Router,
    private idiService: idiomaService,
    private aluguelService: AluguelService,
    private AuthService: AuthService,
    public dialog: MatDialog,
    public sanitizer: DomSanitizer
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

  openDialogPagamento(aluguelSelecionado:eAluguel) {
    const url = this.sanitizer.bypassSecurityTrustResourceUrl(aluguelSelecionado.url_pagamento);
    console.log(url);
    const dialogRef = this.dialog.open(DialogAluguelPagamento,{
      data:{
        idAluguel:aluguelSelecionado.id_aluguel,
        urlPagamento:url,
      },  closeOnNavigation: true
    });

    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  confirmarChecklists(idAluguel: string, tipo:string){
    console.log(idAluguel)
    localStorage.setItem("idAluguel", idAluguel)
    localStorage.setItem("tipo",tipo)
    this.router.navigate(['cliente/perfil/checklist-entrega']);
  }


  openReporteProblema(item: eAluguel){
    if(sessionStorage.getItem("aluguelSession")){
      sessionStorage.removeItem("aluguelSession");
    }
    let capa_foto_locador;
    if(item.locador.capa_foto){
      capa_foto_locador = "data:image/jpg;base64,"+ item.locador.capa_foto;
    }else{
      capa_foto_locador = "../../../assets/imagens/avatar.svg";
    }
    let htmlItem  = '<a class="d-block mb-3 mb-sm-0 mr-sm-4 mx-auto" style="width: 12.5rem;">'
      + '              <img class="rounded-lg" width="100%" src="data:image/jpg;base64,'+item.produto.capa_foto+'" alt="Product">'
      + '            </a>'
      + '            <div class="media-body text-center text-sm-left">'
      + '              <b>'
      + '                <h3 class="h6 text-light mb-2"><a href="">'+item.produto.nome+'</a></h3>'
      + '              </b>'
      + '              <div class="custom-control custom-checkbox">'
      + '                <input class="custom-control-input" type="checkbox" id="update-info-1" checked>'
      + '                <label class="custom-control-label font-size-ms">'+item.data_inicio+' até '+item.data_fim+'</label>'
      + '              </div>'
      + '              <div class="d-flex align-items-center justify-content-center justify-content-sm-start pt-2">'
      + '                <div class="my-2 col-12">'
      + '                  <div class="bg-faded-info rounded p-3 mt-4 mb-2 col-12 card mt-4">'
      + '                    <a class="media">'
      + '                      <div class="container-fluid">'
      + '                        <div class="row">'
      + '                          <div class="col-3">'
      + '                            <img class="rounded-circle" width="50"'
      + '                              src="'+capa_foto_locador+'"'
      + '                              alt="Pessoa Aluguel" />'
      + '                          </div>'
      + '                          <div class="col-6">'
      + '                            <div class="media-body pl-2"><span class="font-size-ms text-muted">Locador</span>'
      + '                              <h6 class="font-size-sm mb-0">'+item.locador.nome+'</h6>'
      + '                            </div>'
      + '                          </div>'
      + '                          <div class="col-3 align-items-end">'
      + '                          </div>'
      + '                        </div>'
      + '                      </div>'
      + '                    </a>'
      + '                  </div>'
      + '                </div>'
      + '              </div>'
      + '              <div class="card border-left-0 border-right-0">'
      + '                <div class="card-header d-flex justify-content-between align-items-center py-3 border-0">'
      + '                  <div class="text-dark custom-control custom-radio">'
      + '                    Valor Gerado'
      + '                  </div>'
      + '                  <h5 class="mb-0 text-dark font-weight-normal">R$ '+item.valor_aluguel+'<small></small></h5>'
      + '                </div>'
      + '              </div>'
      + '            </div>';
    sessionStorage.setItem("aluguelSession", htmlItem);
    this.router.navigate(['cliente/perfil/reporte-problema'])


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
  selector: 'aluguel-pagamento',
  templateUrl: 'aluguelPagamento.html',
  styleUrls: ['./aluguel-locatario.component.css'],
})
export class DialogAluguelPagamento {

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data) {}

}
