import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { eCadAluguel } from 'src/app/entidades/eCadAluguel';
import { eProduto } from 'src/app/entidades/eProduto';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';
import { produtoService } from 'src/app/Services/produtoService';
import { View, EventSettingsModel,  } from '@syncfusion/ej2-angular-schedule'
import { mercadoLivreService } from 'src/app/Services/mercadoLivreService';
import { ePreferenciaML } from 'src/app/entidades/ePreferenciaML';
import { environment } from 'src/environments/environment';
import { eItemML } from 'src/app/entidades/eItemML';
import { eBack_urls } from 'src/app/entidades/eBack_urls';
import { ePayerML } from 'src/app/entidades/ePayerML';
import { ePayerIdentificationML } from 'src/app/entidades/ePayerIdentificationML';
import { NotificacaoService } from 'src/app/Services/notificacaoService';
import { data } from 'jquery';

@Component({
  selector: 'app-realiza-aluguel',
  templateUrl: './realiza-aluguel.component.html',
  styleUrls: ['./realiza-aluguel.component.css']
})

export class RealizaAluguelComponent implements OnInit {

  public setView: View = 'Month';
  public views: View[] = ['Month'];
  public setDate: Date = new Date();
  public showHeaderBar: boolean = true;
  public readonly: boolean = true;
  public eventObject: EventSettingsModel;
  public preferenciaML: ePreferenciaML = new ePreferenciaML();
  public itemML:eItemML = new eItemML();
  public backUrl:eBack_urls = new eBack_urls();
  public payer:ePayerML = new ePayerML();
  public payerIdentification:ePayerIdentificationML = new ePayerIdentificationML();
  public novoAluguelCad: string = '';
  
