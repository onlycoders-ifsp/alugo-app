import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { eProduto } from 'src/app/entidades/eProduto';
import { eUsuario } from 'src/app/entidades/eUsuario';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
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
  valorAluguel: number = 10;
  formularioAluguel: FormGroup;
  errorData: boolean = false;

  constructor(
    private router: Router,
    private idiService: idiomaService,
    private produtoService: produtoService,
    private auth: AuthService,
    private fb: FormBuilder,
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
        console.log(this.currentProduto)
        this.idDono = this.currentProduto.id_usuario;
        this.loadInfosDono();
      },
      errorResponse => {
        console.log(errorResponse)
      });
  }

  loadInfosDono(){
    console.log(this.idDono)
    this.auth.getUserById(this.idDono)
    .subscribe( 
      response => {
        this.currentDono = response;
        console.log(this.currentProduto);
        console.log(this.currentDono);
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

  setNewAluguel(){

  }

  recalculaValorAluguel(){
    const formCadValues = this.formularioAluguel.value;
    if(formCadValues.data_inicio && formCadValues.data_fim){
      if(formCadValues.data_inicio > formCadValues.data_fim){
        this.errorData = true;
      }else{
        let diff = Math.abs(formCadValues.data_inicio.getTime() - formCadValues.data_fim.getTime());
        let diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
        this.valorAluguel = this.currentProduto.valor_base_diaria * diffDays;
        this.errorData = false;
      }
      
    }
    
    
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}
