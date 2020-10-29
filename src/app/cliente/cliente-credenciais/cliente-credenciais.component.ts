import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { eSenha } from 'src/app/entidades/eSenha';
import { iIdioma } from 'src/app/Interfaces/iIdioma';
import { AuthService } from 'src/app/Services/auth.service';
import { idiomaService } from 'src/app/Services/idiomaService';

@Component({
  selector: 'app-cliente-credenciais',
  templateUrl: './cliente-credenciais.component.html',
  styleUrls: ['./cliente-credenciais.component.css']
})
export class ClienteCredenciaisComponent implements OnInit {

  idiomas: iIdioma[];
  currentBandeira: string;
  currentIdioma: string;
  formularioSenha: FormGroup;
  mensagemSucesso: boolean = false;
  mensagemErro: boolean = false;
  mensagemSenhaErrada: boolean = false;
  senha: eSenha = new eSenha();
  
  constructor(
    private idiService: idiomaService,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
    this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formularioSenha = this.fb.group({
      senhaAntiga:['',[Validators.required]],
      senhaNova:['',[Validators.required,Validators.minLength(8)]],
      confirmaSenha:['',[Validators.required,Validators.minLength(8)]],
    });  // key is to validate on the form group)
  }

  updateSenha(){
    const formCadValues = this.formularioSenha.value;
    
    
    if(this.formularioSenha.valid){
      if(formCadValues.senhaNova == formCadValues.confirmaSenha){
        this.mensagemSenhaErrada = false;
        this.senha.senha_antiga = formCadValues.senhaAntiga;
        this.senha.senha_nova = formCadValues.senhaNova;

        console.log(this.senha)
        this.auth.updateSenha(this.senha).subscribe(response =>{
          this.mensagemSucesso = true;
          this.mensagemErro = false;
          this.mensagemSenhaErrada = false;
        }, errorResponse => {
          this.mensagemSucesso = false;
          this.mensagemErro = true;
          this.mensagemSenhaErrada = false;

        });
      }else{
        this.mensagemErro = false;
        this.mensagemSucesso = false;
        this.mensagemSenhaErrada = true;
      }
      
    }
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

}