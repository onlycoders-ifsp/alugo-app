import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eCadAluguel } from 'src/app/entidades/eCadAluguel';
import { eProduto } from 'src/app/entidades/eProduto';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AluguelService } from 'src/app/Services/AluguelService';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';
import { produtoService } from 'src/app/Services/produtoService';

@Component({
  selector: 'app-realiza-aluguel',
  templateUrl: './realiza-aluguel.component.html',
  styleUrls: ['./realiza-aluguel.component.css']
})
export class RealizaAluguelComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  currentProduto: eProduto;
  currentDono: eUsuario;
  idProduto: string;
  idDono: string;
  valorAluguel: number = 0;
  formularioAluguel: FormGroup;
  errorData: boolean = false;
  errorCad: boolean = false;
  errorDataMenorHoje: boolean = false;
  errorDonoProduto: boolean = false;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private produtoService: produtoService,
    private auth: AuthService,
    private fb: FormBuilder,
    private aluguelService: AluguelService,
    private datepipe: DatePipe
  ) { 
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
    this.idProduto = localStorage.getItem('idProdutoAluguel');
    
  }

  ngOnInit(): void {
    this.loadInfosProduto();
    this.createForm();
  }

  loadInfosProduto(){
    this.produtoService.getProdutoById(this.idProduto)
    .subscribe( 
      response => {
        this.currentProduto = response;
        this.idDono = this.currentProduto.id_usuario;
        this.loadInfosDono();
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }

  loadInfosDono(){
    this.auth.getUserById(this.idDono)
    .subscribe( 
      response => {
        this.currentDono = response;
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }


  createForm(){
    this.formularioAluguel = this.fb.group({
      data_fim:['',[Validators.required]],
      data_inicio:['',[Validators.required]],
    })
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
            let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
            if (diffDays > 30) {
              let meses = 0;
              let diasCount = diffDays;
              while (diasCount > 30) {
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
        console.log(this.currentProduto)
        console.log(this.currentDono)
        if (this.currentDono.id_usuario != this.currentProduto.id_usuario) {
          
          this.errorDonoProduto = false;
          const formCadValues = this.formularioAluguel.value;
          let date_fim: Date = formCadValues.data_fim;
          let dataFormat_fim = this.datepipe.transform(date_fim, 'yyyy-MM-dd');
          this.cadAluguel.data_fim = dataFormat_fim;

          let date_inicio: Date = formCadValues.data_fim;
          let dataFormat_inicio = this.datepipe.transform(date_inicio, 'yyyy-MM-dd');
          this.cadAluguel.data_inicio = dataFormat_inicio;

          this.cadAluguel.valor_aluguel = this.valorAluguel;
          this.cadAluguel.id_produto = this.currentProduto.id_produto;


          this.aluguelService.cadNewAluguel(this.cadAluguel).subscribe(response => {
            this.errorCad = false;
            this.router.navigate(["cliente/perfil/alugueis-locatario"])
          }, errorResponse => {
            console.log(errorResponse)
            this.errorCad = true;
          })
        } else {
          this.errorDonoProduto = true;
        }
      }
    }
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
