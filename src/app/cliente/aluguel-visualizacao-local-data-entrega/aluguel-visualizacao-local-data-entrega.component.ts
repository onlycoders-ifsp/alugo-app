import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CepService } from 'src/app/Services/CepService';
import { eCep } from 'src/app/entidades/eCep';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';

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
  mensagemErro: string;

  constructor(
    private AuthService: AuthService,
    private idiService: idiomaService,
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
    },{updateOn: 'blur'})
    
  }


  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  

  inputaLocais() {

    if (this.formularioLocais.valid) {
      this.mensagemErro = null
      //this.loadFormToCadOrUpdate();      
    } else {      
      this.mensagemErro = "formInvalido"
    }
  }

}
