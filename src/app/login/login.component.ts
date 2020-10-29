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

  mensagemErro: boolean;
  mensagemSucesso: boolean;
  mensagemErroCad: boolean;
  mensagemSenhaErrada: boolean;
  loginErro: boolean;


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
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
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
                                                    this.loginErro = false;
                                                  }, errorResponse =>{
                                                    //this.loginErro = formLoginValues.username + ' Usuário e/ou senha inválidos'
                                                    this.loginErro = true;                                                    
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
    if (this.formularioCadastro.valid) {
      if (formCadValues.senha == formCadValues.confirmaSenha) {
        this.mensagemSenhaErrada = false;
        this.authService.cadastrarNovoUsuario(user).subscribe(response => {
          this.mensagemSucesso = true;
          this.mensagemErro = false;
          this.mensagemErroCad = false
        }, errorResponse => {
          this.mensagemSucesso = false;
          this.mensagemErroCad = true;
          this.mensagemErro = false;
        });
      } else {
        this.mensagemSenhaErrada = true;
      this.mensagemErro = false;
      this.mensagemSucesso = false;
      this.mensagemErroCad = false;
        
      }
    } else {
      this.mensagemErro = true;
        this.mensagemSucesso = false;
        this.mensagemErroCad = false;
    }

      
  }

  clickMudaIdioma() {
    this.currentBandeira = this.idiService.setNewIdioma(this.currentIdioma)
  }

  setNewIdioma() {

  }
}