  dataMinimaAluguel: Date;
  dataInicioReservado: Date;
  dataFimReservado: Date;
  datasIndisponiveis: number[] = [];
  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  currentProduto: eProduto;
  currentDono: eUsuario;
  currentLogado: eUsuario;
  idProduto: string;
  idDono: string;
  valorAluguel: number = 0;
  formularioAluguel: FormGroup;
  errorData: boolean = false;
  errorCad: boolean = false;
  errorDataMenorHoje: boolean = false;
  errorDonoProduto: boolean = false;
  errorAluguelExistente: string = null;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private produtoService: produtoService,
    private auth: AuthService,
    private fb: FormBuilder,
    private aluguelService: AluguelService,
    private datepipe: DatePipe,
    private mlService: mercadoLivreService,
    private notificacaoService: NotificacaoService
  ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
    this.idProduto = localStorage.getItem('idProdutoAluguel');
    
  }
  myFilter = (d: Date): boolean => {
    const time=d.getTime();
    return (this.datasIndisponiveis.length>0) ? !this.datasIndisponiveis.find(x=>x==time):true;
  }
  ngOnInit(): void {
    this.dataMinimaAluguel = new Date(this.datepipe.transform(new Date, 'MM-dd-yyyy'));
    this.dataMinimaAluguel.setDate(this.dataMinimaAluguel.getDate()+2);
    if (!this.auth.isAutenticado()){
      this.auth.encerraSessao();
    }
    this.loadInfosProduto();
    this.createForm();
  }

  loadInfosProduto(){
    this.produtoService.getProdutoById(this.idProduto)
    .subscribe( 
      response => {
        this.currentProduto = response;
        this.idDono = this.currentProduto.id_usuario;
        let alugueis = [];
        this.currentProduto.dt_alugadas.forEach(item => {
          let dataFormatadaIni = this.datepipe.transform(item.dt_inicio, 'MM-dd-yyyy');
          let dateIni: Date = new Date(dataFormatadaIni);
          let dateFim = this.transformaDataFim(item.dt_fim);
          let evento = {
            Subject: 'Alugado##',
            IsReadonly: true,
            Description: 'Produto Alugado nesta data##',
            StartTime: dateIni,
            //ano, mes, dia, hora, minuto
            EndTime: dateFim,
            CategoryColor: "#357cd2"
          };
          
          alugueis.push(evento);
          //this.carregaFiltroData(dateIni,dateFim);
          
      });
      
      this.carregaFiltroData(this.currentProduto);
      this.eventObject = {
        dataSource: alugueis
      }
        this.loadInfosDono();
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }

  carregaFiltroData(produto:eProduto){
    let dtAlugadas = produto.dt_alugadas;
    dtAlugadas.forEach(item =>{
      let dataInicio = new Date(this.datepipe.transform(item.dt_inicio, 'MM-dd-yyyy'));//(new Date(item.dt_inicio);
      let dataFim = this.transformaDataFim(item.dt_fim);
      dataInicio.setDate(dataInicio.getDate()-2);
      dataFim.setDate(dataFim.getDate()+2)
      while(dataInicio.getTime() <= new Date(dataFim).getTime()){
        this.datasIndisponiveis.push(dataInicio.getTime());
        dataInicio.setDate(dataInicio.getDate() + 1);
      }
    })
  }

  loadInfosDono(){
    this.auth.getUserById(this.idDono)
    .subscribe( 
      response => {
        this.currentDono = response;
        this.loadInfosLogado();
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }

  loadInfosLogado(){
    this.auth.getCurrentUserLogado()
    .subscribe( 
      response => {
        this.currentLogado = response;
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }


  createForm(){
    this.formularioAluguel = this.fb.group({
      data_fim:['',[Validators.required,this.validateInputDate]],
      data_inicio:['',[Validators.required,this.validateInputDate]],
    })
  }

  validateInputDate(): ValidationErrors | null{
   return (control:AbstractControl)=>{
       const time=control.value.getTime();
       return this.datasIndisponiveis.find(x=>x==time)?{dataIndisponivel:true}:null
   }
  }
  validateCurrentDate(): ValidationErrors | null{
    return (control:AbstractControl)=>{
      const time=control.value.getTime();
      return (time < new Date().getTime())?{dataAnterior:true}:null
  }
 }

  qtdeDifDias: number = 0;
  qtdeMeses:number = 0;
  recalculaValorAluguel() {
    const formCadValues = this.formularioAluguel.value;
    if (formCadValues.data_inicio && formCadValues.data_fim) {
      let dataAtual = new Date();
      if (formCadValues.data_inicio < dataAtual) {
        this.errorDataMenorHoje = true;
      } else {
        this.errorDataMenorHoje = false;
        if (formCadValues.data_inicio > formCadValues.data_fim) {
          this.errorData = true;
        } else {
          this.errorData = false;
          if (formCadValues.data_fim < dataAtual) {
            this.errorDataMenorHoje = true;
          } else {
            this.errorDataMenorHoje = false;
            let diff = Math.abs(formCadValues.data_inicio.getTime() - formCadValues.data_fim.getTime());
            
            let diffDays = (Math.ceil(diff / (1000 * 3600 * 24)) + 1);
            if (diffDays >= 30) {
              let meses = 0;
              let diasCount = diffDays;
              while (diasCount >= 30) {
                diasCount = diasCount - 30;
                meses++;
              }
              this.qtdeDifDias = diasCount;
              this.qtdeMeses = meses;

              this.valorAluguel = (this.currentProduto.valor_base_diaria * this.qtdeDifDias) + (this.currentProduto.valor_base_mensal * this.qtdeMeses);
            } else {
              this.qtdeDifDias = diffDays;
              this.qtdeMeses = 0;
              this.valorAluguel = (this.currentProduto.valor_base_diaria * this.qtdeDifDias);
            }
            this.errorData = false;
          }
        }
      }
    }
  }

  cadAluguel: eCadAluguel = new eCadAluguel();
  setNewAluguel() {
    if (this.formularioAluguel.valid) {
      if (!this.errorDataMenorHoje && !this.errorData) {
        if (this.currentLogado.id_usuario != this.currentProduto.id_usuario) {
          
          this.errorDonoProduto = false;
          const formCadValues = this.formularioAluguel.value;
          let date_fim: Date = formCadValues.data_fim;
          let dataFormat_fim = this.datepipe.transform(date_fim, 'yyyy-MM-dd');
          this.cadAluguel.data_fim = dataFormat_fim;

          let date_inicio: Date = formCadValues.data_inicio;
          let dataFormat_inicio = this.datepipe.transform(date_inicio, 'yyyy-MM-dd');
          this.cadAluguel.data_inicio = dataFormat_inicio;

          this.cadAluguel.valor_aluguel = this.valorAluguel;
          this.cadAluguel.id_produto = this.currentProduto.id_produto;
          
          console.log(this.cadAluguel);
          this.aluguelService.cadNewAluguel(this.cadAluguel).subscribe(response => {
            this.novoAluguelCad = response;
            console.log(response);
            console.log(this.novoAluguelCad)
            this.registraPreferenciaML();
          }, errorResponse => {
            console.log(errorResponse)
            this.errorCad = true;
            this.errorAluguelExistente = errorResponse.error.message;
          })
        } else {
          this.errorDonoProduto = true;
        }
      }
    }
  }

  //carrega a requisição
  loadPreferenciaML(){

    //atributos da compra
    this.preferenciaML.auto_return = '';
    this.preferenciaML.expiration_date_from = '2021-02-01T12:00:00.000-04:00';
    this.preferenciaML.expiration_date_to = '2022-02-01T12:00:00.000-04:00';
    this.preferenciaML.expires = true;
    this.preferenciaML.external_reference = this.novoAluguelCad;
    this.preferenciaML.notification_url = environment.apiBaseUrl + environment.webHookPagamento;
    this.preferenciaML.statement_descriptor = 'aluGO';

    //atributos de url de redirecionamento
    this.preferenciaML.back_urls = new eBack_urls();
    this.preferenciaML.back_urls.failure = environment.redirectBase + environment.redirectErro;
    this.preferenciaML.back_urls.pending = environment.redirectBase + environment.redirectPendente;
    this.preferenciaML.back_urls.success = environment.redirectBase + environment.redirectSucesso;

    //atributos do produto
    this.preferenciaML.items = [];
    this.itemML.quantity = 1;
    this.itemML.title = this.currentProduto.nome;
    this.itemML.unit_price = this.cadAluguel.valor_aluguel;
    this.itemML.currency_id = 'BRL';
    this.itemML.description = this.currentProduto.descricao;
    this.itemML.picture_url = 'https://www.kindpng.com/picc/m/9-94516_your-online-store-is-automatically-optimised-png-online.png';
    this.preferenciaML.items.push(this.itemML);

    //atributos do comprador
    this.preferenciaML.payer = new ePayerML();
    this.preferenciaML.payer.name = this.currentLogado.nome;
    //utilizo o sobrenome como id de usuário para pesquisas
    this.preferenciaML.payer.surname = this.currentLogado.id_usuario;
    this.preferenciaML.payer.email = this.currentLogado.email;
    this.preferenciaML.payer.identification = new ePayerIdentificationML();
    this.preferenciaML.payer.identification.type = 'CPF';
    this.preferenciaML.payer.identification.number = this.currentLogado.cpf;
  }

  registraPreferenciaML(){
    this.loadPreferenciaML();
    console.log(this.preferenciaML)
    this.mlService.cadPreferencia(this.preferenciaML).subscribe(response => {
      console.log(response.sandbox_init_point);
      const url = response.sandbox_init_point;
      this.updateAluguelComUrlPagamento(url);
    }, errorResponse => {
      console.log(errorResponse)
      this.errorCad = true;
      this.errorAluguelExistente = errorResponse.error.message;
    })
    
  }

  updateAluguelComUrlPagamento(url:string){
    console.log(this.novoAluguelCad + " pra add url")
    this.aluguelService.updateAluguelUrl(this.novoAluguelCad,url).subscribe(response => {
      this.errorCad = false;
      this.errorAluguelExistente = null;
      this.notificacaoService.showSuccess("Aluguel efetuado com sucesso! O locador terá que aprovar o aluguel")
      this.router.navigate(["cliente/perfil/alugueis-locatario"]);
    }, errorResponse => {
      console.log(errorResponse)
      this.errorCad = true;
      this.errorAluguelExistente = errorResponse.error.message;
      this.notificacaoService.showDanger(errorResponse.error.message);
    })
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  transformaDataFim(data: string): Date{
    let dateNoPadrao = this.datepipe.transform(data, 'MM-dd-yyyy');
    let dateFim: Date = new Date(dateNoPadrao);
    let dataFimFinal: Date = new Date(dateFim.getFullYear(), dateFim.getMonth(), dateFim.getDate(), 23,59,0,0);
    return dataFimFinal;
  }


  viewProfileUser(idUsuario: string){
    if(sessionStorage.getItem("idUsuarioPreview")){
      sessionStorage.removeItem("idUsuarioPreview");
    }
    sessionStorage.setItem("idUsuarioPreview", idUsuario);
    this.router.navigate(["/perfil"]);
  }

}
