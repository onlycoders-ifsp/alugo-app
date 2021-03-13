import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { eAvaliacao } from 'src/app/entidades/eAvaliacao';
import { eProduto } from 'src/app/entidades/eProduto';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { produtoService } from 'src/app/Services/produtoService';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  produtos: eProduto[] = [];
  idCategoriaSelected: string;

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  txtPesquisaproduto: string;
  semProduto: boolean = false;
  public semReviewLocador: boolean = false;
  public semReviewLocatario: boolean = false;
  public page: number = 0;
  public size: number = 20;
  public pages:number;
  public totalAlugueis:number = 0;
  public firstPage: boolean;
  public lastPage: boolean;
  public total: number = 0;
  user: eUsuario = new eUsuario();
  avalLocador: eAvaliacao[] = [];
  avalLocatario: eAvaliacao[] = [];

  constructor(
    private produtoService: produtoService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getInfosUser();
    this.getProdutosUser();
    this.getAvaliacaoLocador();
    this.getAvaliacaoLocatario();
  }

  getAvaliacaoLocador(){
    this.authService.getAvaliacoesLocador("649aa1bb-6512-4aa3-9001-63c675c077e0").subscribe(
      response => {
        this.avalLocador = response;
        if(this.avalLocador.length>0){
          this.semReviewLocador = false;
        }else{
          this.semReviewLocador = true;
        }
        console.log("locador = " + this.semReviewLocador)
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

  getAvaliacaoLocatario(){
    this.authService.getAvaliacoesLocatario("649aa1bb-6512-4aa3-9001-63c675c077e0").subscribe(
      response => {
        this.avalLocatario = response;
        if(this.avalLocatario.length>0){
          this.semReviewLocatario = false;
        }else{
          this.semReviewLocatario = true;
        }

        console.log("locatario = " + this.semReviewLocatario)
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

  getInfosUser(){
    this.authService.getUserById("649aa1bb-6512-4aa3-9001-63c675c077e0").subscribe(
      response => {
        this.user = response;
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

  getProdutosUser(){
    this.produtoService.getProdutosByIdUsuario("649aa1bb-6512-4aa3-9001-63c675c077e0")
    .subscribe(
      response => {
        this.produtos = response['content'];
        this.pages = response['totalPages'];
        this.firstPage = response['first'];
        this.lastPage = response['last'];
        this.total = response['totalElements'];
        this.produtos.forEach(element => {
          this.totalAlugueis = this.totalAlugueis + element.qtd_alugueis
          });
        console.log(this.produtos);
      },errorResponse =>{
        console.log(errorResponse)
      });
  }

}
