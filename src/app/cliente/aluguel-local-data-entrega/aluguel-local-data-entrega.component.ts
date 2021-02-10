import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from 'src/app/Services/CepService';
import { eCep } from 'src/app/entidades/eCep';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { eEntregaDevolucao } from 'src/app/entidades/eEntregaDevolucao';


@Component({
  selector: 'app-aluguel-local-data-entrega',
  templateUrl: './aluguel-local-data-entrega.component.html',
  styleUrls: ['./aluguel-local-data-entrega.component.css']
})
export class AluguelLocalDataEntregaComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  cepPesquisado: eCep = new eCep();
  formularioLocais: FormGroup;
  mensagemErro: string;
  mensagemSucesso: string;
  idCurrentAluguel: string;
  inicioCurrentAluguel: string;  
  fimCurrentAluguel: string;
  entregaDevolucaoAlterado: eEntregaDevolucao = new eEntregaDevolucao();
  currententregaDevolucao: eEntregaDevolucao;
  edicao: boolean;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    public datepipe: DatePipe,
    private idiService: idiomaService,
    private fb: FormBuilder,
    private cepSearch: CepService,
    private aluguelService: AluguelService
    ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    if (!this.AuthService.isAutenticado()){
    this.AuthService.encerraSessao();
    }

    this.idCurrentAluguel = localStorage.getItem("idAluguel");
    this.inicioCurrentAluguel = localStorage.getItem("inicioAluguel")//new Date(localStorage.getItem("inicioAluguel"));
    this.fimCurrentAluguel = localStorage.getItem("fimAluguel")//new Date(localStorage.getItem("fimAluguel"));

    this.createForm();

    this.loadCurrentEntregaDevolucao();
  }

  createForm(){
    this.formularioLocais = this.fb.group({
      bairroEntrega:['',[]],
      cepEntrega:['',[]],
      enderecoEntrega:['',[]],
      numeroEntrega:['',[]],
      descricaoEntrega:['',[]],
      horarioEntrega:['',[]],
      bairroDevolucao:['',[]],
      cepDevolucao:['',[]],
      enderecoDevolucao:['',[]],
      numeroDevolucao:['',[]],
      descricaoDevolucao:['',[]],
      horarioDevolucao:['',[]],
    },{updateOn: 'blur'})
    
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  
  
  preencheCep(tipo:number){
    if(tipo==1){
      this.cepSearch.getCep(this.formularioLocais.value.cepEntrega).subscribe(response => {
        this.cepPesquisado = response;
         this.formularioLocais.patchValue({
            bairroEntrega: this.cepPesquisado.bairro,
            enderecoEntrega: this.cepPesquisado.logradouro,
         })
        
      });
    }
    if(tipo==2){
      this.cepSearch.getCep(this.formularioLocais.value.cepDevolucao).subscribe(response => {
        this.cepPesquisado = response;
         this.formularioLocais.patchValue({
            bairroDevolucao: this.cepPesquisado.bairro,
            enderecoDevolucao: this.cepPesquisado.logradouro,
         })
        
      });

    }
  }

  inputaLocais() {

    if (this.formularioLocais.valid) {
      this.mensagemErro = null
      this.loadFormToCadOrUpdate();
      
    } else {      
      this.mensagemErro = "formInvalido"
    }
  }

  loadFormToCadOrUpdate() {    
    const formCadValues = this.formularioLocais.value;
    this.entregaDevolucaoAlterado.cep_entrega = formCadValues.cepEntrega;
    this.entregaDevolucaoAlterado.cep_devolucao = formCadValues.cepDevolucao;
    this.entregaDevolucaoAlterado.bairro_entrega = formCadValues.bairroEntrega;
    this.entregaDevolucaoAlterado.bairro_devolucao = formCadValues.bairroDevolucao;

    let dateEntrega: Date = formCadValues.horarioEntrega;
    let latest_dateEntrega = this.datepipe.transform(dateEntrega, 'yyyy-MM-dd hh:mm:ss.000000');
    this.entregaDevolucaoAlterado.data_entrega = latest_dateEntrega;

    let dateDevolucao: Date = formCadValues.horarioDevolucao;
    let latest_dateDevolucao = this.datepipe.transform(dateDevolucao, 'yyyy-MM-dd hh:mm:ss.000000');
    this.entregaDevolucaoAlterado.data_devolucao = latest_dateDevolucao;
    
    this.entregaDevolucaoAlterado.descricao_entrega = formCadValues.descricaoEntrega;
    this.entregaDevolucaoAlterado.descricao_devolucao = formCadValues.descricaoDevolucao;
    this.entregaDevolucaoAlterado.logradouro_entrega = formCadValues.enderecoEntrega;
    this.entregaDevolucaoAlterado.logradouro_devolucao = formCadValues.enderecoDevolucao;
    this.entregaDevolucaoAlterado.observacao_recusa = "";
    this.entregaDevolucaoAlterado.aceite_locador = false;

    if (this.edicao) {
      this.updateEntregaDevolucao();
    } else {
      this.cadEntregaDevolucao();
    }
    
  }

  cadEntregaDevolucao() {
    this.entregaDevolucaoAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.entregaDevolucaoAlterado)
    this.aluguelService.cadNewEntregaDevolucao(this.entregaDevolucaoAlterado).subscribe(response => {
      console.log(response)
      this.mensagemSucesso = "CadastroSucesso",
        this.mensagemErro = null;
        localStorage.removeItem("idAluguel");
        this.router.navigate(["cliente/perfil/alugueis-locatario"]);
    }, errorResponse => {
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });
  }  
  
  updateEntregaDevolucao() {
    this.entregaDevolucaoAlterado.id_aluguel = this.idCurrentAluguel;
    this.aluguelService.putEntregaDevolucao(this.entregaDevolucaoAlterado).subscribe(response => {
      if(response){
        console.log(response)
        this.mensagemSucesso = "AtualizadoSucesso";
        this.mensagemErro = null;
      localStorage.removeItem("idAluguel");
      this.router.navigate(["cliente/perfil/alugueis-locatario"])
      }else{
        this.mensagemErro = "AtualizadoErro";
      }
    }, errorResponse => {
      this.mensagemSucesso = null,
        this.mensagemErro = "AtualizadoErro";
    });
  }

  loadCurrentEntregaDevolucao() {
    console.log(this.idCurrentAluguel)
    this.aluguelService.getEntregaDevolucao(this.idCurrentAluguel).subscribe(resposta => {
      this.currententregaDevolucao = resposta;
      console.log(this.currententregaDevolucao)
      let dataFormatadaEntrega = this.datepipe.transform(this.currententregaDevolucao.data_entrega, 'yyyy-MM-dd hh:mm:ss.000000');
      let dateEntrega: Date = new Date(dataFormatadaEntrega);
      
      let dataFormatadaDevolucao = this.datepipe.transform(this.currententregaDevolucao.data_devolucao, 'yyyy-MM-dd hh:mm:ss.000000');
      let dateDevolucao: Date = new Date(dataFormatadaDevolucao);

      this.edicao = true;
      this.formularioLocais.patchValue({
        cepEntrega: this.currententregaDevolucao.cep_entrega,
        cepDevolucao: this.currententregaDevolucao.cep_devolucao,
        bairroEntrega: this.currententregaDevolucao.bairro_entrega,
        bairroDevolucao: this.currententregaDevolucao.bairro_devolucao,
        horarioEntrega: dateEntrega,
        horarioDevolucao: dateDevolucao,
        descricaoEntrega: this.currententregaDevolucao.descricao_entrega,
        descricaoDevolucao: this.currententregaDevolucao.descricao_devolucao,
        enderecoEntrega: this.currententregaDevolucao.logradouro_entrega,
        enderecoDevolucao: this.currententregaDevolucao.logradouro_devolucao
      })
      errorResponse => {
        this.edicao = false;
        console.log(errorResponse)
        this.currententregaDevolucao = new eEntregaDevolucao();
      }
    });
    this.createForm();
  }

}
