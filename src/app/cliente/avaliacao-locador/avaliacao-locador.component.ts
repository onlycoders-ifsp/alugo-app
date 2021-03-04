import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { eAvaliacao } from 'src/app/entidades/eAvaliacao';

@Component({
  selector: 'app-avaliacao-locador',
  templateUrl: './avaliacao-locador.component.html',
  styleUrls: ['./avaliacao-locador.component.css']
})
export class AvaliacaoLocadorComponent implements OnInit {

  formularioAvaliacao: FormGroup;
  mensagemErro: string;
  mensagemSucesso: string;
  currentRate = 0;
  currentIdioma: string;
  avaliacaoAlterado: eAvaliacao = new eAvaliacao();
  idCurrentAluguel: string;
  idiomas: iIdioma[];
  currentBandeira: string;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private idiService: idiomaService,
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
    this.createForm();
  }

  loadFormToCadOrUpdate() {    
    const formCadValues = this.formularioAvaliacao.value;
    this.avaliacaoAlterado.comentario = formCadValues.observacao;
    this.avaliacaoAlterado.nota = this.currentRate;

    this.cadAvaliacao();
    
    
  }

  inputaAvaliacao(){
    if (this.formularioAvaliacao.valid) {
      this.loadFormToCadOrUpdate();      
    } else {
      this.mensagemErro = "formInvalido"
    }
  }

  cadAvaliacao() {
    this.avaliacaoAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.avaliacaoAlterado)
    this.aluguelService.cadNewAvaliacaoLocatario(this.avaliacaoAlterado).subscribe(response => {
      console.log(response)
      this.mensagemSucesso = "CadastroSucesso",
        this.mensagemErro = null;
        localStorage.removeItem("idAluguel");
        this.router.navigate(["cliente/perfil/alugueis-locador"]);
    }, errorResponse => {
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });
  }  

  createForm(){
    this.formularioAvaliacao = this.fb.group({
      avaliacao:['',[Validators.required]],
      observacao:['',[]],
    });    
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  

}