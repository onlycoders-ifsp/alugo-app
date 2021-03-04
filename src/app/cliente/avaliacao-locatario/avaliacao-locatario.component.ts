import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { idiomaService } from 'src/app/Services/idiomaService';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { eAvaliacao } from 'src/app/entidades/eAvaliacao';

@Component({
  selector: 'app-avaliacao-locatario',
  templateUrl: './avaliacao-locatario.component.html',
  styleUrls: ['./avaliacao-locatario.component.css']
})
export class AvaliacaoLocatarioComponent implements OnInit {

  formularioAvaliacaoLocador: FormGroup;
  formularioAvaliacaoProduto: FormGroup;
  mensagemErro: string;
  mensagemSucesso: string;
  currentRateLocador = 0;
  currentRateProduto = 0;
  idCurrentAluguel: string;
  avaliacaoLocadorAlterado: eAvaliacao = new eAvaliacao();
  avaliacaoProdutoAlterado: eAvaliacao = new eAvaliacao();

  currentIdioma: string;
  idiomas: iIdioma[];
  currentBandeira: string;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder,
    private idiService: idiomaService,
    private aluguelService: AluguelService
    ) { }

  ngOnInit(): void {
    if (!this.AuthService.isAutenticado()){
    this.AuthService.encerraSessao();
    }

    this.idCurrentAluguel = localStorage.getItem("idAluguel");
    this.createForm();
  }

  loadFormToCadOrUpdate() {    
    const formCadValuesLocador = this.formularioAvaliacaoLocador.value;
    this.avaliacaoLocadorAlterado.comentario = formCadValuesLocador.observacao;
    this.avaliacaoLocadorAlterado.nota = this.currentRateLocador;    

    const formCadValuesProduto = this.formularioAvaliacaoProduto.value;
    this.avaliacaoProdutoAlterado.comentario = formCadValuesProduto.observacao;
    this.avaliacaoProdutoAlterado.nota = this.currentRateProduto;

    this.cadAvaliacaoLocador();   
    
  }

  inputaAvaliacao(){
    if (this.formularioAvaliacaoLocador.valid && this.formularioAvaliacaoProduto.valid) {
      this.loadFormToCadOrUpdate();      
    } 
    else {
      this.mensagemErro = "formInvalido"
    }
  }

  cadAvaliacaoLocador() {
    this.avaliacaoLocadorAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.avaliacaoLocadorAlterado)

    this.aluguelService.cadNewAvaliacaoLocador(this.avaliacaoLocadorAlterado).subscribe(response => {
      console.log('requisição do locador - OK')
      console.log(response)
      this.mensagemSucesso = "CadastroSucessoLocador",
        this.mensagemErro = null;
      this.cadAvaliacaoProduto();
    }, errorResponse => {
      console.log('requisição do locador - Problema')
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });       
  } 

  cadAvaliacaoProduto() {
    this.avaliacaoProdutoAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.avaliacaoProdutoAlterado)

    this.aluguelService.cadNewAvaliacaoProduto(this.avaliacaoProdutoAlterado).subscribe(response => {
      console.log('requisição do produto - OK')
      console.log(response)
      this.mensagemSucesso += "CadastroSucessoProduto",
        this.mensagemErro = null;
    }, errorResponse => {
      console.log('requisição do produto - Problema')
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });

    console.log(this.mensagemSucesso)
    if(this.mensagemSucesso){
      localStorage.removeItem("idAluguel");
      this.router.navigate(["cliente/perfil/alugueis-locatario"]);
    }
  } 



  createForm(){
    this.formularioAvaliacaoLocador = this.fb.group({
      avaliacao:['',[Validators.required]],
      observacao:['',[]],
    });  
    this.formularioAvaliacaoProduto = this.fb.group({
      avaliacao:['',[Validators.required]],
      observacao:['',[]],
    });  
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  

}
