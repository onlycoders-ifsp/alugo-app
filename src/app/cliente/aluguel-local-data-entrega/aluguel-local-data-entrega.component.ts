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
  }

  // createForm(){
  //   this.formularioLocais = this.fb.group({
  //     bairro:['',[]],
  //     cep:['',[]],
  //     endereco:['',[]],
  //     numero:['',[]],
  //     descricaoEntrega:['',[]],
  //   },{updateOn: 'blur'})
    
  // }


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
      //this.loadFormToCadOrUpdate();
      
    } else {      
      this.mensagemErro = "formInvalido"
    }
  }

}
