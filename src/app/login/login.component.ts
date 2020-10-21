import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iIdioma } from '../Interfaces/iIdioma';
import { idiomaService } from '../Services/idiomaService';
import { eUserLogin } from '../entidades/eUserLogin';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { eUsuario } from '../entidades/eUsuario';
import { eUsuarioConstructor } from '../entidades/eUsuarioConstrutor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioCadastro: FormGroup;
  formularioLogin: FormGroup;
  currentBandeira: string;

  username: string;
  password: string;
  currentIdioma: string;
  loginError: boolean;
  idiomas: iIdioma[];

  mensagemErro: string;
  mensagemSucesso: string;
  loginErro: string;


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

    this.formularioLogin = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
  }

  login() {
    if(this.formularioLogin.valid){
      const formLoginValues = this.formularioLogin.value;
      this.authService.tentarLogin(formLoginValues.username, formLoginValues.password)
                                                  .subscribe(response =>{
                                                    const access_token = JSON.stringify(response);
                                                    localStorage.setItem("access_token", access_token)
                                                    this.router.navigate(['/cliente/perfil/dados']),
                                                    this.loginErro = null;
                                                  }, errorResponse =>{
                                                    //this.loginErro = formLoginValues.username + ' Usuário e/ou senha inválidos'
                                                    this.loginErro = 'Usuário e/ou senha inválidos';
                                                    console.log(errorResponse)
                                                    
                                                  })
    }
    
    
  }

  cadastrar() {
    const formCadValues = this.formularioCadastro.value;
    const user : eUsuarioConstructor = new eUsuarioConstructor(formCadValues.nome, 
      formCadValues.email, 
      formCadValues.senha, 
      formCadValues.cpf, 
      formCadValues.celular,
      "",
      "",
      "",
      "")
    if(this.formularioCadastro.valid){
      this.authService.cadastrarNovoUsuario(user).subscribe(response =>{
        this.mensagemSucesso = "Cadastro Efetuado com sucesso! Faça Login",
          this.mensagemErro = null
      }, errorResponse => {
        this.mensagemSucesso = null,
          this.mensagemErro = "Erro ao realizar o cadastro" + errorResponse
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
