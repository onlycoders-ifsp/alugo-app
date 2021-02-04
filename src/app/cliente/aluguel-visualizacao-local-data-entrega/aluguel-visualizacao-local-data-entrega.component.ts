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
import { eConfirmaEntregaDevolucao } from 'src/app/entidades/eConfirmaEntregaDevolucao';

@Component({
  selector: 'app-aluguel-visualizacao-local-data-entrega',
  templateUrl: './aluguel-visualizacao-local-data-entrega.component.html',
  styleUrls: ['./aluguel-visualizacao-local-data-entrega.component.css']
})
export class AluguelVisualizacaoLocalDataEntregaComponent implements OnInit {

  options = [
    { name: "ACEITAR", value: 1 },
    { name: "RECUSAR", value: 2 }
  ]

  idiomas: iIdioma[];
  currentBandeira: string;

  Selecionado: string;

  currentIdioma: string;
  cepPesquisado: eCep = new eCep();
  formularioLocais: FormGroup;
  formularioConfirmacao: FormGroup;
  mensagemErro: string;
  mensagemSucesso: string;
  idCurrentAluguel: string;
  private aluguelService: AluguelService;
  currententregaDevolucao: eEntregaDevolucao;
  confirmacaoEntregaDevolucaoAlterado: eConfirmaEntregaDevolucao = new eConfirmaEntregaDevolucao();

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private idiService: idiomaService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private cepSearch: CepService
    ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
   }

  ngOnInit(): void {
    if (!this.AuthService.isAutenticado()){
    this.AuthService.encerraSessao();
    }

    this.createForm();

    this.idCurrentAluguel = localStorage.getItem("idAluguel");

    this.loadCurrentEntregaDevolucao();
  }
  
  loadFormToCadOrUpdate(escolha: boolean) {    
    const formCadValues = this.formularioConfirmacao.value;
    if(escolha){
      this.confirmacaoEntregaDevolucaoAlterado.aceite = escolha;
      this.confirmacaoEntregaDevolucaoAlterado.observacao_recusa = "";
    }
    else{
      this.confirmacaoEntregaDevolucaoAlterado.aceite = escolha;
      this.confirmacaoEntregaDevolucaoAlterado.observacao_recusa = formCadValues.observacao;
    }

    this.updateConfirmacaoEntregaDevolucao();
    
  }

  updateConfirmacaoEntregaDevolucao() {
    this.confirmacaoEntregaDevolucaoAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.confirmacaoEntregaDevolucaoAlterado);
    this.aluguelService.putConfirmacaoEntregaDevolucao(this.confirmacaoEntregaDevolucaoAlterado).subscribe(response => {
      if(response){
        this.mensagemSucesso = "AtualizadoSucesso";
        this.mensagemErro = null;
      localStorage.removeItem("idAluguel");
      this.router.navigate(["cliente/perfil/alugueis-locador"])
      }else{
        this.mensagemErro = "AtualizadoErro";
      }
    }, errorResponse => {
      this.mensagemSucesso = null,
        this.mensagemErro = "AtualizadoErro";
    });
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
      entrega:['',[]],
    },{updateOn: 'blur'});
    this.formularioConfirmacao = this.fb.group({
      observacao:['',[]]
    })
    
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  

  inputaLocais(escolha: boolean) {

    if (this.formularioLocais.valid) {
      this.mensagemErro = null
      this.loadFormToCadOrUpdate(escolha);      
    } else {      
      this.mensagemErro = "formInvalido"
    }
  }

  loadCurrentEntregaDevolucao() {
    this.aluguelService.getEntregaDevolucao(this.idCurrentAluguel).subscribe(resposta => {
      this.currententregaDevolucao = resposta;

      let dataFormatadaEntrega = this.datepipe.transform(this.currententregaDevolucao.data_entrega, 'MM-dd-yyyy');
      let dateEntrega: Date = new Date(dataFormatadaEntrega);
      
      let dataFormatadaDevolucao = this.datepipe.transform(this.currententregaDevolucao.data_devolucao, 'MM-dd-yyyy');
      let dateDevolucao: Date = new Date(dataFormatadaDevolucao);

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
        console.log(errorResponse)
        this.currententregaDevolucao = new eEntregaDevolucao();
      }
    });
    this.createForm();
  }

}
