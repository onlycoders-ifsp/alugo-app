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

    this.createForm();
  }

  loadFormToCadOrUpdate() {    
    const formCadValuesLocador = this.formularioAvaliacaoLocador.value;
    this.avaliacaoLocadorAlterado.observacao = formCadValuesLocador.observacao;
    this.avaliacaoLocadorAlterado.nota = formCadValuesLocador.nota;    

    const formCadValuesProduto = this.formularioAvaliacaoProduto.value;
    this.avaliacaoProdutoAlterado.observacao = formCadValuesProduto.observacao;
    this.avaliacaoProdutoAlterado.nota = formCadValuesProduto.nota;

    this.cadAvaliacao();   
    
  }

  cadAvaliacao() {
    this.avaliacaoLocadorAlterado.id_aluguel = this.idCurrentAluguel;
    this.avaliacaoProdutoAlterado.id_aluguel = this.idCurrentAluguel;
    console.log(this.avaliacaoLocadorAlterado)
    console.log(this.avaliacaoProdutoAlterado)

    this.aluguelService.cadNewAvaliacao(this.avaliacaoLocadorAlterado).subscribe(response => {
      console.log(response)
      this.mensagemSucesso = "CadastroSucesso",
        this.mensagemErro = null;
    }, errorResponse => {
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });

    this.aluguelService.cadNewAvaliacao(this.avaliacaoProdutoAlterado).subscribe(response => {
      console.log(response)
      this.mensagemSucesso = "CadastroSucesso",
        this.mensagemErro = null;
    }, errorResponse => {
      console.log(errorResponse)
      this.mensagemSucesso = null,
        this.mensagemErro = "CadastroErro";
    });

    if(this.mensagemSucesso){
      localStorage.removeItem("idAluguel");
      this.router.navigate(["cliente/perfil/alugueis-locatario"]);
    }
  } 

  createForm(){
    this.formularioAvaliacaoLocador = this.fb.group({
      avaliacao:['',[]],
      observacao:['',[]],
    });  
    this.formularioAvaliacaoProduto = this.fb.group({
      avaliacao:['',[]],
      observacao:['',[]],
    });  
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }  

}
