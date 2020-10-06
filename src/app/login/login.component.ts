import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from '../Interfaces/iIdioma';
import { idiomaService } from '../Services/idiomaService';
import { eUserLogin } from '../entidades/eUserLogin';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Validacoes } from '../Classes/Validacoes';
import { eUsuario } from '../entidades/eUsuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioCadastro: FormGroup;
  currentBandeira: string;

  username: string;
  password: string;
  currentIdioma: string;
  loginError: boolean;
  idiomas: iIdioma[];

  mensagemErro: string;
  mensagemSucesso: string;


  constructor(
    private router: Router,
    private idiService: idiomaService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.currentBandeira = idiService.setDefaultLanguage(),
      this.idiomas = idiService.getListIdiomas()
  }

  ngOnInit() {
    this.formularioCadastro = this.fb.group({
      nome:['',[
        Validators.required
      ]],
      email:['', [
        Validators.required,
        Validators.email
      ], ],
      senha:['',[
        Validators.required,
        Validators.minLength(8)
      ], ],
      confirmaSenha:['', [
        Validators.required
      ], ],
      cpf:['', [
        Validators.required
      ], ],
      celular:['', [
        Validators.required
      ], ]
    })
  }

  login() {
    this.router.navigate(['/usuarios/lista']);
  }

  cadastrar() {
    const formCadValues = this.formularioCadastro.value;
    const user : eUsuario = new eUsuario(formCadValues.nome, formCadValues.email, formCadValues.senha, formCadValues.cpf, formCadValues.celular)
    if(this.formularioCadastro.valid){
      console.log(user)
      this.authService.cadastrarNovoUsuario(user).subscribe(response =>{
        this.mensagemSucesso = "Cadastro Efetuado com sucesso! Faça Login",
          this.mensagemErro = null
      }, errorResponse => {
        this.mensagemSucesso = null,
          this.mensagemErro = "Erro ao realizar o cadastro"
      });
    }else{
      this.mensagemErro = "O formulário ainda não está valido"
    }
    


    // const usuario: eUserLogin = new eUserLogin();
    // usuario.username = this.username;
    // usuario.password = this.password;
    // this.authService.salvar(usuario).subscribe(response => {
    //   this.mensagemSucesso = "Cadastro Efetuado com sucesso! Faça Login",
    //     this.mensagemErro = null
    // }, errorResponse => {
    //   this.mensagemSucesso = null,
    //     this.mensagemErro = "Erro ao realizar o cadastro"
    // })
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  setNewIdioma() {

  }
}
